import { Flex, Box } from "@chakra-ui/react";

import LoginHeader from "../sections/Header";
import LoginInputBox from "../sections/InputBox";
import LoginForgotPassword from "../sections/ForgotPassword";

const LoginPageTabletView = (props) => {
  return (
    <Box my={"10vh"} w={"80%"} align={"center"} display={props.display}>
      <Flex w={"50%"} alignItems={"center"} justifyContent={"center"}>
        <Box w={"full"} align={"center"}>
          <LoginHeader />
        </Box>
      </Flex>
      <Flex w={"full"} alignItems={"center"} justifyContent={"center"}>
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
            hasForgotPassword={props.hasForgotPassword}
            setHasForgotPassword={props.setHasForgotPassword}
          />
        )}
      </Flex>
    </Box>
  );
};

export default LoginPageTabletView;
