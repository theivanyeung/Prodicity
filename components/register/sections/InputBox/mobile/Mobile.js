// FRONTEND IMPORTS

import { useState, useRef, useEffect } from "react";

import Link from "next/link";

import {
  Box,
  Heading,
  Flex,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

import RegisterHeader from "../../Header";
import RegisterInputBoxMobileCredentials from "./Credential";
import RegisterInputBoxMobileMonth from "./Month";
import RegisterInputBoxMobileDay from "./Day";
import RegisterInputBoxMobileYear from "./Year";
import RegisterInputBoxMobileCreatePageForm from "./MobileCreatePageForm";
import RegisterInputBoxMobileVerify from "./MobileVerify";

// BACKEND IMPORTS

import { firestore } from "../../../../../utils/firebase";

const RegisterInputBoxMobile = (props) => {
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [form, setForm] = useState(true);
  const [usernameState, setUsernameState] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState();
  const [codeInput, setCodeInput] = useState("");
  const [codeState, setCodeState] = useState("");

  const toast = useToast();
  const showToast = () => {
    toast({
      description: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    setCode(Math.floor(100000 + Math.random() * 900000));
  }, []);

  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (props.emailState === "Email is already registered") {
      setVerify(false);
      setLoading(false);
    }
  }, [props.emailState]);

  const createUser = () => {
    if (codeInput == code) {
      setLoading(true);
      props.createUser(email, username, password);
    } else {
      setCodeState("Invalid code");
    }
  };

  const submitRegisterHandler = async () => {
    if (
      props.submitRegisterHandler(
        emailInputRef.current.value,
        username,
        passwordInputRef.current.value,
        props.month,
        props.year,
        props.day,
        props.numMonth,
        props.user
      ) === false
    ) {
      setLoading(true);
      setEmail(emailInputRef.current.value);
      setPassword(passwordInputRef.current.value);
      try {
        await fetch("../api/verification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInputRef.current.value,
            code: code,
          }),
        });
      } catch (error) {
        showToast();
      }
      setLoading(false);
      setVerify(true);
    }
  };

  const checkUsernameExists = async (username) => {
    if (username.length >= 3) {
      const ref = firestore.doc(`usernames/${username}`);
      const { exists } = await ref.get();
      return !exists;
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

      if (error === false) {
        setForm(!form);
      }
    });
  };

  const selectNextForm = () => {
    checkUsername(usernameInputRef.current.value.toLowerCase());
    setUsername(usernameInputRef.current.value.toLowerCase());
  };

  const resendCode = async () => {
    const tempCode = Math.floor(100000 + Math.random() * 900000);
    setCode(tempCode);
    try {
      await fetch("../api/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: tempCode,
        }),
      });
    } catch (error) {
      showToast();
    }
  };

  return (
    <>
      {loading ? (
        <Box w={"100vw"} h={"100vh"} mt={"5vh"} mb={"15vh"} align={"center"}>
          <RegisterHeader />
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100vw"}
            h={"calc(80vh - 120px)"}
          >
            <Spinner size={"lg"} />
          </Flex>
        </Box>
      ) : verify ? (
        <RegisterInputBoxMobileVerify
          codeInput={codeInput}
          setCodeInput={setCodeInput}
          codeState={codeState}
          createUser={createUser}
          resendCode={resendCode}
        />
      ) : form ? (
        <RegisterInputBoxMobileCreatePageForm
          usernameInputRef={usernameInputRef}
          usernameState={usernameState}
          selectNextForm={selectNextForm}
        />
      ) : (
        <Box w={"100vw"} h={"100vh"} mb={"15vh"} align={"center"}>
          <Flex
            justifyContent={"center"}
            alignItems={"flex-start"}
            mt={"10px"}
            h={"40px"}
          >
            <Box as={"button"} onClick={() => setForm(!form)}>
              <ArrowLeftIcon />
            </Box>
          </Flex>

          <RegisterHeader />

          <Heading
            mb={"42px"}
            fontWeight={"medium"}
            fontSize={"xl"}
            letterSpacing={"0.1em"}
          >
            Create your account
          </Heading>

          <RegisterInputBoxMobileCredentials
            emailInputRef={emailInputRef}
            passwordInputRef={passwordInputRef}
            emailState={props.emailState}
            passwordState={props.passwordState}
          />

          <Box w={"80%"} align={"left"}>
            <Heading
              ml={"21px"}
              fontWeight={"medium"}
              fontSize={"lg"}
              lineHeight={"34px"}
              letterSpacing={"0.1em"}
            >
              Date of Birth
            </Heading>

            <Flex justifyContent={"space-between"}>
              <RegisterInputBoxMobileMonth
                month={props.month}
                setMonth={props.setMonth}
                setNumMonth={props.setNumMonth}
              />

              <RegisterInputBoxMobileDay
                day={props.day}
                setDay={props.setDay}
              />

              <RegisterInputBoxMobileYear
                year={props.year}
                setYear={props.setYear}
              />
            </Flex>
          </Box>
          <Flex alignItems={"center"} mb={"12px"} w={"70%"} h={"24px"}>
            <Heading
              fontWeight={"normal"}
              fontSize={"xs"}
              letterSpacing={"0.05em"}
              color={"#FF5858"}
            >
              {props.dateState}
            </Heading>
          </Flex>

          <Button
            mb={"15px"}
            w={"80%"}
            h={"50px"}
            bg={"#F4CE96"}
            boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
            borderRadius={"24px"}
            _hover={{ bg: "#FAD69B" }}
            onClick={submitRegisterHandler}
          >
            Create!
          </Button>

          <Heading
            mb={"20px"}
            fontWeight={"normal"}
            fontSize={"10px"}
            letterSpacing={"0.05em"}
          >
            By signing up, you agree to Prodicity&apos;s{" "}
            <a href={"/c/tos"}>Terms of Service</a> &{" "}
            <a href={"/c/tos"}>Privacy Policy</a>.
          </Heading>

          <style jsx>{`
            a {
              color: #439df6;
            }
            a:hover {
              text-decoration: underline;
            }
          `}</style>

          <Link href="/login">
            <Button
              mb={"10vh"}
              fontWeight={"normal"}
              fontSize={"md"}
              letterSpacing={"0.1em"}
              color={"#000000"}
              variant={"link"}
            >
              Already have an account?
            </Button>
          </Link>
        </Box>
      )}
    </>
  );
};

export default RegisterInputBoxMobile;
