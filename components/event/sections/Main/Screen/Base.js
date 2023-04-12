// FRONTEND IMPORTS

import { useState } from "react";

import { AspectRatio, Flex, Box } from "@chakra-ui/react";

import { AgoraVideoPlayer } from "agora-rtc-react";

import EventMainScreenControls from "./Controls";

const EventMainScreenBase = (props) => {
  const [controls, setControls] = useState();

  const handleMouseEnter = () => {
    setControls(
      <EventMainScreenControls play={props.play} setPlay={props.setPlay} />
    );
  };

  const handleMouseLeave = () => {
    setControls();
  };

  return (
    <Flex
      alignItems={"flex-end"}
      w={"100vw"}
      h={"56.25vw"}
      bgColor={"#000000"}
      position={"relative"}
      display={props.display}
    >
      <Box h={"56.25vw"} w={"100vw"}>
        {props.baseVideo && (
          <AgoraVideoPlayer
            videoTrack={props.baseVideo}
            style={{ height: "56.25vw", width: "100vw" }}
          />
        )}
      </Box>

      <Flex
        alignItems={"flex-end"}
        w={"100vw"}
        h={"56.25vw"}
        position={"absolute"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {controls}
      </Flex>
    </Flex>
  );
};

export default EventMainScreenBase;
