import { Box, Heading, Flex, Button, Input } from "@chakra-ui/react";

const RegisterVerify = (props) => {
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
          fontSize={"xl"}
          letterSpacing={"0.1em"}
        >
          A verification code was sent to your email!
        </Heading>

        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={"75px"}
          mb={"50px"}
          w={"424px"}
          h={"50px"}
        >
          <Input
            value={props.codeInput}
            type={"text"}
            placeholder={"Verification Code"}
            h={"50px"}
            bg={"#F6F6F6"}
            boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25"}
            borderRadius={"24px"}
            fontSize={"20px"}
            onChange={(e) => props.setCodeInput(e.target.value)}
          />
        </Flex>

        <Flex alignItems={"center"} mb={"12px"} w={"385px"} h={"24px"}>
          <Heading
            fontWeight={"normal"}
            fontSize={"xs"}
            letterSpacing={"0.05em"}
            color={"#FF5858"}
          >
            {props.codeState}
          </Heading>
        </Flex>

        <Button
          mb={"35px"}
          w={"424px"}
          h={"50px"}
          bg={"#F4CE96"}
          boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
          borderRadius={"24px"}
          _hover={{ bg: "#FAD69B" }}
          onClick={props.createUser}
        >
          Confirm!
        </Button>

        <Box w={"100%"} align={"center"}>
          <Button
            fontWeight={"normal"}
            fontSize={"lg"}
            letterSpacing={"0.1em"}
            color={"#000000"}
            variant={"link"}
            onClick={props.resendCode}
          >
            Resend code
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default RegisterVerify;
