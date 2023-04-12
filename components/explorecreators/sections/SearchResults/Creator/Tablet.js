// FRONTEND IMPORTS

import Link from "next/link";
import Image from "next/image";

import { Flex, Box, Heading, Button } from "@chakra-ui/react";

// BACKEND IMPORTS

import { SubscriptionHandler } from "../../../../server";

const ExploreCreatorsSearchResultsCreatorTablet = (props) => {
  return (
    <Flex
      justifyContent={"space-between"}
      my={"20px"}
      w={"100%"}
      h={"150px"}
      display={props.display}
    >
      <Link href={`/${props.username}`}>
        <Flex as={"button"} justifyContent={"flex-start"} w={"80%"}>
          <Box align={"center"} w={"25%"} h={"150px"}>
            <Box
              overflow={"hidden"}
              w={"150px"}
              h={"150px"}
              borderRadius={"100px"}
            >
              <Image
                src={props.photoURL}
                alt={"Avatar"}
                width={150}
                height={150}
              />
            </Box>
          </Box>
          <Box align={"left"} w={"75%"}>
            {props.displayName ? (
              <Flex>
                <Heading
                  mr={"20px"}
                  fontWeight={"normal"}
                  fontSize={"6xl"}
                  lineHeight={"75px"}
                  letterSpacing={"0.1em"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  {props.displayName}
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"3xl"}
                  lineHeight={"75px"}
                  letterSpacing={"0.1em"}
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                >
                  @{props.username}
                </Heading>
              </Flex>
            ) : (
              <Heading
                fontWeight={"normal"}
                fontSize={"6xl"}
                lineHeight={"75px"}
                letterSpacing={"0.1em"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                @{props.username}
              </Heading>
            )}
            <Heading
              fontWeight={"normal"}
              fontSize={"2xl"}
              lineHeight={"35px"}
              letterSpacing={"0.1em"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              {props.numFollowers} followers • {props.numEvents} events
            </Heading>
            <Heading
              fontWeight={"normal"}
              fontSize={"md"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              h={"54px"}
            >
              {props.description}
            </Heading>
          </Box>
        </Flex>
      </Link>

      <Flex justifyContent={"flex-start"} alignItems={"center"} w={"20%"}>
        {props.isSubscribed === true ? (
          <Button
            w={"125px"}
            h={"40px"}
            bgColor={"#F2F2F2"}
            borderRadius={"12px"}
            onClick={() => {
              SubscriptionHandler(
                props.isSubscribed,
                props.creatorId,
                props.creatorData
              );
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"50px"}
              letterSpacing={"0.1em"}
            >
              SUBSCRIBED
            </Heading>
          </Button>
        ) : (
          <Button
            w={"125px"}
            h={"40px"}
            bgImage={
              "linear-gradient(98.57deg, #FFDE9F 8.46%, #FFC8FD 115.67%)"
            }
            borderRadius={"12px"}
            _hover={{
              bgImage:
                "linear-gradient(98.57deg, #FFCD6F 8.46%, #FFC8FD 115.67%)",
            }}
            onClick={() => {
              SubscriptionHandler(
                props.isSubscribed,
                props.creatorId,
                props.creatorData
              );
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              lineHeight={"50px"}
              letterSpacing={"0.1em"}
            >
              SUBSCRIBE
            </Heading>
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ExploreCreatorsSearchResultsCreatorTablet;
