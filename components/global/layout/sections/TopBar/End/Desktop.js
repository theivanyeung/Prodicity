// FRONTEND IMPORTS

import Link from "next/link";
import Image from "next/image";

import {
  Flex,
  Box,
  Button,
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  List,
  ListItem,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";

import { Settings } from "../../../../../items";

const GlobalLayoutTopBarEndDesktop = (props) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      display={props.display}
    >
      {/* BALANCE */}

      <Flex w={"20%"} justifyContent={"center"} alignItems={"center"}>
        <Link href={"/settings/billing"}>
          {props.money !== null ? (
            <Button
              bgImage={
                "linear-gradient(96.08deg, rgba(244, 206, 150, 0.5) 16.62%, rgba(248, 56, 253, 0.5) 234.5%)"
              }
              _hover={{
                bgImage:
                  "linear-gradient(96.08deg, rgba(244, 206, 150, 0.75) 16.62%, rgba(248, 56, 253, 0.75) 234.5%)",
              }}
              leftIcon={
                <Image
                  src={"/images/prod-coin.png"}
                  width={"25px"}
                  height={"25px"}
                />
              }
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"xl"}
                letterSpacing={"0.05em"}
              >
                {props.money}
              </Heading>
            </Button>
          ) : (
            <Skeleton w={"100%"} h={"25px"} />
          )}
        </Link>
      </Flex>

      {/* PROFILE */}

      <Flex w={"60%"} justifyContent={"center"} alignItems={"center"}>
        <Link href={`/${props.username}`}>
          <Button
            variant={"ghost"}
            leftIcon={
              <Box
                w={"30px"}
                h={"30px"}
                borderRadius={"100px"}
                overflow={"hidden"}
              >
                {props.photoURL ? (
                  <Image
                    src={props.photoURL}
                    alt={"Avatar Icon"}
                    width={30}
                    height={30}
                  />
                ) : (
                  <SkeletonCircle />
                )}
              </Box>
            }
          >
            {!props.username ? (
              <Skeleton w={"150px"} h={"16px"} />
            ) : (
              <Heading
                fontWeight={"normal"}
                fontSize={"md"}
                letterSpacing={"0.1em"}
                textAlign={"left"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                color={"#000000"}
              >
                {props.displayName ? props.displayName : props.username}
              </Heading>
            )}
          </Button>
        </Link>
      </Flex>

      {/* SETTINGS */}

      <Flex w={"20%"} justifyContent={"center"} alignItems={"center"}>
        <Popover>
          <PopoverTrigger>
            <Button
              variant={"ghost"}
              colorScheme={"blackAlpha"}
              borderRadius={"100px"}
            >
              <Image
                src={"/images/settings-icon.png"}
                alt={"Settings Icon"}
                width={20}
                height={20}
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            mr={"10px"}
            w={"200px"}
            h={"175px"}
            boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
            borderRadius={"12px"}
            overflow={"hidden"}
          >
            <PopoverArrow />
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              w={"100%"}
              h={"100%"}
            >
              <List w={"90%"}>
                {Settings.map((setting, index) => (
                  <ListItem key={index}>
                    <Button
                      variant={"ghost"}
                      w={"100%"}
                      onClick={() =>
                        props.clickHandler(setting.title, setting.link)
                      }
                    >
                      <Heading
                        fontWeight={"medium"}
                        fontSize={"md"}
                        textAlign={"left"}
                        letterSpacing={"0.1em"}
                        color={"#000000"}
                      >
                        {setting.title}
                      </Heading>
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Flex>
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
};

export default GlobalLayoutTopBarEndDesktop;
