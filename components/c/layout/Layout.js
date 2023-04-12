import { Box, Flex } from "@chakra-ui/react";
import LayoutFooter from "./Footer";
import LayoutHeader from "./Header";

const MainLayout = (props) => {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      overflowX={"hidden"}
      bgSize={"cover"}
      bgPosition={"center"}
      bgRepeat={"none"}
      bgAttachment={"fixed"}
      bgImage={"url('/images/landing-background-image.png')"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-track": {
          background: "#E7E7E7",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#777777",
          borderRadius: "5px",
        },
      }}
    >
      <Box
        direction={"column"}
        align={"center"}
        overflowX={"hidden"}
        bgColor={"rgba(0, 0, 0, 0.75)"}
      >
        <LayoutHeader page={props.page} />
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          w={"100vw"}
          h={"calc(100vh - 150px)"}
        >
          {props.children}
        </Flex>
        <LayoutFooter />
      </Box>
    </Box>
  );
};

export default MainLayout;
