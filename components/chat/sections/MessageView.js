import ChatMessageViewLayout from "./MessageView/Layout";
import ChatMessageViewChatFullView from "./MessageView/ChatFullView";
import ChatMessageViewChatBaseView from "./MessageView/ChatBaseView";

const ChatMessageView = () => {
  return (
    <ChatMessageViewLayout>
      <ChatMessageViewChatFullView
        display={{
          xxl: "flex",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <ChatMessageViewChatBaseView
        display={{
          xxl: "none",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      />
    </ChatMessageViewLayout>
  );
};

export default ChatMessageView;
