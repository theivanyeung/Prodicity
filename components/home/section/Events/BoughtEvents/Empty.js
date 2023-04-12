import { Flex, Box, Heading } from "@chakra-ui/react";

const HomeEventsBoughtEventsEmpty = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      my={"25px"}
      w={"98%"}
      h={"150px"}
      borderRadius={"20px"}
      bgColor={"#C9C9C9"}
    >
      <Box w={"100%"}>
        <Heading
          mt={"15px"}
          fontWeight={"normal"}
          fontSize={"4xl"}
          letterSpacing={"0.1em"}
          color={"#272727"}
        >
          Accessed Events
        </Heading>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          mb={"25px"}
          w={"100%"}
        >
          <Heading
            mt={"30px"}
            fontWeight={"normal"}
            fontSize={"xl"}
            letterSpacing={"0.1em"}
            color={"#272727"}
          >
            Register for events to access them.
          </Heading>
        </Flex>
      </Box>
    </Flex>
  );
};

export default HomeEventsBoughtEventsEmpty;
