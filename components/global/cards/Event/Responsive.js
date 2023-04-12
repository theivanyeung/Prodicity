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

import { SubscriptionHandler } from "../../../server";

const GlobalEventResponsive = (props) => {
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
      w={"100vw"}
      bgColor={"#FFFFFF"}
      border={props.accessed ? "0.04vw solid #F4CE96" : ""}
      display={props.display}
    >
      <Box
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"none"}
        bgImage={`url('${props.thumbnailURL}')`}
        alt={"Thumbnail"}
        width={"100vw"}
        height={"56.19vw"}
      />
      <Flex justifyContent={"space-between"} mt={"2.25vw"} w={"94.24vw"}>
        <Heading
          w={"69.09vw"}
          h={"6.76vw"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          textAlign={"left"}
          fontSize={"2.25vw"}
          lineHeight={"3.38vw"}
          letterSpacing={"0.1vw"}
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
              h={"4.26vw"}
              fontWeight={"normal"}
              fontSize={"2.5vw"}
              lineHeight={"4.26vw"}
              color={"#FF4A4A"}
              letterSpacing={"0.1vw"}
            >
              LIVE
            </Heading>
          ) : (
            <Heading
              h={"4.26vw"}
              fontWeight={"normal"}
              fontSize={"2.5vw"}
              lineHeight={"4.26vw"}
              letterSpacing={"0.1vw"}
            >
              {formatDate(props.date)}
            </Heading>
          )}
          <Heading
            h={"3.38vw"}
            fontWeight={"normal"}
            fontSize={"2vw"}
            lineHeight={"3.38vw"}
            letterSpacing={"0.1vw"}
          >
            {numUnitConversion(props.numAttendees)} Attendees
          </Heading>
        </Box>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"1.88vw"}
        w={"94.24vw"}
      >
        <Flex>
          <Box
            overflow={"hidden"}
            w={"6.26vw"}
            h={"auto"}
            borderRadius={"100px"}
          >
            <Image
              src={props.userData.photoURL}
              alt={"Profile Photo"}
              layout="responsive"
              width={50}
              height={50}
            />
          </Box>
          <Box align={"left"} ml={"2.5vw"} h={"5.88vw"}>
            <Heading
              h={"3.38vw"}
              w={"37.55vw"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              fontWeight={"medium"}
              fontSize={"2vw"}
              lineHeight={"3.38vw"}
              letterSpacing={"0.1vw"}
            >
              {props.userData.displayName && props.userData.displayName
                ? props.userData.displayName
                : props.userData.username}
            </Heading>
            <Heading
              h={"2.5vw"}
              fontWeight={"medium"}
              fontSize={"1.5vw"}
              lineHeight={"2.5vw"}
              letterSpacing={"0.1vw"}
            >
              {numUnitConversion(props.userData.followers.length)} followers
            </Heading>
          </Box>
        </Flex>
        {props.userId !== props.host &&
          (subscribed ? (
            <Button
              w={"15.02vw"}
              h={"4.51vw"}
              bgColor={"#EAEAEA"}
              borderRadius={"1.5vw"}
              onClick={() => {
                SubscriptionHandler(subscribed, props.host, props.userData);
              }}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"1.75vw"}
                lineHeight={"2.5vw"}
              >
                SUBSCRIBED
              </Heading>
            </Button>
          ) : (
            <Button
              w={"15.02vw"}
              h={"4.51vw"}
              bgImage={
                "linear-gradient(98.57deg, #FFDE9F 8.46%, #FFC8FD 115.67%)"
              }
              borderRadius={"1.5vw"}
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
                fontSize={"1.75vw"}
                lineHeight={"2.5vw"}
              >
                SUBSCRIBED
              </Heading>
            </Button>
          ))}
      </Flex>
      <Box mt={"1.88vw"}>
        <Text
          width={"94.24vw"}
          fontWeight={"medium"}
          fontSize={"1.5vw"}
          textAlign={"left"}
          letterSpacing={"0.1vw"}
        >
          {props.description}
        </Text>
      </Box>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        my={"1.88vw"}
        w={"94.24vw"}
      >
        {props.host === props.userId ? (
          <Heading
            fontWeight={"normal"}
            fontSize={"3vw"}
            lineHeight={"5.13vw"}
            letterSpacing={"0.1vw"}
          >
            OWNED
          </Heading>
        ) : props.accessed ? (
          <Heading
            fontWeight={"normal"}
            fontSize={"3vw"}
            lineHeight={"5.13vw"}
            letterSpacing={"0.1vw"}
          >
            PURCHASED
          </Heading>
        ) : props.isFree ? (
          <Heading
            fontWeight={"normal"}
            fontSize={"3vw"}
            lineHeight={"5.13vw"}
            letterSpacing={"0.1vw"}
          >
            FREE
          </Heading>
        ) : (
          <Flex alignItems={"center"} gap={"0.5vw"}>
            <Box w={"3.25vw"} h={"3.25vw"}>
              <Image
                src={"/images/prod-coin.png"}
                layout={"responsive"}
                width={"30px"}
                height={"30px"}
              />
            </Box>
            <Heading
              fontWeight={"normal"}
              fontSize={"3vw"}
              lineHeight={"5.13vw"}
              letterSpacing={"0.1vw"}
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
                    w={"15.39vw"}
                    h={"4.76vw"}
                    bgImage={
                      "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFEF9B -11.85%, #FFECFD 106.18%)"
                    }
                    borderRadius={"1.5vw"}
                    _hover={{
                      bgImage:
                        "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFE65C -11.85%, #FFBCF8 106.18%)",
                    }}
                    onClick={props.goLiveHandler}
                  >
                    <Heading
                      fontWeight={"medium"}
                      fontSize={"2vw"}
                      lineHeight={"3.38vw"}
                      letterSpacing={"0.1vw"}
                    >
                      Go Live
                    </Heading>
                  </Button>
                </Flex>
              </Link>
            ) : (
              <Flex>
                <Button
                  w={"15.39vw"}
                  h={"4.76vw"}
                  bgImage={
                    "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFEF9B -11.85%, #FFECFD 106.18%)"
                  }
                  borderRadius={"1.5vw"}
                  _hover={{
                    bgImage:
                      "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFE65C -11.85%, #FFBCF8 106.18%)",
                  }}
                  isDisabled
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"2vw"}
                    lineHeight={"3.38vw"}
                    letterSpacing={"0.1vw"}
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
                  w={"15.39vw"}
                  h={"4.76vw"}
                  bgImage={
                    "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFEF9B -11.85%, #FFECFD 106.18%)"
                  }
                  borderRadius={"1.5vw"}
                  _hover={{
                    bgImage:
                      "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFE65C -11.85%, #FFBCF8 106.18%)",
                  }}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"2vw"}
                    lineHeight={"3.38vw"}
                    letterSpacing={"0.1vw"}
                  >
                    Enter
                  </Heading>
                </Button>
              </Flex>
            </Link>
          ) : (
            <Flex>
              <Button
                w={"15.39vw"}
                h={"4.76vw"}
                bgImage={
                  "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFEF9B -11.85%, #FFECFD 106.18%)"
                }
                borderRadius={"1.5vw"}
                _hover={{
                  bgImage:
                    "linear-gradient(94.46deg, #FFFFFF -11.86%, #FFE65C -11.85%, #FFBCF8 106.18%)",
                }}
                isDisabled
              >
                <Heading
                  fontWeight={"medium"}
                  fontSize={"2vw"}
                  lineHeight={"3.38vw"}
                  letterSpacing={"0.1vw"}
                >
                  Enter
                </Heading>
              </Button>
            </Flex>
          )
        ) : (
          <Flex>
            <Button
              w={"15.39vw"}
              h={"4.76vw"}
              bgImage={
                "linear-gradient(0deg, rgba(255, 200, 95, 0.25), rgba(255, 200, 95, 0.25)), linear-gradient(133.62deg, #FFC85E -38.71%, rgba(255, 206, 251, 0.8) 58.87%, #FF857D 160.6%, #FF6F66 160.6%)"
              }
              borderRadius={"1.5vw"}
              _hover={{
                bgImage:
                  "linear-gradient(0deg, rgba(255, 200, 95, 0.5), rgba(255, 200, 95, 0.5)), linear-gradient(133.62deg, #FFC85E -38.71%, rgba(255, 206, 251, 0.8) 58.87%, #FF857D 160.6%, #FF6F66 160.6%)",
              }}
              onClick={onOpen}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"2vw"}
                lineHeight={"3.38vw"}
                letterSpacing={"0.1vw"}
              >
                {props.isFree ? "Join Event" : "Purchase Event"}
              </Heading>
            </Button>
          </Flex>
        )}

        <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
          <ModalOverlay />
          <ModalContent>
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

export default GlobalEventResponsive;
