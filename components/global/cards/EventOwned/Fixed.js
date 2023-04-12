import Image from "next/image";

import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

import { EventModal } from "../../../placeholderData";

import { numUnitConversion, priceUnitConversion } from "../../../functions";

const GlobalEventOwnedFixed = (props) => {
  return (
    <Box
      align={"center"}
      w={"672px"}
      h={"830px"}
      bgColor={"#FFFFFF"}
      borderRadius={"6px"}
      overflow={"hidden"}
      {...props}
    >
      <Box
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"none"}
        bgImage={`url('${EventModal[0].thumbnail}')`}
        alt={"Thumbnail"}
        width={"672px"}
        height={"377.63px"}
      />
      <Flex justifyContent={"space-between"} mt={"18px"} w={"623px"} h={"61px"}>
        <Heading
          w={"434px"}
          h={"54px"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          textAlign={"left"}
          fontSize={"md"}
          lineHeight={"27px"}
          letterSpacing={"0.05em"}
          sx={{
            display: "-webkit-box",
            "-webkit-line-clamp": "2",
            "-webkit-box-orient": "vertical",
          }}
        >
          {EventModal[0].title}
        </Heading>

        <Box align={"right"}>
          {(() => {
            return EventModal[0].isLive === true ? (
              <Heading
                h={"34px"}
                fontWeight={"normal"}
                fontSize={"xl"}
                lineHeight={"34px"}
                color={"#FF4A4A"}
                letterSpacing={"0.05em"}
              >
                LIVE
              </Heading>
            ) : (
              <Heading
                h={"34px"}
                fontWeight={"normal"}
                fontSize={"xl"}
                lineHeight={"34px"}
                letterSpacing={"0.05em"}
              >
                {EventModal[0].date}
              </Heading>
            );
          })()}
          <Heading
            h={"27px"}
            fontWeight={"normal"}
            fontSize={"md"}
            lineHeight={"27px"}
            letterSpacing={"0.05em"}
          >
            {numUnitConversion(EventModal[0].numAttendees)} Attendees
          </Heading>
        </Box>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"7px"}
        w={"623px"}
        h={"49.67px"}
      >
        <Flex>
          <Image
            src={EventModal[0].creatorPfp}
            alt={"Profile Photo"}
            width={50}
            height={50}
          />
          <Box align={"left"} ml={"20px"} h={"47px"}>
            <Heading
              h={"27px"}
              w={"300px"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"27px"}
              letterSpacing={"0.05em"}
            >
              {EventModal[0].creatorName}
            </Heading>
            <Heading
              h={"20px"}
              fontWeight={"medium"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.05em"}
            >
              {numUnitConversion(EventModal[0].numFollowers)} followers
            </Heading>
          </Box>
        </Flex>
        {(() => {
          return EventModal[0].isSubscribed === true ? (
            <Button
              w={"100px"}
              h={"30px"}
              bgColor={"#EAEAEA"}
              borderRadius={"12px"}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"xs"}
                lineHeight={"20px"}
              >
                SUBSCRIBED
              </Heading>
            </Button>
          ) : (
            <Button
              w={"100px"}
              h={"30px"}
              bgImage={
                "linear-gradient(98.57deg, #FFDE9F 8.46%, #FFC8FD 115.67%)"
              }
              borderRadius={"12px"}
              _hover={{
                bgImage:
                  "linear-gradient(98.57deg, #FFCD6F 8.46%, #FFC8FD 115.67%)",
              }}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"xs"}
                lineHeight={"20px"}
              >
                SUBSCRIBE
              </Heading>
            </Button>
          );
        })()}
      </Flex>
      <Box mt={"10px"}>
        <Text
          width={"623px"}
          h={"180px"}
          fontWeight={"medium"}
          fontSize={"xs"}
          textAlign={"left"}
          letterSpacing={"0.05em"}
          overflowY={"auto"}
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
          {EventModal[0].description}
        </Text>
      </Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"10px"}
        w={"623px"}
      >
        {(() => {
          return EventModal[0].vipBought === true ? (
            <Heading></Heading>
          ) : EventModal[0].vipIsFree === true ? (
            <Heading
              fontWeight={"normal"}
              fontSize={"2xl"}
              lineHeight={"41px"}
              letterSpacing={"0.05em"}
            >
              VIP: FREE
            </Heading>
          ) : (
            <Heading
              fontWeight={"normal"}
              fontSize={"2xl"}
              lineHeight={"41px"}
              letterSpacing={"0.05em"}
            >
              VIP: ${priceUnitConversion(EventModal[0].vipPrice)}
            </Heading>
          );
        })()}
        {(() => {
          return EventModal[0].vipBought === true ? (
            <Flex>
              <Button
                w={"123px"}
                h={"38px"}
                bgImage={
                  "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFEF9B -11.85%, #FFECFD 106.18%)"
                }
                borderRadius={"12px"}
                _hover={{
                  bgImage:
                    "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFE65C -11.85%, #FFBCF8 106.18%)",
                }}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"27px"}
                  letterSpacing={"0.05em"}
                >
                  Join as VIP
                </Heading>
              </Button>
            </Flex>
          ) : (
            <Flex justifyContent={"space-between"} w={"266px"}>
              <Button
                w={"123px"}
                h={"38px"}
                bgImage={
                  "linear-gradient(0deg, rgba(255, 200, 95, 0.25), rgba(255, 200, 95, 0.25)), linear-gradient(133.62deg, #FFC85E -38.71%, rgba(255, 206, 251, 0.8) 58.87%, #FF857D 160.6%, #FF6F66 160.6%)"
                }
                borderRadius={"12px"}
                _hover={{
                  bgImage:
                    "linear-gradient(0deg, rgba(255, 200, 95, 0.5), rgba(255, 200, 95, 0.5)), linear-gradient(133.62deg, #FFC85E -38.71%, rgba(255, 206, 251, 0.8) 58.87%, #FF857D 160.6%, #FF6F66 160.6%)",
                }}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"27px"}
                  letterSpacing={"0.05em"}
                >
                  Purchase VIP
                </Heading>
              </Button>
              <Button
                w={"123px"}
                h={"38px"}
                bgImage={
                  "linear-gradient(0deg, rgba(124, 255, 145, 0.5), rgba(124, 255, 145, 0.5)), linear-gradient(133.62deg, #FFC85E -38.71%, rgba(255, 206, 251, 0.8) 58.87%, #FF857D 160.6%, #FF6F66 160.6%)"
                }
                borderRadius={"12px"}
                _hover={{
                  bgImage:
                    "linear-gradient(0deg, rgba(124, 255, 145, 0.75), rgba(124, 255, 145, 0.75)), linear-gradient(133.62deg, #FFC85E -38.71%, rgba(255, 206, 251, 0.8) 58.87%, #FF857D 160.6%, #FF6F66 160.6%)",
                }}
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"27px"}
                  letterSpacing={"0.05em"}
                >
                  Join as general
                </Heading>
              </Button>
            </Flex>
          );
        })()}
      </Flex>
      <Flex mt={"20px"} justifyContent={"center"}>
        <Button>
          <DeleteIcon />
        </Button>
      </Flex>
    </Box>
  );
};

export default GlobalEventOwnedFixed;
