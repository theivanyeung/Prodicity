import Image from "next/image";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { ProdicityLogo, ProdicityMission } from "../../../items";

const AboutMainBase = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      padding={"2%"}
      gap={"15px"}
      w={"95%"}
      maxW={"600px"}
      bgColor={"#FEFEFE"}
      borderRadius={"24px"}
      display={props.display}
    >
      <Box w={"25%"}>
        <Image
          src={"/images/prodicity-logo-2.png"}
          alt={ProdicityLogo}
          width={37.5}
          height={67.13625}
        />
      </Box>

      <Flex
        w={"90%"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"25px"}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"3xl"}
          letterSpacing={"0.05em"}
        >
          Prodicity&apos;s Mission
        </Heading>
        <Heading fontWeight={"normal"} fontSize={"sm"} letterSpacing={"0.05em"}>
          {ProdicityMission}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default AboutMainBase;
