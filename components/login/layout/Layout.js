import Image from "next/image";

import { Box } from "@chakra-ui/react";

const LoginLayout = ({ children }) => {
  return (
    <>
      <Box
        direction={"column"}
        align={"center"}
        overflowX={"hidden"}
        w={"100vw"}
        h={"100vh"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"none"}
        bgAttachment={"fixed"}
        bgImage={"url('/images/background-image.png')"}
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
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "block",
          sm: "none",
          base: "none",
        }}
      >
        {children}
      </Box>

      <Box
        direction={"column"}
        align={"center"}
        overflowX={"hidden"}
        w={"100vw"}
        h={"100vh"}
        bgColor={"#FFFFFF"}
        overflowY={"scroll"}
        sx={{
          "::-webkit-scrollbar": {
            width: "5px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#777777",
            borderRadius: "5px",
          },
        }}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "block",
          base: "block",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default LoginLayout;
