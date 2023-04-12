// FRONTEND IMPORTS

import { useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import EventMainScreenControls from "./Controls";

// STREAM IMPORTS

import { AgoraVideoPlayer } from "agora-rtc-react";

const EventMainScreenFull = (props) => {
  const [controls, setControls] = useState();

  const handleMouseEnter = () => {
    setControls(
      <EventMainScreenControls
        isHost={props.isHost}
        play={props.play}
        setPlay={props.setPlay}
        toggleStreamPlay={props.toggleStreamPlay}
        handleFullscreen={props.handleFullscreen}
        volume={props.volume}
        setVolume={props.setVolume}
        volumeChangeHandler={props.volumeChangeHandler}
      />
    );
    44;
  };

  const handleMouseLeave = () => {
    setControls();
  };

  return (
    <Flex
      w={"69vw"}
      h={"38.8125vw"}
      bgColor={"#000000"}
      position={"relative"}
      display={props.display}
    >
      <Box h={"38.8125vw"} w={"69vw"}>
        {props.video && (
          <AgoraVideoPlayer
            ref={props.videoPlayerRef}
            videoTrack={props.video}
            style={{ height: "38.8125vw", width: "69vw" }}
          />
        )}
      </Box>

      <Flex
        alignItems={"flex-end"}
        w={"69vw"}
        h={"38.8125vw"}
        position={"absolute"}
        onMouseOverCapture={handleMouseEnter}
        onMouseOutCapture={handleMouseLeave}
      >
        {controls}
      </Flex>
    </Flex>
  );
};

export default EventMainScreenFull;
