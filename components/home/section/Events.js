import HomeEventsBoughtEvents from "./Events/BoughtEvents";
import HomeEventsAllEvents from "./Events/AllEvents";

const HomeEvents = (props) => {
  return (
    <>
      <HomeEventsBoughtEvents
        accessedEventCollection={props.accessedEventCollection}
      />
      <HomeEventsAllEvents
        generalEventCollection={props.generalEventCollection}
      />
    </>
  );
};

export default HomeEvents;
