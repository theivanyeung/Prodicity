import { useEffect, useRef, useState } from "react";

import { Box, Flex, Heading, Input, Button } from "@chakra-ui/react";

const EventInteractivesChat = (props) => {
  const { isHost, creatorData, eventData, chat, lastMessageElement } = props;

  const [chatInput, setChatInput] = useState("");
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(false);
  const [count, setCount] = useState(eventData && eventData.chatCooldown);

  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView();
  }, [chat]);

  const space = "  ";

  const submitChatHandler = (e) => {
    e.preventDefault();
    if (chatInput.length === 0) {
      setError(true);
    } else {
      props.submitChatHandler(chatInput);
      setError(false);
      if (isHost === false && eventData.chatCooldown !== 0) {
        setTimer(true);
        startTimer();
      }
    }
    setChatInput("");
  };

  const startTimer = () => {
    let intervalId;
    if (count && timer && count > 0) {
      intervalId = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 0) {
            clearInterval(slowMode);
            setTimer(false);
            setCount(eventData && eventData.chatCooldown);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  };

  return (
    <Box
      w={"100%"}
      h={"calc(100% - 6.25vw)"}
      overflow={"hidden"}
      bgColor={"#FFFFFF"}
      borderRadius={"0.83vw"}
    >
      {/* LATEST CREATOR MESSAGE */}

      <Box w={"100%"} h={"3.91vw"} bgColor={"#FFF5EC"} overflow={"hidden"}>
        <Box align={"left"} w={"90%"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"0.73vw"}
            lineHeight={"1.3vw"}
            letterSpacing={"0.08vw"}
          >
            Lastest Creator Message
          </Heading>

          {eventData && (
            <Heading
              fontSize={"0.94vw"}
              lineHeight={"1.88vw"}
              letterSpacing={"0.08vw"}
            >
              <span>
                {creatorData.username && creatorData.displayName
                  ? creatorData.displayName
                  : creatorData.username}
              </span>
              {space}
              {eventData.latestCreatorMessage}
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
        w={"90%"}
        h={"calc(100% - 10.64vw)"}
        my={"0.26vw"}
        overflowY={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            width: "0.26vw",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#777777",
            borderRadius: "0.52vw",
          },
        }}
      >
        {chat &&
          chat.map((messageblock, index) => (
            <Box
              ref={index === 0 ? lastMessageElement : null}
              key={index}
              align={"left"}
              my={"0.26vw"}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"0.94vw"}
                lineHeight={"1.41vw"}
                letterSpacing={"0.08vw"}
              >
                <span>{messageblock.username}</span>
                {space}
                {messageblock.message}
                <style jsx>{`
                  span {
                    font-weight: 700;
                    font-size: 1.04vw;
                    line-height: 1.41vw;
                    letter-spacing: 0em;
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
      <Box align={"right"} mb={"1vw"} w={"90%"}>
        <form onSubmit={submitChatHandler}>
          {timer ? (
            <Input
              value={chatInput}
              w={"100%"}
              h={"2.08vw"}
              size={"sm"}
              borderRadius={"6px"}
              placeholder={"Send Message..."}
              maxLength={"500"}
              bgColor={"#EBEBEB"}
              onChange={(e) => {
                setChatInput(e.target.value);
              }}
              isDisabled
            />
          ) : error ? (
            <Input
              value={chatInput}
              w={"100%"}
              h={"2.08vw"}
              size={"sm"}
              borderRadius={"6px"}
              placeholder={"Send Message..."}
              maxLength={"500"}
              bgColor={"#EBEBEB"}
              onChange={(e) => {
                setChatInput(e.target.value);
              }}
              isInvalid
            />
          ) : (
            <Input
              value={chatInput}
              w={"100%"}
              h={"2.08vw"}
              size={"sm"}
              borderRadius={"6px"}
              placeholder={"Send Message..."}
              maxLength={"500"}
              bgColor={"#EBEBEB"}
              onChange={(e) => {
                setChatInput(e.target.value);
              }}
            />
          )}

          <Flex justifyContent={"space-between"} h={"1.04vw"} w={"97%"}>
            <Heading
              fontWeight={"medium"}
              fontSize={"0.63vw"}
              lineHeight={"1.04vw"}
              letterSpacing={"0.08vw"}
            >
              {timer && `${count} seconds`}
            </Heading>

            {chatInput.length > 400 && (
              <Heading
                fontWeight={"medium"}
                fontSize={"0.63vw"}
                lineHeight={"1.04vw"}
                letterSpacing={"0.08vw"}
              >
                {chatInput.length} / 500
              </Heading>
            )}
          </Flex>
          <Button
            type={"submit"}
            w={"3.65vw"}
            h={"1.82vw"}
            bgColor={"#F2CA8D"}
            borderRadius={"0.42vw"}
            onClick={submitChatHandler}
          >
            <Heading
              fontWeight={"normal"}
              fontSize={"0.83vw"}
              lineHeight={"0.83vw"}
              letterSpacing={"0.08vw"}
            >
              Chat
            </Heading>
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EventInteractivesChat;
