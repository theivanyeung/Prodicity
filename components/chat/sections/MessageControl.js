import ChatMessageControlFullView from "./MessageControl/FullView";
import ChatMessageControlBaseView from "./MessageControl/BaseView";

const ChatMessageControl = () => {
  return (
    <>
      <ChatMessageControlFullView
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <ChatMessageControlBaseView
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "block",
          sm: "block",
          base: "block",
        }}
      />
    </>
  );
};

export default ChatMessageControl;
