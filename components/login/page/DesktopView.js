import { Flex, Box } from "@chakra-ui/react";

import LoginHeader from "../sections/Header";
import LoginInputBox from "../sections/InputBox";
import LoginForgotPassword from "../sections/ForgotPassword";

const LoginPageDesktopView = (props) => {
  return (
    <Flex
      my={"15vh"}
      w={"80%"}
      alignItems={"center"}
      justifyContent={"center"}
      display={props.display}
    >
      <Flex w={"50%"} alignItems={"center"} justifyContent={"center"}>
        <Box w={"full"} align={"center"}>
          <LoginHeader />
        </Box>
      </Flex>
      <Flex w={"50%"} alignItems={"center"} justifyContent={"center"}>
        {props.hasForgotPassword ? (
          <LoginForgotPassword
            setHasForgotPassword={props.setHasForgotPassword}
            forgotInput={props.forgotInput}
            setForgotInput={props.setForgotInput}
            forgotState={props.forgotState}
            submitForgotPasswordHandler={props.submitForgotPasswordHandler}
          />
        ) : (
          <LoginInputBox
            submitLoginHandler={props.submitLoginHandler}
            emailState={props.emailState}
            passwordState={props.passwordState}
            setHasForgotPassword={props.setHasForgotPassword}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default LoginPageDesktopView;
