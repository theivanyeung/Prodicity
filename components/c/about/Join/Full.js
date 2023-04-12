import Link from "next/link";

import { Flex, Heading, Button } from "@chakra-ui/react";

const AboutJoinFull = (props) => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"50%"}
      gap={"50px"}
      display={props.display}
    >
      <Heading
        fontWeight={"bold"}
        fontSize={"5xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        Join us today! 🔥
      </Heading>
      <Link href={"/c/career"}>
        <Button
          bgImage={
            "linear-gradient(96.08deg, rgba(244, 206, 150, 0.5) 16.62%, rgba(248, 56, 253, 0.5) 234.5%)"
          }
          _hover={{
            bgImage:
              "linear-gradient(96.08deg, rgba(244, 206, 150, 0.75) 16.62%, rgba(248, 56, 253, 0.75) 234.5%)",
          }}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
          >
            View Open Positions
          </Heading>
        </Button>
      </Link>
    </Flex>
  );
};

export default AboutJoinFull;
