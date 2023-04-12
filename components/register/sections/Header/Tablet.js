import Image from "next/image";

import { Box, Heading } from "@chakra-ui/react";

const RegisterHeaderTablet = (props) => {
  return (
    <Box align={"center"} {...props}>
      {/* HEADING */}

      <Image
        src={"/images/prodicity-logo.png"}
        alt={"Prodicity Logo"}
        width={50}
        height={89.51}
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

export default RegisterHeaderTablet;
