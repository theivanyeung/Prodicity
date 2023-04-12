// FRONTEND IMPORTS

import { useState, useEffect } from "react";

import { Box } from "@chakra-ui/react";

import GlobalEventCardFixed from "./EventCard/Fixed";
import GlobalEventCardResponsive from "./EventCard/Responsive";

// BACKEND IMPORTS

import { firestore } from "../../../utils/firebase";

const GlobalEventCard = (props) => {
  const [userData, getUserData] = useState(null);

  useEffect(() => {
    const userRef = firestore.collection("users").doc(props.host);
    userRef.get().then((doc) => {
      if (doc.exists) {
        getUserData(doc);
      }
    });
  }, [firestore, props.host]);

  return (
    <>
      {userData && (
        <>
          {/* FULL VIEW */}

          <Box
            borderRadius={"14px"}
            display={{
              xxl: "block",
              xl: "block",
              lg: "block",
              md: "block",
              sm: "block",
              base: "none",
            }}
          >
            <GlobalEventCardFixed
              id={props.id}
              host={props.host}
              title={props.title}
              date={props.date}
              thumbnailURL={props.thumbnailURL}
              isLive={props.isLive}
              numAttendees={props.numAttendees}
              accessed={props.accessed}
              userData={userData.data()}
            />
          </Box>

          {/* BASE VIEW */}

          <Box
            borderRadius={"14px"}
            display={{
              xxl: "none",
              xl: "none",
              lg: "none",
              md: "none",
              sm: "none",
              base: "block",
            }}
          >
            <GlobalEventCardResponsive
              id={props.id}
              host={props.host}
              title={props.title}
              date={props.date}
              thumbnailURL={props.thumbnailURL}
              isLive={props.isLive}
              numAttendees={props.numAttendees}
              accessed={props.accessed}
              userData={userData.data()}
            />
          </Box>
        </>
      )}
    </>
  );
};

export default GlobalEventCard;
