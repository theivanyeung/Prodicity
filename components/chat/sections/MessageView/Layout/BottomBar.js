import Image from "next/image";

import { Box, Flex, Input, Button } from "@chakra-ui/react";

const ChatMessageViewLayoutBottomBar = () => {
  return (
    <Box align={"center"} w={"100%"} h={"60px"}>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"95%"}>
        <Input
          placeholder={"Send a message..."}
          w={"93%"}
          bgColor={"#FFFFFF"}
          borderRadius={"12px"}
        />
        <Button
          bgImage={
            "linear-gradient(133.62deg, #FFD179 -38.71%, rgba(255, 223, 252, 0.840635) 58.87%, #FF857D 160.6%, #FF7D75 160.6%)"
          }
          _hover={{
            bgImage:
              "linear-gradient(133.62deg, #FFC85E -38.71%, rgba(255, 206, 251, 0.8) 58.87%, #FF857D 160.6%, #FF6F66 160.6%)",
          }}
          borderRadius={"12px"}
        >
          <Image
            src={"/images/create-message-icon.png"}
            alt={"Send message icon"}
            width={25}
            height={25}
          />
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatMessageViewLayoutBottomBar;
