import Link from "next/link";

import { Flex, Heading, Button } from "@chakra-ui/react";

const AboutJoinBase = (props) => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      h={"50%"}
      gap={"25px"}
      display={props.display}
    >
      <Heading
        fontWeight={"bold"}
        fontSize={"2xl"}
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
            fontSize={"md"}
            letterSpacing={"0.05em"}
          >
            View Open Positions
          </Heading>
        </Button>
      </Link>
    </Flex>
  );
};

export default AboutJoinBase;
