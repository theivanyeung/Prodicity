// FRONTEND IMPORTS

import Image from "next/image";

import { Flex, Box, Heading, Button } from "@chakra-ui/react";

// BACKEND IMPORTS

import { SubscriptionHandler } from "../../../../server";

const ExploreCreatorsSearchResultsCreatorMobile = (props) => {
  return (
    <Flex
      justifyContent={"space-between"}
      my={"1.33vw"}
      w={"95%"}
      h={"10vw"}
      display={props.display}
    >
      <Flex as={"button"} justifyContent={"flex-start"} w={"80%"}>
        <Box align={"center"} w={"25%"} h={"10vw"}>
          <Box
            overflow={"hidden"}
            w={"10vw"}
            h={"10vw"}
            borderRadius={"8.34vw"}
          >
            <Image
              src={props.photoURL}
              alt={"Avatar"}
              layout="responsive"
              width={120}
              height={120}
            />
          </Box>
        </Box>
        <Box align={"left"} w={"75%"}>
          <Heading
            fontWeight={"normal"}
            fontSize={"3.2vw"}
            lineHeight={"5vw"}
            letterSpacing={"0.13vw"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {props.name}
          </Heading>
          {props.displayName ? (
            <Flex>
              <Heading
                mr={"1.67vw"}
                fontWeight={"normal"}
                fontSize={"3.2vw"}
                lineHeight={"5vw"}
                letterSpacing={"0.13vw"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {props.displayName}
              </Heading>
              <Heading
                fontWeight={"normal"}
                fontSize={"2.34vw"}
                lineHeight={"5vw"}
                letterSpacing={"0.13vw"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                @{props.username}
              </Heading>
            </Flex>
          ) : (
            <Heading
              fontWeight={"normal"}
              fontSize={"3.2vw"}
              lineHeight={"5vw"}
              letterSpacing={"0.13vw"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              @{props.username}
            </Heading>
          )}
          <Heading
            fontWeight={"normal"}
            fontSize={"1.6vw"}
            lineHeight={"2.34vw"}
            letterSpacing={"0.13vw"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {props.numFollowers} followers • {props.numEvents} events
          </Heading>
          <Heading
            fontWeight={"normal"}
            fontSize={"1.07vw"}
            lineHeight={"1.8vw"}
            letterSpacing={"0.13vw"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            h={"3.6vw"}
          >
            {props.description}
          </Heading>
        </Box>
      </Flex>

      <Flex justifyContent={"flex-start"} alignItems={"center"} w={"20%"}>
        {props.isSubscribed === true ? (
          <Button
            w={"8.34vw"}
            h={"2.67vw"}
            bgColor={"#F2F2F2"}
            borderRadius={"0.8vw"}
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
              fontSize={"1.07vw"}
              lineHeight={"3.34vw"}
              letterSpacing={"0.1em"}
            >
              SUBSCRIBED
            </Heading>
          </Button>
        ) : (
          <Button
            w={"8.34vw"}
            h={"2.67vw"}
            bgImage={
              "linear-gradient(98.57deg, #FFDE9F 8.46%, #FFC8FD 115.67%)"
            }
            borderRadius={"0.8vw"}
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
              fontSize={"1.07vw"}
              lineHeight={"3.34vw"}
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

export default ExploreCreatorsSearchResultsCreatorMobile;
