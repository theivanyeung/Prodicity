import { Flex, Heading } from "@chakra-ui/react";

import ChatMessageControl from "../../../components/chat/sections/MessageControl";
import ChatMessageView from "../../../components/chat/sections/MessageView";
import SEO from "../../../components/SEO";

const Chat = () => {
  return (
    // <Flex w={"100%"} h={"100%"} bgColor={"#EFEFEF"}>
    //   <ChatMessageControl />
    //   <ChatMessageView />
    // </Flex>
    <>
      <SEO
        title={"Community - Prodicity"}
        description={""}
        keywords={""}
        image={""}
      />
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        h={"100%"}
        bgColor={"#EFEFEF"}
      >
        <Heading
          fontWeight={"normal"}
          fontSize={"3xl"}
          letterSpacing={"0.05em"}
        >
          Communities coming soon!
        </Heading>
      </Flex>
    </>
  );
};

export default Chat;
