// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  Flex,
  Box,
  Heading,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";

import EventModalVoting from "../../modal/attendee/Voting";
import EventModalDescription from "../../modal/Description";
import EventMainScreen from "./MainScreen";
import StartStream from "../../modal/StartStream";
import EndStream from "../../modal/EndStream";
import EventModalCreateVoting from "../../modal/host/CreateVoting";
import EventModalVotingResults from "../../modal/VotingResults";
import EventModalScreenShare from "../../modal/ScreenShare";

import { numUnitConversion } from "../../../functions";

// BACKEND IMPORTS

import { SubscriptionHandler } from "../../../server";

const EventMainFull = (props) => {
  const {
    isHost,
    userId,
    eventData,
    creatorId,
    creatorData,
    isSubscribed,
    streamActive,
    hasAudio,
    screenShared,
    screenAudioActive,
    toggleScreenShare,
    toggleScreenAudio,
    leaveCallHandler,
    display,
  } = props;

  const router = useRouter();

  const [modal, setModal] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w={"69vw"} h={"98%"} display={display}>
      <EventMainScreen
        isHost={props.userId === props.creatorId ? true : false}
        eventData={props.eventData}
        streamActive={props.streamActive}
        video={props.video}
        mic={props.mic}
        camera={props.camera}
        videoPlayerRef={props.videoPlayerRef}
        handleFullscreen={props.handleFullscreen}
        play={props.play}
        setPlay={props.setPlay}
        toggleStreamPlay={props.toggleStreamPlay}
        volume={props.volume}
        setVolume={props.setVolume}
        volumeChangeHandler={props.volumeChangeHandler}
      />
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"97%"}
        h={"5.21vw"}
      >
        {eventData ? (
          <Heading
            w={"100%"}
            h={"4.27vw"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"1.25vw"}
            lineHeight={"2.14vw"}
            letterSpacing={"0.042vw"}
            sx={{
              display: "-webkit-box",
              "-webkit-line-clamp": "2",
              "-webkit-box-orient": "vertical",
            }}
          >
            {eventData.title}
          </Heading>
        ) : (
          <Skeleton w={"100%"} h={"4.27vw"} />
        )}
      </Flex>
      <Flex
        w={"97%"}
        h={"2.6vw"}
        justifyContent={"space-between"}
        alignItems={"start"}
      >
        <Flex>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            mr={"1.04vw"}
            w={"3.91vw"}
            h={"1.77vw"}
            bgColor={"#FF5858"}
            borderRadius={"0.42vw"}
          >
            <Heading fontSize={"0.94vw"} color={"#FFFFFF"}>
              LIVE
            </Heading>
          </Flex>
          <Heading
            fontWeight={"normal"}
            fontSize={"0.94vw"}
            lineHeight={"1.77vw"}
            letterSpacing={"0.042vw"}
          >
            {eventData &&
              props.attendees &&
              numUnitConversion(props.attendees.length)}{" "}
            Attendees
          </Heading>
        </Flex>

        <Flex gap={"1.04vw"}>
          {eventData &&
            (isHost ? (
              eventData.voting && eventData.voting.active ? (
                <Button
                  w={"6.51vw"}
                  h={"1.77vw"}
                  borderRadius={"0.63vw"}
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
                    fontSize={"0.83vw"}
                    letterSpacing={"0.042vw"}
                  >
                    Voting
                  </Heading>
                </Button>
              ) : (
                <Button
                  w={"6.51vw"}
                  h={"1.77vw"}
                  borderRadius={"0.63vw"}
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
                    fontSize={"0.83vw"}
                    letterSpacing={"0.042vw"}
                  >
                    Voting
                  </Heading>
                </Button>
              )
            ) : eventData.voting && eventData.voting.active ? (
              <Button
                w={"6.51vw"}
                h={"1.77vw"}
                borderRadius={"0.63vw"}
                bgImage={
                  "linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"
                }
                onClick={() => {
                  setModal(
                    <EventModalVoting
                      isHost={props.isHost}
                      hasVoted={props.hasVoted}
                      voting={props.voting}
                      userData={props.userData}
                      attendees={props.attendees}
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
                  fontSize={"0.83vw"}
                  letterSpacing={"0.042vw"}
                >
                  Voting
                </Heading>
              </Button>
            ) : (
              <Button
                w={"6.51vw"}
                h={"1.77vw"}
                borderRadius={"0.63vw"}
                isDisabled
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"0.83vw"}
                  letterSpacing={"0.042vw"}
                >
                  Voting
                </Heading>
              </Button>
            ))}

          <Button
            w={"6.51vw"}
            h={"1.77vw"}
            borderRadius={"0.63vw"}
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
              fontSize={"0.83vw"}
              letterSpacing={"0.042vw"}
            >
              Description
            </Heading>
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              {modal}
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"97%"}>
        <Button
          alignItems={"center"}
          h={"3vw"}
          variant={"ghost"}
          onClick={() => router.push(`/${creatorData.username}`)}
        >
          <Box
            w={"2.6vw"}
            h={"2.6vw"}
            borderRadius={"100px"}
            overflow={"hidden"}
          >
            {creatorData ? (
              <Image
                src={creatorData.photoURL}
                alt={"Avatar"}
                w={"2.6vw"}
                h={"2.6vw"}
              />
            ) : (
              <SkeletonCircle size={"2.6vw"} />
            )}
          </Box>
          <Box align={"left"} ml={"1.04vw"}>
            <Heading
              fontWeight={"medium"}
              fontSize={"0.84vw"}
              letterSpacing={"0.042vw"}
            >
              {creatorData &&
                (creatorData.displayName
                  ? `${creatorData.displayName} @${creatorData.username}`
                  : `@${creatorData.username}`)}
            </Heading>

            <Heading
              fontWeight={"medium"}
              fontSize={"0.63vw"}
              letterSpacing={"0.042vw"}
            >
              {creatorData && creatorData.followers.length} followers
            </Heading>
          </Box>
        </Button>
        <Flex gap={"1.04vw"}>
          {isHost
            ? streamActive &&
              (screenShared ? (
                <Button
                  w={"6.51vw"}
                  h={"2.08vw"}
                  bgColor={"#D3D3D3"}
                  borderRadius={"0.63vw"}
                  onClick={() => {
                    setModal(
                      <EventModalScreenShare
                        onClose={onClose}
                        screenAudioActive={screenAudioActive}
                        toggleScreenShare={toggleScreenShare}
                        toggleScreenAudio={toggleScreenAudio}
                      />
                    );
                    onOpen();
                  }}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"0.73vw"}
                    lineHeight={"1.04vw"}
                    letterSpacing={"0.05em"}
                  >
                    Share Settings
                  </Heading>
                </Button>
              ) : (
                <Button
                  w={"6.51vw"}
                  h={"2.08vw"}
                  bgColor={"#D3D3D3"}
                  borderRadius={"0.63vw"}
                  onClick={toggleScreenShare}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"0.73vw"}
                    lineHeight={"1.04vw"}
                    letterSpacing={"0.05em"}
                  >
                    Screen Share
                  </Heading>
                </Button>
              ))
            : hasAudio && (
                <Button
                  w={"6.51vw"}
                  h={"2.08vw"}
                  bgColor={"#D3D3D3"}
                  borderRadius={"0.63vw"}
                  onClick={leaveCallHandler}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"0.73vw"}
                    lineHeight={"1.04vw"}
                    letterSpacing={"0.05em"}
                  >
                    Leave Call
                  </Heading>
                </Button>
              )}
          {userId &&
            creatorId &&
            (userId === creatorId ? (
              streamActive ? (
                <Button
                  w={"6.51vw"}
                  h={"2.08vw"}
                  bgColor={"#D3D3D3"}
                  borderRadius={"0.63vw"}
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
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"0.73vw"}
                    lineHeight={"1.04vw"}
                    letterSpacing={"0.05em"}
                  >
                    END STREAM
                  </Heading>
                </Button>
              ) : (
                <Button
                  w={"6.51vw"}
                  h={"2.08vw"}
                  bgImage={
                    "linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"
                  }
                  border={"1px solid #EEBEE9"}
                  borderRadius={"0.63vw"}
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
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"0.73vw"}
                    lineHeight={"1.04vw"}
                  >
                    START STREAM
                  </Heading>
                </Button>
              )
            ) : isSubscribed ? (
              <Button
                w={"6.51vw"}
                h={"2.08vw"}
                bgColor={"#D3D3D3"}
                borderRadius={"0.63vw"}
                onClick={() => {
                  SubscriptionHandler(
                    props.isSubscribed,
                    props.creatorId,
                    props.creatorData
                  );
                }}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"0.73vw"}
                  lineHeight={"1.04vw"}
                >
                  SUBSCRIBED
                </Heading>
              </Button>
            ) : (
              <Button
                w={"6.51vw"}
                h={"2.08vw"}
                bgImage={
                  "linear-gradient(98.57deg, #FFDE9F 8.46%, #FFC8FD 115.67%)"
                }
                borderRadius={"0.63vw"}
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
                <Heading
                  fontWeight={"medium"}
                  fontSize={"0.73vw"}
                  lineHeight={"1.04vw"}
                >
                  SUBSCRIBE
                </Heading>
              </Button>
            ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventMainFull;
