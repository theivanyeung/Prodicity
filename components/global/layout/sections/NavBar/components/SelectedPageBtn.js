import Link from "next/link";
import Image from "next/image";

import { Button, Flex, Heading } from "@chakra-ui/react";

const GlobalLayoutNavBarSelectedPageBtn = (props) => {
  return (
    <>
      {/* FULL VIEW */}

      <Link href={props.link}>
        <Button
          my={"5px"}
          ml={"5px"}
          w={"205px"}
          variant={"ghost"}
          bgImage={
            "linear-gradient(96.08deg, rgba(244, 206, 150, 0.5) 16.62%, rgba(248, 56, 253, 0.5) 234.5%)"
          }
          _hover={{
            bgImage:
              "linear-gradient(96.08deg, rgba(244, 206, 150, 0.75) 16.62%, rgba(248, 56, 253, 0.75) 234.5%)",
          }}
          display={{
            xxl: "flex",
            xl: "flex",
            lg: "none",
            md: "none",
            sm: "none",
            base: "flex",
          }}
          onClick={props.onClose}
        >
          <Flex justifyContent={"flex-start"} alignItems={"center"} w={"25%"}>
            <Image
              src={props.iconSelected}
              alt={props.alt}
              width={20}
              height={20}
            />
          </Flex>
          <Heading
            w={"75%"}
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"md"}
            color={"#232323"}
          >
            {props.title}
          </Heading>
        </Button>
      </Link>

      {/* BASE VIEW */}

      <Link href={props.link}>
        <Button
          my={"5px"}
          ml={"5px"}
          w={"55px"}
          variant={"ghost"}
          bgImage={
            "linear-gradient(96.08deg, rgba(244, 206, 150, 0.5) 16.62%, rgba(248, 56, 253, 0.5) 234.5%)"
          }
          _hover={{
            bgImage:
              "linear-gradient(96.08deg, rgba(244, 206, 150, 0.75) 16.62%, rgba(248, 56, 253, 0.75) 234.5%)",
          }}
          display={{
            xxl: "none",
            xl: "none",
            lg: "flex",
            md: "flex",
            sm: "flex",
            base: "none",
          }}
          onClick={props.onClose}
        >
          <Flex justifyContent={"flex-start"} alignItems={"center"}>
            <Image
              src={props.iconSelected}
              alt={props.alt}
              width={20}
              height={20}
            />
          </Flex>
        </Button>
      </Link>
    </>
  );
};

export default GlobalLayoutNavBarSelectedPageBtn;
