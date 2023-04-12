import { Flex, Heading } from "@chakra-ui/react";

const AboutTitle = () => {
  return (
    <>
      {/** FULL VIEW */}

      <Flex
        my={"7vh"}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <Heading
          fontWeight={"light"}
          fontSize={"5xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          About Us
        </Heading>
      </Flex>

      {/** BASE VIEW */}

      <Flex
        my={"2vh"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      >
        <Heading
          fontWeight={"light"}
          fontSize={"2xl"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          About Us
        </Heading>
      </Flex>
    </>
  );
};

export default AboutTitle;
