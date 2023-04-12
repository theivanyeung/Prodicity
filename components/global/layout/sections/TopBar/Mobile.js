import React from "react";

import {
  Flex,
  Drawer,
  Button,
  Box,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import GlobalLayoutTopBarEnd from "./End";
import GlobalLayoutNavBarHeader from "../NavBar/Header";
import GlobalLayoutNavBarPages from "../NavBar/Pages";

import { HamburgerIcon } from "@chakra-ui/icons";

const GlobalLayoutBarMobile = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.createRef();

  return (
    <Flex w={props.w} display={props.display}>
      <Flex justifyContent={"center"} alignItems={"center"} w={"20%"}>
        <Button ref={btnRef} onClick={onOpen}>
          <HamburgerIcon />
        </Button>
        <Drawer
          isOpen={isOpen}
          placement={"left"}
          onClose={onClose}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <Box align={"center"} h={"100%"} bgColor={"#F6F9FB"}>
              <DrawerCloseButton />
              <GlobalLayoutNavBarHeader />
              <GlobalLayoutNavBarPages onClose={onClose} />
            </Box>
          </DrawerContent>
        </Drawer>
      </Flex>
      <GlobalLayoutTopBarEnd w={"80%"} />
    </Flex>
  );
};

export default GlobalLayoutBarMobile;
