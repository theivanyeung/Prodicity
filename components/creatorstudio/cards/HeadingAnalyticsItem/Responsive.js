import { Flex, Heading, Skeleton } from "@chakra-ui/react";

const CreatorStudioCardHeadingAnalyticsItemResponsive = (props) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      my={"10px"}
      w={"90%"}
      h={"100px"}
      borderRadius={"8px"}
      bgColor={"#FFFFFF"}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        w={"90%"}
        h={"70%"}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"md"}
          lineHeight={"27px"}
          letterSpacing={"0.1em"}
        >
          {props.title}
        </Heading>
        {props.data !== null ? (
          <Heading
            fontWeight={"medium"}
            fontSize={"xl"}
            lineHeight={"61px"}
            letterSpacing={"0.1em"}
          >
            {props.data}
          </Heading>
        ) : (
          <Skeleton w={"100%"} h={"61px"} />
        )}
      </Flex>
    </Flex>
  );
};

export default CreatorStudioCardHeadingAnalyticsItemResponsive;
