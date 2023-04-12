import Image from "next/image";
import { useRouter } from "next/router";

import {
  Flex,
  Heading,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import LayoutHeaderDrawer from "./modal/Drawer";

import { ProdicityLogo } from "../../../items";

const LayoutHeaderBase = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"1350px"}
      maxW={"90%"}
      h={"75px"}
      display={props.display}
    >
      <Flex alignItems={"center"} gap={"10px"}>
        <Image
          src={"/images/prodicity-logo.png"}
          alt={ProdicityLogo}
          width={22.5}
          height={40.17}
        />
        <Heading
          fontWeight={"medium"}
          fontSize={"xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          Prodicity
        </Heading>
      </Flex>

      <Flex alignItems={"center"} gap={"10px"}>
        <Button
          bgColor={"#FFFFFF"}
          borderRadius={"24px"}
          onClick={() => router.push("/register")}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            letterSpacing={"0.05em"}
          >
            Open Prodicity
          </Heading>
        </Button>

        <Button variant={"ghost"} colorScheme={"whiteAlpha"} onClick={onOpen}>
          <HamburgerIcon boxSize={"25px"} color={"#FFFFFF"} />
        </Button>
      </Flex>

      <Drawer
        placement={"right"}
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <LayoutHeaderDrawer onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default LayoutHeaderBase;
