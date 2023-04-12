// FRONTEND IMPORTS

import { useContext, useEffect, useState, useRef } from "react";

import {
  Flex,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import SettingsAccountPageEmailFull from "./Email/Full";
import SettingsAccountPageEmailBase from "./Email/Base";

// BACKEND IMPORTS

import { getAuth, reauthenticateWithCredential } from "firebase/auth";

import { firestore } from "../../../../utils/firebase";

const SettingsAccountPageEmail = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      my={"20px"}
      w={"90%"}
    >
      {/* FULL VIEW */}

      <SettingsAccountPageEmailFull
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

      <SettingsAccountPageEmailBase
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

export default SettingsAccountPageEmail;
