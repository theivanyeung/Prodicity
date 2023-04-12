// FRONTEND IMPORTS

import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useToast } from "@chakra-ui/react";

import validator from "validator";

import RegisterLayout from "../../components/register/layout/Layout";
import RegisterPageDesktopView from "../../components/register/page/DesktopView";
import RegisterPageTabletView from "../../components/register/page/TabletView";
import RegisterPageMobileView from "../../components/register/page/MobileView";
import GlobalLoading from "../../components/global/pages/Loading";
import SEO from "../../components/SEO";

import {
  REGISTER_SEO_TITLE,
  REGISTER_SEO_DESCRIPTION,
  REGISTER_SEO_KEYWORDS,
  REGISTER_SEO_IMAGE,
} from "../../components/constants";

// BACKEND IMPORTS

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../utils/firebase";
import firebase from "firebase/compat/app";

const Register = () => {
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

  const [month, setMonth] = useState("Select");
  const [numMonth, setNumMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("Select");

  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [dateState, setDateState] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/home");
      } else {
        setLoading(false);
      }
    });
  }, []);

  const submitRegisterHandler = (email, username, password) => {
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
    } else if (password.length < 6) {
      setPasswordState("Password should be at least 6 characters");
      error = true;
    } else {
      setPasswordState("");
    }

    if (month === "Select" || day === "" || year === "Select") {
      setDateState("Add your DoB");
      error = true;
    } else if (!validator.isDate(`${year}/${numMonth}/${day}`)) {
      setDateState("Invalid date");
      error = true;
    } else {
      setDateState("");
    }
    return error;
  };

  const createUser = async (email, username, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          addUserData(email, username, user);
          router.push("/home");
        })
        .catch(() => {
          setEmailState("Email is already registered");
        });
    } catch (e) {
      showToast();
    }
  };

  const addUserData = async (email, username, user) => {
    try {
      await setDoc(doc(firestore, "emails", email), {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${username}`);

      const batch = firestore.batch();
      batch.set(userDoc, {
        username: username,
        displayName: "",
        dateOfBirth: `${numMonth}/${day}/${year}`,
        eventIdInitializer: 0,
        numEvents: 0,
        description: "",
        coverPhotoURL:
          "https://firebasestorage.googleapis.com/v0/b/prodicity-6e1f4.appspot.com/o/default%2Fcover.png?alt=media&token=a13111cb-9773-4653-ac29-64f81cdececf",
        coverPhotoName: null,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/prodicity-6e1f4.appspot.com/o/default%2Fprofile-pic.png?alt=media&token=83f94794-976a-4500-a941-d89ab92082db",
        photoName: null,
        followers: [],
        money: 0,
        totalAttendees: 0,
      });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    } catch (e) {
      showToast();
    }
  };

  return (
    <>
      <SEO
        title={REGISTER_SEO_TITLE}
        description={REGISTER_SEO_DESCRIPTION}
        keywords={REGISTER_SEO_KEYWORDS}
        image={REGISTER_SEO_IMAGE}
      />
      {loading ? (
        <GlobalLoading />
      ) : (
        <RegisterLayout>
          <RegisterPageDesktopView
            createUser={createUser}
            submitRegisterHandler={submitRegisterHandler}
            month={month}
            day={day}
            year={year}
            setMonth={setMonth}
            setNumMonth={setNumMonth}
            setDay={setDay}
            setYear={setYear}
            emailState={emailState}
            passwordState={passwordState}
            dateState={dateState}
            display={{
              xxl: "flex",
              xl: "none",
              lg: "none",
              md: "none",
              sm: "none",
              base: "none",
            }}
          />
          <RegisterPageTabletView
            createUser={createUser}
            submitRegisterHandler={submitRegisterHandler}
            month={month}
            day={day}
            year={year}
            setMonth={setMonth}
            setNumMonth={setNumMonth}
            setDay={setDay}
            setYear={setYear}
            emailState={emailState}
            passwordState={passwordState}
            dateState={dateState}
            display={{
              xxl: "none",
              xl: "block",
              lg: "block",
              md: "block",
              sm: "none",
              base: "none",
            }}
          />
          <RegisterPageMobileView
            createUser={createUser}
            submitRegisterHandler={submitRegisterHandler}
            month={month}
            day={day}
            year={year}
            setMonth={setMonth}
            setNumMonth={setNumMonth}
            setDay={setDay}
            setYear={setYear}
            emailState={emailState}
            passwordState={passwordState}
            dateState={dateState}
            display={{
              xxl: "none",
              xl: "none",
              lg: "none",
              md: "none",
              sm: "block",
              base: "block",
            }}
          />
        </RegisterLayout>
      )}
    </>
  );
};

export default Register;

Register.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
