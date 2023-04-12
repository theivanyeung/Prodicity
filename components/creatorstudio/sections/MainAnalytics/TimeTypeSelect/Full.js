import { useState } from "react";

import {
  Flex,
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

const CreatorStudioMainAnalyticsTimeTypeSelectFull = (props) => {
  const { display, selectTypeOptions } = props;

  const [timeOption, setTimeOption] = useState("Past Month");
  const [typeOption, setTypeOption] = useState("Views");

  return (
    <Flex display={display}>
      <Menu>
        <MenuButton
          as={Button}
          mx={"5px"}
          w={"175px"}
          h={"40px"}
          bg={"#F6F6F6"}
          border={"1px solid #9F9F9F"}
          borderRadius={"8px"}
          rightIcon={<ChevronDownIcon />}
          textAlign={"left"}
          fontWeight={"normal"}
          fontSize={"md"}
          letterSpacing={"0.1em"}
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
          mx={"5px"}
          w={"175px"}
          h={"40px"}
          bg={"#F6F6F6"}
          border={"1px solid #9F9F9F"}
          borderRadius={"8px"}
          rightIcon={<ChevronDownIcon />}
          textAlign={"left"}
          fontWeight={"normal"}
          fontSize={"md"}
          letterSpacing={"0.1em"}
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
    </Flex>
  );
};

export default CreatorStudioMainAnalyticsTimeTypeSelectFull;
