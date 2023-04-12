// FRONTEND IMPORTS

import { useEffect, useState, useContext } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Box, useToast } from "@chakra-ui/react";

const EventPage = dynamic(() => import("../../../components/event/EventPage"), {
  ssr: false,
});
import SEO from "../../../components/SEO";

import { checkDateOpen } from "../../../components/functions";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import { collection, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../../utils/firebase";

import { SubscriptionCheck } from "../../../components/server";

const Event = () => {
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

  const router = useRouter();
  const creator = router.query.creator;
  const eventId = router.query.eventid;

  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [voting, setVoting] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);

  useEffect(() => {
    if (creator && eventId && user) {
      setUserId(user.uid);

      firestore
        .collection("users")
        .doc(user.uid)
        .onSnapshot((doc) => {
          setUserData(doc.data());
        });

      const checkAccess = async (host, isLive, date, eventId) => {
        try {
          let accessed = false;
          if (checkDateOpen(date)) {
            if (host && host === user.uid) {
              accessed = true;
            } else {
              const querySnapshot = await getDocs(
                collection(
                  doc(doc(firestore, "users", host), "events", eventId),
                  "attendees"
                )
              );
              querySnapshot.forEach((attendee) => {
                if (attendee.id === user.uid) {
                  accessed = true;
                }
              });
              if (isLive === false) {
                router.push("/404");
              }
            }
          } else {
            router.push("/404");
          }
          return accessed;
        } catch (e) {
          console.log(e);
          showToast();
        }
      };

      firestore
        .collection("users")
        .where("username", "==", creator)
        .onSnapshot(
          (querySnapshot) => {
            querySnapshot.forEach((doc) => {
              setCreatorId(doc.id);
              setCreatorData(doc.data());
              if (eventId) {
                firestore
                  .collection("users")
                  .doc(doc.id)
                  .collection("events")
                  .doc(eventId)
                  .onSnapshot(
                    (doc) => {
                      if (doc.exists) {
                        checkAccess(
                          doc.data() && doc.data().host,
                          doc.data() && doc.data().isLive,
                          doc.data() && doc.data().date,
                          doc && doc.id
                        ).then((value) => {
                          if (value) {
                            setEventData(doc.data());
                          } else {
                            router.push("/404");
                          }
                        });
                      } else {
                        router.push("/home");
                      }
                    },
                    () => {
                      router.push("/404");
                    }
                  );

                setVoting(
                  firestore
                    .collection("users")
                    .doc(doc.id)
                    .collection("events")
                    .doc(eventId)
                    .collection("voting")
                );
              } else {
                router.push("/404");
              }
            });
            if (querySnapshot.size === 0) {
              router.push("/404");
            }
          },
          () => {
            router.push("/404");
          }
        );
    }
  }, [creator, eventId, user]);

  SubscriptionCheck(followings, creator, setIsSubscribed);

  return (
    <>
      <SEO
        title={`${eventData && eventData.title} - Prodicity`}
        description={""}
        keywords={""}
        image={""}
      />
      <Box
        align={"center"}
        w={"100%"}
        h={"100%"}
        overflowX={"hidden"}
        overflowY={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            width: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#777777",
            borderRadius: "10px",
          },
        }}
      >
        <EventPage
          userId={userId}
          userData={userData}
          eventId={eventId}
          eventData={eventData}
          voting={voting}
          creatorId={creatorId}
          creatorData={creatorData}
          isSubscribed={isSubscribed}
        />
      </Box>
    </>
  );
};

export default Event;

Event.getLayoutEvent = function PageLayout(page) {
  return <>{page}</>;
};
