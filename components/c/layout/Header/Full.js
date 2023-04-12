import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Flex, Heading, Button } from "@chakra-ui/react";

import { NavBar, ProdicityLogo } from "../../../items";

const LayoutHeaderFull = (props) => {
  const router = useRouter();

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"1350px"}
      maxW={"90%"}
      h={"75px"}
      display={props.display}
    >
      <Link href={"/"}>
        <Flex
          as={"button"}
          alignItems={"center"}
          gap={"10px"}
          _hover={{ textShadow: "0px 0px 2.5px #FFFFFF" }}
        >
          <Image
            src={"/images/prodicity-logo.png"}
            alt={ProdicityLogo}
            width={22.5}
            height={40.17}
          />
          <Heading
            fontWeight={"medium"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
            color={"#FFFFFF"}
          >
            Prodicity
          </Heading>
        </Flex>
      </Link>

      <Flex justifyContent={"center"} alignItems={"center"} gap={"50px"}>
        {NavBar.map((item, index) => (
          <Link key={index} href={item.link}>
            <Button variant={"link"} colorScheme={"whiteAlpha"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"xl"}
                letterSpacing={"0.05em"}
                color={"#FEFEFE"}
                _hover={{
                  color: "#FFFFFF",
                }}
                textShadow={
                  props.page === item.title && "0px 0px 2.5px #FFFFFF"
                }
              >
                {item.title}
              </Heading>
            </Button>
          </Link>
        ))}
      </Flex>

      <Button
        bgColor={"#FFFFFF"}
        borderRadius={"24px"}
        onClick={() => router.push("/register")}
      >
        <Heading fontWeight={"medium"} fontSize={"md"} letterSpacing={"0.05em"}>
          Open Prodicity
        </Heading>
      </Button>
    </Flex>
  );
};

export default LayoutHeaderFull;
