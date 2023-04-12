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
  List,
  ListItem,
  useDisclosure,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";

import { Settings } from "../../../../../items";

const GlobalLayoutTopBarEndTablet = (props) => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      display={props.display}
    >
      {/* BALANCE */}

      <Flex w={"calc(100%/3)"} justifyContent={"center"} alignItems={"center"}>
        {props.money !== null ? (
          <Link href={"/settings/billing"}>
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
                fontSize={"lg"}
                letterSpacing={"0.05em"}
              >
                {props.money}
              </Heading>
            </Button>
          </Link>
        ) : (
          <Skeleton w={"100%"} h={"25px"} />
        )}
      </Flex>

      {/* PROFILE */}

      <Flex w={"calc(100%/3)"} justifyContent={"center"} alignItems={"center"}>
        <Link href={`/${props.username}`}>
          <Button variant={"ghost"} minW={"50px"}>
            <Box
              w={"32px"}
              h={"32px"}
              borderRadius={"100px"}
              overflow={"hidden"}
            >
              {props.photoURL ? (
                <Image
                  src={props.photoURL}
                  alt={"Avatar Icon"}
                  width={32}
                  height={32}
                />
              ) : (
                <SkeletonCircle />
              )}
            </Box>
          </Button>
        </Link>
      </Flex>

      {/* SETTINGS */}

      <Flex w={"calc(100%/3)"} justifyContent={"center"} alignItems={"center"}>
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
                width={25}
                height={25}
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
                        fontSize={"sm"}
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

export default GlobalLayoutTopBarEndTablet;
