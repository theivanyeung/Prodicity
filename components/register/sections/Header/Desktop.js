import Image from "next/image";

import { Box, Heading, Flex } from "@chakra-ui/react";

import RegisterHeaderSwitch from "./Switch";

const Features = [{ item: "Live" }, { item: "Virtual" }, { item: "Events" }];

const RegisterHeaderDesktop = (props) => {
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
        fontWeight={"medium"}
        fontSize={"7xl"}
        lineHeight={"108px"}
        letterSpacing={"0.1em"}
      >
        Prodicity
      </Heading>

      {/* FEATURE LIST */}

      <Flex
        w={"80%"}
        h={"80px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {Features.map((feature, index) => (
          <Heading
            key={index}
            fontWeight={"normal"}
            fontSize={"2xl"}
            letterSpacing={"0.1em"}
          >
            {feature.item}
          </Heading>
        ))}
      </Flex>

      <RegisterHeaderSwitch />
    </Box>
  );
};

export default RegisterHeaderDesktop;
