import {
  Flex,
  Box,
  Heading,
  Button,
  Progress,
  Divider,
} from "@chakra-ui/react";

// BACKEND IMPORTS

import { useCollection } from "react-firebase-hooks/firestore";

const EventModalVotingResults = (props) => {
  const [choices] = useCollection(props.voting && props.voting);

  return (
    <Flex
      justifyContent={"center"}
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
            Voting
          </Heading>
        </Flex>

        <Heading
          fontWeight={"medium"}
          fontSize={"2xl"}
          lineHeight={"41px"}
          letterSpacing={"0.1em"}
        >
          {props.eventData.voting.title}
        </Heading>

        {choices &&
          choices?.docs.map((choice, index) => (
            <Box key={index} align={"left"}>
              <Divider my={"10px"} />
              <Heading
                my={"5px"}
                mx={"12px"}
                fontWeight={"medium"}
                fontSize={"lg"}
                letterSpacing={"0.1em"}
              >
                {choice.data().choice}
              </Heading>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Progress
                  colorScheme={"blackAlpha"}
                  h={"35px"}
                  w={"85%"}
                  borderRadius={"12px"}
                  boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
                  bgImage={
                    "linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"
                  }
                  value={
                    props.eventData.voting.totalVotes !== 0 &&
                    choice.data().votes !== 0
                      ? (choice.data().votes /
                          props.eventData.voting.totalVotes) *
                        100
                      : 0
                  }
                />
                <Heading
                  fontWeight={"medium"}
                  fontSize={"lg"}
                  letterSpacing={"0.1em"}
                >
                  {props.eventData.voting.totalVotes !== 0 &&
                  choice.data().votes !== 0
                    ? parseInt(
                        (choice.data().votes /
                          props.eventData.voting.totalVotes) *
                          100
                      )
                    : 0}
                  %
                </Heading>
              </Flex>
              <Heading
                mt={"10px"}
                mx={"12px"}
                fontWeight={"medium"}
                fontSize={"xs"}
                letterSpacing={"0.1em"}
              >
                {choice.data().votes} votes
              </Heading>
            </Box>
          ))}

        {props.isHost && (
          <Button
            my={"25px"}
            w={"100px"}
            h={"35px"}
            bgImage={"linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"}
            borderRadius={"12px"}
            onClick={() => {
              props.closeVoteHandler();
              props.onClose();
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.01em"}
            >
              End Vote
            </Heading>
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default EventModalVotingResults;
