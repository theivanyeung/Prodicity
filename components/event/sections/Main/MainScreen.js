import EventMainScreenFull from "./Screen/Full";
import EventMainScreenBase from "./Screen/Base";

const EventMainScreen = (props) => {
  return (
    <>
      {/* FULL VIEW */}

      <EventMainScreenFull
        isHost={props.isHost}
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
        // display={{
        //   xxl: "flex",
        //   xl: "flex",
        //   lg: "none",
        //   md: "none",
        //   sm: "none",
        //   base: "none",
        // }}
      />

      {/* BASE VIEW */}

      {/* <EventMainScreenBase
        isHost={props.isHost}
        play={play}
        setPlay={setPlay}
        eventData={props.eventData}
        streamActive={props.streamActive}
        baseVideo={props.baseVideo}
        mic={props.mic}
        camera={props.camera}
        display={{
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      /> */}
    </>
  );
};

export default EventMainScreen;
