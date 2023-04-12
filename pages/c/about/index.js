import AboutJoin from "../../../components/c/about/Join";
import AboutMain from "../../../components/c/about/Main";
import AboutTitle from "../../../components/c/about/Title";
import MainLayout from "../../../components/c/layout/Layout";
import SEO from "../../../components/SEO";

import {
  ABOUT_SEO_TITLE,
  ABOUT_SEO_DESCRIPTION,
  ABOUT_SEO_KEYWORDS,
  ABOUT_SEO_IMAGE,
} from "../../../components/constants";

const About = () => {
  return (
    <>
      <SEO
        title={ABOUT_SEO_TITLE}
        description={ABOUT_SEO_DESCRIPTION}
        keywords={ABOUT_SEO_KEYWORDS}
        image={ABOUT_SEO_IMAGE}
      />
      <MainLayout page={"About Us"}>
        <AboutTitle />
        <AboutMain />
        <AboutJoin />
      </MainLayout>
    </>
  );
};

export default About;

About.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
