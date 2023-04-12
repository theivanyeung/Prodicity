import { Flex, Box } from "@chakra-ui/react";

import GlobalEventLayoutHeader from "./Layout/Header";
import GlobalLayoutTopBarCenter from "../TopBar/Center";
import GlobalLayoutTopBarEnd from "../TopBar/End";
import GlobalLayoutBarMobile from "../TopBar/End/Mobile";

const GlobalEventLayout = (props) => {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      bgColor={"#E3E3E3"}
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
      <Flex
        justifyContent={"space-between"}
        w={"100%"}
        h={"50px"}
        bgColor={"#FFFFFF"}
      >
        <GlobalEventLayoutHeader />

        {/* FULL VIEW */}

        <Flex
          w={"calc(100% - 220px)"}
          h={"50px"}
          overflow={"hidden"}
          bgColor={"#FFFFFF"}
          display={{
            xxl: "flex",
            xl: "flex",
            lg: "none",
            md: "none",
            sm: "none",
            base: "none",
          }}
        >
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
        </Flex>

        {/* BASE VIEW */}

        <Flex
          w={"calc(100% - 70px)"}
          h={"50px"}
          overflow={"hidden"}
          bgColor={"#FFFFFF"}
          display={{
            xxl: "none",
            xl: "none",
            lg: "flex",
            md: "flex",
            sm: "flex",
            base: "none",
          }}
        >
          <GlobalLayoutTopBarCenter
            display={{
              xxl: "none",
              xl: "none",
              lg: "flex",
              md: "flex",
              sm: "none",
              base: "none",
            }}
          />
          <GlobalLayoutTopBarEnd
            w={"40%"}
            display={{
              xxl: "none",
              xl: "none",
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
              base: "flex",
            }}
          />
        </Flex>
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
      <Box w={"100%"} h={"calc(100% - 50px)"}>
        {props.children}
      </Box>
    </Box>
  );
};

export default GlobalEventLayout;
