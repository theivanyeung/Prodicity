import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { getAuth } from "firebase/auth";
import { firestore } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const useUserData = () => {
  const router = useRouter();
  const auth = getAuth();

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [coverPhotoURL, setCoverPhotoURL] = useState(null);
  const [description, setDescription] = useState(null);
  const [numEvents, setNumEvents] = useState(null);
  const [followings, setFollowings] = useState(null);
  const [money, setMoney] = useState(null);
  const [eventIdInitializer, setEventIdInitializer] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
        setDisplayName(doc.data()?.displayName);
        setPhotoURL(doc.data()?.photoURL);
        setCoverPhotoURL(doc.data()?.coverPhotoURL);
        setDescription(doc.data()?.description);
        setNumEvents(doc.data()?.numEvents);
        setFollowings(ref.collection("followings"));
        setMoney(doc.data()?.money);
        setEventIdInitializer(doc.data()?.eventIdInitializer);
      });
    } else {
      setUsername(null);
      setDisplayName(null);
      setPhotoURL(null);
      setCoverPhotoURL(null);
      setDescription(null);
      setNumEvents(null);
      setFollowings(null);
      setMoney(null);
      setEventIdInitializer(null);
    }

    return unsubscribe;
  }, [user]);

  return {
    user,
    username,
    photoURL,
    displayName,
    coverPhotoURL,
    description,
    numEvents,
    followings,
    money,
    eventIdInitializer,
  };
};
