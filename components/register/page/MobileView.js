import { Box } from "@chakra-ui/react";

import RegisterInputBoxMobile from "../sections/InputBox/mobile/Mobile";

const RegisterPageMobileView = (props) => {
  return (
    <Box align={"center"} display={props.display}>
      <RegisterInputBoxMobile
        createUser={props.createUser}
        submitRegisterHandler={props.submitRegisterHandler}
        month={props.month}
        day={props.day}
        year={props.year}
        setMonth={props.setMonth}
        setNumMonth={props.setNumMonth}
        setDay={props.setDay}
        setYear={props.setYear}
        emailState={props.emailState}
        usernameState={props.usernameState}
        passwordState={props.passwordState}
        dateState={props.dateState}
      />
    </Box>
  );
};

export default RegisterPageMobileView;
