import Image from "next/image";

import { Button, Flex, Box, Heading } from "@chakra-ui/react";

const ChatMessageControlMessages = (props) => {
  return (
    <>
      <Button
        my={"5px"}
        w={"225px"}
        h={"40px"}
        variant={"ghost"}
        size={"sm"}
        _hover={{
          bgColor: "#FFFFFF",
        }}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "flex",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <Flex justifyContent={"center"} alignItems={"center"} w={"25%"}>
          <Box overflow={"hidden"} w={"35px"} h={"35px"} borderRadius={"100px"}>
            <Image src={props.icon} alt="Avatar" width={35} height={35} />
          </Box>
        </Flex>
        <Heading
          w={"75%"}
          fontWeight={"medium"}
          fontSize={"md"}
          letterSpacing={"0.1em"}
          textAlign={"left"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
        >
          {props.name}
        </Heading>
      </Button>

      <Button
        my={"5px"}
        w={"75px"}
        h={"40px"}
        variant={"ghost"}
        size={"sm"}
        _hover={{
          bgColor: "#FFFFFF",
        }}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      >
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box overflow={"hidden"} w={"35px"} h={"35px"} borderRadius={"100px"}>
            <Image src={props.icon} alt="Avatar" width={35} height={35} />
          </Box>
        </Flex>
      </Button>
    </>
  );
};

export default ChatMessageControlMessages;
