import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";

import GlobalLayoutNavBarFollowingBtn from "./components/FollowingBtn";

import { getAuth } from "firebase/auth";

import { firestore } from "../../../../../utils/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

const ListFollowings = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const ref = firestore
    .collection("users")
    .doc(user && user.uid)
    .collection("followings");
  const [querySnapshot] = useCollection(ref);

  return (
    <>
      {querySnapshot ? (
        querySnapshot?.docs.map((doc, index) => (
          <GlobalLayoutNavBarFollowingBtn
            key={index}
            pfp={doc.data().photoURL}
            alt={"Creator"}
            name={doc.data().displayName ? doc.data().displayName : doc.id}
            link={doc.id}
          />
        ))
      ) : (
        <Flex justifyContent={"center"} w={"100%"} h={"5%"}>
          <Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#A69C81"
            size="md"
          />
        </Flex>
      )}
    </>
  );
};

const GlobalLayoutNavBarFollowing = () => {
  return (
    <Box>
      {/* HEADER FULL VIEW */}

      <Flex
        alignItems={"center"}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <Box w={"185px"} ml={"15px"} align={"center"}>
          <Box w={"100%"} h={"0.5px"} bgColor={"#232323"} />
          <Heading
            w={"90%"}
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"sm"}
            lineHeight={"40px"}
            color={"#232323"}
          >
            FOLLOWING
          </Heading>
        </Box>
      </Flex>

      {/* HEADER BASE VIEW */}

      <Flex
        alignItems={"center"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "none",
        }}
      >
        <Box w={"55px"} ml={"5px"} align={"center"}>
          <Box w={"100%"} h={"0.5px"} bgColor={"#232323"} />
        </Box>
      </Flex>

      {/* HEADER MODAL VIEW */}

      <Flex
        alignItems={"center"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "flex",
        }}
      >
        <Box w={"185px"} ml={"15px"} align={"center"}>
          <Box w={"100%"} h={"0.5px"} bgColor={"#232323"} />
          <Heading
            w={"90%"}
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"sm"}
            lineHeight={"40px"}
            color={"#232323"}
          >
            FOLLOWING
          </Heading>
        </Box>
      </Flex>

      {/* FOLLOWINGS */}

      <Box>
        <ListFollowings />
      </Box>
    </Box>
  );
};

export default GlobalLayoutNavBarFollowing;
