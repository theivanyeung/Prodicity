import Image from "next/image";

import { Flex, Box, Heading, Button } from "@chakra-ui/react";

const EventModalInvite = (props) => {
  return (
    <Flex justifyContent={"center"}>
      <Box align={"center"} mb={"25px"} w={"90%"}>
        <Flex alignItems={"center"} h={"50px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"20px"}
            letterSpacing={"0.1em"}
          >
            Confirm
          </Heading>
        </Flex>
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={"10px"}
          w={"100%"}
          borderRadius={"12px"}
        >
          <Box w={"100"} h={"100"} borderRadius={"100px"} overflow={"hidden"}>
            <Image
              src={props.selectedUser.data.photoURL}
              alt={"Avatar"}
              width={100}
              height={100}
            />
          </Box>
          {props.selectedUser.data.displayName ? (
            <>
              <Heading
                mt={"15px"}
                fontWeight={"medium"}
                fontSize={"3xl"}
                letterSpacing={"0.05em"}
              >
                {props.selectedUser.data.displayName}
              </Heading>
              <Heading
                fontWeight={"normal"}
                fontSize={"xl"}
                letterSpacing={"0.05em"}
              >
                @{props.selectedUser.data.username}
              </Heading>
            </>
          ) : (
            <Heading
              mt={"15px"}
              fontWeight={"medium"}
              fontSize={"3xl"}
              letterSpacing={"0.05em"}
            >
              @{props.selectedUser.data.username}
            </Heading>
          )}
          <Heading
            mt={"20px"}
            w={"90%"}
            fontWeight={"normal"}
            fontSize={"sm"}
            letterSpacing={"0.05em"}
          >
            {props.selectedUser.data.description}
          </Heading>
          <Flex mt={"25px"} justifyContent={"space-between"} w={"175px"}>
            <Button
              w={"70px"}
              h={"30px"}
              borderRadius={"12px"}
              onClick={() => props.setSelected(false)}
            >
              <Heading fontWeight={"medium"} fontSize={"sm"}>
                Go back
              </Heading>
            </Button>
            <Button
              w={"70px"}
              h={"30px"}
              bgImage={
                "linear-gradient(93.25deg, #FFCD92 -8.32%, #F094FF 113%)"
              }
              borderRadius={"12px"}
              onClick={() => {
                props.inviteToStageHandler(props.selectedUser.id);
                props.onClose();
              }}
            >
              <Heading fontWeight={"medium"} fontSize={"sm"}>
                Invite
              </Heading>
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default EventModalInvite;
