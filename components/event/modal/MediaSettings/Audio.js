import { Button, Checkbox, Flex, Heading, Radio } from "@chakra-ui/react";

const EventModalMediaSettingsAudio = (props) => {
  const { audio, audioTracks, onChangeAudioVideoTracks, onClose } = props;

  return (
    <>
      <Flex justifyContent={"center"} w={"90%"}>
        <Heading fontWeight={"medium"} fontSize={"lg"} letterSpacing={"0.05em"}>
          Select mic options to change audio
        </Heading>
      </Flex>

      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        gap={"15px"}
        my={"25px"}
        w={"75%"}
      >
        {audioTracks.map((track, index) => (
          <Button
            key={index}
            w={"100%"}
            borderRadius={"12px"}
            onClick={() => {
              if (track.label !== audio.getTrackLabel()) {
                onChangeAudioVideoTracks(track, "audio");
              }
              onClose();
            }}
          >
            {track.label === audio.getTrackLabel() ? (
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

export default EventModalMediaSettingsAudio;
