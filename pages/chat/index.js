import { Flex, Heading } from "@chakra-ui/react";

import ChatMessageControl from "../../components/chat/sections/MessageControl";
import ChatMessageViewLayoutBottomBar from "../../components/chat/sections/MessageView/Layout/BottomBar";
import SEO from "../../components/SEO";

const EmptyChat = () => {
  return (
    // <Flex w={"100%"} h={"100%"} bgColor={"#EFEFEF"}>
    //   <ChatMessageControl />
    //   <Flex alignItems={"flex-end"} w={"100%"} h={"100%"}>
    //     <ChatMessageViewLayoutBottomBar />
    //   </Flex>
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

export default EmptyChat;
