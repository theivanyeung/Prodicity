import Link from "next/link";
import Image from "next/image";

import { Flex, Heading, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { NavBar } from "../../../../items";

const LayoutHeaderDrawer = (props) => {
  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"} h={"150px"}>
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"85%"}>
          <Link href={"/"}>
            <Flex as={"button"} alignItems={"center"} gap={"10px"}>
              <Image
                src={"/images/prodicity-logo.png"}
                alt={"prodicity logo"}
                width={22.5}
                height={40.17}
              />
              <Heading
                fontWeight={"medium"}
                fontSize={"xl"}
                letterSpacing={"0.05em"}
              >
                Prodicity
              </Heading>
            </Flex>
          </Link>

          <Button onClick={props.onClose}>
            <CloseIcon />
          </Button>
        </Flex>
      </Flex>

      <Flex justifyContent={"center"} alignItems={"center"}>
        <Flex flexDirection={"column"} gap={"25px"} w={"85%"}>
          {NavBar.map((item, index) => (
            <Link key={index} href={item.link}>
              <Heading
                as={"button"}
                fontWeight={"medium"}
                fontSize={"3xl"}
                letterSpacing={"0.05em"}
              >
                {item.title}
              </Heading>
            </Link>
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default LayoutHeaderDrawer;
