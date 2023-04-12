import { Box, Heading, Flex, Button, Input } from "@chakra-ui/react";

import RegisterHeader from "../../Header";

const RegisterInputBoxMobileVerify = (props) => {
  return (
    <Box w={"100vw"} h={"100vh"} mt={"5vh"} mb={"15vh"} align={"center"}>
      <RegisterHeader />

      <Heading
        mb={"42px"}
        fontWeight={"medium"}
        fontSize={"xl"}
        letterSpacing={"0.1em"}
      >
        A verification code was sent to your email!
      </Heading>

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"80%"}
        h={"50px"}
      >
        <Input
          value={props.codeInput}
          type={"text"}
          placeholder={"Username"}
          bg={"#F6F6F6"}
          boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25"}
          borderRadius={"24px"}
          fontSize={"20px"}
          onChange={(e) => props.setCodeInput(e.target.value)}
        />
      </Flex>

      <Flex alignItems={"center"} mb={"12px"} w={"70%"} h={"24px"}>
        <Heading
          fontWeight={"normal"}
          fontSize={"xs"}
          letterSpacing={"0.05em"}
          color={"#FF5858"}
        >
          {props.usernameState}
        </Heading>
      </Flex>

      <Button
        mb={"35px"}
        w={"80%"}
        h={"50px"}
        bg={"#F4CE96"}
        boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
        borderRadius={"24px"}
        _hover={{ bg: "#FAD69B" }}
        onClick={props.createUser}
      >
        Next
      </Button>

      <Box w={"100%"} align={"center"}>
        <Button
          mb={"10vh"}
          fontWeight={"normal"}
          fontSize={"md"}
          letterSpacing={"0.1em"}
          color={"#000000"}
          variant={"link"}
          onClick={props.resendCode}
        >
          Resend code
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterInputBoxMobileVerify;
