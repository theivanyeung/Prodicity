import EventMainScreenControlsFull from "./Controls/Full";
import EventMainScreenControlsBase from "./Controls/Base";

const EventMainScreenControls = (props) => {
  return (
    <>
      {/* FULL VIEW */}

      <EventMainScreenControlsFull
        isHost={props.isHost}
        play={props.play}
        setPlay={props.setPlay}
        toggleStreamPlay={props.toggleStreamPlay}
        handleFullscreen={props.handleFullscreen}
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

      {/* <EventMainScreenControlsBase
        handleMouseEnter={props.handleMouseEnter}
        handleMouseLeave={props.handleMouseLeave}
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

export default EventMainScreenControls;
