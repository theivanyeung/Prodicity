import Image from "next/image";

import { Flex, Button, Box } from "@chakra-ui/react";

const EventInteractivesCommBase = (props) => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"100%"}>
      {props.hasAudio ? (
        props.mic ? (
          <Button
            w={"47%"}
            h={"35px"}
            borderRadius={"100px"}
            onClick={props.clickMicHandler}
          >
            <Box w={"25px"} h={"25px"}>
              <Image
                src={"/images/mic-icon.png"}
                alt={"Mic Icon"}
                layout="responsive"
                width={50}
                height={50}
              />
            </Box>
          </Button>
        ) : (
          <Button
            w={"47%"}
            h={"35px"}
            boxShadow={"0px 0px 5px 2.5px rgba(255, 0, 0, 0.25)"}
            borderRadius={"100px"}
            onClick={props.clickMicHandler}
          >
            <Box w={"25px"} h={"25px"}>
              <Image
                src={"/images/mic-icon-disabled.png"}
                alt={"Mic Icon"}
                layout="responsive"
                width={50}
                height={50}
              />
            </Box>
          </Button>
        )
      ) : (
        <Button w={"47%"} h={"35px"} borderRadius={"100px"} isDisabled>
          <Box w={"25px"} h={"25px"}>
            <Image
              src={"/images/mic-icon.png"}
              alt={"Mic Icon"}
              layout="responsive"
              width={50}
              height={50}
            />
          </Box>
        </Button>
      )}

      {props.hasVideo ? (
        props.camera ? (
          <Button
            w={"47%"}
            h={"35px"}
            borderRadius={"100px"}
            onClick={props.clickCameraHandler}
          >
            <Box w={"25px"} h={"16.11px"}>
              <Image
                src={"/images/camera-icon.png"}
                alt={"Mic Icon"}
                layout="responsive"
                width={50}
                height={32.22}
              />
            </Box>
          </Button>
        ) : (
          <Button
            w={"47%"}
            h={"35px"}
            boxShadow={"0px 0px 5px 2.5px rgba(255, 0, 0, 0.25)"}
            borderRadius={"100px"}
            onClick={props.clickCameraHandler}
          >
            <Box w={"25px"} h={"16.11px"}>
              <Image
                src={"/images/camera-icon-disabled.png"}
                alt={"Mic Icon"}
                layout="responsive"
                width={50}
                height={32.22}
              />
            </Box>
          </Button>
        )
      ) : (
        <Button w={"47%"} h={"35px"} borderRadius={"100px"} isDisabled>
          <Box w={"25px"} h={"16.11px"}>
            <Image
              src={"/images/camera-icon.png"}
              alt={"Mic Icon"}
              layout="responsive"
              width={50}
              height={32.22}
            />
          </Box>
        </Button>
      )}
    </Flex>
  );
};

export default EventInteractivesCommBase;
