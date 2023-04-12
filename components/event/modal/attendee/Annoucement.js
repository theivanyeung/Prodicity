import { useState } from "react";

import { Flex, Box, Heading, Textarea, Button } from "@chakra-ui/react";
import { useEffect } from "react";

const EventModalAnnoucement = (props) => {
  const [annoucementInput, setAnnoucementInput] = useState("");
  const [error, setError] = useState(false);

  const submitAnnoucementHandler = () => {
    if (annoucementInput.length === 0 || annoucementInput.length > 100) {
      setError(true);
    } else {
      props.submitAnnoucementHandler(annoucementInput);
      setError(false);
    }
    setAnnoucementInput("");
  };

  return (
    <Flex justifyContent={"center"}>
      <Box align={"center"} mb={"15px"} w={"90%"}>
        <Flex alignItems={"center"} h={"50px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"20px"}
            letterSpacing={"0.1em"}
          >
            Make An Annoucement
          </Heading>
        </Flex>

        <>
          {props.timer ? (
            <>
              <Textarea
                value={annoucementInput}
                placeholder={"Type your annoucement here..."}
                bgImage={"linear-gradient(93.5deg, #FFF8E8 0%, #F9E8FF 100%)"}
                onChange={(e) => {
                  setAnnoucementInput(e.target.value);
                }}
                sx={{
                  "::-webkit-scrollbar": {
                    width: "5px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#777777",
                    borderRadius: "10px",
                  },
                }}
                isDisabled
              />
              <Heading
                mt={"10px"}
                fontWeight={"medium"}
                fontSize={"xs"}
                letterSpacing={"0.1em"}
                color={"#E44CFD"}
              >
                {annoucementInput.length} / 100
              </Heading>
            </>
          ) : error || annoucementInput.length > 100 ? (
            <>
              <Textarea
                value={annoucementInput}
                placeholder={"Type your annoucement here..."}
                bgColor={"#FFD9D9"}
                onChange={(e) => {
                  setAnnoucementInput(e.target.value);
                }}
                sx={{
                  "::-webkit-scrollbar": {
                    width: "5px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#777777",
                    borderRadius: "10px",
                  },
                }}
                isInvalid
              />
              <Heading
                mt={"10px"}
                fontWeight={"medium"}
                fontSize={"xs"}
                letterSpacing={"0.1em"}
                color={"#FF0000"}
              >
                {annoucementInput.length} / 100
              </Heading>
            </>
          ) : (
            <>
              <Textarea
                value={annoucementInput}
                placeholder={"Type your annoucement here..."}
                bgImage={"linear-gradient(93.5deg, #FFF8E8 0%, #F9E8FF 100%)"}
                onChange={(e) => {
                  setAnnoucementInput(e.target.value);
                }}
                sx={{
                  "::-webkit-scrollbar": {
                    width: "5px",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "#777777",
                    borderRadius: "10px",
                  },
                }}
              />
              <Heading
                mt={"10px"}
                fontWeight={"medium"}
                fontSize={"xs"}
                letterSpacing={"0.1em"}
                color={"#E44CFD"}
              >
                {annoucementInput.length} / 100
              </Heading>
            </>
          )}

          <Button
            mt={"10px"}
            w={"125px"}
            h={"30px"}
            bgImage={"linear-gradient(93.25deg, #FFCD92 -8.32%, #F094FF 113%)"}
            borderRadius={"16px"}
            onClick={() => {
              submitAnnoucementHandler();
              props.onClose();
            }}
          >
            <Heading
              fontWeight={"normal"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
            >
              Submit
            </Heading>
          </Button>
        </>
      </Box>
    </Flex>
  );
};

export default EventModalAnnoucement;
