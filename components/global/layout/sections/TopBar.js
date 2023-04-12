import { Flex } from "@chakra-ui/react";

import GlobalLayoutTopBarCenter from "./TopBar/Center";
import GlobalLayoutTopBarEnd from "./TopBar/End";
import GlobalLayoutBarMobile from "./TopBar/Mobile";

const GlobalLayoutTopBar = () => {
  return (
    <Flex h={"50px"} overflow={"hidden"} bgColor={"#FFFFFF"}>
      <GlobalLayoutTopBarCenter
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "none",
          base: "none",
        }}
      />

      <GlobalLayoutTopBarEnd
        w={"40%"}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "none",
          base: "none",
        }}
      />
      <GlobalLayoutTopBarEnd
        w={"100%"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "flex",
          base: "none",
        }}
      />
      <GlobalLayoutBarMobile
        w={"100%"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "flex",
        }}
      />
    </Flex>
  );
};

export default GlobalLayoutTopBar;
