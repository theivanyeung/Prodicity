// FRONTEND IMPORTS

import { useContext } from "react";

import { useRouter } from "next/router";

import { Flex, useToast } from "@chakra-ui/react";

import GlobalLayoutTopBarEndDesktop from "./End/Desktop";
import GlobalLayoutTopBarEndTablet from "./End/Tablet";
import GlobalLayoutTopBarEndMobile from "./End/Mobile";

// BACKEND IMPORTS

import { getAuth, signOut } from "firebase/auth";
import { UserContext } from "../../../../../utils/context";

const GlobalLayoutTopBarEnd = (props) => {
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

  const { user, username, photoURL, displayName, money } =
    useContext(UserContext);

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      showToast();
    }
  };

  const clickHandler = (settings, link) => {
    if (settings === "Logout") {
      signOutUser();
      router.push("/login");
    } else {
      router.push(link);
    }
  };

  return (
    <Flex w={props.w} display={props.display}>
      <GlobalLayoutTopBarEndDesktop
        user={user}
        username={username}
        photoURL={photoURL}
        displayName={displayName}
        money={money}
        clickHandler={clickHandler}
        display={{
          xxl: "flex",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <GlobalLayoutTopBarEndTablet
        user={user}
        username={username}
        photoURL={photoURL}
        displayName={displayName}
        money={money}
        clickHandler={clickHandler}
        display={{
          xxl: "none",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "none",
          base: "none",
        }}
      />
      <GlobalLayoutTopBarEndMobile
        user={user}
        username={username}
        photoURL={photoURL}
        displayName={displayName}
        money={money}
        clickHandler={clickHandler}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "flex",
          base: "flex",
        }}
      />
    </Flex>
  );
};

export default GlobalLayoutTopBarEnd;
