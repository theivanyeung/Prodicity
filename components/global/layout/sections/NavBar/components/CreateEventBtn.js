import { useState, useContext } from "react";

import Image from "next/image";

import {
  Flex,
  Box,
  Button,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  List,
  ListItem,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";

import GlobalCreateEventFixedFirst from "../../../../modal/CreateEvent/Fixed/First";
import GlobalCreateEventResponsiveFirst from "../../../../modal/CreateEvent/Responsive/First";

import { UserContext } from "../../../../../../utils/context";

import { CreateEventDraft, DeleteEventDraft } from "../../../../../server";

const GlobalLayoutNavBarCreateEventBtn = () => {
  const { user, eventIdInitializer } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState(true);

  return (
    <>
      {/** FULL VIEW */}

      <Button
        my={"5px"}
        ml={"5px"}
        w={"205px"}
        variant={"ghost"}
        bgColor={"#FFECC8"}
        _hover={{ bg: "#FAD69B" }}
        onClick={() => {
          setModal(true);
          if (user) {
            onOpen();
            CreateEventDraft(user.uid);
          }
        }}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <Flex justifyContent={"flex-start"} alignItems={"center"} w={"25%"}>
          <Image
            src={"/images/event-icon.png"}
            alt={"Event Icon"}
            width={20}
            height={20}
          />
        </Flex>
        <Heading
          w={"75%"}
          textAlign={"left"}
          fontWeight={"medium"}
          fontSize={"md"}
          color={"#232323"}
        >
          Create Event
        </Heading>
      </Button>

      {/** BASE VIEW */}

      <Button
        my={"5px"}
        ml={"5px"}
        w={"55px"}
        variant={"ghost"}
        bgColor={"#FFECC8"}
        _hover={{ bg: "#FAD69B" }}
        onClick={() => {
          setModal(false);
          if (user) {
            onOpen();
            CreateEventDraft(user.uid);
          }
        }}
        display={{
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      >
        <Flex justifyContent={"flex-start"} alignItems={"center"}>
          <Image
            src={"/images/event-icon.png"}
            alt={"Event Icon"}
            width={20}
            height={20}
          />
        </Flex>
      </Button>

      {/** MODAL */}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          DeleteEventDraft(user.uid, eventIdInitializer);
          onClose();
        }}
        closeOnOverlayClick={false}
        size={modal ? "2xl" : "full"}
      >
        <ModalOverlay />
        <ModalContent
          boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
          borderRadius={"12px"}
        >
          <ModalCloseButton
            boxSize={"30px"}
            bgColor={" rgba(255, 255, 255, 0.1)"}
            borderRadius={"100px"}
            _hover={{
              bgColor: "rgba(255, 255, 255, 0.5)",
            }}
          />
          {modal ? (
            <GlobalCreateEventFixedFirst onClose={onClose} />
          ) : (
            <GlobalCreateEventResponsiveFirst onClose={onClose} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default GlobalLayoutNavBarCreateEventBtn;
