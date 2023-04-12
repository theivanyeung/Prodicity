import { Flex, Heading } from "@chakra-ui/react";

import SEO from "../../../components/SEO";
import MainLayout from "../../../components/c/layout/Layout";

import {
  TOS_SEO_TITLE,
  TOS_SEO_DESCRIPTION,
  TOS_SEO_KEYWORDS,
  TOS_SEO_IMAGE,
} from "../../../components/constants";

import { TOSContent } from "../../../components/items";

const TOS = () => {
  return (
    <>
      <SEO
        title={TOS_SEO_TITLE}
        description={TOS_SEO_DESCRIPTION}
        keywords={TOS_SEO_KEYWORDS}
        image={TOS_SEO_IMAGE}
      />
      <MainLayout page={"TOS"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          h={"20%"}
          w={"90%"}
          maxW={"800px"}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"3xl"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            Terms of Service for Prodicity
          </Heading>
        </Flex>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          bgColor={"#FEFEFE"}
          paddingY={"25px"}
          paddingX={"2%"}
          gap={"15px"}
          maxW={"1000px"}
          w={"90%"}
          h={"65%"}
          borderRadius={"12px"}
          overflowX={"hidden"}
          overflowY={"auto"}
          sx={{
            "::-webkit-scrollbar": {
              width: "0px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#777777",
              borderRadius: "10px",
            },
          }}
        >
          {TOSContent.map((item, index) => (
            <Flex
              key={index}
              flexDirection={"column"}
              alignItems={"flex-start"}
              gap={"10px"}
              w={"100%"}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"lg"}
                letterSpacing={"0.05em"}
              >
                {item.heading}
              </Heading>
              <Heading
                textAlign={"left"}
                fontWeight={"normal"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
              >
                {item.text}
              </Heading>
            </Flex>
          ))}
        </Flex>
      </MainLayout>
    </>
  );
};

export default TOS;

TOS.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
