import { useState, useContext } from "react";
import { Flex, Box, Heading, Button, Input, Spinner } from "@chakra-ui/react";

import validator from "validator";

import { UserContext } from "../../../../../../utils/context";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { firestore } from "../../../../../../utils/firebase";

const SettingsAccountPageModalEmailChangeEmail = (props) => {
  const { user } = useContext(UserContext);

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [changed, setChanged] = useState(false);

  const updateEmailDocs = async () => {
    const emailRef = doc(firestore, "emails", emailInput);
    const emailSnap = await getDoc(emailRef);
    if (!emailSnap.exists()) {
      await setDoc(emailRef, {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }

    props.onClose();
  };

  const changeEmail = async (email) => {
    setChanged(true);
    updateEmail(user, email)
      .then(() => {
        updateEmailDocs();
      })
      .catch((error) => {});
  };

  const reauthenticate = (error, email, password) => {
    if (error === false) {
      const credential = EmailAuthProvider.credential(user.email, password);
      reauthenticateWithCredential(user, credential)
        .then(() => {
          changeEmail(email);
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setPasswordState("Incorrect password");
          } else if (error.code === "auth/too-many-requests") {
            setPasswordState("Too many tries, wait a bit");
          } else {
            setPasswordState(error.code);
          }
        });
    }
  };

  const checkEmailExists = async (email) => {
    const ref = firestore.doc(`emails/${email}`);
    const { exists } = await ref.get();
    return !exists;
  };

  const checkEmail = (email, password) => {
    let error = false;
    checkEmailExists(email).then((value) => {
      if (email.length === 0) {
        setEmailState("Enter your email");
        error = true;
      } else if (!validator.isEmail(email) || !value) {
        setEmailState("Invalid email");
        error = true;
      } else {
        setEmailState("");
      }

      reauthenticate(error, email, password);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    checkEmail(emailInput, passwordInput);
  };

  return (
    <>
      {changed ? (
        <Flex justifyContent={"center"} alignItems={"center"} h={"375px"}>
          <Spinner size={"lg"} color={"#FFE1B5"} />
        </Flex>
      ) : (
        <Flex justifyContent={"center"} h={"375px"}>
          <Box align={"center"} w={"90%"}>
            <Flex alignItems={"center"} h={"50px"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"20px"}
                letterSpacing={"0.1em"}
              >
                Change Email
              </Heading>
            </Flex>

            <Heading
              fontWeight={"medium"}
              fontSize={"xs"}
              lineHeight={"17px"}
              letterSpacing={"0.1em"}
              color={"#979797"}
            >
              To change your email, enter a new email and your current password.
            </Heading>

            <form onSubmit={submitHandler}>
              <Box align={"left"} my={"25px"}>
                <Heading
                  ml={"20px"}
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"24px"}
                  letterSpacing={"0.1em"}
                >
                  New Email
                </Heading>
                <Input
                  value={emailInput}
                  type={"email"}
                  borderRadius={"8px"}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <Heading
                  ml={"20px"}
                  mt={"5px"}
                  h={"12px"}
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                  color={"#FF5858"}
                >
                  {emailState}
                </Heading>
              </Box>

              <Box align={"left"} my={"25px"}>
                <Heading
                  ml={"20px"}
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"24px"}
                  letterSpacing={"0.1em"}
                >
                  Current Password
                </Heading>
                <Input
                  value={passwordInput}
                  type={"password"}
                  borderRadius={"8px"}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <Heading
                  ml={"20px"}
                  mt={"5px"}
                  h={"12px"}
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                  color={"#FF5858"}
                >
                  {passwordState}
                </Heading>
              </Box>

              <Box align={"right"} w={"90%"}>
                <Button
                  type={"submit"}
                  background={"#FFD39F"}
                  borderRadius={"12px"}
                >
                  Next
                </Button>
              </Box>
            </form>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default SettingsAccountPageModalEmailChangeEmail;
