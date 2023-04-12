import Image from "next/image";
import Link from "next/link";

import { Button, Flex, Box, Heading } from "@chakra-ui/react";

const GlobalLayoutNavBarFollowingBtn = (props) => {
  return (
    <>
      {/* FULL VIEW */}
      <Link href={`/${props.link}`}>
        <Button
          my={"5px"}
          ml={"5px"}
          w={"200px"}
          h={"40px"}
          variant={"ghost"}
          size={"sm"}
          _hover={{
            bgColor: "#EDEDED",
          }}
          display={{
            xxl: "flex",
            xl: "flex",
            lg: "none",
            md: "none",
            sm: "none",
            base: "none",
          }}
        >
          <Flex alignItems={"center"} w={"25%"}>
            <Box
              overflow={"hidden"}
              w={"30px"}
              h={"30px"}
              borderRadius={"100px"}
            >
              <Image src={props.pfp} alt={props.alt} width={30} height={30} />
            </Box>
          </Flex>
          <Heading
            w={"75%"}
            fontWeight={"medium"}
            fontSize={"md"}
            letterSpacing={"0.1em"}
            textAlign={"left"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {props.name}
          </Heading>
        </Button>
      </Link>

      {/* BASE VIEW */}

      <Link href={`/${props.link}`}>
        <Button
          my={"5px"}
          ml={"5px"}
          w={"55px"}
          h={"40px"}
          variant={"ghost"}
          size={"sm"}
          _hover={{
            bgColor: "#EDEDED",
          }}
          display={{
            xxl: "none",
            xl: "none",
            lg: "flex",
            md: "flex",
            sm: "flex",
            base: "none",
          }}
        >
          <Flex alignItems={"center"}>
            <Box
              overflow={"hidden"}
              w={"30px"}
              h={"30px"}
              borderRadius={"100px"}
            >
              <Image src={props.pfp} alt={props.alt} width={30} height={30} />
            </Box>
          </Flex>
        </Button>
      </Link>

      {/* MODAL VIEW */}

      <Link href={`/${props.name}`}>
        <Button
          my={"10px"}
          ml={"5px"}
          w={"200px"}
          h={"40px"}
          variant={"ghost"}
          size={"sm"}
          _hover={{
            bgColor: "#EDEDED",
          }}
          display={{
            xxl: "none",
            xl: "none",
            lg: "none",
            md: "none",
            sm: "none",
            base: "flex",
          }}
        >
          <Flex alignItems={"center"} w={"25%"}>
            <Image src={props.pfp} alt={props.alt} width={30} height={30} />
          </Flex>
          <Heading
            w={"75%"}
            fontWeight={"normal"}
            fontSize={"md"}
            letterSpacing={"0.1em"}
            textAlign={"left"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {props.name}
          </Heading>
        </Button>
      </Link>
    </>
  );
};

export default GlobalLayoutNavBarFollowingBtn;
