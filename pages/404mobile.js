import Link from "next/link";

import { Button, Flex, Heading } from "@chakra-ui/react";

const MobileRedirectPage = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"50px"}
      w={"100vw"}
      h={"100vh"}
      paddingX={"25px"}
      bgSize={"cover"}
      bgPosition={"center"}
      bgRepeat={"none"}
      bgAttachment={"fixed"}
      bgImage={"url('/images/loading-background-image.png')"}
    >
      <Heading
        fontWeight={"medium"}
        fontSize={"2xl"}
        letterSpacing={"0.05em"}
        color={"#FFFFFF"}
      >
        This app is incompatable with mobile.
      </Heading>
      <Link href={"/"}>
        <Button>
          <Heading
            fontWeight={"medium"}
            fontSize={"lg"}
            letterSpacing={"0.05em"}
          >
            Home
          </Heading>
        </Button>
      </Link>
    </Flex>
  );
};

export default MobileRedirectPage;

MobileRedirectPage.getLayoutC = function PageLayout(page) {
  return <>{page}</>;
};
