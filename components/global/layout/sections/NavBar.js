import { Box } from "@chakra-ui/react";

import GlobalLayoutNavBarHeader from "./NavBar/Header";
import GlobalLayoutNavBarPages from "./NavBar/Pages";
import GlobalLayoutNavBarFollowing from "./NavBar/Following";

const GlobalLayoutNavBar = (props) => {
  return (
    <Box>
      {/* DESKTOP VIEW */}

      <Box
        w={"220px"}
        h={"100%"}
        bgColor={"#F6F9FB"}
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
        <Box
          h={"calc(100% - 50px)"}
          overflowY={"hidden"}
          _hover={{
            overflowY: "auto",
          }}
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
          <GlobalLayoutNavBarPages />
          <GlobalLayoutNavBarFollowing />
        </Box>
      </Box>

      {/* TABLET VIEW */}

      <Box
        w={"70px"}
        h={"100%"}
        bgColor={"#F6F9FB"}
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
        <Box
          h={"calc(100% - 50px)"}
          overflowY={"hidden"}
          _hover={{
            overflowY: "auto",
          }}
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
          <GlobalLayoutNavBarPages title={props.title} />
          <GlobalLayoutNavBarFollowing />
        </Box>
      </Box>
    </Box>
  );
};

export default GlobalLayoutNavBar;
