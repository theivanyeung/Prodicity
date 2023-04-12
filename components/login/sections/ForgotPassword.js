import { useRef } from "react";

import { Flex, Box, Heading, Input, Button } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

const LoginForgotPassword = (props) => {
  const {
    forgotInput,
    setForgotInput,
    forgotState,
    setHasForgotPassword,
    submitForgotPasswordHandler,
  } = props;

  return (
    <Flex
      w={"600px"}
      h={"650px"}
      justifyContent={"center"}
      bgColor={"#FFFFFF"}
      boxShadow={"0px 0px 10px 5px rgba(255, 255, 255, 0.25)"}
      borderRadius={"36px"}
    >
      <Flex flexDirection={"column"} alignItems={"center"} gap={"25px"}>
        <Flex
          as={"button"}
          flexDirection={"column"}
          alignItems={"center"}
          mt={"50px"}
          mb={"50px"}
          gap={"15px"}
          onClick={() => setHasForgotPassword(false)}
        >
          <ArrowLeftIcon boxSize={"15px"} />
          <Heading
            fontWeight={"normal"}
            fontSize={"md"}
            letterSpacing={"0.05em"}
          >
            Back to login
          </Heading>
        </Flex>
        <Heading
          mb={"42px"}
          fontWeight={"medium"}
          fontSize={"2xl"}
          letterSpacing={"0.1em"}
        >
          Enter your email to change password
        </Heading>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <form onSubmit={submitForgotPasswordHandler}>
            <Input
              value={forgotInput}
              type={"email"}
              placeholder={"Email"}
              w={"424px"}
              h={"50px"}
              bg={"#F6F6F6"}
              boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25"}
              borderRadius={"24px"}
              fontSize={"20px"}
              onChange={(e) => setForgotInput(e.target.value)}
            />
            <Flex alignItems={"center"} mb={"12px"} w={"385px"} h={"24px"}>
              <Heading
                fontWeight={"normal"}
                fontSize={"xs"}
                letterSpacing={"0.05em"}
                color={"#FF5858"}
              >
                {forgotState}
              </Heading>
            </Flex>
            <Button
              type={"submit"}
              mb={"35px"}
              w={"424px"}
              h={"50px"}
              bg={"#F4CE96"}
              boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
              borderRadius={"24px"}
              _hover={{ bg: "#FAD69B" }}
            >
              Submit
            </Button>
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default LoginForgotPassword;
