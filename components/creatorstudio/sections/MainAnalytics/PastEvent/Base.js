// FRONTEND IMPORTS

import { useState } from "react";

import {
  Box,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Checkbox,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import GlobalEventCard from "../../../../global/cards/EventCard";
import GlobalEvent from "../../../../global/cards/Event";

// BACKEND IMPORTS

import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";

import { firestore } from "../../../../../utils/firebase";
import { DeleteEventDraft } from "../../../../server";

const CreatorStudioMainAnalyticsPastEventBase = (props) => {
  const { events, setEvents } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [event, setEvent] = useState();

  const [deleteMode, setDeleteMode] = useState(false);

  const openModalHandler = (doc) => {
    setEvent(doc);
    onOpen();
  };

  const deleteEventHandler = async () => {
    const userRef = doc(firestore, "users", event.data.host);

    DeleteEventDraft(event.data.host, event.id);

    setEvents(events.filter((item) => item.id !== event.id));

    await updateDoc(userRef, {
      numEvents: increment(-1),
    });
    onClose();
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      mt={"25px"}
      w={"95%"}
      borderRadius={"8px"}
      border={deleteMode ? "1px solid #E53E3E" : ""}
      bgColor={deleteMode ? "#EBC9C9" : "#ECECEC"}
      display={props.display}
    >
      <Box align={"center"} paddingY={"25px"} w={"100%"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"2%"}
          w={"80%"}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"lg"}
            lineHeight={"27px"}
            letterSpacing={"0.1em"}
          >
            Events
          </Heading>
          <Checkbox
            isInvalid
            size={"md"}
            onChange={() => setDeleteMode(!deleteMode)}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"sm"}
              letterSpacing={"0.1em"}
              color={"#E53E3E"}
            >
              Delete
            </Heading>
          </Checkbox>
        </Flex>
        <Flex justify={"center"} flexWrap={"wrap"} mb={"20px"} w={"100%"}>
          {events &&
            events.map(
              (doc, index) =>
                doc && (
                  <Box
                    as={"button"}
                    key={index}
                    m={"10px"}
                    onClick={() => openModalHandler(doc)}
                  >
                    <GlobalEventCard
                      id={doc.id}
                      host={doc.data.host}
                      title={doc.data.title}
                      date={doc.data.date}
                      thumbnailURL={doc.data.thumbnailURL}
                      isLive={doc.data.isLive}
                      numAttendees={doc.numAttendees}
                    />
                  </Box>
                )
            )}

          {deleteMode ? (
            <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <Flex
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"100%"}
                  h={"125px"}
                  borderRadius={"12px"}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"lg"}
                    letterSpacing={"0.05em"}
                  >
                    Confirm Delete
                  </Heading>
                  <Button
                    mt={"15px"}
                    bgColor={"#FFA3A3"}
                    onClick={deleteEventHandler}
                  >
                    <Heading
                      fontWeight={"bold"}
                      fontSize={"md"}
                      letterSpacing={"0.05em"}
                    >
                      Delete
                    </Heading>
                  </Button>
                </Flex>
              </ModalContent>
            </Modal>
          ) : (
            <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton
                  w={"25px"}
                  h={"25px"}
                  borderRadius={"100px"}
                  bgColor={"rgba(255, 255, 255, 0.25)"}
                />
                {event && (
                  <GlobalEvent
                    id={event.id}
                    host={event.data.host}
                    title={event.data.title}
                    date={event.data.date}
                    description={event.data.description}
                    price={event.data.price}
                    isFree={event.data.isFree}
                    thumbnailURL={event.data.thumbnailURL}
                    isLive={event.data.isLive}
                    numAttendees={event.numAttendees}
                    token={event.data.token}
                    accessed={true}
                  />
                )}
              </ModalContent>
            </Modal>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default CreatorStudioMainAnalyticsPastEventBase;
