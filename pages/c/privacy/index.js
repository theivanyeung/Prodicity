import { Flex, Heading } from "@chakra-ui/react";

import SEO from "../../../components/SEO";
import MainLayout from "../../../components/c/layout/Layout";

import {
  PRIVACY_SEO_TITLE,
  PRIVACY_SEO_DESCRIPTION,
  PRIVACY_SEO_KEYWORDS,
  PRIVACY_SEO_IMAGE,
} from "../../../components/constants";

import { PrivacyContent } from "../../../components/items";

const Privacy = () => {
  return (
    <>
      <SEO
        title={PRIVACY_SEO_TITLE}
        description={PRIVACY_SEO_DESCRIPTION}
        keywords={PRIVACY_SEO_KEYWORDS}
        image={PRIVACY_SEO_IMAGE}
      />
      <MainLayout page={"Privacy"}>
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
            Privacy Policy for Prodicity
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
          {PrivacyContent.map((item, index) => (
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

export default Privacy;

Privacy.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
