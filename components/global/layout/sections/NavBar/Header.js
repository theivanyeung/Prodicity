import Link from "next/link";
import Image from "next/image";

import { Flex, Heading } from "@chakra-ui/react";

const GlobalLayoutNavBarHeader = () => {
  return (
    <Flex alignItems={"center"} h={"50px"}>
      <Link href="/home">
        <Flex as={"button"}>
          <Flex alignItems={"center"} ml={"25px"}>
            <Image
              src={"/images/prodicity-logo.png"}
              alt={"Prodicity Logo"}
              width="14vw"
              height="25vw"
            />
          </Flex>

          <Heading
            ml={"12px"}
            fontWeight={"medium"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
            display={{
              xxl: "block",
              xl: "block",
              lg: "none",
              md: "none",
              sm: "none",
              base: "block",
            }}
          >
            Prodicity
          </Heading>
        </Flex>
      </Link>
    </Flex>
  );
};

export default GlobalLayoutNavBarHeader;
