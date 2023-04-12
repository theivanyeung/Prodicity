import { useState } from "react";

import Image from "next/image";

import {
  ModalContent,
  ModalCloseButton,
  Flex,
  Heading,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";

import { Messages } from "../../../../placeholderData";

const ChatMessageControlModalSearchMessage = () => {
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <ModalContent>
      <ModalCloseButton />

      <Flex h={"450px"} justifyContent={"center"} alignItems={"center"}>
        <Flex
          w={"90%"}
          h={"90%"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Heading
            w={"100%"}
            fontWeight={"medium"}
            fontSize={"md"}
            letterSpacing={"0.1em"}
          >
            New Message
          </Heading>
          <Input
            mt={"10px"}
            h={"60px"}
            placeholder={"Search creators..."}
            size={"md"}
            bgColor={"#D6D6D6"}
            borderRadius={"12px"}
            type={"text"}
            value={input}
            onChange={onChange}
          />
          <Box my={"20px"} w={"100%"} h={"0.5px"} bgColor={"#000000"}></Box>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            h={"100%"}
          >
            <Flex flexDirection={"column"} w={"95%"} h={"95%"}>
              {Messages.filter((message) => {
                const searchTerm = input.toLowerCase();
                const name = message.name.toLowerCase();

                return (
                  searchTerm &&
                  name.startsWith(searchTerm) &&
                  name !== searchTerm
                );
              })
                .slice(0, 5)
                .map((message, index) => (
                  <Button key={index} my={"2px"} w={"100%"} h={"50px"}>
                    <Box
                      overflow={"hidden"}
                      w={"40px"}
                      h={"40px"}
                      borderRadius={"100px"}
                    >
                      <Image
                        src={message.icon}
                        alt={"Message Icon"}
                        width={40}
                        height={40}
                      />
                    </Box>
                    <Heading
                      ml={"15px"}
                      w={"80%"}
                      h={"28px"}
                      textAlign={"left"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      fontWeight={"medium"}
                      fontSize={"xl"}
                      lineHeight={"28px"}
                      letterSpacing={"0.1em"}
                      verticalAlign={"bottom"}
                    >
                      {message.name}
                    </Heading>
                  </Button>
                ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ModalContent>
  );
};

export default ChatMessageControlModalSearchMessage;
