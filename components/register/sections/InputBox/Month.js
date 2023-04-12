import { Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import { Month } from "../../../items";

const RegisterInputBoxMonth = (props) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        w={"183px"}
        h={"50px"}
        bg={"#F6F6F6"}
        border={"1px solid #9F9F9F"}
        borderRadius={"24px"}
        rightIcon={<ChevronDownIcon />}
        textAlign={"left"}
        fontWeight={"normal"}
        fontSize={"md"}
        letterSpacing={"0.1em"}
      >
        {props.month}
      </MenuButton>
      <MenuList
        h={"200px"}
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
        {Month.map((monthItem, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              props.setMonth(monthItem.month);
              props.setNumMonth(monthItem.num);
            }}
          >
            {monthItem.month}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default RegisterInputBoxMonth;
