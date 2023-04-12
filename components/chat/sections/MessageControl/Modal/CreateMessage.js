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

import { CloseIcon } from "@chakra-ui/icons";

const Add = [
  {
    id: "1",
    name: "NuurPenguinNuurpenguin",
    icon: "/images/sample-pfp/profile-pic.png",
  },
  { id: "2", name: "NuurPenguin", icon: "/images/sample-pfp/profile-pic.png" },
  { id: "3", name: "NuurPenguin", icon: "/images/sample-pfp/profile-pic.png" },
  { id: "4", name: "NuurPenguin", icon: "/images/sample-pfp/profile-pic.png" },
  { id: "5", name: "NuurPenguin", icon: "/images/sample-pfp/profile-pic.png" },
  { id: "6", name: "NuurPenguin", icon: "/images/sample-pfp/profile-pic.png" },
  { id: "7", name: "NuurPenguin", icon: "/images/sample-pfp/profile-pic.png" },
];

const Friends = [
  {
    id: "1",
    name: "Nuurpenguin",
    username: "@nuurpenguin",
    icon: "/images/sample-pfp/profile-pic.png",
  },
  {
    id: "2",
    name: "Penguinz0",
    username: "@penguin0",
    icon: "/images/sample-pfp/profile-pic.png",
  },
  {
    id: "3",
    name: "Ivan Yeung",
    username: "@theivanyeung",
    icon: "/images/sample-pfp/profile-pic.png",
  },
  {
    id: "4",
    name: "Nuurpenguin",
    username: "@nuurpenguin",
    icon: "/images/sample-pfp/profile-pic.png",
  },
  {
    id: "5",
    name: "Nuur",
    username: "@nuur",
    icon: "/images/sample-pfp/profile-pic.png",
  },
  {
    id: "6",
    name: "Fook",
    username: "@Madlad",
    icon: "/images/sample-pfp/profile-pic.png",
  },
  {
    id: "7",
    name: "Pope",
    username: "@officialketchurch",
    icon: "/images/sample-pfp/profile-pic.png",
  },
];

const ChatMessageControlModalCreateMessage = () => {
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
            w={"100%"}
            h={"65px"}
            placeholder={"Search creators..."}
            size={"md"}
            bgColor={"#D6D6D6"}
            borderRadius={"12px"}
            type={"text"}
            value={input}
            onChange={onChange}
          />

          <Flex
            alignItems={"center"}
            w={"100%"}
            h={"75px"}
            overflowY={"hidden"}
            overflowX={"scroll"}
            sx={{
              "::-webkit-scrollbar": {
                height: "5px",
              },
              "::-webkit-scrollbar-thumb": {
                background: "#777777",
                borderRadius: "10px",
              },
            }}
          >
            {Add.map((add, index) => (
              <Box key={index}>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  mr={"10px"}
                  w={"175px"}
                  h={"40px"}
                  borderRadius={"8px"}
                  border={"1px solid #F4CE96"}
                  bgColor={"#ECECEC"}
                >
                  <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={"50px"}
                  >
                    <Box
                      overflow={"hidden"}
                      w={"33px"}
                      h={"33px"}
                      borderRadius={"100px"}
                    >
                      <Image
                        src={add.icon}
                        alt={"Avatar"}
                        width={33}
                        height={33}
                      />
                    </Box>
                  </Flex>
                  <Heading
                    w={"100px"}
                    h={"20px"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    fontWeight={"medium"}
                    fontSize={"md"}
                    lineHeight={"20px"}
                    letterSpacing={"0.1em"}
                  >
                    {add.name}
                  </Heading>
                  <Button variant={"ghost"} size={"sm"} borderRadius={"100px"}>
                    <CloseIcon w={"10px"} h={"10px"} />
                  </Button>
                </Flex>
              </Box>
            ))}
          </Flex>
          <Box w={"100%"} h={"0.5px"} bgColor={"#000000"}></Box>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            h={"100%"}
          >
            <Flex flexDirection={"column"} w={"95%"} h={"95%"}>
              {Friends.filter((friend) => {
                const searchTerm = input.toLowerCase();
                const name = friend.name.toLowerCase();

                return (
                  searchTerm &&
                  name.startsWith(searchTerm) &&
                  name !== searchTerm
                );
              })
                .slice(0, 5)
                .map((friend, index) => (
                  <Button key={index} my={"2px"} w={"100%"} h={"50px"}>
                    <Box
                      overflow={"hidden"}
                      w={"40px"}
                      h={"40px"}
                      borderRadius={"100px"}
                    >
                      <Image
                        src={friend.icon}
                        alt={"Friend Avatar"}
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
                      {friend.name}

                      {friend.username}
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

export default ChatMessageControlModalCreateMessage;
