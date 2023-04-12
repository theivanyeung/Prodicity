// FRONTEND IMPORTS

import { useEffect, useState, useContext } from "react";

import { Box, useToast } from "@chakra-ui/react";

import CreatorStudioHeadingAnalytics from "../../components/creatorstudio/sections/HeadingAnalytics";
import CreatorStudioMainAnalytics from "../../components/creatorstudio/sections/MainAnalytics";
import SEO from "../../components/SEO";

import { UserContext } from "../../utils/context";

// BACKEND IMPORTS

import {
  doc,
  where,
  collection,
  getDocs,
  query,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { firestore } from "../../utils/firebase";

const CreatorStudio = () => {
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

  const [events, setEvents] = useState([]);
  const [numFollowers, setNumFollowers] = useState(null);
  const [numEvents, setNumEvents] = useState(null);
  const [numAttendees, setNumAttendees] = useState(null);
  const [numMoney, setNumMoney] = useState(null);
  const [analytics, setAnalytics] = useState([]);

  // Retrieve array analytics

  useEffect(() => {
    const init = async () => {
      try {
        const q = query(
          collection(doc(firestore, "users", user.uid), "analytics"),
          orderBy("timestamp", "asc")
        );
        const querySnapshot = await getDocs(q);
        setAnalytics(querySnapshot.docs.map((doc) => doc.data()));
      } catch (e) {
        showToast();
      }
    };
    if (user) {
      init();
    }
  }, [user]);

  // Retrieve main analytics (followers, attendees)

  useEffect(() => {
    const init = async () => {
      try {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setNumFollowers(
            userSnap.data().followers ? userSnap.data().followers.length : 0
          );
          setNumAttendees(
            userSnap.data().numAttendees ? userSnap.data().numAttendees : 0
          );
          setNumMoney(userSnap.data().money ? userSnap.data().money : 0);
        }
      } catch (e) {
        showToast();
      }
    };
    if (user) {
      init();
    }
  }, [user]);

  // Retrieve events & main analytics (numEvents)

  useEffect(() => {
    if (user) {
      const creatorDoc = firestore.collection("users").doc(user.uid);

      const getAttendeesLength = async (id) => {
        try {
          const querySnapshot = await getDocs(
            collection(
              doc(doc(firestore, "users", user.uid), "events", id),
              "attendees"
            )
          );
          return querySnapshot.size;
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
            getAttendeesLength(doc.id).then((value) => {
              setEvents((prevEvents) => {
                return [
                  ...prevEvents,
                  {
                    id: doc.id,
                    data: doc.data(),
                    numAttendees: value,
                  },
                ];
              });
            });
          });
          setNumEvents(eventQuerySnapshot.size);
        } catch (e) {
          showToast();
        }
      };

      creatorDoc.onSnapshot((doc) => {
        if (doc.data()) {
          getEventCollection(doc.id);
        }
      });
    }
    setEvents([]);
  }, [user]);

  return (
    <>
      <SEO
        title={"Creator Studio - Prodicity"}
        description={""}
        keywords={""}
        image={""}
      />
      <Box
        w={"100%"}
        h={"100%"}
        align={"center"}
        overflowX={"hidden"}
        overflowY={"auto"}
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
        <CreatorStudioHeadingAnalytics
          numFollowers={numFollowers}
          numEvents={numEvents}
          numAttendees={numAttendees}
        />
        <CreatorStudioMainAnalytics
          events={events}
          setEvents={setEvents}
          numFollowers={numFollowers}
          numMoney={numMoney}
          numAttendees={numAttendees}
          analytics={analytics}
        />
      </Box>
    </>
  );
};

export default CreatorStudio;
