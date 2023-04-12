import { Flex, Heading, Button } from "@chakra-ui/react";

const EventModalMediaSettingsOptions = (props) => {
  const { audioTracks, videoTracks, hasAudio, hasVideo, selectOptionHandler } =
    props;

  return (
    <>
      <Flex justifyContent={"center"} w={"90%"}>
        <Heading fontWeight={"medium"} fontSize={"lg"} letterSpacing={"0.05em"}>
          Select either options to change camera or audio
        </Heading>
      </Flex>

      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        gap={"15px"}
        my={"25px"}
        w={"50%"}
      >
        {audioTracks && hasAudio ? (
          <Button
            w={"100%"}
            bgColor={"#FFE8DB"}
            borderRadius={"12px"}
            onClick={() => selectOptionHandler("audio")}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              Audio
            </Heading>
          </Button>
        ) : (
          <Button
            w={"100%"}
            bgColor={"#FFE8DB"}
            borderRadius={"12px"}
            isDisabled
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              Audio
            </Heading>
          </Button>
        )}

        {videoTracks && hasVideo ? (
          <Button
            w={"100%"}
            bgColor={"#FFE8DB"}
            borderRadius={"12px"}
            onClick={() => selectOptionHandler("video")}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              Camera
            </Heading>
          </Button>
        ) : (
          <Button
            w={"100%"}
            bgColor={"#FFE8DB"}
            borderRadius={"12px"}
            isDisabled
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              Camera
            </Heading>
          </Button>
        )}
      </Flex>
    </>
  );
};

export default EventModalMediaSettingsOptions;
