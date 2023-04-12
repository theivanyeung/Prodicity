// FRONTEND IMPORTS

import { useContext, useEffect, useState, useRef } from "react";

import { Button, Flex } from "@chakra-ui/react";

import SettingsAccountPagePasswordFull from "./Password/Full";
import SettingsAccountPagePasswordBase from "./Password/Base";

import { UserContext } from "../../../../utils/context";

// BACKEND IMPORTS

import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const SettingsAccountPagePassword = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [currentPasswordState, setCurrentPasswordState] = useState("");
  const [newPasswordState, setNewPasswordState] = useState("");
  const [confirmNewPasswordState, setConfirmNewPasswordState] = useState("");
  const [changed, setChanged] = useState(false);

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  useEffect(() => {
    setCurrentPasswordState("");
    setNewPasswordState("");
    setConfirmNewPasswordState("");
    setChanged(false);
  }, [changed]);

  const changePassword = () => {
    let error = false;
    if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
      setConfirmNewPasswordState("Unmatching passwords");
      error = true;
    } else {
      setConfirmNewPasswordState("");
    }
    if (confirmNewPasswordRef.current.value < 6) {
      setNewPasswordState("Password should be at least 6 characters");
      error = true;
    } else {
      setNewPasswordState("");
    }
    if (error === false) {
      updatePassword(user, confirmNewPasswordRef.current.value)
        .then(() => {
          setChanged(true);
        })
        .catch((error) => {});
    }
  };

  const submitHandler = () => {
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPasswordRef.current.value
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        changePassword();
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setCurrentPasswordState("Incorrect password");
        } else {
          setCurrentPasswordState("");
        }
        if (error.code === "auth/too-many-requests") {
          setCurrentPasswordState("Too many tries, wait a bit");
        } else {
          setCurrentPasswordState("");
        }
      });
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      my={"20px"}
      w={"90%"}
    >
      {/* FULL VIEW */}

      <SettingsAccountPagePasswordFull
        currentPasswordRef={currentPasswordRef}
        newPasswordRef={newPasswordRef}
        confirmNewPasswordRef={confirmNewPasswordRef}
        currentPasswordState={currentPasswordState}
        newPasswordState={newPasswordState}
        confirmNewPasswordState={confirmNewPasswordState}
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

      <SettingsAccountPagePasswordBase
        currentPasswordRef={currentPasswordRef}
        newPasswordRef={newPasswordRef}
        confirmNewPasswordRef={confirmNewPasswordRef}
        currentPasswordState={currentPasswordState}
        newPasswordState={newPasswordState}
        confirmNewPasswordState={confirmNewPasswordState}
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

export default SettingsAccountPagePassword;
