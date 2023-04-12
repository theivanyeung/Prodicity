import Link from "next/link";

import { Box, Heading, Flex, Button, Input } from "@chakra-ui/react";

import RegisterHeader from "../../Header";

const RegisterInputBoxMobileCreatePageForm = (props) => {
  return (
    <Box w={"100vw"} h={"100vh"} mt={"5vh"} mb={"15vh"} align={"center"}>
      <RegisterHeader />

      <Heading
        mb={"42px"}
        fontWeight={"medium"}
        fontSize={"xl"}
        letterSpacing={"0.1em"}
      >
        Claim your page!
      </Heading>

      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"80%"}
        h={"50px"}
      >
        <Heading
          mr={"5px"}
          fontSize={"lg"}
          fontWeight={"normal"}
          letterSpacing={"0.05em"}
        >
          prodicity.io/
        </Heading>
        <Input
          type={"text"}
          placeholder={"Username"}
          bg={"#F6F6F6"}
          boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25"}
          borderRadius={"24px"}
          fontSize={"20px"}
          ref={props.usernameInputRef}
        />
      </Flex>
      <Flex alignItems={"center"} mb={"12px"} w={"70%"} h={"24px"}>
        <Heading
          fontWeight={"normal"}
          fontSize={"xs"}
          letterSpacing={"0.05em"}
          color={"#FF5858"}
        >
          {props.usernameState}
        </Heading>
      </Flex>

      <Button
        mb={"35px"}
        w={"80%"}
        h={"50px"}
        bg={"#F4CE96"}
        boxShadow={" 0px 4px 4px rgba(0, 0, 0, 0.25)"}
        borderRadius={"24px"}
        _hover={{ bg: "#FAD69B" }}
        onClick={props.selectNextForm}
      >
        Next
      </Button>

      <Link href="/login">
        <Button
          mb={"10vh"}
          fontWeight={"normal"}
          fontSize={"md"}
          letterSpacing={"0.1em"}
          color={"#000000"}
          variant={"link"}
        >
          Already have an account?
        </Button>
      </Link>
    </Box>
  );
};

export default RegisterInputBoxMobileCreatePageForm;
