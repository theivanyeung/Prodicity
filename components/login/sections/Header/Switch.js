import Link from "next/link";

import { Box, Button, Heading } from "@chakra-ui/react";

const LoginHeaderSwitch = () => {
  return (
    <Box
      mt={"25px"}
      w={"252px"}
      h={"50px"}
      boxShadow={"0px 0px 5px 2.5px rgba(255, 255, 255, 0.25)"}
      borderRadius={"20px"}
    >
      <Link href={"/register"}>
        <Button
          w={"50%"}
          h={"full"}
          bgColor={"#FFFFFF"}
          borderRight={"0.5px solid #000000"}
          borderRadius={"20px 0px 0px 20px"}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"xl"}
            letterSpacing={"0.1em"}
          >
            Register
          </Heading>
        </Button>
      </Link>

      <Button
        w={"50%"}
        h={"full"}
        bg={"#F4CE96"}
        borderLeft={"0.5px solid #000000"}
        borderRadius={"0px 20px 20px 0px"}
        _hover={{ bg: "#FAD69B" }}
      >
        <Heading fontWeight={"medium"} fontSize={"xl"} letterSpacing={"0.1em"}>
          Login
        </Heading>
      </Button>
    </Box>
  );
};

export default LoginHeaderSwitch;
