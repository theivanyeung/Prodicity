import { useState } from "react";

import { Flex, Box, Heading, Button, Input } from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

const EventModalCreateVoting = (props) => {
  const [titleInput, setTitleInput] = useState("");
  const [choices, setChoices] = useState([]);
  const [titleState, setTitleState] = useState("");
  const [choicesState, setChoicesState] = useState([]);
  const [errorState, setErrorState] = useState("");

  const createVoteHandler = () => {
    let error = false;
    if (titleInput.length === 0) {
      setTitleState("Enter a title");
      error = true;
    } else {
      setTitleState("");
    }
    choices.map((choice, index) => {
      if (choice.length === 0) {
        setChoicesState((existingChoicesState) => {
          return [
            ...existingChoicesState.slice(0, index),
            "Cannot be blank",
            ...existingChoicesState.slice(index + 1),
          ];
        });
        error = true;
      } else {
        setChoicesState((existingChoicesState) => {
          return [
            ...existingChoicesState.slice(0, index),
            "",
            ...existingChoicesState.slice(index + 1),
          ];
        });
      }
    });
    if (choices.length === 0) {
      setErrorState("Enter a choice");
      error = true;
    } else {
      setErrorState("");
    }
    if (error === false) {
      props.createVoteHandler(titleInput, choices);
      props.onClose();
    }
  };

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
            Create Vote
          </Heading>
        </Flex>

        <Box w={"90%"}>
          <Heading
            my={"10px"}
            fontWeight={"medium"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
          >
            Title
          </Heading>
          <Input
            boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
            borderRadius={"12px"}
            maxLength={"200"}
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
          />
          <Flex justifyContent={"space-between"} w={"97%"}>
            <Heading
              ml={"20px"}
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.05em"}
              color={"#FF5858"}
            >
              {titleState}
            </Heading>
            <Heading
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.05em"}
            >
              {titleInput.length} / 200
            </Heading>
          </Flex>
        </Box>

        {choices.map((choice, index) => (
          <Flex key={index} my={"25px"} justifyContent={"space-between"}>
            <Box w={"85%"}>
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"27px"}
                  letterSpacing={"0.05em"}
                >
                  Choice {index + 1}
                </Heading>
                <Input
                  w={"80%"}
                  boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                  borderRadius={"12px"}
                  maxLength={"100"}
                  onChange={(e) => {
                    setChoices((existingChoices) => {
                      return [
                        ...existingChoices.slice(0, index),
                        e.target.value,
                        ...existingChoices.slice(index + 1),
                      ];
                    });
                  }}
                />
              </Flex>
              <Flex justifyContent={"space-between"} w={"97%"}>
                <Heading
                  ml={"90px"}
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  lineHeight={"20px"}
                  letterSpacing={"0.05em"}
                  color={"#FF5858"}
                >
                  {choicesState[index]}
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  lineHeight={"20px"}
                  letterSpacing={"0.05em"}
                >
                  {choice.length} / 100
                </Heading>
              </Flex>
            </Box>
            <Button
              _hover={{
                backgroundColor: "#FFA3A3",
              }}
              onClick={() => {
                setChoices((existingChoices) => {
                  return [
                    ...existingChoices.slice(0, index),
                    ...existingChoices.slice(index + 1),
                  ];
                });
                setChoicesState((existingChoicesState) => {
                  return [
                    ...existingChoicesState.slice(0, index),
                    ...existingChoicesState.slice(index + 1),
                  ];
                });
              }}
            >
              <DeleteIcon />
            </Button>
          </Flex>
        ))}
        <Button
          my={"10px"}
          w={"100%"}
          onClick={() => {
            setChoices((existingChoices) => {
              return [...existingChoices, ""];
            });
            setChoicesState((existingChoicesState) => {
              return [...existingChoicesState, ""];
            });
          }}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"27px"}
            letterSpacing={"0.05em"}
          >
            Add a choice
          </Heading>
        </Button>
        <Heading
          fontWeight={"normal"}
          fontSize={"xs"}
          lineHeight={"20px"}
          letterSpacing={"0.05em"}
          color={"#FF5858"}
        >
          {errorState}
        </Heading>
        <Flex
          mt={"25px"}
          mb={"10px"}
          justifyContent={"space-between"}
          w={"175px"}
        >
          <Button
            w={"70px"}
            h={"30px"}
            borderRadius={"12px"}
            onClick={props.onClose}
          >
            <Heading fontWeight={"medium"} fontSize={"sm"}>
              Cancel
            </Heading>
          </Button>
          <Button
            w={"70px"}
            h={"30px"}
            bgImage={"linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"}
            borderRadius={"12px"}
            onClick={createVoteHandler}
          >
            <Heading fontWeight={"medium"} fontSize={"sm"}>
              Submit!
            </Heading>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EventModalCreateVoting;
