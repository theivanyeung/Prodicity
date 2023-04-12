import { useState } from "react";

import {
  Flex,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import EventModalAnnoucement from "../../../modal/attendee/Annoucement";
import EventModalAttendees from "../../../modal/Attendees";
import EditSettings from "../../../modal/host/EditSettings";

const EventInteractivesTopBase = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState(
    <EventModalAnnoucement
      onClose={onClose}
      submitAnnoucementHandler={props.submitAnnoucementHandler}
    />
  );

  const space = "  ";

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"100%"}>
      {props.isHost ? (
        <Button
          w={"47%"}
          h={"35px"}
          bgImage={"linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"}
          borderRadius={"12px"}
          onClick={() => {
            setModal(
              <>
                {props.isHost ? (
                  <EditSettings
                    onClose={onClose}
                    editSettings={props.editSettings}
                  />
                ) : (
                  <EventModalAnnoucement
                    onClose={onClose}
                    submitAnnoucementHandler={props.submitAnnoucementHandler}
                  />
                )}
              </>
            );
            onOpen();
          }}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            letterSpacing={"0.05em"}
          >
            Edit Stream
          </Heading>
        </Button>
      ) : (
        props.eventData &&
        (props.eventData.annoucement === false || props.annoucementTimer ? (
          <Button
            w={"47%"}
            h={"35px"}
            bgImage={"linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"}
            borderRadius={"12px"}
            isDisabled
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
            >
              Annouce
              {props.annoucementTimer && (
                <>
                  {space}
                  <span>{props.annoucementCount}s</span>
                  <style jsx>{`
                    span {
                      font-weight: 1000;
                      font-size: 1.66vw;
                      line-height: 3.86vw;
                      letter-spacing: 0.16vw;
                      background-image: linear-gradient(
                        94.21deg,
                        #ff910f -33.38%,
                        #db3bf5 43.41%
                      );
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                    }
                  `}</style>
                </>
              )}
            </Heading>
          </Button>
        ) : (
          <Button
            w={"47%"}
            h={"35px"}
            bgImage={"linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"}
            borderRadius={"12px"}
            onClick={() => {
              setModal(
                <EventModalAnnoucement
                  onClose={onClose}
                  submitAnnoucementHandler={props.submitAnnoucementHandler}
                />
              );
              onOpen();
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
            >
              Annouce
            </Heading>
          </Button>
        ))
      )}
      <Button
        w={"47%"}
        h={"35px"}
        bgColor={"#FFE7D0"}
        borderRadius={"12px"}
        onClick={() => {
          setModal(
            <EventModalAttendees
              isHost={props.isHost}
              attendees={props.attendees}
            />
          );
          onOpen();
        }}
      >
        <Heading fontWeight={"medium"} fontSize={"md"} letterSpacing={"0.05em"}>
          Attendees
        </Heading>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          {modal}
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default EventInteractivesTopBase;
