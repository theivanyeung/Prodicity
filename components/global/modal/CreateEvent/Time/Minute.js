import { useState } from "react";

import {
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { Minutes } from "../../../../items";

const GlobalCreateEventTimeMinute = (props) => {
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
            {props.minute}
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
            {props.minute}
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
        {Minutes.map((item, index) => (
          <MenuItem key={index} onClick={() => props.setMinute(item.minute)}>
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              {item.minute}
            </Heading>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GlobalCreateEventTimeMinute;
