import { Box } from "@chakra-ui/react";

import ChatMessageViewLayoutTopBar from "./Layout/TopBar";
import ChatMessageViewLayoutBottomBar from "./Layout/BottomBar";

const ChatMessageViewLayout = ({ children }) => {
  return (
    <Box w={"100%"} h={"100%"}>
      <ChatMessageViewLayoutTopBar />
      <Box w={"100%"} h={"calc(100% - 110px)"}>
        {children}
      </Box>
      <ChatMessageViewLayoutBottomBar />
    </Box>
  );
};

export default ChatMessageViewLayout;
