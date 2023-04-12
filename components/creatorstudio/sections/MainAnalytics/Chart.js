import CreatorStudioMainAnalyticsChartFull from "./Chart/Full";
import CreatorStudioMainAnalyticsChartBase from "./Chart/Base";

const CreatorStudioMainAnalyticsChart = (props) => {
  return (
    <>
      <CreatorStudioMainAnalyticsChartFull
        numFollowers={props.numFollowers}
        numMoney={props.numMoney}
        numAttendees={props.numAttendees}
        analytics={props.analytics}
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
      <CreatorStudioMainAnalyticsChartBase
        numFollowers={props.numFollowers}
        numMoney={props.numMoney}
        numAttendees={props.numAttendees}
        analytics={props.analytics}
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

export default CreatorStudioMainAnalyticsChart;
