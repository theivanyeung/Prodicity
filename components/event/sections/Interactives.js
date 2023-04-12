import { Box } from "@chakra-ui/react";

import EventInteractivesTop from "./Interactives/Top";
import EventInteractivesChat from "./Interactives/Chat";
import EventInteractivesComm from "./Interactives/Comm";

const EventInteractives = (props) => {
  return (
    <Box w={"28vw"} h={"98%"}>
      <EventInteractivesTop
        isHost={props.userId === props.creatorId}
        eventData={props.eventData}
        attendees={props.attendees}
        annoucementTimer={props.annoucementTimer}
        annoucementCount={props.annoucementCount}
        submitAnnoucementHandler={props.submitAnnoucementHandler}
        editSettings={props.editSettings}
        inviteToStageHandler={props.inviteToStageHandler}
      />
      <EventInteractivesChat
        isHost={props.userId === props.creatorId}
        creatorData={props.creatorData}
        eventData={props.eventData}
        chat={props.chat}
        lastMessageElement={props.lastMessageElement}
        submitChatHandler={props.submitChatHandler}
      />
      <EventInteractivesComm
        video={props.video}
        audio={props.audio}
        audioTracks={props.audioTracks}
        videoTracks={props.videoTracks}
        hasAudio={props.hasAudio}
        hasVideo={props.hasVideo}
        mic={props.mic}
        camera={props.camera}
        onChangeAudioVideoTracks={props.onChangeAudioVideoTracks}
        clickMicHandler={props.clickMicHandler}
        clickCameraHandler={props.clickCameraHandler}
      />
    </Box>
  );
};

export default EventInteractives;
