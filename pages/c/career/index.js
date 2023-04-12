import Link from "next/link";

import { Heading, Flex, Button } from "@chakra-ui/react";

import MainLayout from "../../../components/c/layout/Layout";
import SEO from "../../../components/SEO";

import {
  CAREER_SEO_TITLE,
  CAREER_SEO_DESCRIPTION,
  CAREER_SEO_KEYWORDS,
  CAREER_SEO_IMAGE,
} from "../../../components/constants";

const Career = () => {
  return (
    <>
      <SEO
        title={CAREER_SEO_TITLE}
        description={CAREER_SEO_DESCRIPTION}
        keywords={CAREER_SEO_KEYWORDS}
        image={CAREER_SEO_IMAGE}
      />
      <MainLayout page={"Career"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          h={"20%"}
          w={"90%"}
          maxW={"800px"}
        >
          <Heading
            fontWeight={"normal"}
            fontSize={"lg"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            ✨ Future job openings will be posted here. If you are really
            interested in becoming part of the team, contact us through our
            webpage form!
          </Heading>
        </Flex>

        <Link href={"/c/contact"}>
          <Button
            bgImage={
              "linear-gradient(96.08deg, rgba(244, 206, 150, 0.5) 16.62%, rgba(248, 56, 253, 0.5) 234.5%)"
            }
            _hover={{
              bgImage:
                "linear-gradient(96.08deg, rgba(244, 206, 150, 0.75) 16.62%, rgba(248, 56, 253, 0.75) 234.5%)",
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              letterSpacing={"0.05em"}
            >
              Contact Us!
            </Heading>
          </Button>
        </Link>
      </MainLayout>
    </>
  );
};

export default Career;

Career.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
