import { useEffect, useState } from "react";

import { Flex, Box, Heading, Button } from "@chakra-ui/react";

import EventModalVotingResults from "../VotingResults";

// BACKEND IMPORTS

import { useCollection } from "react-firebase-hooks/firestore";

const EventModalVoting = (props) => {
  const {
    isHost,
    hasVoted,
    voting,
    userData,
    attendees,
    eventData,
    clickChoiceHandler,
    onClose,
  } = props;

  const [choices] = useCollection(voting && voting);

  const [voted, setVoted] = useState(hasVoted);

  return (
    <>
      {voted ? (
        <EventModalVotingResults
          isHost={isHost}
          voting={voting}
          eventData={eventData}
          onClose={onClose}
        />
      ) : (
        <Flex justifyContent={"center"}>
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
              my={"10px"}
              fontWeight={"medium"}
              fontSize={"2xl"}
              lineHeight={"41px"}
              letterSpacing={"0.1em"}
            >
              {props.eventData.voting.title}
            </Heading>

            {choices &&
              choices?.docs.map((choice, index) => (
                <Button
                  key={index}
                  my={"10px"}
                  w={"250px"}
                  bgColor={"#FFE8DB"}
                  borderRadius={"12px"}
                  onClick={() => {
                    props.clickChoiceHandler(choice.id);
                    setVoted(true);
                  }}
                >
                  {choice.data().choice}
                </Button>
              ))}
          </Box>
        </Flex>
      )}
    </>
  );
};

export default EventModalVoting;
