// FRONTEND IMPORTS

import { useState, useEffect, useContext } from "react";

import { Box, useToast } from "@chakra-ui/react";

import HomeEvents from "../../components/home/section/Events";
import SEO from "../../components/SEO";

import { UserContext } from "../../utils/context";

// BACKEND IMPORTS

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../utils/firebase";

const Home = () => {
  const { user } = useContext(UserContext);

  const toast = useToast();
  const showToast = () => {
    toast({
      description: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const [accessedEventCollection, setAccessdEventCollection] = useState([]);
  const [generalEventCollection, setGeneralEventCollection] = useState([]);

  useEffect(() => {
    const setAttendingState = async (creatorId, eventId) => {
      try {
        let vet = {
          size: 0,
          exists: false,
        };
        const attendeeRef = doc(
          doc(firestore, "users", creatorId),
          "events",
          eventId
        );
        const querySnapshot = await getDocs(
          collection(attendeeRef, "attendees")
        );
        vet.size = querySnapshot.size;
        querySnapshot.forEach((doc) => {
          if (doc.id === user.uid) {
            vet.exists = true;
          }
        });
        return vet;
      } catch (e) {
        showToast();
      }
    };

    const getEventDoc = async (creatorId, document) => {
      try {
        const eventRef = doc(
          doc(firestore, "users", creatorId),
          "events",
          document.id
        );
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          setAttendingState(creatorId, document.id).then((value) => {
            const event = [
              {
                id: eventSnap.id,
                data: eventSnap.data(),
                numAttendees: value.size,
              },
            ];
            if (value.exists) {
              setAccessdEventCollection((prevEvents) => [
                ...prevEvents,
                ...event,
              ]);
            } else {
              setGeneralEventCollection((prevEvents) => [
                ...prevEvents,
                ...event,
              ]);
            }
          });
        }
      } catch (e) {
        showToast();
      }
    };

    const getEventCollection = async (creatorId) => {
      try {
        const eventQ = query(
          collection(doc(firestore, "users", creatorId), "events"),
          where("isDraft", "==", false)
        );
        const eventQuerySnapshot = await getDocs(eventQ);
        eventQuerySnapshot.forEach((doc) => {
          getEventDoc(creatorId, doc);
        });
      } catch (e) {
        showToast();
      }
    };

    const getFollowingsCollection = async () => {
      try {
        if (user) {
          const userQ = query(
            collection(doc(firestore, "users", user.uid), "followings")
          );
          const userQuerySnapshot = await getDocs(userQ);
          userQuerySnapshot.forEach((doc) => {
            getEventCollection(doc.data().uid);
          });
        }
      } catch (e) {
        showToast();
      }
    };

    getFollowingsCollection();
  }, [user]);

  return (
    <>
      <SEO
        title={"Home - Prodicity"}
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
        <HomeEvents
          accessedEventCollection={accessedEventCollection}
          generalEventCollection={generalEventCollection}
        />
      </Box>
    </>
  );
};

export default Home;
