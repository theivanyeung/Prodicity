import { useState } from "react";

import Image from "next/image";

import {
  Box,
  Flex,
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

const ChatMessageControlBaseView = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState(<ChatMessageControlModalCreateMessage />);

  return (
    <Box w={"75px"} h={"100%"} bgColor={"#EDEDED"} {...props}>
      <Box align={"center"} w={"100%"} h={"100px"} bgColor={"#E1E1E1"}>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"90%"}
          h={"50%"}
        >
          <Button
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
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"90%"}
          h={"50%"}
        >
          <Button
            variant={"ghost"}
            onClick={() => {
              setModal(<ChatMessageControlModalSearchMessage />);
              onOpen();
            }}
          >
            <Image
              src={"/images/search-icon.png"}
              alt={"Search Icon"}
              width={25}
              height={25}
            />
          </Button>

          <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
            <ModalOverlay />
            {modal}
          </Modal>
        </Flex>
      </Box>
      <Flex
        justifyContent={"center"}
        w={"100%"}
        h={"calc(100% - 100px)"}
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

export default ChatMessageControlBaseView;
