import { Flex, Heading } from "@chakra-ui/react";

const MainIntroMain = (props) => {
  const {
    marginTop,
    heroWidth,
    descriptionWidth,
    heroFontSize,
    descriptionFontSize,
    display,
  } = props;

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      w={"100%"}
      zIndex={"999"}
      display={display}
    >
      <style jsx>{`
        span {
          background: linear-gradient(93.87deg, #ffaa2b 1.81%, #ff66f9 96.32%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      `}</style>
      <Heading
        mt={marginTop}
        w={heroWidth}
        fontWeight={"bold"}
        fontSize={heroFontSize}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        TOP <span>INTERACTIVE</span> STREAMING PLATFORM FOR CREATORS
      </Heading>
      <Heading
        mt={"3vh"}
        w={descriptionWidth}
        fontWeight={"normal"}
        fontSize={descriptionFontSize}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        This is the new top streaming service with great moderation which equips
        creators to have the chance to directly interact with their VIP
        audience!
      </Heading>
    </Flex>
  );
};

export default MainIntroMain;
