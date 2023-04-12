import Image from "next/image";

import { Flex, Heading, Box, Button } from "@chakra-ui/react";

import { Prods } from "../../../items";

const SettingsProdPageFull = (props) => {
  return (
    <>
      <Flex flexDirection={"column"} gap={"5px"} w={"80%"}>
        <Heading fontWeight={"medium"} fontSize={"xl"} letterSpacing={"0.05em"}>
          Prod coins are used to purchase events.
        </Heading>
        <Heading fontWeight={"medium"} fontSize={"md"} letterSpacing={"0.05em"}>
          Click here to contact us for coin refunds.
        </Heading>
      </Flex>
      {Prods.map((prod, index) => (
        <Flex
          key={index}
          justifyContent={"space-between"}
          alignItems={"center"}
          bgImage={
            "linear-gradient(96.08deg, rgba(244, 206, 150, 0.5) 16.62%, rgba(248, 56, 253, 0.5) 234.5%)"
          }
          borderRadius={"8px"}
          w={"90%"}
          paddingX={"25px"}
          paddingY={"15px"}
        >
          <Box align={"center"} w={"30%"}>
            <Heading
              fontWeight={"medium"}
              fontSize={"2xl"}
              letterSpacing={"0.05em"}
            >
              {prod.price}
            </Heading>
          </Box>
          <Box w={"30%"}>
            <Button
              w={"100%"}
              bgColor={"#FFFFFF"}
              _hover={{
                bgImage:
                  "linear-gradient(96.08deg, rgba(244, 206, 150, 0.75) 16.62%, rgba(248, 56, 253, 0.75) 234.5%)",
              }}
              leftIcon={
                <Image
                  src={"/images/prod-coin.png"}
                  width={"30px"}
                  height={"30px"}
                />
              }
              onClick={() => props.purchaseRequestHandler(prod.total)}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"2xl"}
                letterSpacing={"0.05em"}
              >
                {prod.amount}
              </Heading>
            </Button>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default SettingsProdPageFull;
