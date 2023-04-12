import { useState } from "react";

import { Flex, Box, Heading } from "@chakra-ui/react";

import EventModalMediaSettingsOptions from "./MediaSettings/Options";
import EventModalMediaSettingsAudio from "./MediaSettings/Audio";
import EventModalMediaSettingsVideo from "./MediaSettings/Video";

const EventModalMediaSettings = (props) => {
  const {
    audio,
    video,
    audioTracks,
    videoTracks,
    hasAudio,
    hasVideo,
    onChangeAudioVideoTracks,
    onClose,
  } = props;

  const [modal, setModal] = useState("options");

  const selectOptionHandler = (trackType) => {
    setModal(trackType);
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      maxH={"700px"}
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
      <Box align={"center"} mb={"25px"} w={"90%"}>
        <Flex alignItems={"center"} h={"50px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"20px"}
            letterSpacing={"0.1em"}
          >
            Camera and Audio Settings
          </Heading>
        </Flex>
      </Box>

      {modal === "options" && (
        <EventModalMediaSettingsOptions
          audioTracks={audioTracks}
          videoTracks={videoTracks}
          hasAudio={hasAudio}
          hasVideo={hasVideo}
          selectOptionHandler={selectOptionHandler}
        />
      )}
      {modal === "audio" && (
        <EventModalMediaSettingsAudio
          audio={audio}
          audioTracks={audioTracks}
          onChangeAudioVideoTracks={onChangeAudioVideoTracks}
          onClose={onClose}
        />
      )}
      {modal === "video" && (
        <EventModalMediaSettingsVideo
          video={video}
          videoTracks={videoTracks}
          onChangeAudioVideoTracks={onChangeAudioVideoTracks}
          onClose={onClose}
        />
      )}
    </Flex>
  );
};

export default EventModalMediaSettings;
