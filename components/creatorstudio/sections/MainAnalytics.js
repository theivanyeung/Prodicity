import { Flex, Box } from "@chakra-ui/react";

import CreatorStudioMainAnalyticsPastEvent from "./MainAnalytics/PastEvent";
import CreatorStudioMainAnalyticsChart from "./MainAnalytics/Chart";

const CreatorStudioMainAnalytics = (props) => {
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        mt={"25px"}
        w={"95%"}
        h={"calc(100% - 150px)"}
        display={{
          "2xl": "flex",
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <CreatorStudioMainAnalyticsChart
          numFollowers={props.numFollowers}
          numMoney={props.numMoney}
          numAttendees={props.numAttendees}
          analytics={props.analytics}
        />
        <CreatorStudioMainAnalyticsPastEvent
          events={props.events}
          setEvents={props.setEvents}
        />
      </Flex>

      <Box
        align={"center"}
        my={"25px"}
        w={"95%"}
        display={{
          "2xl": "none",
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "block",
          sm: "block",
          base: "block",
        }}
      >
        <CreatorStudioMainAnalyticsChart
          numFollowers={props.numFollowers}
          numMoney={props.numMoney}
          numAttendees={props.numAttendees}
          analytics={props.analytics}
        />
        <CreatorStudioMainAnalyticsPastEvent
          events={props.events}
          setEvents={props.setEvents}
        />
      </Box>
    </>
  );
};

export default CreatorStudioMainAnalytics;
