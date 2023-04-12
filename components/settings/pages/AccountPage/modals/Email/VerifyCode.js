import { useState } from "react";

import { Flex, Box, Heading, Button, Input } from "@chakra-ui/react";

import SettingsAccountPageModalEmailChangeEmail from "./ChangeEmail";

const SettingsAccountPageModalEmailVerifyCode = (props) => {
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");
  const [inputState, setInputState] = useState("");

  const clickHandler = (e) => {
    e.preventDefault();
    if (input == props.code) {
      setModal(true);
    } else {
      setInputState("Invalid code");
    }
  };

  return (
    <>
      {modal === false ? (
        <Flex justifyContent={"center"} h={"250px"}>
          <Box align={"center"} w={"90%"}>
            <Flex alignItems={"center"} h={"50px"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"20px"}
                letterSpacing={"0.1em"}
              >
                Change Email
              </Heading>
            </Flex>

            <Heading
              fontWeight={"medium"}
              fontSize={"xs"}
              lineHeight={"17px"}
              letterSpacing={"0.1em"}
              color={"#979797"}
            >
              A verification code was sent to your email.
            </Heading>

            <form onSubmit={clickHandler}>
              <Box align={"left"} my={"25px"}>
                <Heading
                  ml={"20px"}
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"24px"}
                  letterSpacing={"0.1em"}
                >
                  Verification Code
                </Heading>
                <Input
                  value={input}
                  borderRadius={"8px"}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Heading ml={"20px"} fontWeight={"normal"} fontSize={"xs"}>
                  {inputState}
                </Heading>
              </Box>

              <Box align={"right"} w={"90%"}>
                <Button
                  type={"submit"}
                  background={"#FFD39F"}
                  borderRadius={"12px"}
                >
                  Next
                </Button>
              </Box>
            </form>
          </Box>
        </Flex>
      ) : (
        <SettingsAccountPageModalEmailChangeEmail onClose={props.onClose} />
      )}
    </>
  );
};

export default SettingsAccountPageModalEmailVerifyCode;
