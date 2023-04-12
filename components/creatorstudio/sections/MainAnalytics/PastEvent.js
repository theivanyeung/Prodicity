import CreatorStudioMainAnalyticsPastEventFull from "./PastEvent/Full";
import CreatorStudioMainAnalyticsPastEventBase from "./PastEvent/Base";

const CreatorStudioMainAnalyticsPastEvent = (props) => {
  return (
    <>
      <CreatorStudioMainAnalyticsPastEventFull
        events={props.events}
        setEvents={props.setEvents}
        display={{
          "2xl": "flex",
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <CreatorStudioMainAnalyticsPastEventBase
        events={props.events}
        setEvents={props.setEvents}
        display={{
          "2xl": "none",
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      />
    </>
  );
};

export default CreatorStudioMainAnalyticsPastEvent;
