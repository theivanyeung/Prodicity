import { useState } from "react";

import {
  Box,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import GlobalEventCard from "../../global/cards/EventCard";
import GlobalEvent from "../../global/cards/Event";

const CreatorStudioEvents = (props) => {
  const { user, events } = props;

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
    <Box align={"center"} mt={"25px"} w={"100%"}>
      <Box mt={"25px"} w={"100%"}>
        <Heading
          textAlign={"left"}
          w={"90%"}
          fontWeight={"medium"}
          fontSize={"xl"}
          lineHeight={"27px"}
          letterSpacing={"0.1em"}
        >
          UPCOMING EVENTS
        </Heading>
        <Flex justify={"center"} flexWrap={"wrap"} w={"100%"}>
          {events &&
            events.map(
              (doc, index) =>
                doc && (
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
                    />
                  </Box>
                )
            )}
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
                accessed={user.uid === event.data.host}
              />
            )}
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default CreatorStudioEvents;
