import { useState } from "react";

import Image from "next/image";

import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import ChatMessageControlMessages from "./components/Messages";
import ChatMessageControlModalCreateMessage from "./Modal/CreateMessage";
import ChatMessageControlModalSearchMessage from "./Modal/SearchMessage";

import { Messages } from "../../../placeholderData";

const ChatMessageControlFullView = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState(<ChatMessageControlModalCreateMessage />);

  return (
    <Box w={"250px"} h={"100%"} bgColor={"#EDEDED"} {...props}>
      <Box align={"center"} w={"100%"} h={"100px"} bgColor={"#E1E1E1"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"92%"}
          h={"50%"}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            letterSpacing={"0.1em"}
          >
            DIRECT MESSAGES
          </Heading>
          <Button
            variant={"ghost"}
            onClick={() => {
              setModal(<ChatMessageControlModalCreateMessage />);
              onOpen();
            }}
          >
            <Image
              src={"/images/create-message-icon.png"}
              alt={"Create Message Icon"}
              width={22}
              height={20}
            />
          </Button>
        </Flex>
        <Flex justifyContent={"center"} w={"95%"} h={"40%"}>
          <Button
            justifyContent={"center"}
            alignItems={"center"}
            w={"90%"}
            h={"90%"}
            borderRadius={"12px"}
            bgColor={"#FFFFFF"}
            _hover={{
              bgColor: "#FFFFFF",
            }}
            onClick={() => {
              setModal(<ChatMessageControlModalSearchMessage />);
              onOpen();
            }}
          >
            <Heading fontWeight={"normal"} fontSize={"md"}>
              Search for messages
            </Heading>
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
          <ModalOverlay />
          {modal}
        </Modal>
      </Box>
      <Flex
        justifyContent={"center"}
        w={"100%"}
        h={"calc(100% - 100px)"}
        overflowX={"hidden"}
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
        <List>
          {Messages.map((message, index) => {
            return (
              <ListItem key={index}>
                <ChatMessageControlMessages
                  icon={message.icon}
                  name={message.name}
                />
              </ListItem>
            );
          })}
        </List>
      </Flex>
    </Box>
  );
};

export default ChatMessageControlFullView;
