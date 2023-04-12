import EventMainFull from "./Main/Full";
import EventMainBase from "./Main/Base";

const EventMain = (props) => {
  return (
    <>
      {/* FULL VIEW */}
      <EventMainFull
        isHost={props.userId === props.creatorId}
        userId={props.userId}
        userData={props.userData}
        eventData={props.eventData}
        creatorId={props.creatorId}
        creatorData={props.creatorData}
        attendees={props.attendees}
        voting={props.voting}
        isSubscribed={props.isSubscribed}
        streamActive={props.streamActive}
        clickStreamHandler={props.clickStreamHandler}
        video={props.video}
        audio={props.audio}
        hasAudio={props.hasAudio}
        mic={props.mic}
        camera={props.camera}
        videoPlayerRef={props.videoPlayerRef}
        screenShared={props.screenShared}
        screenAudioActive={props.screenAudioActive}
        toggleScreenShare={props.toggleScreenShare}
        toggleScreenAudio={props.toggleScreenAudio}
        handleFullscreen={props.handleFullscreen}
        hasVoted={props.hasVoted}
        createVoteHandler={props.createVoteHandler}
        clickChoiceHandler={props.clickChoiceHandler}
        closeVoteHandler={props.closeVoteHandler}
        play={props.play}
        setPlay={props.setPlay}
        toggleStreamPlay={props.toggleStreamPlay}
        volume={props.volume}
        setVolume={props.setVolume}
        volumeChangeHandler={props.volumeChangeHandler}
        leaveCallHandler={props.leaveCallHandler}
        // display={{
        //   xxl: "block",
        //   xl: "block",
        //   lg: "none",
        //   md: "none",
        //   sm: "none",
        //   base: "none",
        // }}
      />

      {/* BASE VIEW */}
      {/* <EventMainBase
        isHost={props.userId === props.creatorId}
        userId={props.userId}
        userData={props.userData}
        eventData={props.eventData}
        creatorId={props.creatorId}
        creatorData={props.creatorData}
        attendees={props.attendees}
        voting={props.voting}
        isSubscribed={props.isSubscribed}
        streamActive={props.streamActive}
        clickStreamHandler={props.clickStreamHandler}
        baseVideo={props.baseVideo}
        mic={props.mic}
        camera={props.camera}
        clickMicHandler={props.clickMicHandler}
        clickCameraHandler={props.clickCameraHandler}
        annoucementTimer={props.annoucementTimer}
        annoucementCount={props.annoucementCount}
        submitAnnoucementHandler={props.submitAnnoucementHandler}
        editSettings={props.editSettings}
        createVoteHandler={props.createVoteHandler}
        clickChoiceHandler={props.clickChoiceHandler}
        closeVoteHandler={props.closeVoteHandler}
        chat={props.chat}
        submitChatHandler={props.submitChatHandler}
        display={{
          xxl: "none",
          xl: "none",
          lg: "block",
          md: "block",
          sm: "block",
          base: "block",
        }}
      /> */}
    </>
  );
};

export default EventMain;
