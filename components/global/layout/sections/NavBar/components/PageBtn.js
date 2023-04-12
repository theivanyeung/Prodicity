import Link from "next/link";
import Image from "next/image";

import { Button, Flex, Heading } from "@chakra-ui/react";

const GlobalLayoutNavBarPageBtn = (props) => {
  return (
    <div>
      {/* FULL VIEW */}

      <Link href={props.link}>
        <Button
          my={"5px"}
          ml={"5px"}
          w={"205px"}
          variant={"ghost"}
          _hover={{
            bgColor: "#EDEDED",
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
            <Image src={props.icon} alt={props.alt} width={20} height={20} />
          </Flex>
          <Heading
            w={"75%"}
            textAlign={"left"}
            fontWeight={"medium"}
            fontSize={"md"}
            color={"#5C5C5C"}
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
          onClick={props.onClose}
        >
          <Flex justifyContent={"flex-start"} alignItems={"center"}>
            <Image src={props.icon} alt={props.alt} width={20} height={20} />
          </Flex>
        </Button>
      </Link>
    </div>
  );
};

export default GlobalLayoutNavBarPageBtn;
