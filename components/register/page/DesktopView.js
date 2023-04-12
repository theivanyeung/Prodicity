import { Flex, Box } from "@chakra-ui/react";

import RegisterHeader from "../sections/Header";
import RegisterInputBox from "../sections/InputBox";

const RegisterPageDesktopView = (props) => {
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
          <RegisterHeader />
        </Box>
      </Flex>
      <Flex w={"50%"} alignItems={"center"} justifyContent={"center"}>
        <RegisterInputBox
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
      </Flex>
    </Flex>
  );
};

export default RegisterPageDesktopView;
