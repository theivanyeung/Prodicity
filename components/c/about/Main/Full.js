import Image from "next/image";

import { Box, Flex, Heading } from "@chakra-ui/react";

import { ProdicityLogo, ProdicityMission } from "../../../items";

const AboutMainFull = (props) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      padding={"2%"}
      w={"70%"}
      maxW={"1200px"}
      minW={"800px"}
      bgColor={"#FEFEFE"}
      borderRadius={"24px"}
      display={props.display}
    >
      <Box w={"25%"}>
        <Image
          src={"/images/prodicity-logo-2.png"}
          alt={ProdicityLogo}
          width={125}
          height={223.7875}
        />
      </Box>

      <Flex
        w={"75%"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        gap={"25px"}
      >
        <Heading fontWeight={"bold"} fontSize={"5xl"} letterSpacing={"0.05em"}>
          Prodicity&apos;s Mission
        </Heading>
        <Heading
          textAlign={"left"}
          fontWeight={"normal"}
          fontSize={"lg"}
          letterSpacing={"0.05em"}
        >
          {ProdicityMission}
        </Heading>
      </Flex>
    </Flex>
  );
};

export default AboutMainFull;
