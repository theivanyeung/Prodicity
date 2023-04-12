import Image from "next/image";

import {
  Box,
  Flex,
  Heading,
  Button,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverContent,
} from "@chakra-ui/react";

const ChatMessageViewLayoutTopBar = () => {
  return (
    <Box
      align={"center"}
      w={"100%"}
      h={"50px"}
      bgColor={"#F4F4F4"}
      boxShadow={"0px 4px 4px rgba(218, 218, 218, 0.25)"}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"95%"}
        h={"100%"}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          w={"150px"}
        >
          <Box overflow={"hidden"} w={"35px"} h={"35px"} borderRadius={"100px"}>
            <Image
              src={"/images/sample-pfp/profile-pic-23.jpg"}
              alt={"Profile pic"}
              width={35}
              height={35}
            />
          </Box>
          <Box align={"left"}>
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.1em"}
            >
              Ivan
            </Heading>
            <Heading
              fontWeight={"normal"}
              fontSize={"xs"}
              letterSpacing={"0.1em"}
              color={"#5C5C5C"}
            >
              @theivandog
            </Heading>
          </Box>
        </Flex>
        <Popover>
          <PopoverTrigger>
            <Button variant={"ghost"} borderRadius={"100px"}>
              <Image
                src={"/images/chat-settings-icon.png"}
                alt={"Chat Settings"}
                width={22}
                height={6}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            mr={"20px"}
            w={"160spx"}
            h={"90px"}
            boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
            borderRadius={"12px"}
          >
            <PopoverArrow />
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={"100%"}
            >
              <Button variant={"ghost"} w={"95%"}>
                <Heading
                  fontWeight={"medium"}
                  fontSize={"sm"}
                  lineHeight={"25px"}
                  letterSpacing={"0.1em"}
                  color={"#000000"}
                >
                  Mute Notifications
                </Heading>
              </Button>
              <Button variant={"ghost"} w={"95%"}>
                <Heading
                  fontWeight={"medium"}
                  fontSize={"sm"}
                  lineHeight={"25px"}
                  letterSpacing={"0.1em"}
                  color={"#000000"}
                >
                  Block Creator
                </Heading>
              </Button>
            </Flex>
          </PopoverContent>
        </Popover>
      </Flex>
    </Box>
  );
};

export default ChatMessageViewLayoutTopBar;
