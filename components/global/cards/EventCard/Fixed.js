import Image from "next/image";

import { Box, Flex, Heading, Skeleton, SkeletonCircle } from "@chakra-ui/react";

import { numUnitConversion, formatDate } from "../../../functions";

const GlobalEventCardFixed = (props) => {
  return (
    <Box
      align={"center"}
      w={"338px"}
      h={"266px"}
      bgColor={"#FFFFFF"}
      overflow={"hidden"}
      borderRadius={"7px"}
      border={props.accessed ? "1.5px solid #F4CE96" : ""}
    >
      {props.thumbnailURL ? (
        <Flex
          w={"338px"}
          h={"190.13px"}
          bgSize={"cover"}
          bgPosition={"center"}
          bgRepeat={"none"}
          bgImage={`url('${props.thumbnailURL}')`}
        />
      ) : (
        <Skeleton w={"338px"} h={"190.13px"} />
      )}
      <Flex mt={"2.5px"} w={"90%"} h={"55.87px"}>
        <Flex w={"100%"} h={"60%"}>
          <Box align={"left"} w={"42px"}>
            <Box
              overflow={"hidden"}
              w={"35px"}
              h={"35px"}
              borderRadius={"100px"}
            >
              {props.userData.photoURL ? (
                <Image
                  src={props.userData.photoURL}
                  alt={"Profile Picture"}
                  width={35}
                  height={35}
                />
              ) : (
                <SkeletonCircle size={"35"} />
              )}
            </Box>
          </Box>
          <Box w={"calc(100% - 42px)"}>
            <Heading
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              textAlign={"left"}
              fontSize={"sm"}
              lineHeight={"17px"}
              letterSpacing={"0.05em"}
              sx={{
                display: "-webkit-box",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical",
              }}
            >
              {props.title}
            </Heading>
            <Flex mt={"5px"} justifyContent={"space-between"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"xs"}
                letterSpacing={"0.05em"}
              >
                {props.userData.displayName && props.userData.displayName
                  ? props.userData.displayName
                  : props.userData.username}
              </Heading>
              <Heading
                fontWeight={"medium"}
                fontSize={"xs"}
                letterSpacing={"0.05em"}
              >
                {numUnitConversion(props.numAttendees)} Attendees
              </Heading>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      {props.isLive === true ? (
        <Heading
          w={"35px"}
          fontWeight={"medium"}
          fontSize={"xs"}
          letterSpacing={"0.05em"}
          bgColor={"#FF9393"}
          borderRadius={"8px"}
        >
          LIVE
        </Heading>
      ) : (
        <Heading fontWeight={"medium"} fontSize={"xs"} letterSpacing={"0.05em"}>
          {formatDate(props.date)}
        </Heading>
      )}
    </Box>
  );
};

export default GlobalEventCardFixed;
