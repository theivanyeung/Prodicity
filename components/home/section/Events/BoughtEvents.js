import { useState } from "react";

import {
  Box,
  Heading,
  Flex,
  Wrap,
  WrapItem,
  Collapse,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import GlobalEventCard from "../../../global/cards/EventCard";
import HomeBoughtEventsEmpty from "./BoughtEvents/Empty";
import GlobalEvent from "../../../global/cards/Event";

const HomeEventsBoughtEvents = (props) => {
  const { accessedEventCollection } = props;

  // COLLAPSE EVENT DISPLAY

  const [show, setShow] = useState(true);

  const handleToggle = () => setShow(!show);

  // EVENT MODAL

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
      {accessedEventCollection && accessedEventCollection != 0 ? (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          mb={"15px"}
          w={"100%"}
          bgImage={
            "linear-gradient(118.86deg, rgba(244, 206, 150, 0.25) 12.43%, rgba(252, 29, 255, 0.25) 160.79%)"
          }
        >
          <Box w={"100%"}>
            <Heading
              mt={"20px"}
              fontWeight={"normal"}
              fontSize={"4xl"}
              letterSpacing={"0.1em"}
              color={"#272727"}
            >
              Accessed Events
            </Heading>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              my={"10px"}
              w={"100%"}
            >
              <Collapse startingHeight={0} in={show}>
                <Wrap
                  justify={"center"}
                  spacing={"4vw"}
                  w={"100%"}
                  h={"300px"}
                  overflowY={"scroll"}
                  sx={{
                    "::-webkit-scrollbar": {
                      width: "5px",
                    },
                    "::-webkit-scrollbar-thumb": {
                      background: "#777777",
                      borderRadius: "10px",
                    },
                  }}
                >
                  {accessedEventCollection &&
                    accessedEventCollection.map((doc, index) => (
                      <WrapItem
                        key={index}
                        as={"button"}
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
                          accessed={true}
                        />
                      </WrapItem>
                    ))}
                </Wrap>
              </Collapse>
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
                    accessed={true}
                  />
                )}
              </ModalContent>
            </Modal>

            <Flex mb={"20px"} justifyContent={"center"} alignItems={"center"}>
              <Button
                variant={"ghost"}
                colorScheme={"blackAlpha"}
                onClick={handleToggle}
              >
                {show ? (
                  <ChevronDownIcon color={"#000000"} boxSize={"30px"} />
                ) : (
                  <ChevronUpIcon color={"#000000"} boxSize={"30px"} />
                )}
              </Button>
            </Flex>
          </Box>
        </Flex>
      ) : (
        <HomeBoughtEventsEmpty />
      )}
    </>
  );
};

export default HomeEventsBoughtEvents;
