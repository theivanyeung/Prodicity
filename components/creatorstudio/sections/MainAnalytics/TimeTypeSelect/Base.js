import { useState } from "react";

import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

const TimeOptions = [
  { title: "Past Month" },
  { title: "Past 6 Months" },
  { title: "Past Year" },
  { title: "All Time" },
];

const TypeOptions = [
  { title: "Views" },
  { title: "Followers" },
  { title: "Earnings" },
];

const CreatorStudioMainAnalyticsTimeTypeSelectBase = (props) => {
  const { display, selectTypeOptions } = props;

  const [timeOption, setTimeOption] = useState("Past Month");
  const [typeOption, setTypeOption] = useState("Views");

  return (
    <Box display={display}>
      <Menu>
        <MenuButton
          as={Button}
          mx={"0.83vw"}
          w={"29.22vw"}
          h={"6.68vw"}
          bg={"#F6F6F6"}
          border={"0.17vw solid #9F9F9F"}
          borderRadius={"1.34vw"}
          rightIcon={<ChevronDownIcon />}
          textAlign={"left"}
          fontWeight={"normal"}
          fontSize={"2.67vw"}
          letterSpacing={"0.27vw"}
        >
          {timeOption}
        </MenuButton>
        <MenuList>
          {TimeOptions.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setTimeOption(option.title);
                selectTypeOptions(option.title, typeOption);
              }}
            >
              {option.title}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <Menu>
        <MenuButton
          as={Button}
          mx={"0.83vw"}
          w={"29.22vw"}
          h={"6.68vw"}
          bg={"#F6F6F6"}
          border={"0.17vw solid #9F9F9F"}
          borderRadius={"1.34vw"}
          rightIcon={<ChevronDownIcon />}
          textAlign={"left"}
          fontWeight={"normal"}
          fontSize={"2.67vw"}
          letterSpacing={"0.27vw"}
        >
          {typeOption}
        </MenuButton>
        <MenuList>
          {TypeOptions.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() => {
                setTypeOption(option.title);
                selectTypeOptions(timeOption, option.title);
              }}
            >
              {option.title}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default CreatorStudioMainAnalyticsTimeTypeSelectBase;
