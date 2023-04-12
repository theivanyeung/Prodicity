import Image from "next/image";

import { Box, Flex, Heading, Skeleton, SkeletonCircle } from "@chakra-ui/react";

import { numUnitConversion } from "../../../functions";

const GlobalEventCardResponsive = (props) => {
  return (
    <Box
      align={"center"}
      w={"75.28vw"}
      h={"59.24vw"}
      overflow={"hidden"}
      bgColor={"#FFFFFF"}
      borderRadius={"1.56vw"}
      border={props.accessed ? "0.03vw solid #F4CE96" : ""}
    >
      {props.thumbnailURL ? (
        <Flex
          w={"75.28vw"}
          h={"42.35vw"}
          bgSize={"cover"}
          bgPosition={"center"}
          bgRepeat={"none"}
          bgImage={`url('${props.thumbnailURL}')`}
        />
      ) : (
        <Skeleton w={"75.28vw"} h={"42.35vw"} />
      )}
      <Flex mt={"0.56vw"} w={"90%"} h={"12.44vw"}>
        <Flex w={"100%"} h={"70%"}>
          <Box align={"left"} mr={"1.35vw"} w={"8vw"}>
            <Box
              overflow={"hidden"}
              w={"7.8vw"}
              h={"7.8vw"}
              borderRadius={"100px"}
            >
              {props.userData.photoURL ? (
                <Image
                  src={props.userData.photoURL}
                  alt={"Profile Picture"}
                  layout="responsive"
                  width={35}
                  height={35}
                />
              ) : (
                <SkeletonCircle size={"7.8vw"} />
              )}
            </Box>
          </Box>
          <Box w={"calc(100% - 8.42vw)"}>
            <Heading
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              textAlign={"left"}
              fontSize={"2.4vw"}
              lineHeight={"3.4vw"}
              letterSpacing={"0.18vw"}
              sx={{
                display: "-webkit-box",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical",
              }}
            >
              {props.title}
            </Heading>
            <Flex mt={"1vw"} justifyContent={"space-between"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"2.4vw"}
                letterSpacing={"0.18vw"}
              >
                {props.userData.displayName && props.userData.displayName
                  ? props.userData.displayName
                  : props.userData.username}
              </Heading>
              <Heading
                fontWeight={"medium"}
                fontSize={"2.4vw"}
                letterSpacing={"0.18vw"}
              >
                {numUnitConversion(props.numAttendees)} Attendees
              </Heading>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      {props.isLive === true ? (
        <Heading
          w={"7vw"}
          fontWeight={"medium"}
          fontSize={"2.4vw"}
          letterSpacing={"0.18vw"}
          bgColor={"#FF9393"}
          borderRadius={"1.6vw"}
        >
          LIVE
        </Heading>
      ) : (
        <Heading
          fontWeight={"medium"}
          fontSize={"2.4vw"}
          letterSpacing={"0.18vw"}
        >
          {props.date}
        </Heading>
      )}
    </Box>
  );
};

export default GlobalEventCardResponsive;
