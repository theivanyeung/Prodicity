import Image from "next/image";

import {
  Flex,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import EventModalMediaSettings from "../../modal/MediaSettings";

const EventInteractivesComm = (props) => {
  const {
    audio,
    video,
    audioTracks,
    videoTracks,
    hasAudio,
    hasVideo,
    mic,
    camera,
    clickMicHandler,
    clickCameraHandler,
    onChangeAudioVideoTracks,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      gap={"0.8vw"}
      mt={"0.5vw"}
      w={"80%"}
      h={"3.13vw"}
    >
      {hasAudio ? (
        mic ? (
          <Button
            w={"9.11vw"}
            h={"2.08vw"}
            borderRadius={"5.21vw"}
            onClick={clickMicHandler}
          >
            <Box w={"1.3vw"} h={"1.3vw"}>
              <Image
                src={"/images/mic-icon.png"}
                alt={"Mic Icon"}
                layout="responsive"
                width={25}
                height={25}
              />
            </Box>
          </Button>
        ) : (
          <Button
            w={"9.11vw"}
            h={"2.08vw"}
            boxShadow={"0px 0px 5px 2.5px rgba(255, 0, 0, 0.25)"}
            borderRadius={"5.21vw"}
            onClick={clickMicHandler}
          >
            <Box w={"1.3vw"} h={"1.3vw"}>
              <Image
                src={"/images/mic-icon-disabled.png"}
                alt={"Mic Icon"}
                layout="responsive"
                width={25}
                height={25}
              />
            </Box>
          </Button>
        )
      ) : (
        <Button w={"9.11vw"} h={"2.08vw"} borderRadius={"5.21vw"} isDisabled>
          <Box w={"1.3vw"} h={"1.3vw"}>
            <Image
              src={"/images/mic-icon.png"}
              alt={"Mic Icon"}
              layout="responsive"
              width={25}
              height={25}
            />
          </Box>
        </Button>
      )}

      <Flex
        as={"button"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"2.08vw"}
        h={"2.08vw"}
        borderRadius={"12px"}
        _hover={{
          bgColor: "#FEFEFE",
        }}
        onClick={onOpen}
      >
        <Box w={"1vw"} h={"1vw"}>
          <Image
            src={"/images/settings-icon.png"}
            layout={"responsive"}
            width={"20px"}
            height={"20px"}
          />
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent borderRadius={"12px"}>
          <ModalCloseButton />
          <EventModalMediaSettings
            audio={audio}
            video={video}
            audioTracks={audioTracks}
            videoTracks={videoTracks}
            hasAudio={hasAudio}
            hasVideo={hasVideo}
            onChangeAudioVideoTracks={onChangeAudioVideoTracks}
            onClose={onClose}
          />
        </ModalContent>
      </Modal>

      {hasVideo ? (
        camera ? (
          <Button
            w={"9.11vw"}
            h={"2.08vw"}
            borderRadius={"5.21vw"}
            onClick={clickCameraHandler}
          >
            <Box w={"1.3vw"} h={"0.84vw"}>
              <Image
                src={"/images/camera-icon.png"}
                alt={"Mic Icon"}
                layout="responsive"
                width={25}
                height={16.11}
              />
            </Box>
          </Button>
        ) : (
          <Button
            w={"9.11vw"}
            h={"2.08vw"}
            boxShadow={"0px 0px 5px 2.5px rgba(255, 0, 0, 0.25)"}
            borderRadius={"5.21vw"}
            onClick={clickCameraHandler}
          >
            <Box w={"1.3vw"} h={"1.1vw"}>
              <Image
                src={"/images/camera-icon-disabled.png"}
                alt={"Mic Icon"}
                layout="responsive"
                width={25}
                height={20.75}
              />
            </Box>
          </Button>
        )
      ) : (
        <Button w={"9.11vw"} h={"2.08vw"} borderRadius={"5.21vw"} isDisabled>
          <Box w={"1.3vw"} h={"0.84vw"}>
            <Image
              src={"/images/camera-icon.png"}
              alt={"Mic Icon"}
              layout="responsive"
              width={25}
              height={16.11}
            />
          </Box>
        </Button>
      )}
    </Flex>
  );
};

export default EventInteractivesComm;
