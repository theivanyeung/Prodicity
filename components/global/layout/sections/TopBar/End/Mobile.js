// FRONTEND IMPORTS

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  Flex,
  Box,
  Button,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  List,
  ListItem,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";

import GlobalCreateEventResponsiveFirst from "../../../../modal/CreateEvent/Responsive/First";

import { Settings } from "../../../../../items";

// BACKEND IMPORTS

import { DeleteEventDraft } from "../../../../../server";

const GlobalLayoutTopBarEndMobile = (props) => {
  const [modal, setModal] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      display={props.display}
    >
      {/* BALANCE */}

      <Flex w={"25%"} justifyContent={"center"} alignItems={"center"}>
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
                fontSize={"md"}
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

      <Flex w={"25%"} justifyContent={"center"} alignItems={"center"}>
        <Link href={`/${props.username}`}>
          <Button variant={"ghost"}>
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

      {/* SEARCH */}

      <Flex w={"25%"} justifyContent={"center"} alignItems={"center"}>
        <Link href={"/explorecreators"}>
          <Button
            variant={"ghost"}
            colorScheme={"whiteAlpha"}
            bgColor="white"
            borderRadius={"100px"}
          >
            <Image
              src={"/images/search-icon.png"}
              alt={"Search Icon"}
              width={25}
              height={25}
            />
          </Button>
        </Link>
      </Flex>

      {/* SETTINGS */}

      <Flex w={"25%"} justifyContent={"center"} alignItems={"center"}>
        <Button
          variant={"ghost"}
          colorScheme={"blackAlpha"}
          borderRadius={"100px"}
          onClick={() => {
            setModal(false);
            onOpen();
          }}
        >
          <Image
            src={"/images/settings-icon.png"}
            alt={"Settings Icon"}
            width={25}
            height={25}
          />
        </Button>

        <Modal
          size={"full"}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            if (modal === true) {
              DeleteEventDraft(props.user.uid);
            }
          }}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            {modal ? (
              <GlobalCreateEventResponsiveFirst onClose={onClose} />
            ) : (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                w={"100%"}
                h={"300"}
              >
                <List w={"50%"}>
                  {Settings.map((setting, index) => (
                    <ListItem key={index} h={"40px"}>
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
            )}
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default GlobalLayoutTopBarEndMobile;
