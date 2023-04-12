import Image from "next/image";

import { Flex, Spinner } from "@chakra-ui/react";

const GlobalLoading = () => {
  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"25px"}
      w={"100vw"}
      h={"100vh"}
      bgSize={"cover"}
      bgPosition={"center"}
      bgRepeat={"none"}
      bgAttachment={"fixed"}
      bgImage={"url('/images/loading-background-image.png')"}
    >
      <Image src={"/favicon/favicon.ico"} width={50} height={50} />
      <Spinner color={"#FFFFFF"} />
    </Flex>
  );
};

export default GlobalLoading;
