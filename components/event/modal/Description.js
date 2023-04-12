import { Flex, Box, Heading } from "@chakra-ui/react";

const EventModalDescription = (props) => {
  return (
    <Flex justifyContent={"center"}>
      <Box align={"center"} mb={"25px"} w={"90%"}>
        <Flex alignItems={"center"} h={"50px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"20px"}
            letterSpacing={"0.1em"}
          >
            Description
          </Heading>
        </Flex>

        <Heading
          textAlign={"left"}
          fontWeight={"normal"}
          fontSize={"md"}
          letterSpacing={"0.1em"}
        >
          {props.description}
        </Heading>
      </Box>
    </Flex>
  );
};

export default EventModalDescription;
