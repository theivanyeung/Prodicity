import { Flex, Box, Heading, Button } from "@chakra-ui/react";

const EventModalScreenShare = (props) => {
  const { onClose, screenAudioActive, toggleScreenShare, toggleScreenAudio } =
    props;

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      maxH={"700px"}
      overflowY={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#777777",
          borderRadius: "10px",
        },
      }}
    >
      <Box align={"center"} mb={"25px"} w={"90%"}>
        <Flex alignItems={"center"} h={"50px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"20px"}
            letterSpacing={"0.1em"}
          >
            Screen Share Settings
          </Heading>
        </Flex>
      </Box>

      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        gap={"25px"}
        mb={"50px"}
        w={"75%"}
      >
        {screenAudioActive === null ? (
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
              {"Couldn't get audio :("}
            </Heading>
          </Button>
        ) : (
          <Button
            w={"100%"}
            bgColor={"#FFE8DB"}
            borderRadius={"12px"}
            onClick={() => {
              toggleScreenAudio();
              onClose();
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              letterSpacing={"0.05em"}
              color={"#000000"}
            >
              {screenAudioActive ? "Mute screen audio" : "Enable stream audio"}
            </Heading>
          </Button>
        )}

        <Button
          w={"100%"}
          bgColor={"#FFA3A3"}
          borderRadius={"12px"}
          onClick={() => {
            toggleScreenShare();
            onClose();
          }}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"lg"}
            letterSpacing={"0.05em"}
            color={"#000000"}
          >
            End Screen Share
          </Heading>
        </Button>
      </Flex>
    </Flex>
  );
};

export default EventModalScreenShare;
