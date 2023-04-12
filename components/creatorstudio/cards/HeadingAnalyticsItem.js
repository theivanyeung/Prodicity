import { Box } from "@chakra-ui/react";

import CreatorStudioCardHeadingAnalyticsItemFixed from "./HeadingAnalyticsItem/Fixed";
import CreatorStudioCardHeadingAnalyticsItemResponsive from "./HeadingAnalyticsItem/Responsive";

const CreatorStudioCardHeadingAnalyticsItem = (props) => {
  return (
    <Box w={"100%"}>
      <Box
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "block",
          sm: "none",
          base: "none",
        }}
      >
        <CreatorStudioCardHeadingAnalyticsItemFixed
          title={props.title}
          data={props.data}
        />
      </Box>

      <Box
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "block",
          base: "block",
        }}
      >
        <CreatorStudioCardHeadingAnalyticsItemResponsive
          title={props.title}
          data={props.data}
        />
      </Box>
    </Box>
  );
};

export default CreatorStudioCardHeadingAnalyticsItem;
