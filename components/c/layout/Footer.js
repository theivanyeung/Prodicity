import Link from "next/link";
import Image from "next/image";

import { Flex, Box, Heading, Button } from "@chakra-ui/react";

import { TWITTER_LINK, DISCORD_LINK, LINKEDIN_LINK } from "../../constants";

const Socials = [
  {
    src: "/images/white-twitter.png",
    alt: "Prodicity Twitter Link",
    link: TWITTER_LINK,
  },
  {
    src: "/images/white-linkedin.png",
    alt: "Prodicity Linkedin Link",
    link: LINKEDIN_LINK,
  },
  {
    src: "/images/white-discord.png",
    alt: "Prodicity Discord Link",
    link: DISCORD_LINK,
  },
];

const Extras = [
  { title: "Privacy", link: "/c/privacy" },
  { title: "Terms", link: "/c/tos" },
];

const LayoutFooter = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"1350px"}
      maxW={"90%"}
      h={"75px"}
    >
      <Flex gap={"15px"}>
        {Socials.map((social, index) => (
          <Link key={index} href={social.link} target={"_blank"}>
            <Box as={"button"}>
              <Image src={social.src} key={index} width={30} height={30} />
            </Box>
          </Link>
        ))}
      </Flex>
      <Flex gap={"25px"}>
        {Extras.map((item, index) => (
          <Link key={index} href={item.link}>
            <Button variant={"link"}>
              <Heading
                fontWeight={"normal"}
                fontSize={"lg"}
                letterSpacing={"0.05em"}
                color={"#FFFFFF"}
              >
                {item.title}
              </Heading>
            </Button>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default LayoutFooter;
