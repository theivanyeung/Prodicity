import { useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

const GlobalLayoutTopBarCenter = (props) => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/explorecreators/${input}`);
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      w={"65%"}
      display={props.display}
    >
      <form onSubmit={submitHandler}>
        <InputGroup size={"md"}>
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
              src={"/images/search-icon.png"}
              alt={"Search Icon"}
              width={20}
              height={20}
            />
          </InputRightElement>
        </InputGroup>
      </form>
      <style jsx>{`
        form {
          width: 80%;
        }
      `}</style>
    </Flex>
  );
};

export default GlobalLayoutTopBarCenter;
