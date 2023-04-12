import { useRef, useEffect } from "react";

import Image from "next/image";

import { Flex, Box, Heading } from "@chakra-ui/react";

import { MessageBlocks } from "../../../placeholderData";

const ChatMessageViewChatFullView = (props) => {
  const dummy = useRef();

  useEffect(() => {
    dummy.current.scrollIntoView();
  }, []);

  return (
    <Flex
      flexDirection={"column"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
      overflowX={"hidden"}
      overflowY={"auto"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#777777",
          borderRadius: "10px",
        },
      }}
      {...props}
    >
      {MessageBlocks.map((messageblock, index) =>
        (() => {
          return messageblock.user === "Me" ? (
            <Box key={index} align={"right"} w={"95%"}>
              <Flex
                flexDirection={"column"}
                alignItems={"flex-end"}
                w={"500px"}
                h={"100%"}
              >
                <Heading
                  mr={"12px"}
                  fontWeight={"normal"}
                  fontSize={"10px"}
                  lineHeight={"14px"}
                  letterSpacing={"0.1em"}
                  color={"#282828"}
                >
                  {messageblock.time}
                </Heading>
                {messageblock.messages.map((messageItem, index) => (
                  <Heading
                    key={index}
                    mt={"5px"}
                    paddingY={"8px"}
                    paddingX={"12px"}
                    bgColor={"#FFE7D0"}
                    borderRadius={"12px"}
                    fontWeight={"medium"}
                    fontSize={"sm"}
                    textAlign={"left"}
                    lineHeight={"24px"}
                    letterSpacing={"0.1em"}
                  >
                    {messageItem.message}
                  </Heading>
                ))}
              </Flex>
            </Box>
          ) : (
            <Box key={index} align={"left"} w={"95%"}>
              <Flex w={"600px"} h={"100%"}>
                <Flex>
                  <Flex w={"50px"} alignItems={"flex-end"}>
                    <Box
                      overflow={"hidden"}
                      w={"40px"}
                      h={"40px"}
                      borderRadius={"100px"}
                    >
                      <Image
                        src={messageblock.avatar}
                        alt={"Avatar"}
                        width={40}
                        height={40}
                      />
                    </Box>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    alignItems={"flex-start"}
                    w={"500px"}
                  >
                    <Heading
                      mr={"12px"}
                      fontWeight={"normal"}
                      fontSize={"10px"}
                      lineHeight={"14px"}
                      letterSpacing={"0.1em"}
                      color={"#282828"}
                    >
                      {messageblock.time}
                    </Heading>
                    {messageblock.messages.map((messageItem, index) => (
                      <Flex key={index}>
                        <Heading
                          mt={"5px"}
                          paddingY={"8px"}
                          paddingX={"12px"}
                          bgColor={"#FFFFFF"}
                          borderRadius={"12px"}
                          fontWeight={"medium"}
                          fontSize={"sm"}
                          textAlign={"left"}
                          lineHeight={"24px"}
                          letterSpacing={"0.1em"}
                        >
                          {messageItem.message}
                        </Heading>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          );
        })()
      )}
      <br ref={dummy} />
    </Flex>
  );
};

export default ChatMessageViewChatFullView;
