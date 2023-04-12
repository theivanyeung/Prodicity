import { Button, Flex, Heading, Radio } from "@chakra-ui/react";

const EventModalMediaSettingsVideo = (props) => {
  const { video, videoTracks, onChangeAudioVideoTracks, onClose } = props;

  return (
    <>
      <Flex justifyContent={"center"} w={"90%"}>
        <Heading fontWeight={"medium"} fontSize={"lg"} letterSpacing={"0.05em"}>
          Select camera options to change video
        </Heading>
      </Flex>

      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        gap={"15px"}
        my={"25px"}
        w={"75%"}
      >
        {videoTracks.map((track, index) => (
          <Button
            key={index}
            w={"100%"}
            borderRadius={"12px"}
            onClick={() => {
              if (track.label !== video.getTrackLabel()) {
                onChangeAudioVideoTracks(track, "video");
              }
              onClose();
            }}
          >
            {track.label === video.getTrackLabel() ? (
              <Radio colorScheme={"blackAlpha"} defaultChecked>
                <Heading
                  fontWeight={"medium"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                >
                  {track.label}
                </Heading>
              </Radio>
            ) : (
              <Radio>
                <Heading
                  fontWeight={"medium"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                >
                  {track.label}
                </Heading>
              </Radio>
            )}
          </Button>
        ))}
      </Flex>
    </>
  );
};

export default EventModalMediaSettingsVideo;
