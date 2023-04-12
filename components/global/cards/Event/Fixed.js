// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import {
  numUnitConversion,
  priceUnitConversion,
  formatDate,
} from "../../../functions";

import GlobalEventPurchase from "../modal/Purchase";

// BACKEND IMPORTS

import { doc, updateDoc } from "firebase/firestore";

import { firestore } from "../../../../utils/firebase";

import { SubscriptionHandler } from "../../../server";

const GlobalEventFixed = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [subscribed, setSubscribed] = useState();
  const [accessed, setAccessed] = useState();

  useEffect(() => {
    setSubscribed(props.isSubscribed);
  }, [props.isSubscribed]);

  useEffect(() => {
    setAccessed(props.accessed);
  }, [props.accessed]);

  return (
    <Box
      align={"center"}
      w={"672px"}
      h={"774px"}
      bgColor={"#FFFFFF"}
      borderRadius={"6px"}
      overflow={"hidden"}
      border={props.accessed ? "1.5px solid #F4CE96" : ""}
      display={props.display}
    >
      <Box
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"none"}
        bgImage={`url('${props.thumbnailURL}')`}
        alt={"Thumbnail"}
        width={"672px"}
        height={"377.63px"}
      />
      <Flex justifyContent={"space-between"} mt={"18px"} w={"623px"} h={"61px"}>
        <Heading
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
          {props.title}
        </Heading>

        <Box align={"right"}>
          {props.isLive ? (
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
              {formatDate(props.date)}
            </Heading>
          )}
          <Heading
            h={"27px"}
            fontWeight={"normal"}
            fontSize={"md"}
            lineHeight={"27px"}
            letterSpacing={"0.05em"}
          >
            {numUnitConversion(props.numAttendees)} Attendees
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
          <Box overflow={"hidden"} w={"50px"} h={"50px"} borderRadius={"100px"}>
            <Image
              src={props.userData.photoURL}
              alt={"Profile Photo"}
              width={50}
              height={50}
            />
          </Box>
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
              {props.userData.displayName && props.userData.displayName
                ? props.userData.displayName
                : props.userData.username}
            </Heading>
            <Heading
              h={"20px"}
              fontWeight={"medium"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.05em"}
            >
              {numUnitConversion(props.userData.followers.length)} followers
            </Heading>
          </Box>
        </Flex>
        {props.userId !== props.host &&
          (subscribed ? (
            <Button
              w={"100px"}
              h={"30px"}
              bgColor={"#EAEAEA"}
              borderRadius={"12px"}
              onClick={() => {
                SubscriptionHandler(subscribed, props.host, props.userData);
              }}
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
              onClick={() => {
                SubscriptionHandler(subscribed, props.host, props.userData);
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
          ))}
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
          {props.description}
        </Text>
      </Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"10px"}
        w={"623px"}
      >
        {props.host === props.userId ? (
          <Heading
            fontWeight={"normal"}
            fontSize={"2xl"}
            lineHeight={"41px"}
            letterSpacing={"0.05em"}
          >
            OWNED
          </Heading>
        ) : props.accessed ? (
          <Heading
            fontWeight={"normal"}
            fontSize={"2xl"}
            lineHeight={"41px"}
            letterSpacing={"0.05em"}
          >
            PURCHASED
          </Heading>
        ) : props.isFree ? (
          <Heading
            fontWeight={"normal"}
            fontSize={"2xl"}
            lineHeight={"41px"}
            letterSpacing={"0.05em"}
          >
            FREE
          </Heading>
        ) : (
          <Flex alignItems={"center"} gap={"10px"}>
            <Box w={"30px"} h={"30px"}>
              <Image
                src={"/images/prod-coin.png"}
                width={"30px"}
                height={"30px"}
              />
            </Box>
            <Heading
              fontWeight={"normal"}
              fontSize={"2xl"}
              lineHeight={"41px"}
              letterSpacing={"0.05em"}
            >
              {priceUnitConversion(props.price)}
            </Heading>
          </Flex>
        )}
        {accessed ? (
          props.userId === props.host ? (
            props.isOpen ? (
              <Link href={`/${props.userData.username}/${props.id}`}>
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
                    onClick={props.goLiveHandler}
                  >
                    <Heading
                      fontWeight={"medium"}
                      fontSize={"md"}
                      lineHeight={"27px"}
                      letterSpacing={"0.05em"}
                    >
                      Go Live
                    </Heading>
                  </Button>
                </Flex>
              </Link>
            ) : (
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
                  isDisabled
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"md"}
                    lineHeight={"27px"}
                    letterSpacing={"0.05em"}
                  >
                    Go Live
                  </Heading>
                </Button>
              </Flex>
            )
          ) : props.isLive ? (
            <Link href={`/${props.userData.username}/${props.id}`}>
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
                    Enter
                  </Heading>
                </Button>
              </Flex>
            </Link>
          ) : (
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
                isDisabled
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"27px"}
                  letterSpacing={"0.05em"}
                >
                  Enter
                </Heading>
              </Button>
            </Flex>
          )
        ) : (
          <Flex>
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
              onClick={onOpen}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"27px"}
                letterSpacing={"0.05em"}
              >
                {props.isFree ? "Join Event" : "Purchase Event"}
              </Heading>
            </Button>
          </Flex>
        )}

        <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
          <ModalOverlay />
          <ModalContent borderRadius={"12px"} overflow={"hidden"}>
            <ModalCloseButton />
            <GlobalEventPurchase
              eventId={props.id}
              creatorId={props.host}
              userId={props.userId}
              price={props.price}
              isFree={props.isFree}
              accessed={accessed}
              setAccessed={setAccessed}
              onClose={onClose}
            />
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default GlobalEventFixed;
