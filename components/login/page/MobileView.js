import { Box } from "@chakra-ui/react";
import LoginInputBoxMobile from "../sections/InputBox/mobile/Mobile";
import LoginForgotPasswordMobile from "../sections/ForgotPassword/Mobile";

const LoginPageMobileView = (props) => {
  return (
    <Box align={"center"} display={props.display}>
      {props.hasForgotPassword ? (
        <LoginForgotPasswordMobile
          setHasForgotPassword={props.setHasForgotPassword}
          forgotInput={props.forgotInput}
          setForgotInput={props.setForgotInput}
          forgotState={props.forgotState}
          submitForgotPasswordHandler={props.submitForgotPasswordHandler}
        />
      ) : (
        <LoginInputBoxMobile
          submitLoginHandler={props.submitLoginHandler}
          emailState={props.emailState}
          passwordState={props.passwordState}
          setHasForgotPassword={props.setHasForgotPassword}
        />
      )}
    </Box>
  );
};

export default LoginPageMobileView;
