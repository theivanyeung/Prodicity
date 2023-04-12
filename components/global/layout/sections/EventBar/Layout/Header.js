import { Box } from "@chakra-ui/react";

import GlobalLayoutNavBarHeader from "../../NavBar/Header";

const GlobalEventLayoutHeader = () => {
  return (
    <Box>
      {/* DESKTOP VIEW */}

      <Box
        w={"220px"}
        h={"100%"}
        bgColor={"#FFFFFF"}
        display={{
          xxl: "block",
          xl: "block",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <GlobalLayoutNavBarHeader />
      </Box>

      {/* TABLET VIEW */}

      <Box
        w={"70px"}
        h={"100%"}
        bgColor={"#FFFFFF"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "block",
          md: "block",
          sm: "block",
          base: "none",
        }}
      >
        <GlobalLayoutNavBarHeader />
      </Box>
    </Box>
  );
};

export default GlobalEventLayoutHeader;
