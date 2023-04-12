import { useRef } from "react";

import Link from "next/link";

import { Box, Heading, Flex, Button } from "@chakra-ui/react";

import LoginInputBoxCredentials from "./InputBox/Credentials";

const LoginInputBox = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitLoginHandler = () => {
    props.submitLoginHandler(
      emailInputRef.current.value,
      passwordInputRef.current.value
    );
  };

  return (
    <Flex
      w={"600px"}
      h={"650px"}
      alignItems={"center"}
      justifyContent={"center"}
      bgColor={"#FFFFFF"}
      boxShadow={"0px 0px 10px 5px rgba(255, 255, 255, 0.25)"}
      borderRadius={"36px"}
    >
      <Box align={"center"}>
        <Heading
          mb={"42px"}
          fontWeight={"medium"}
          fontSize={"2xl"}
          letterSpacing={"0.1em"}
        >
          Login to you account
        </Heading>

        <LoginInputBoxCredentials
          emailInputRef={emailInputRef}
          passwordInputRef={passwordInputRef}
          emailState={props.emailState}
          passwordState={props.passwordState}
        />

        <Button
          mb={"35px"}
          w={"424px"}
          h={"50px"}
          bg={"#F4CE96"}
          boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
          borderRadius={"24px"}
          _hover={{ bg: "#FAD69B" }}
          onClick={submitLoginHandler}
        >
          Sign in
        </Button>

        <Box w={"50%"}>
          <Button
            fontWeight={"normal"}
            fontSize={"lg"}
            letterSpacing={"0.1em"}
            color={"#000000"}
            variant={"link"}
            onClick={() => props.setHasForgotPassword(true)}
          >
            Forgot your password?
          </Button>

          <Link href="/register">
            <Button
              mt={"20px"}
              fontWeight={"normal"}
              fontSize={"lg"}
              letterSpacing={"0.1em"}
              color={"#000000"}
              variant={"link"}
            >
              Create an account
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginInputBox;
