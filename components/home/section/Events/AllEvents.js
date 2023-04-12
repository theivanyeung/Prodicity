import { useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import GlobalEventCard from "../../../global/cards/EventCard";
import GlobalEvent from "../../../global/cards/Event";

const HomeEventsAllEvents = (props) => {
  const { generalEventCollection } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [event, setEvent] = useState();

  const placeEvent = (id, data, numAttendees) => {
    setEvent({
      id: id,
      data: data,
      numAttendees: numAttendees,
    });
    return true;
  };

  const openModalHandler = (id, data, numAttendees) => {
    if (placeEvent(id, data, numAttendees)) {
      onOpen();
    }
  };

  return (
    <>
      <Heading
        h={"50px"}
        w={"90%"}
        textAlign={"left"}
        fontWeight={"medium"}
        fontSize={"2xl"}
        letterSpacing={"0.1em"}
      >
        All Events
      </Heading>
      <Flex justify={"center"} flexWrap={"wrap"} mb={"20px"} w={"100%"}>
        {generalEventCollection &&
          generalEventCollection.map((doc, index) => (
            <Box
              as={"button"}
              key={index}
              mx={"10px"}
              my={"20px"}
              onClick={() =>
                openModalHandler(doc.id, doc.data, doc.numAttendees)
              }
            >
              <GlobalEventCard
                id={doc.id}
                host={doc.data.host}
                title={doc.data.title}
                date={doc.data.date}
                thumbnailURL={doc.data.thumbnailURL}
                isLive={doc.data.isLive}
                numAttendees={doc.numAttendees}
                accessed={false}
              />
            </Box>
          ))}
      </Flex>

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
              accessed={false}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default HomeEventsAllEvents;
