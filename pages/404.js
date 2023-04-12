import Image from "next/image";
import Link from "next/link";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import { DISCORD_LINK, TWITTER_LINK } from "../components/constants";

const Socials = [
  {
    image: "/images/discord-icon.png",
    text: "Discord",
    link: DISCORD_LINK,
  },
  {
    image: "/images/twitter-icon.png",
    text: "Twitter",
    link: TWITTER_LINK,
  },
];

const NotFoundPage = () => {
  return (
    <Box
      align={"center"}
      w={"100vw"}
      h={"100vh"}
      bgSize={"cover"}
      bgPosition={"center"}
      bgRepeat={"none"}
      bgAttachment={"fixed"}
      bgImage={"url('/images/loading-background-image.png')"}
      overflowX={"hidden"}
      overflowY={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#777777",
          borderRadius: "10px",
        },
      }}
    >
      <Link href={"/home"}>
        <Flex
          as={"button"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={"25px"}
        >
          <Image src={"/images/prodicity-logo.png"} width={30} height={53.57} />
          <Heading
            fontWeight={"light"}
            fontSize={"2xl"}
            lineHeight={"50px"}
            letterSpacing={"0.4em"}
            color={"#FFFFFF"}
          >
            Prodicity
          </Heading>
        </Flex>
      </Link>

      <Heading
        mt={"15vh"}
        fontSize={"6xl"}
        letterSpacing={"0.15em"}
        color={"#FFFFFF"}
      >
        Invalid Page
      </Heading>

      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={"15vh"}
      >
        <Heading
          fontWeight={"light"}
          fontSize={"2xl"}
          lineHeight={"41px"}
          letterSpacing={"0.05em"}
          color={"#FFFFFF"}
        >
          While you&apos;re here, join our community!
        </Heading>
        {Socials.map((item, index) => (
          <Link key={index} href={item.link}>
            <Flex
              as={"button"}
              justifyContent={"space-between"}
              alignItems={"center"}
              my={"15px"}
              w={"100px"}
            >
              <Image
                src={item.image}
                alt={"Social Media Icons"}
                width={30}
                height={30}
              />
              <Heading
                fontWeight={"normal"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {item.text}
              </Heading>
            </Flex>
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default NotFoundPage;

NotFoundPage.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
