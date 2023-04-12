// FRONTEND IMPORTS

import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/router";

import { Box, useToast } from "@chakra-ui/react";

import CreatorStudioProfile from "../../components/profile/sections/Profile";
import CreatorStudioEvents from "../../components/profile/sections/Events";
import SEO from "../../components/SEO";

import { UserContext } from "../../utils/context";

// BACKEND IMPORTS

import { doc, where, collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../../utils/firebase";

import { SubscriptionCheck } from "../../components/server";

const CreatorStudio = () => {
  const { user, username, followings } = useContext(UserContext);

  const toast = useToast();
  const showToast = () => {
    toast({
      description: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const [creatorData, setCreatorData] = useState(null);
  const [creatorId, setCreatorId] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(null);

  const [events, setEvents] = useState([]);

  const router = useRouter();
  const search = router.query.creator;

  useEffect(() => {
    if (user) {
      const creatorDoc = firestore
        .collection("users")
        .where("username", "==", search);

      // STUDIO EVENTS

      const getAttendeesLength = async (userId, eventId) => {
        try {
          const querySnapshot = await getDocs(
            collection(
              doc(doc(firestore, "users", userId), "events", eventId),
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
            getAttendeesLength(user.uid, doc.id).then((value) => {
              setEvents((prevEvents) => [
                ...prevEvents,
                {
                  id: doc.id,
                  data: doc.data(),
                  numAttendees: value,
                },
              ]);
            });
          });
        } catch (e) {
          showToast();
        }
      };

      // STUDIO PROFILE

      creatorDoc.get().then((querySnapshot) => {
        if (querySnapshot.docs.length !== 0) {
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              setCreatorId(doc.id);
              setCreatorData(doc.data());
              getEventCollection(doc.id);
            }
          });
        } else {
          router.push("/404");
        }
      });
    }
    setEvents([]);
  }, [user, search]);

  SubscriptionCheck(followings, search, setIsSubscribed);

  return (
    <>
      <SEO
        title={`${
          creatorData
            ? creatorData.displayName
              ? creatorData.displayName
              : creatorData.username
            : search && search
        } - Prodicity`}
        description={""}
        keywords={""}
        image={""}
      />
      <Box
        w={"100%"}
        h={"100%"}
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
        {creatorData ? (
          <CreatorStudioProfile
            search={search}
            creatorId={creatorId}
            currentUsername={username}
            creatorData={creatorData}
            photoURL={creatorData.photoURL}
            coverPhotoURL={creatorData.coverPhotoURL}
            displayName={creatorData.displayName}
            username={creatorData.username}
            numFollowers={creatorData.followers.length}
            description={creatorData.description}
            isSubscribed={isSubscribed}
          />
        ) : (
          <CreatorStudioProfile
            stateHandler={null}
            search={null}
            creatorId={null}
            currentUsername={null}
            creatorData={null}
            photoURL={null}
            coverPhotoURL={null}
            displayName={null}
            username={null}
            numFollowers={null}
            description={null}
            isSubscribed={null}
          />
        )}
        <CreatorStudioEvents user={user} events={events} />
      </Box>
    </>
  );
};

export default CreatorStudio;
