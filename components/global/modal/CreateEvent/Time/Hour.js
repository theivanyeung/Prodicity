import { useState } from "react";

import {
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { Hours } from "../../../../items";

const GlobalCreateEventTimeHour = (props) => {
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
            {props.hour}
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
            {props.hour}
          </Heading>
        </MenuButton>
      )}

      <MenuList
        h={"250px"}
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
        {Hours.map((item, index) => (
          <MenuItem key={index} onClick={() => props.setHour(item.hour)}>
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              {item.hour}
            </Heading>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GlobalCreateEventTimeHour;
