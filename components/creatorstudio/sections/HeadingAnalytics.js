import { useState } from "react";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import CreatorStudioCardHeadingAnalyticsItem from "../cards/HeadingAnalyticsItem";

import { HeadingAnalaytics } from "../../items";
import { useEffect } from "react";

const CreatorStudioHeadingAnalytics = (props) => {
  const { numFollowers, numEvents, numAttendees } = props;

  return (
    <>
      <Flex
        justifyContent={"center"}
        alignItems={"end"}
        w={"95%"}
        h={"125px"}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        {/* FULL VIEW */}

        <Flex justifyContent={"space-between"} w={"100%"}>
          <CreatorStudioCardHeadingAnalyticsItem
            title={"Followers"}
            data={numFollowers}
          />
          <CreatorStudioCardHeadingAnalyticsItem
            title={"Events"}
            data={numEvents}
          />
          <CreatorStudioCardHeadingAnalyticsItem
            title={"Attendees"}
            data={numAttendees}
          />
        </Flex>
      </Flex>

      {/* BASE VIEW */}

      <Box
        align={"center"}
        mt={"5px"}
        w={"100%"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "flex",
          sm: "flex",
          base: "block",
        }}
      >
        <CreatorStudioCardHeadingAnalyticsItem
          title={"Followers"}
          data={numFollowers}
        />
        <CreatorStudioCardHeadingAnalyticsItem
          title={"Events"}
          data={numEvents}
        />
        <CreatorStudioCardHeadingAnalyticsItem
          title={"Attendees"}
          data={numAttendees}
        />
      </Box>
    </>
  );
};

export default CreatorStudioHeadingAnalytics;
