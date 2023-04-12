import { useState } from "react";

import {
  Flex,
  Box,
  Input,
  Textarea,
  Heading,
  Button,
  useToast,
} from "@chakra-ui/react";

import validator from "validator";

const ContactForm = () => {
  const toast = useToast();

  const [emailInput, setEmailInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [inputState, setInputState] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!errorHandler(emailInput, subjectInput, messageInput)) {
      try {
        await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput,
            subject: subjectInput,
            message: messageInput,
          }),
        });
        setEmailInput("");
        setSubjectInput("");
        setMessageInput("");
        toast({
          title: "Contact form submitted!",
          description: "We'll respond back to you within 1-2 days!",
          status: "success",
          variant: "subtle",
          duration: 5000,
          isClosable: true,
        });
      } catch (e) {
        toast({
          title: "Oops!",
          description: `${e}`,
          status: "error",
          variant: "subtle",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const errorHandler = (email, subject, message) => {
    let error = false;

    if (email === "") {
      setInputState("Enter your email");
    } else if (!validator.isEmail(email)) {
      setInputState("Invalid email");
      error = true;
    } else {
      if (subject === "") {
        setInputState("Empty subject");
        error = true;
      } else {
        if (message === "") {
          setInputState("Empty message");
          error = true;
        } else {
          setInputState("");
        }
      }
    }

    return error;
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <Flex
          flexDirection={"column"}
          padding={"1%"}
          w={"90%"}
          maxH={"60%"}
          maxW={"800px"}
          bgColor={"#FFFFFF"}
          borderRadius={"12px"}
        >
          <Input
            value={emailInput}
            type={"email"}
            placeholder={"Email"}
            variant={"flushed"}
            size={"lg"}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <Input
            value={subjectInput}
            type={"text"}
            placeholder={"Subject"}
            variant={"flushed"}
            size={"lg"}
            onChange={(e) => setSubjectInput(e.target.value)}
          />
          <Textarea
            value={messageInput}
            type={"text"}
            placeholder={"Message"}
            variant={"flushed"}
            size={"lg"}
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
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <Box my={"5px"} h={"16px"}>
            <Heading
              fontWeight={"normal"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
              color={"#FF5858"}
            >
              {inputState}
            </Heading>
          </Box>
        </Flex>
        <Button type={"submit"} mt={"25px"} w={"200px"} borderRadius={"12px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"lg"}
            letterSpacing={"0.05em"}
          >
            Submit
          </Heading>
        </Button>
      </form>
      <style jsx>{`
        form {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default ContactForm;
