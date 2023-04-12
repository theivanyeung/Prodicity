import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  increment,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../utils/firebase";
import firebase from "firebase/compat/app";

// SUBSCRIPTION CHECK

export const SubscriptionCheck = (followings, username, setIsSubscribed) => {
  if (followings) {
    followings.doc(username).onSnapshot((doc) => {
      if (doc.exists) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    });
  }
};

// SUBSCRIPTION HANDLER

const SubscriptionHandlerCreatorDoc = async (
  isSubscribed,
  user,
  creatorId,
  creatorData
) => {
  const currentUserDoc = doc(firestore, "users", user.uid);
  const subscribeUserDoc = doc(firestore, "users", creatorId);
  if (user.uid !== creatorId) {
    if (isSubscribed) {
      await deleteDoc(doc(currentUserDoc, "followings", creatorData.username));
      await updateDoc(subscribeUserDoc, {
        followers: arrayRemove(user.uid),
      });
    } else {
      await setDoc(doc(currentUserDoc, "followings", creatorData.username), {
        displayName: creatorData.displayName,
        photoURL: creatorData.photoURL,
        uid: creatorId,
      });
      await updateDoc(subscribeUserDoc, {
        followers: arrayUnion(user.uid),
      });
    }
  }
};

export const SubscriptionHandler = async (
  isSubscribed,
  creatorId,
  creatorData
) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      SubscriptionHandlerCreatorDoc(isSubscribed, user, creatorId, creatorData);
    }
  });
};

// CREATE EVENT

export const CreateEventDraft = async (userId) => {
  const docRef = doc(firestore, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    firestore
      .collection("users")
      .doc(userId)
      .collection("events")
      .doc(`${docSnap.data().eventIdInitializer + 1}`)
      .set({
        thumbnailURL:
          "https://firebasestorage.googleapis.com/v0/b/prodicity-6e1f4.appspot.com/o/default%2Fthumbnail.png?alt=media&token=3ead23b7-88b6-492c-8f64-94b55b1a30e3",
        thumbnailName: null,
        title: null,
        date: null,
        isLive: false,
        host: userId,
        description: null,
        price: null,
        isFree: null,
        annoucement: true,
        annoucementCooldown: 0,
        chatCooldown: 0,
        isDraft: true,
        viewers: 0,
      });
    firestore
      .collection("users")
      .doc(userId)
      .collection("events")
      .doc(`${docSnap.data().eventIdInitializer + 1}`)
      .collection("chat")
      .add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        message: "Start of the chat!",
        username: "Prod",
      });
    await updateDoc(docRef, {
      eventIdInitializer: increment(1),
    });
  }
};

export const DeleteEventDraft = async (userId, eventId) => {
  const batch = firestore.batch();

  const eventRef = doc(doc(firestore, "users", userId), "events", `${eventId}`);
  const eventSnap = await getDoc(eventRef);

  if (eventSnap.exists()) {
    // delete subcollections

    const chatQ = query(collection(eventRef, "chat"));
    const chatQuerySnapshot = await getDocs(chatQ);
    chatQuerySnapshot.forEach((chatDoc) => {
      const chatRef = doc(eventRef, "chat", chatDoc.id);
      batch.delete(chatRef);
    });

    const votingQ = query(collection(eventRef, "voting"));
    const votingQuerySnapshot = await getDocs(votingQ);
    votingQuerySnapshot.forEach((votingDoc) => {
      const votingRef = doc(eventRef, "voting", votingDoc.id);
      batch.delete(votingRef);
    });

    const annoucementQ = query(collection(eventRef, "annoucement"));
    const annoucementQuerySnapshot = await getDocs(annoucementQ);
    annoucementQuerySnapshot.forEach((annoucementDoc) => {
      const annoucementRef = doc(eventRef, "annoucement", annoucementDoc.id);
      batch.delete(annoucementRef);
    });

    const attendeesQ = query(collection(eventRef, "attendees"));
    const attendeesQuerySnapshot = await getDocs(attendeesQ);
    attendeesQuerySnapshot.forEach((attendeesDoc) => {
      const attendeesRef = doc(eventRef, "attendees", attendeesDoc.id);
      batch.delete(attendeesRef);
    });

    // delete image from storage

    if (eventSnap.data().thumbnailName) {
      const imageRef = ref(
        storage,
        `${userId}/events/${eventId}/thumbnail/${
          eventSnap.data().thumbnailName
        }`
      );
      deleteObject(imageRef)
        .then(() => {})
        .catch((error) => {});
    }

    batch.delete(eventRef);

    return await batch.commit();
  }
};

// JOIN EVENT HANDLER

export const JoinEventHandler = async (hostId, eventId, userId) => {
  const attendeeRef = doc(
    doc(doc(firestore, "users", hostId), "events", eventId),
    "attendees",
    userId
  );
  await setDoc(attendeeRef, {
    hasVoted: false,
    hasInvite: false,
  });
};
