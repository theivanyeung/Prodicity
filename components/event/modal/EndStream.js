import { Flex, Box, Heading, Button } from "@chakra-ui/react";

const EndStream = (props) => {
  return (
    <Flex justifyContent={"center"}>
      <Box align={"center"} mb={"25px"} w={"90%"}>
        <Heading
          my={"25px"}
          fontWeight={"medium"}
          fontSize={"2xl"}
          lineHeight={"41px"}
          letterSpacing={"0.1em"}
        >
          End Stream
        </Heading>

        <Flex justifyContent={"space-between"} alignItems={"center"} w={"50%"}>
          <Button
            my={"10px"}
            w={"100px"}
            bgColor={"#FFE8DB"}
            borderRadius={"12px"}
            onClick={() => {
              props.clickStreamHandler();
              props.onClose();
            }}
          >
            Confirm
          </Button>

          <Heading
            mx={"10px"}
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"27px"}
            letterSpacing={"0.05em"}
          >
            or
          </Heading>

          <Button
            variant={"link"}
            onClick={() => {
              props.onClose();
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"27px"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              cancel
            </Heading>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EndStream;
