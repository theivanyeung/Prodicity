import Image from "next/image";

import { Box, Heading } from "@chakra-ui/react";

const LoginHeaderTablet = (props) => {
  return (
    <Box align={"center"} {...props}>
      {/* HEADING */}

      <Image
        src={"/images/prodicity-logo.png"}
        alt={"Prodicity Logo"}
        width={30}
        height={53.71}
      />
      <Heading
        fontWeight={"normal"}
        fontSize={"5xl"}
        lineHeight={"70px"}
        letterSpacing={"0.1em"}
      >
        Prodicity
      </Heading>
    </Box>
  );
};

export default LoginHeaderTablet;
