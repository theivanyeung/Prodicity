import { useState } from "react";

import { useRouter } from "next/router";

import {
  Flex,
  Box,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Image,
} from "@chakra-ui/react";

import SEO from "../../components/SEO";

const ExploreCreators = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/explorecreators/${input}`);
  };

  return (
    <>
      <SEO
        title={"Explore Creators - Prodicity"}
        description={""}
        keywords={""}
        image={""}
      />
      <Box
        align={"center"}
        w={"100%"}
        h={"100%"}
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
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
          h={"80%"}
        >
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
            w={"50%"}
            h={"150px"}
          >
            <Heading
              fontWeight={"normal"}
              fontSize={"5xl"}
              lineHeight={"61px"}
              letterSpacing={"0.1em"}
            >
              Find your favorite creators!
            </Heading>
            <form onSubmit={submitHandler}>
              <InputGroup mt={"50px"} size={"md"}>
                <Input
                  type={"search"}
                  placeholder={"Discover creators"}
                  bgColor={"#F4F3F1"}
                  borderRadius={"30px"}
                  fontWeight={"normal"}
                  fontSize={"sm"}
                  letterSpacing={"0.1em"}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
                <InputRightElement>
                  <Image
                    src={"./images/search-icon.png"}
                    alt={"Search Icon"}
                    h={"20px"}
                  />
                </InputRightElement>
              </InputGroup>
            </form>
            <style jsx>{`
              form {
                width: 100%;
              }
            `}</style>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default ExploreCreators;
