import { Flex } from "@chakra-ui/react";

import MainLayout from "../components/c/layout/Layout";
import MainIntro from "../components/c/main/Intro";
import MainCarousel from "../components/c/main/Carousel";
import SEO from "../components/SEO";

import {
  HOME_SEO_TITLE,
  HOME_SEO_DESCRIPTION,
  HOME_SEO_KEYWORDS,
  HOME_SEO_IMAGE,
} from "../components/constants";

const Main = () => {
  return (
    <>
      <SEO
        title={HOME_SEO_TITLE}
        description={HOME_SEO_DESCRIPTION}
        keywords={HOME_SEO_KEYWORDS}
        image={HOME_SEO_IMAGE}
      />
      <MainLayout page={"main"}>
        <MainIntro />
        <MainCarousel />
      </MainLayout>
    </>
  );
};

export default Main;

Main.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
