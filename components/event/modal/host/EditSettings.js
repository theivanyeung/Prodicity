import { useState } from "react";

import { Box, Heading, Input, Button, Flex, propNames } from "@chakra-ui/react";

const EditSettings = (props) => {
  const [annoucementSwitch, setAnnoucementSwitch] = useState(
    props.eventData && props.eventData.annoucement
  );
  const [annoucementCooldown, setAnnoucementCooldown] = useState(
    props.eventData && props.eventData.annoucementCooldown
  );
  const [annoucementState, setAnnoucementState] = useState("");
  const [chatCooldown, setChatCooldown] = useState(
    props.eventData && props.chatCooldown
  );
  const [chatState, setChatState] = useState("");

  const clickAnnoucementSwitch = () => {
    setAnnoucementSwitch(!annoucementSwitch);
  };

  const errorHandler = () => {
    let error = false;
    if (annoucementSwitch === true && annoucementCooldown < 0) {
      setAnnoucementState("Invalid cooldown time");
      error = true;
    } else {
      setAnnoucementState("");
    }

    if (chatCooldown < 0) {
      setChatState("Invalid cooldown time");
      error = true;
    } else {
      setAnnoucementState("");
    }
    return error;
  };

  const saveHandler = () => {
    if (errorHandler() === false) {
      props.editSettings(annoucementSwitch, annoucementCooldown, chatCooldown);
      props.onClose();
    }
  };

  return (
    <Flex justifyContent={"center"}>
      <Box align={"center"} mb={"15px"} w={"90%"}>
        <Flex alignItems={"center"} h={"50px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"20px"}
            letterSpacing={"0.1em"}
          >
            Make An Annoucement
          </Heading>
        </Flex>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          my={"20px"}
          w={"100%"}
        >
          <Box>
            <Heading
              fontWeight={"normal"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
            >
              Annoucements
            </Heading>
            <Heading
              fontWeight={"normal"}
              fontSize={"10px"}
              letterSpacing={"0.05em"}
            >
              VIPs can make annoucements each event that will show as a modal in
              the stream
            </Heading>
          </Box>
          {annoucementSwitch === true ? (
            <Flex
              w={"130px"}
              h={"30px"}
              overflow={"hidden"}
              boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
              borderRadius={"20px"}
            >
              <Flex
                as={"button"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"50%"}
                h={"100%"}
                bgColor={"#F4DFBC"}
                borderRight={"0.5px solid #000000"}
                onClick={clickAnnoucementSwitch}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                >
                  Active
                </Heading>
              </Flex>
              <Flex
                as={"button"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"50%"}
                h={"100%"}
                bgColor={"#DCDCDC"}
                borderLeft={"0.5px solid #000000"}
                onClick={clickAnnoucementSwitch}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                >
                  Disable
                </Heading>
              </Flex>
            </Flex>
          ) : (
            <Flex
              w={"130px"}
              h={"30px"}
              overflow={"hidden"}
              boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
              borderRadius={"20px"}
            >
              <Flex
                as={"button"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"50%"}
                h={"100%"}
                bgColor={"#DCDCDC"}
                borderRight={"0.5px solid #000000"}
                onClick={clickAnnoucementSwitch}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                >
                  Active
                </Heading>
              </Flex>
              <Flex
                as={"button"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"50%"}
                h={"100%"}
                bgColor={"#F4DFBC"}
                borderLeft={"0.5px solid #000000"}
                onClick={clickAnnoucementSwitch}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                >
                  Disable
                </Heading>
              </Flex>
            </Flex>
          )}
        </Flex>

        {/* Annoucement Cooldown */}

        {annoucementSwitch === true ? (
          <Box my={"10px"}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"100%"}
            >
              <Box>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"md"}
                  letterSpacing={"0.05em"}
                >
                  Annoucement Cooldown
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"10px"}
                  letterSpacing={"0.05em"}
                >
                  Sets the cooldown in minutes for annoucements
                </Heading>
              </Box>
              <Flex w={"130px"} alignItems={"flex-end"}>
                <Input
                  type={"number"}
                  placeholder={"0"}
                  h={"30px"}
                  boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                  borderRadius={"20px"}
                  onChange={(e) => setAnnoucementCooldown(e.target.value)}
                />
                <Heading
                  mx={"10px"}
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                >
                  minutes
                </Heading>
              </Flex>
            </Flex>
            <Heading
              mt={"5px"}
              ml={"20px"}
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"10px"}
              letterSpacing={"0.05em"}
              color={"#FF5858"}
            >
              {annoucementState}
            </Heading>
          </Box>
        ) : (
          <Box my={"20px"}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"100%"}
            >
              <Box>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"md"}
                  letterSpacing={"0.05em"}
                  color={"#A9A9A9"}
                >
                  Annoucement Cooldown
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"10px"}
                  letterSpacing={"0.05em"}
                  color={"#A9A9A9"}
                >
                  Sets the cooldown in minutes for annoucements
                </Heading>
              </Box>
              <Flex w={"130px"} alignItems={"flex-end"}>
                <Input
                  isDisabled
                  type={"number"}
                  placeholder={
                    props.eventData && props.eventData.annoucementCooldown
                      ? props.eventData.annoucementCooldown
                      : "0"
                  }
                  h={"30px"}
                  boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                  borderRadius={"20px"}
                  onChange={(e) => setAnnoucementCooldown(e.target.value)}
                />
                <Heading
                  mx={"10px"}
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                  color={"#A9A9A9"}
                >
                  minutes
                </Heading>
              </Flex>
            </Flex>
            <Heading
              mt={"5px"}
              ml={"20px"}
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"10px"}
              letterSpacing={"0.05em"}
              color={"#FF5858"}
            >
              {annoucementState}
            </Heading>
          </Box>
        )}

        {/* Chat Cooldown */}

        <Box my={"20px"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"100%"}
          >
            <Box>
              <Heading
                fontWeight={"normal"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
              >
                Chat Cooldown
              </Heading>
              <Heading
                fontWeight={"normal"}
                fontSize={"10px"}
                letterSpacing={"0.05em"}
              >
                Sets the cooldown in seconds for the chat
              </Heading>
            </Box>
            <Flex w={"130px"} alignItems={"flex-end"}>
              <Input
                type={"number"}
                placeholder={
                  props.eventData && props.eventData.chatCooldown
                    ? props.eventData.chatCooldown
                    : "0"
                }
                h={"30px"}
                boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                borderRadius={"20px"}
                onChange={(e) => setChatCooldown(e.target.value)}
              />
              <Heading
                mx={"10px"}
                fontWeight={"normal"}
                fontSize={"xs"}
                letterSpacing={"0.05em"}
              >
                seconds
              </Heading>
            </Flex>
          </Flex>
          <Heading
            mt={"5px"}
            ml={"20px"}
            fontWeight={"normal"}
            fontSize={"xs"}
            lineHeight={"10px"}
            letterSpacing={"0.05em"}
            color={"#FF5858"}
          >
            {chatState}
          </Heading>
        </Box>

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
            onClick={saveHandler}
          >
            <Heading fontWeight={"medium"} fontSize={"sm"}>
              Save
            </Heading>
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EditSettings;
