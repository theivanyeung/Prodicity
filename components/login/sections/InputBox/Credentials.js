import { Input, Flex, Heading } from "@chakra-ui/react";

const LoginInputBoxCredentials = (props) => {
  return (
    <>
      <Input
        type={"email"}
        placeholder={"Email"}
        w={"424px"}
        h={"50px"}
        bg={"#F6F6F6"}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25"}
        borderRadius={"24px"}
        fontSize={"20px"}
        ref={props.emailInputRef}
      />
      <Flex alignItems={"center"} mb={"12px"} w={"385px"} h={"24px"}>
        <Heading
          fontWeight={"normal"}
          fontSize={"xs"}
          letterSpacing={"0.05em"}
          color={"#FF5858"}
        >
          {props.emailState}
        </Heading>
      </Flex>
      <Input
        type={"password"}
        placeholder={"Password"}
        w={"424px"}
        h={"50px"}
        bg={"#F6F6F6"}
        boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25"}
        borderRadius={"24px"}
        fontSize={"20px"}
        ref={props.passwordInputRef}
      />
      <Flex alignItems={"center"} mb={"12px"} w={"385px"} h={"24px"}>
        <Heading
          fontWeight={"normal"}
          fontSize={"xs"}
          letterSpacing={"0.05em"}
          color={"#FF5858"}
        >
          {props.passwordState}
        </Heading>
      </Flex>
    </>
  );
};

export default LoginInputBoxCredentials;
