// FRONTEND IMPORTS

import { useContext, useEffect, useState, useRef } from "react";

import { Flex } from "@chakra-ui/react";

import SettingsAccountPageUsernameFull from "./Username/Full";
import SettingsAccountPageUsernameBase from "./Username/Base";

import { UserContext } from "../../../../utils/context";

// BACKEND IMPORTS

import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";

import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "../../../../utils/firebase";

const SettingsAccountPageUsername = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { username } = useContext(UserContext);

  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [changed, setChanged] = useState(false);

  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    setUsernameState("");
    setPasswordState("");
    setChanged(false);
  }, [changed]);

  const checkUsernameExists = async (username) => {
    if (username.length >= 3) {
      const ref = firestore.doc(`usernames/${username}`);
      const { exists } = await ref.get();
      return !exists;
    }
  };

  const editFollowersCollection = async (follower) => {
    const followerRef = doc(
      doc(firestore, "users", follower),
      "followings",
      username
    );
    const followerSnap = await getDoc(followerRef);
    if (followerSnap.exists()) {
      await setDoc(
        doc(
          doc(firestore, "users", follower),
          "followings",
          usernameInputRef.current.value
        ),
        {
          displayName: followerSnap.data().displayName,
          photoURL: followerSnap.data().photoURL,
          uid: followerSnap.data().uid,
        }
      );
    }
    await deleteDoc(followerRef);
    setChanged(true);
  };

  const changeUsername = async () => {
    const userRef = doc(firestore, "users", user.uid);

    // Delete current username

    await deleteDoc(doc(firestore, "usernames", username));

    // Add new username doc in collection

    await setDoc(doc(firestore, "usernames", usernameInputRef.current.value), {
      uid: user.uid,
    });
    await updateDoc(userRef, {
      username: usernameInputRef.current.value,
    });

    // Edit followers collection

    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      userSnap.data().followers.forEach((follower) => {
        editFollowersCollection(follower);
      });
    }
  };

  const reauthenticate = (error) => {
    if (error === false) {
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordInputRef.current.value
      );
      reauthenticateWithCredential(user, credential)
        .then(() => {
          changeUsername();
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setPasswordState("Incorrect password");
          } else {
            setPasswordState("");
          }
          if (error.code === "auth/too-many-requests") {
            setPasswordState("Too many tries, wait a bit");
          } else {
            setEmailState("");
          }
        });
    }
  };

  const checkUsername = (username) => {
    let error = false;
    checkUsernameExists(username).then((value) => {
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

      if (username === "") {
        setUsernameState("Enter your username");

        error = true;
      } else if (value === false || !re.test(username)) {
        setUsernameState("Invalid username");

        error = true;
      } else {
        setUsernameState("");
      }

      reauthenticate(error);
    });
  };

  const submitHandler = () => {
    checkUsername(usernameInputRef.current.value.toLowerCase());
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      my={"20px"}
      w={"90%"}
    >
      {/* FULL VIEW */}
      <SettingsAccountPageUsernameFull
        usernameInputRef={usernameInputRef}
        passwordInputRef={passwordInputRef}
        usernameState={usernameState}
        passwordState={passwordState}
        username={username}
        submitHandler={submitHandler}
        changed={changed}
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "block",
          sm: "none",
          base: "none",
        }}
      />

      {/* BASE VIEW */}

      <SettingsAccountPageUsernameBase
        usernameInputRef={usernameInputRef}
        passwordInputRef={passwordInputRef}
        usernameState={usernameState}
        passwordState={passwordState}
        username={username}
        submitHandler={submitHandler}
        changed={changed}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "block",
          base: "block",
        }}
      />
    </Flex>
  );
};

export default SettingsAccountPageUsername;
