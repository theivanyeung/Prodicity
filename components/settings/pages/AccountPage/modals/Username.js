import { Flex, Box, Heading, Button, Input } from "@chakra-ui/react";

const SettingsAccountPageModalUsername = (props) => {
  return (
    <Flex justifyContent={"center"} h={"350px"}>
      <Box align={"center"} w={"90%"}>
        <Flex alignItems={"center"} h={"50px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"20px"}
            letterSpacing={"0.1em"}
          >
            Change Username
          </Heading>
        </Flex>

        <Heading
          fontWeight={"medium"}
          fontSize={"xs"}
          lineHeight={"17px"}
          letterSpacing={"0.1em"}
          color={"#979797"}
        >
          To change your username, enter a new username and your current
          password.
        </Heading>

        <Box align={"left"} my={"15px"}>
          <Heading
            ml={"20px"}
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"24px"}
            letterSpacing={"0.1em"}
          >
            Username
          </Heading>
          <Input
            type={"text"}
            placeholder={`@${props.username}`}
            borderRadius={"8px"}
            ref={props.usernameInputRef}
          />
          <Heading
            ml={"20px"}
            mt={"5px"}
            fontWeight={"normal"}
            fontSize={"xs"}
            letterSpacing={"0.05em"}
            color={"#FF5858"}
          >
            {props.usernameState}
          </Heading>
        </Box>

        <Box align={"left"} my={"10px"}>
          <Heading
            ml={"20px"}
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"24px"}
            letterSpacing={"0.1em"}
          >
            Current Password
          </Heading>
          <Input
            type={"password"}
            borderRadius={"8px"}
            ref={props.passwordInputRef}
          />
          <Heading
            ml={"20px"}
            mt={"5px"}
            fontWeight={"normal"}
            fontSize={"xs"}
            letterSpacing={"0.05em"}
            color={"#FF5858"}
          >
            {props.passwordState}
          </Heading>
        </Box>

        <Box align={"right"} mt={"25px"} w={"90%"}>
          <Button
            background={"#FFD39F"}
            borderRadius={"12px"}
            onClick={props.submitHandler}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default SettingsAccountPageModalUsername;
