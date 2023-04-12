import { useEffect, useState } from "react";

import { Flex, Box, Heading, Button, Spinner } from "@chakra-ui/react";

import SettingsAccountPageModalEmailVerifyCode from "./VerifyCode";

// BACKEND IMPORTS

import { getAuth } from "firebase/auth";

const SettingsAccountPageModalEmailSendCode = (props) => {
  const [modal, setModal] = useState(false);
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCode(Math.floor(100000 + Math.random() * 900000));
  }, []);

  const auth = getAuth();

  const clickHandler = async () => {
    try {
      await fetch("../api/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: auth.currentUser.email, code: code }),
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setModal(true);
  };

  return (
    <>
      {loading ? (
        <Flex justifyContent={"center"} alignItems={"center"} h={"375px"}>
          <Spinner size={"lg"} color={"#FFE1B5"} />
        </Flex>
      ) : modal === false ? (
        <Flex justifyContent={"center"} h={"325px"}>
          <Box align={"center"} w={"90%"}>
            <Flex alignItems={"center"} h={"50px"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"20px"}
                letterSpacing={"0.1em"}
              >
                Change Username
              </Heading>
            </Flex>

            <Heading
              my={"20px"}
              w={"95%"}
              fontWeight={"medium"}
              fontSize={"lg"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
            >
              To update your email address, we’ll need to verify your old email,{" "}
              {auth.currentUser && auth.currentUser.email} in order to change
              it.
            </Heading>

            <Box mt={"50px"} w={"100%"}>
              <Button
                w={"80%"}
                bgColor={"#FFD39F"}
                borderRadius={"12px"}
                onClick={() => {
                  clickHandler();
                  setLoading(true);
                }}
              >
                Send Verification Code
              </Button>
            </Box>

            <Box mt={"25px"}>
              <Button variant={"link"} borderRadius={"12px"}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Flex>
      ) : (
        <SettingsAccountPageModalEmailVerifyCode
          code={code}
          onClose={props.onClose}
        />
      )}
    </>
  );
};

export default SettingsAccountPageModalEmailSendCode;
