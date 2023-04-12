import { useState } from "react";

import {
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

const Periods = [{ period: "AM" }, { period: "PM" }];

const GlobalCreateEventTimePeriod = (props) => {
  return (
    <Menu>
      {props.isLive ? (
        <MenuButton isDisabled as={Button} mr={"10px"} borderRadius={"12px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"27px"}
            letterSpacing={"0.05em"}
          >
            {props.period}
          </Heading>
        </MenuButton>
      ) : (
        <MenuButton as={Button} mr={"10px"} borderRadius={"12px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"27px"}
            letterSpacing={"0.05em"}
          >
            {props.period}
          </Heading>
        </MenuButton>
      )}

      <MenuList
        overflowY={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            width: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#777777",
            borderRadius: "10px",
          },
        }}
      >
        {Periods.map((item, index) => (
          <MenuItem key={index} onClick={() => props.setPeriod(item.period)}>
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              {item.period}
            </Heading>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GlobalCreateEventTimePeriod;
