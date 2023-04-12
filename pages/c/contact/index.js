import { Flex, Heading } from "@chakra-ui/react";

import MainLayout from "../../../components/c/layout/Layout";
import ContactForm from "../../../components/c/contact/Form";
import SEO from "../../../components/SEO";

import { ContactIntro } from "../../../components/items";

import {
  CONTACT_SEO_TITLE,
  CONTACT_SEO_DESCRIPTION,
  CONTACT_SEO_KEYWORDS,
  CONTACT_SEO_IMAGE,
} from "../../../components/constants";

const Contact = () => {
  return (
    <>
      <SEO
        title={CONTACT_SEO_TITLE}
        description={CONTACT_SEO_DESCRIPTION}
        keywords={CONTACT_SEO_KEYWORDS}
        image={CONTACT_SEO_IMAGE}
      />
      <MainLayout page={"Contact"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          h={"20%"}
          w={"90%"}
          maxW={"800px"}
        >
          <Heading
            fontWeight={"normal"}
            fontSize={"md"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            {ContactIntro}
          </Heading>
        </Flex>
        <ContactForm />
      </MainLayout>
    </>
  );
};

export default Contact;

Contact.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
