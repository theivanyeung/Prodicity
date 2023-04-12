import { useRef } from "react";

import Link from "next/link";

import { Box, Heading, Button } from "@chakra-ui/react";

import LoginHeader from "../../Header";
import LoginInputBoxMobileCredentials from "./Credential";

const LoginInputBoxMobile = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitLoginHandler = () => {
    props.submitLoginHandler(
      emailInputRef.current.value,
      passwordInputRef.current.value
    );
  };

  return (
    <Box w={"100vw"} h={"100vh"} mt={"5vh"} mb={"15vh"} align={"center"}>
      <LoginHeader />

      <Heading
        mb={"42px"}
        fontWeight={"medium"}
        fontSize={"xl"}
        letterSpacing={"0.1em"}
      >
        Create your account
      </Heading>

      <LoginInputBoxMobileCredentials
        emailInputRef={emailInputRef}
        passwordInputRef={passwordInputRef}
        emailState={props.emailState}
        passwordState={props.passwordState}
      />

      <Button
        mb={"35px"}
        w={"80%"}
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
  );
};

export default LoginInputBoxMobile;
