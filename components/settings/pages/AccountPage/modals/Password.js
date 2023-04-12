import { Flex, Box, Heading, Button, Input } from "@chakra-ui/react";

const SettingsAccountPageModalPassword = (props) => {
  return (
    <Flex justifyContent={"center"} h={"450px"}>
      <Box align={"center"} w={"90%"}>
        <Flex alignItems={"center"} h={"50px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"20px"}
            letterSpacing={"0.1em"}
          >
            Update Password
          </Heading>
        </Flex>

        <Heading
          fontWeight={"medium"}
          fontSize={"xs"}
          lineHeight={"17px"}
          letterSpacing={"0.1em"}
          color={"#979797"}
        >
          To update your password, enter your current password and a new
          password.
        </Heading>

        <Box align={"left"} h={"85px"} my={"10px"}>
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
            ref={props.currentPasswordRef}
          />
          <Heading
            ml={"20px"}
            mt={"5px"}
            fontWeight={"normal"}
            fontSize={"xs"}
            letterSpacing={"0.05em"}
            color={"#FF5858"}
          >
            {props.currentPasswordState}
          </Heading>
        </Box>

        <Box align={"left"} h={"85px"} my={"10px"}>
          <Heading
            ml={"20px"}
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"24px"}
            letterSpacing={"0.1em"}
          >
            New Password
          </Heading>
          <Input
            type={"password"}
            borderRadius={"8px"}
            ref={props.newPasswordRef}
          />
          <Heading
            ml={"20px"}
            mt={"5px"}
            fontWeight={"normal"}
            fontSize={"xs"}
            letterSpacing={"0.05em"}
            color={"#FF5858"}
          >
            {props.newPasswordState}
          </Heading>
        </Box>

        <Box align={"left"} h={"85px"} my={"10px"}>
          <Heading
            ml={"20px"}
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"24px"}
            letterSpacing={"0.1em"}
          >
            Confirm New Password
          </Heading>
          <Input
            type={"password"}
            borderRadius={"8px"}
            ref={props.confirmNewPasswordRef}
          />
          <Heading
            ml={"20px"}
            mt={"5px"}
            fontWeight={"normal"}
            fontSize={"xs"}
            letterSpacing={"0.05em"}
            color={"#FF5858"}
          >
            {props.confirmNewPasswordState}
          </Heading>
        </Box>

        <Box align={"right"} w={"90%"}>
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

export default SettingsAccountPageModalPassword;
