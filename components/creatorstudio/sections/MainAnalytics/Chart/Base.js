import { useState, useEffect } from "react";

import { Flex, Heading, Box } from "@chakra-ui/react";

import { Line } from "react-chartjs-2";

import CreatorStudioMainAnalyticsTimeTypeSelect from "../TimeTypeSelect";

import { formatTimestamp } from "../../../../functions";

const CreatorStudioMainAnalyticsChartBase = (props) => {
  const { display, numFollowers, numMoney, numAttendees, analytics } = props;

  const [borderColor, setBorderColor] = useState("rgba(0, 196, 223, 1)");
  const [fillColor, setFillColor] = useState("rgba(0, 196, 223, 0.2)");
  const [type, setType] = useState("Followers");
  const [total, setTotal] = useState(numFollowers);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (analytics.length !== 0) {
      selectTypeOptions("Past Month", "Views");
    }
  }, [analytics]);

  const selectTypeOptions = (timeOption, typeOption) => {
    if (typeOption === "Followers") {
      setBorderColor("rgba(255, 64, 213, 1)");
      setFillColor("rgba(255, 64, 213, 0.2)");
      setType("Followers");
      setTotal(numFollowers);
      setData(analytics.map((analytics) => analytics.followers));
    }

    if (typeOption === "Views") {
      setBorderColor("rgba(0, 196, 223, 1)");
      setFillColor("rgba(0, 196, 223, 0.2)");
      setType("Views");
      setTotal(numAttendees);
      setData(analytics.map((analytics) => analytics.views));
    }

    if (typeOption === "Earnings") {
      setBorderColor("rgba(255, 165, 78, 1)");
      setFillColor("rgba(255, 165, 78, 0.2)");
      setType("Earnings");
      setTotal(numMoney);
      setData(analytics.map((analytics) => analytics.earnings));
    }

    if (timeOption === "All Time") {
      setLabels(
        analytics.map((analytics) => formatTimestamp(analytics.timestamp))
      );
    } else {
      let days = 0;

      if (timeOption === "Past Month") {
        days = 30;
      }

      if (timeOption === "Past 6 Months") {
        days = 178;
      }

      if (timeOption === "Past Year") {
        days = 356;
      }

      const labelList = [];
      const dataList = [];
      analytics.map((analytics, index) => {
        const currentTimestamp = new Date().getTime();

        const timestampInMs = analytics.timestamp.toMillis();

        const difference = currentTimestamp - timestampInMs;

        const differenceInDays = difference / (1000 * 60 * 60 * 24);

        if (differenceInDays < days) {
          labelList.push(formatTimestamp(analytics.timestamp));
          if (typeOption === "Followers") {
            dataList.push(analytics.followers);
          }
          if (typeOption === "Views") {
            dataList.push(analytics.views);
          }
          if (typeOption === "Earnings") {
            dataList.push(analytics.earnings);
          }
        }
      });
      setLabels(labelList);
      setData(dataList);
    }
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"95%"}
      borderRadius={"8px"}
      bgColor={"#FFFFFF"}
      display={display}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"95%"}
        h={"95%"}
      >
        {/* FULL VIEW */}

        <Flex
          mt={"25px"}
          w={"90%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          display={{
            xxl: "flex",
            xl: "flex",
            lg: "none",
            md: "none",
            sm: "none",
            base: "none",
          }}
        >
          <Heading
            mt={"20px"}
            fontWeight={"medium"}
            fontSize={"lg"}
            letterSpacing={"0.1em"}
          >
            {type}: {total}
          </Heading>
          <CreatorStudioMainAnalyticsTimeTypeSelect
            selectTypeOptions={selectTypeOptions}
          />
        </Flex>

        {/* BASE VIEW */}

        <Box
          align={"center"}
          mt={"25px"}
          w={"90%"}
          display={{
            xxl: "none",
            xl: "none",
            lg: "block",
            md: "block",
            sm: "block",
            base: "block",
          }}
        >
          <CreatorStudioMainAnalyticsTimeTypeSelect
            selectTypeOptions={selectTypeOptions}
          />
          <Heading
            ml={"20px"}
            mt={"20px"}
            fontWeight={"medium"}
            fontSize={"lg"}
            letterSpacing={"0.1em"}
          >
            {type}: {total}
          </Heading>
        </Box>

        <Box align={"left"} my={"30px"} w={"95%"} h={"calc(100% - 2% - 90px)"}>
          <Line
            data={{
              labels: labels,
              datasets: [
                {
                  label: type,
                  data: data,
                  borderColor: [borderColor],
                  backgroundColor: [borderColor],
                  borderWidth: 1,
                  fill: {
                    target: "origin",
                    above: fillColor,
                  },
                },
              ],
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              elements: {
                point: {
                  pointRadius: 1,
                },
              },
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default CreatorStudioMainAnalyticsChartBase;
