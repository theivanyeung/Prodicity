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

import EventModalAnnoucement from "../../modal/attendee/Annoucement";
import EventModalAttendees from "../../modal/Attendees";
import EditSettings from "../../modal/host/EditSettings";

const EventInteractivesTop = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState(
    <EventModalAnnoucement
      onClose={onClose}
      submitAnnoucementHandler={props.submitAnnoucementHandler}
    />
  );

  const space = "  ";

  return (
    <Flex justifyContent={"space-between"} w={"100%"} h={"3.13vw"}>
      {props.isHost ? (
        <Button
          w={"16.93vw"}
          h={"2.6vw"}
          bgImage={"linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"}
          borderRadius={"0.83vw"}
          onClick={() => {
            setModal(
              <>
                {props.isHost ? (
                  <EditSettings
                    onClose={onClose}
                    eventData={props.eventData}
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
            fontSize={"0.83vw"}
            lineHeight={"1.93vw"}
            letterSpacing={"0.08vw"}
          >
            Edit Stream
          </Heading>
        </Button>
      ) : (
        props.eventData &&
        (props.eventData.annoucement === false || props.annoucementTimer ? (
          <Button
            w={"16.93vw"}
            h={"2.6vw"}
            bgImage={"linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"}
            borderRadius={"0.83vw"}
            isDisabled
          >
            <Heading
              fontSize={"0.83vw"}
              lineHeight={"1.93vw"}
              letterSpacing={"0.08vw"}
            >
              Annouce
              {props.annoucementTimer && (
                <>
                  {space}
                  <span>{props.annoucementCount}s</span>
                  <style jsx>{`
                    span {
                      font-weight: 1000;
                      font-size: 0.84vw;
                      line-height: 1.93vw;
                      letter-spacing: 0.08vw;
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
            w={"16.93vw"}
            h={"2.6vw"}
            bgImage={"linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"}
            borderRadius={"0.83vw"}
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
              fontSize={"0.83vw"}
              lineHeight={"1.93vw"}
              letterSpacing={"0.08vw"}
            >
              Annouce
            </Heading>
          </Button>
        ))
      )}

      <Button
        w={"10.42vw"}
        h={"2.6vw"}
        bgColor={"#FFE7D0"}
        borderRadius={"0.83vw"}
        onClick={() => {
          setModal(
            <EventModalAttendees
              isHost={props.isHost}
              attendees={props.attendees}
              inviteToStageHandler={props.inviteToStageHandler}
              onClose={onClose}
            />
          );
          onOpen();
        }}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"0.83vw"}
          lineHeight={"1.93vw"}
          letterSpacing={"0.08vw"}
        >
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

export default EventInteractivesTop;
