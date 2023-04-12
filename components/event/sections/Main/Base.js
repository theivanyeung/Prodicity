// FRONTEND IMPORTS

import { useState, useRef } from "react";

import Image from "next/image";

import {
  Flex,
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  SkeletonCircle,
  Skeleton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import EventModalVoting from "../../modal/attendee/Voting";
import EventModalDescription from "../../modal/Description";
import EventMainScreen from "./MainScreen";

import { VIPEvents } from "../../../placeholderData";

import EventInteractivesTopBase from "../Interactives/Top/Base";
import EventInteractivesCommBase from "../Interactives/Comm/Base";
import EventModalCreateVoting from "../../modal/host/CreateVoting";
import EventModalVotingResults from "../../modal/VotingResults";
import EventInteractivesChatBase from "../Interactives/Chat/Base";

import StartStream from "../../modal/StartStream";
import EndStream from "../../modal/EndStream";

import { numUnitConversion } from "../../../functions";

// BACKEND IMPORTS

import { SubscriptionHandler } from "../../../server";

const EventMainBase = (props) => {
  const {
    isHost,
    userId,
    eventData,
    creatorId,
    creatorData,
    isSubscribed,
    streamActive,
    display,
  } = props;

  const [modal, setModal] = useState(<EventModalVoting />);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const chatBtn = useRef();

  return (
    <Box w={"100vw"} display={display}>
      <EventMainScreen
        isHost={props.userId === props.creatorId ? true : false}
        eventData={props.eventData}
        streamActive={props.streamActive}
        play={props.play}
        setPlay={props.setPlay}
        baseVideo={props.baseVideo}
        mic={props.mic}
        camera={props.camera}
      />
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"97%"}
        h={"50px"}
      >
        {eventData ? (
          <Heading
            w={"100%"}
            h={"25px"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"lg"}
            letterSpacing={"0.08em"}
            sx={{
              display: "-webkit-box",
              "-webkit-line-clamp": "2",
              "-webkit-box-orient": "vertical",
            }}
          >
            {eventData.title}
          </Heading>
        ) : (
          <Skeleton w={"100%"} h={"50px"} />
        )}
      </Flex>

      <Flex justifyContent={"space-between"} alignItems={"center"} w={"97%"}>
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"start"}
          gap={"10px"}
          w={"65%"}
        >
          <Flex>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              mr={"10px"}
              w={"50px"}
              h={"20px"}
              bgColor={"#FF5858"}
              borderRadius={"6px"}
            >
              <Heading fontSize={"sm"} color={"#FFFFFF"}>
                LIVE
              </Heading>
            </Flex>

            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
            >
              {eventData && numUnitConversion(eventData.attendees.length)}{" "}
              Attendees
            </Heading>
          </Flex>
          <Flex alignItems={"center"}>
            <Box
              w={"30px"}
              h={"30px"}
              borderRadius={"100px"}
              overflow={"hidden"}
            >
              {creatorData ? (
                <Box w={"30px"} h={"30px"}>
                  <Image
                    src={VIPEvents[0].creatorPfp}
                    alt={"Avatar"}
                    layout={"responsive"}
                    width={"10px"}
                    height={"10px"}
                  />
                </Box>
              ) : (
                <SkeletonCircle size={"30px"} />
              )}
            </Box>
            <Heading
              ml={"10px"}
              fontWeight={"medium"}
              fontSize={"xs"}
              letterSpacing={"0.05em"}
            >
              {creatorData &&
                (creatorData.displayName
                  ? `${creatorData.displayName} @${creatorData.username}`
                  : `@${creatorData.username}`)}
            </Heading>
            <Heading
              ml={"10px"}
              fontWeight={"medium"}
              fontSize={"xs"}
              letterSpacing={"0.05em"}
            >
              {creatorData && creatorData.followers.length} followers
            </Heading>
          </Flex>
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} w={"35%"}>
          {userId &&
            (userId === creatorId ? (
              streamActive ? (
                <Button
                  w={"100px"}
                  h={"35px"}
                  bgColor={"#D3D3D3"}
                  borderRadius={"12px"}
                  onClick={() => {
                    setModal(
                      <EndStream
                        clickStreamHandler={props.clickStreamHandler}
                        onClose={onClose}
                      />
                    );
                    onOpen();
                  }}
                >
                  <Heading fontWeight={"medium"} fontSize={"sm"}>
                    END STREAM
                  </Heading>
                </Button>
              ) : (
                <Button
                  w={"100px"}
                  h={"35px"}
                  bgImage={
                    "linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"
                  }
                  borderRadius={"12px"}
                  onClick={() => {
                    setModal(
                      <StartStream
                        clickStreamHandler={props.clickStreamHandler}
                        onClose={onClose}
                      />
                    );
                    onOpen();
                  }}
                >
                  <Heading fontWeight={"medium"} fontSize={"sm"}>
                    START STREAM
                  </Heading>
                </Button>
              )
            ) : isSubscribed ? (
              <Button
                w={"100px"}
                h={"35px"}
                bgColor={"#D3D3D3"}
                borderRadius={"12px"}
                onClick={() => {
                  SubscriptionHandler(
                    props.isSubscribed,
                    props.creatorId,
                    props.creatorData
                  );
                }}
              >
                <Heading fontWeight={"medium"} fontSize={"sm"}>
                  SUBSCRIBED
                </Heading>
              </Button>
            ) : (
              <Button
                w={"100px"}
                h={"35px"}
                bgImage={
                  "linear-gradient(98.57deg, #FFDE9F 8.46%, #FFC8FD 115.67%)"
                }
                borderRadius={"12px"}
                _hover={{
                  bgImage:
                    "linear-gradient(98.57deg, #FFCD6F 8.46%, #FFC8FD 115.67%)",
                }}
                onClick={() => {
                  SubscriptionHandler(
                    props.isSubscribed,
                    props.creatorId,
                    props.creatorData
                  );
                }}
              >
                <Heading fontWeight={"medium"} fontSize={"sm"}>
                  SUBSCRIBE
                </Heading>
              </Button>
            ))}
        </Flex>
      </Flex>

      {/** VOTING & DESCRIPTION */}

      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        gap={"20px"}
        mt={"25px"}
        w={"100%"}
        h={"50px"}
      >
        {eventData &&
          (isHost ? (
            eventData.voting.active ? (
              <Button
                w={"35%"}
                h={"30px"}
                borderRadius={"12px"}
                onClick={() => {
                  setModal(
                    <EventModalVotingResults
                      isHost={props.isHost}
                      voting={props.voting}
                      eventData={props.eventData}
                      closeVoteHandler={props.closeVoteHandler}
                      onClose={onClose}
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
                  Voting
                </Heading>
              </Button>
            ) : (
              <Button
                w={"35%"}
                h={"30px"}
                borderRadius={"12px"}
                onClick={() => {
                  setModal(
                    <EventModalCreateVoting
                      createVoteHandler={props.createVoteHandler}
                      onClose={onClose}
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
                  Voting
                </Heading>
              </Button>
            )
          ) : eventData.voting.active ? (
            <Button
              w={"35%"}
              h={"30px"}
              borderRadius={"12px"}
              onClick={() => {
                setModal(
                  <EventModalVoting
                    isHost={props.isHost}
                    voting={props.voting}
                    userData={props.userData}
                    eventData={props.eventData}
                    clickChoiceHandler={props.clickChoiceHandler}
                    onClose={onClose}
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
                Voting
              </Heading>
            </Button>
          ) : (
            <Button w={"35%"} h={"25px"} borderRadius={"12px"} isDisabled>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
              >
                Voting
              </Heading>
            </Button>
          ))}

        <Button
          w={"35%"}
          h={"30px"}
          borderRadius={"12px"}
          onClick={() => {
            setModal(
              <EventModalDescription
                description={props.eventData.description}
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
            Description
          </Heading>
        </Button>

        <Modal
          isOpen={modal !== "chat" && isOpen}
          onClose={onClose}
          size={"xs"}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            {modal}
          </ModalContent>
        </Modal>
      </Flex>

      {/** INTERACTIVES */}

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"10px"}
        mt={"25px"}
        w={"95%"}
      >
        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10px"}
          w={"80%"}
        >
          <EventInteractivesTopBase
            isHost={props.userId === props.creatorId}
            eventData={props.eventData}
            attendees={props.attendees}
            annoucementTimer={props.annoucementTimer}
            annoucementCount={props.annoucementCount}
            submitAnnoucementHandler={props.submitAnnoucementHandler}
          />
          <EventInteractivesCommBase
            hasAudio={props.hasAudio}
            hasVideo={props.hasVideo}
            mic={props.mic}
            camera={props.camera}
            clickMicHandler={props.clickMicHandler}
            clickCameraHandler={props.clickCameraHandler}
          />
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} w={"20%"}>
          <Button
            ref={chatBtn}
            bgImage={"linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"}
            onClick={() => {
              onOpen();
              setModal("chat");
            }}
          >
            <Image
              src={"/images/chat-icon.png"}
              width={"25px"}
              height={"25px"}
            />
          </Button>
        </Flex>

        <Drawer
          isOpen={modal === "chat" && isOpen}
          placement={"right"}
          onClose={onClose}
          finalFocusRef={chatBtn}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            {modal === "chat" && (
              <EventInteractivesChatBase
                isHost={props.isHost}
                creatorData={props.creatorData}
                eventData={props.eventData}
                chat={props.chat}
                submitChatHandler={props.submitChatHandler}
              />
            )}
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};

export default EventMainBase;
