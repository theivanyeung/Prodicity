import { Flex, Box, Heading, Button } from "@chakra-ui/react";

const Resolutions = [
  { resolution: "2160p 4k" },
  { resolution: "1440p HD" },
  { resolution: "1080p HD" },
  { resolution: "720p" },
  { resolution: "480p" },
  { resolution: "360p" },
  { resolution: "240p" },
  { resolution: "144p" },
  { resolution: "Auto" },
];

const EventModalResolution = () => {
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
            Quality
          </Heading>
        </Flex>
        <Flex flexDirection={"column"} w={"100%"}>
          {Resolutions.map((quality, index) => (
            <Button key={index} variant={"link"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"27px"}
                letterSpacing={"0.05em"}
                color={"#000000"}
              >
                {quality.resolution}
              </Heading>
            </Button>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default EventModalResolution;
