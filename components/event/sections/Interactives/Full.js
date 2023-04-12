import { Box } from "@chakra-ui/react";

import EventInteractivesTop from "./Top";
import EventInteractivesChat from "./Chat";
import EventInteractivesComm from "./Comm";

const EventInteractivesFull = (props) => {
  return (
    <Box w={"28vw"} h={"98%"} {...props}>
      <EventInteractivesTop />
      <EventInteractivesChat />
      <EventInteractivesComm />
    </Box>
  );
};

export default EventInteractivesFull;
