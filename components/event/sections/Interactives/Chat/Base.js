import { useEffect, useRef, useState } from "react";

import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";

import { ChatMessages } from "../../../../placeholderData";

import { useCollection } from "react-firebase-hooks/firestore";

const EventInteractivesChatBase = (props) => {
  const [messages] = useCollection(
    props.chat && props.chat.orderBy("createdAt")
  );

  const [chatInput, setChatInput] = useState("");
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(false);
  const [count, setCount] = useState(1);

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView();
    setTimer(true);
  }, []);

  const space = "  ";

  const submitChatHandler = (e) => {
    e.preventDefault();
    if (chatInput.length === 0) {
      setError(true);
    } else {
      props.submitChatHandler(chatInput);
      setError(false);
      if (props.isHost === false && props.eventData.chatCooldown !== 0) {
        setTimer(true);
      }
    }
    setChatInput("");
  };

  useEffect(() => {
    let slowMode = null;
    if (count && timer && count > 0) {
      slowMode = setInterval(() => {
        setCount((count) => count - 1);
      }, 1000);
    } else if (count < 1) {
      clearInterval(slowMode);
      setTimer(false);
      setCount(props.eventData && props.eventData.chatCooldown);
    }
    return () => clearInterval(slowMode);
  }, [timer, count]);

  return (
    <Box
      align={"center"}
      w={"100vw"}
      h={"100vh"}
      overflow={"hidden"}
      bgColor={"#FFFFFF"}
    >
      <Flex
        justifyContent={"flex-start"}
        alignItems={"center"}
        w={"100%"}
        h={"50px"}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"lg"}
          letterSpacing={"0.05em"}
          ml={"20px"}
        >
          Chat
        </Heading>
      </Flex>

      {/* LATEST CREATOR MESSAGE */}

      <Box w={"100%"} h={"50px"} bgColor={"#FFF5EC"} overflow={"hidden"}>
        <Box align={"left"} paddingLeft={"10px"} w={"100%"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"xs"}
            letterSpacing={"0.05em"}
          >
            Lastest Creator Message
          </Heading>

          {props.eventData && (
            <Heading fontSize={"sm"} letterSpacing={"0.05em"}>
              <span>
                {props.creatorData.username && props.creatorData.displayName
                  ? props.creatorData.displayName
                  : props.creatorData.username}
              </span>
              {space}
              {props.eventData.latestCreatorMessage}
              <style jsx>{`
                span {
                  background-image: linear-gradient(
                    94.21deg,
                    #ff910f -33.38%,
                    #db3bf5 43.41%
                  );
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                }
              `}</style>
            </Heading>
          )}
        </Box>
      </Box>

      {/* CHAT */}

      <Box
        w={"100%"}
        h={"calc(100vh - 160px)"}
        paddingLeft={"10px"}
        overflowY={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            width: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#777777",
            borderRadius: "100px",
          },
        }}
      >
        {messages &&
          messages?.docs.map((messageblock, index) => (
            <Box key={index} align={"left"} my={"5px"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
              >
                <span>{messageblock.data().username}</span>
                {space}
                {messageblock.data().message}
                <style jsx>{`
                  span {
                    font-weight: 700;
                    font-size: 16px;
                    background-image: linear-gradient(
                      94.21deg,
                      #ff910f -33.38%,
                      #db3bf5 43.41%
                    );
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                  }
                `}</style>
              </Heading>
            </Box>
          ))}
        <br ref={dummy} />
      </Box>

      {/* CHAT INPUT */}
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        h={"35px"}
      >
        <style jsx>{`
          form {
            width: 95%;
          }
        `}</style>
        <form onSubmit={submitChatHandler}>
          <Flex justifyContent={"center"} alignItems={"center"} gap={"15px"}>
            {timer ? (
              <Input
                value={chatInput}
                w={"100%"}
                h={"35px"}
                placeholder={"Send Message..."}
                maxLength={"500"}
                bgColor={"#EBEBEB"}
                size={"md"}
                onChange={(e) => {
                  setChatInput(e.target.value);
                }}
                isDisabled
              />
            ) : error ? (
              <Input
                value={chatInput}
                w={"100%"}
                h={"35px"}
                placeholder={"Send Message..."}
                maxLength={"500"}
                bgColor={"#EBEBEB"}
                size={"md"}
                onChange={(e) => {
                  setChatInput(e.target.value);
                }}
                isInvalid
              />
            ) : (
              <Input
                value={chatInput}
                w={"100%"}
                h={"35px"}
                placeholder={"Send Message..."}
                maxLength={"500"}
                bgColor={"#EBEBEB"}
                size={"md"}
                onChange={(e) => {
                  setChatInput(e.target.value);
                }}
              />
            )}
          </Flex>
        </form>
      </Flex>
      <Flex justifyContent={"space-between"} w={"90%"} h={"25px"}>
        <Heading fontWeight={"medium"} fontSize={"xs"} letterSpacing={"0.05em"}>
          {timer && `${count} seconds`}
        </Heading>
        {chatInput.length > 400 && (
          <Heading
            fontWeight={"medium"}
            fontSize={"xs"}
            letterSpacing={"0.05em"}
          >
            {chatInput.length} / 500
          </Heading>
        )}
      </Flex>
    </Box>
  );
};

export default EventInteractivesChatBase;
