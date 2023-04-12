// FRONTEND IMPORTS

import { useState, useEffect, useContext } from "react";

import { useToast } from "@chakra-ui/react";

import GlobalEventFixed from "./Event/Fixed";
import GlobalEventResponsive from "./Event/Responsive";

import { checkDateOpen } from "../../functions";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import { firestore } from "../../../utils/firebase";

import { doc, updateDoc } from "firebase/firestore";

import { SubscriptionCheck } from "../../server";

const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const GlobalEvent = (props) => {
  const { user, followings } = useContext(UserContext);

  const toast = useToast();
  const showToast = () => {
    toast({
      description: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const [isSubscribed, setIsSubscribed] = useState();
  const [userData, getUserData] = useState(null);

  useEffect(() => {
    const userRef = firestore.collection("users").doc(props.host);
    userRef.get().then((doc) => {
      if (doc.exists) {
        getUserData(doc);
        SubscriptionCheck(followings, doc.data().username, setIsSubscribed);
      }
    });
  }, [followings, props.host, firestore]);

  const generateStreamToken = async (channelName, role) => {
    let name;

    if (channelName.length > 64) {
      name = channelName.substring(0, 63);
    } else {
      name = channelName;
    }

    try {
      const response = await fetch("/api/agora", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        const expirationTimeInSeconds = 10800;
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

        return RtcTokenBuilder.buildTokenWithUid(
          data.appId,
          data.certificate,
          name,
          0,
          role,
          privilegeExpiredTs
        );
      }
    } catch (e) {
      showToast();
    }
  };

  const storeToken = async (value) => {
    const eventRef = doc(
      doc(firestore, "users", props.host),
      "events",
      props.id
    );
    await updateDoc(eventRef, {
      token: value,
      isLive: true,
      expireTime: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const goLiveHandler = async () => {
    if (!props.token) {
      generateStreamToken(props.title, RtcRole.PUBLISHER)
        .then((value) => {
          storeToken(value);
        })
        .catch((e) => {
          showToast();
        });
    }
  };

  return (
    <>
      {userData && (
        <>
          <GlobalEventFixed
            id={props.id}
            userId={user.uid}
            host={props.host}
            title={props.title}
            date={props.date}
            description={props.description}
            price={props.price}
            isFree={props.isFree}
            thumbnailURL={props.thumbnailURL}
            isOpen={checkDateOpen(props.date)}
            isLive={props.isLive}
            numAttendees={props.numAttendees}
            accessed={props.accessed}
            userData={userData.data()}
            isSubscribed={isSubscribed}
            goLiveHandler={goLiveHandler}
            display={{
              xxl: "block",
              xl: "block",
              lg: "block",
              md: "none",
              sm: "none",
              base: "none",
            }}
          />
          <GlobalEventResponsive
            id={props.id}
            userId={user.uid}
            host={props.host}
            title={props.title}
            date={props.date}
            description={props.description}
            price={props.price}
            isFree={props.isFree}
            thumbnailURL={props.thumbnailURL}
            isOpen={checkDateOpen(props.date)}
            isLive={props.isLive}
            numAttendees={props.numAttendees}
            accessed={props.accessed}
            userData={userData.data()}
            isSubscribed={isSubscribed}
            goLiveHandler={goLiveHandler}
            display={{
              xxl: "none",
              xl: "none",
              lg: "none",
              md: "block",
              sm: "block",
              base: "block",
            }}
          />
        </>
      )}
    </>
  );
};

export default GlobalEvent;
