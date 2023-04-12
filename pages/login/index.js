// FRONTEND IMPORTS

import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useToast } from "@chakra-ui/react";

import validator from "validator";

import LoginLayout from "../../components/login/layout/Layout";
import LoginPageDesktopView from "../../components/login/page/DesktopView";
import LoginPageTabletView from "../../components/login/page/TabletView";
import LoginPageMobileView from "../../components/login/page/MobileView";
import GlobalLoading from "../../components/global/pages/Loading";
import SEO from "../../components/SEO";

import {
  LOGIN_SEO_TITLE,
  LOGIN_SEO_DESCRIPTION,
  LOGIN_SEO_KEYWORDS,
  LOGIN_SEO_IMAGE,
} from "../../components/constants";

// BACKEND IMPORTS

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

const Login = () => {
  const router = useRouter();
  const auth = getAuth();

  const toast = useToast();
  const showToast = () => {
    toast({
      description: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const [loading, setLoading] = useState(true);

  const [hasForgotPassword, setHasForgotPassword] = useState(false);
  const [forgotInput, setForgotInput] = useState("");
  const [forgotState, setForgotState] = useState("");

  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home");
      } else {
        setLoading(false);
      }
    });
  }, []);

  const submitLoginHandler = async (email, password) => {
    if (errorHandler(email, password) === false) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            router.push("/home");
          })
          .catch((error) => {
            if (error.code === "auth/user-not-found") {
              setEmailState("Email is not LOGINed");
            } else {
              setEmailState("");
            }
            if (error.code === "auth/wrong-password") {
              setPasswordState("Incorrect password");
            } else {
              setPasswordState("");
            }
            if (error.code === "auth/too-many-requests") {
              setEmailState("Too many tries, wait a bit");
            } else {
              setEmailState("");
            }
          });
      } catch (e) {
        showToast();
      }
    }
  };

  const errorHandler = (email, password) => {
    let error = false;
    if (email === "") {
      setEmailState("Enter your email");
      error = true;
    } else if (!validator.isEmail(email)) {
      setEmailState("Invalid email");
      error = true;
    } else {
      setEmailState("");
    }

    if (password === "") {
      setPasswordState("Enter your password");
      error = true;
    } else {
      setPasswordState("");
    }
    return error;
  };

  const emailErrorHandler = (email) => {
    let error = false;
    if (email === "") {
      setForgotState("Enter your email");
      error = true;
    } else if (!validator.isEmail(email)) {
      setForgotState("Invalid email");
      error = true;
    } else {
      setForgotState("");
    }
    return error;
  };

  const submitForgotPasswordHandler = (e) => {
    e.preventDefault();

    if (emailErrorHandler(forgotInput) === false) {
      sendPasswordResetEmail(auth, forgotInput)
        .then(() => {
          setHasForgotPassword(false);
          toast({
            title: "Check your email for instructions",
            description: "If you can't find the email, check your spam",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch(() => {
          setForgotState("Error! :(");
        });
    }
  };

  return (
    <>
      <SEO
        title={LOGIN_SEO_TITLE}
        description={LOGIN_SEO_DESCRIPTION}
        keywords={LOGIN_SEO_KEYWORDS}
        image={LOGIN_SEO_IMAGE}
      />
      {loading ? (
        <GlobalLoading />
      ) : (
        <LoginLayout>
          <LoginPageDesktopView
            submitLoginHandler={submitLoginHandler}
            errorHandler={errorHandler}
            emailState={emailState}
            passwordState={passwordState}
            forgotInput={forgotInput}
            setForgotInput={setForgotInput}
            forgotState={forgotState}
            hasForgotPassword={hasForgotPassword}
            setHasForgotPassword={setHasForgotPassword}
            submitForgotPasswordHandler={submitForgotPasswordHandler}
            display={{
              xxl: "flex",
              xl: "none",
              lg: "none",
              md: "none",
              sm: "none",
              base: "none",
            }}
          />
          <LoginPageTabletView
            submitLoginHandler={submitLoginHandler}
            errorHandler={errorHandler}
            emailState={emailState}
            passwordState={passwordState}
            forgotInput={forgotInput}
            setForgotInput={setForgotInput}
            forgotState={forgotState}
            hasForgotPassword={hasForgotPassword}
            setHasForgotPassword={setHasForgotPassword}
            submitForgotPasswordHandler={submitForgotPasswordHandler}
            display={{
              xxl: "none",
              xl: "block",
              lg: "block",
              md: "block",
              sm: "none",
              base: "none",
            }}
          />
          <LoginPageMobileView
            submitLoginHandler={submitLoginHandler}
            errorHandler={errorHandler}
            emailState={emailState}
            passwordState={passwordState}
            forgotInput={forgotInput}
            setForgotInput={setForgotInput}
            forgotState={forgotState}
            hasForgotPassword={hasForgotPassword}
            setHasForgotPassword={setHasForgotPassword}
            submitForgotPasswordHandler={submitForgotPasswordHandler}
            display={{
              xxl: "none",
              xl: "none",
              lg: "none",
              md: "none",
              sm: "block",
              base: "block",
            }}
          />
        </LoginLayout>
      )}
    </>
  );
};

export default Login;

Login.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
