import { Flex, Box } from "@chakra-ui/react";

import GlobalLayoutNavBar from "./sections/NavBar";
import GlobalLayoutTopBar from "./sections/TopBar";

const GlobalLayout = ({ children }) => {
  return (
    <Flex
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
      <GlobalLayoutNavBar />
      <Box w={"100%"}>
        <GlobalLayoutTopBar />
        <Box h={"calc(100% - 50px)"}>{children}</Box>
      </Box>
    </Flex>
  );
};

export default GlobalLayout;
