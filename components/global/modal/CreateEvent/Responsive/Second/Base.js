import { Box, Heading, Input, Button, Flex } from "@chakra-ui/react";

const GlobalCreateEventResponsiveSecondBase = (props) => {
  return (
    <Box align={"center"} w={"100%"} display={props.display}>
      <Box align={"left"} mt={"10px"} w={"80%"}>
        <Heading
          fontWeight={"medium"}
          fontSize={"xl"}
          lineHeight={"41px"}
          letterSpacing={"0.05em"}
        >
          TICKET
        </Heading>

        {/* SET TICKET PRICE */}

        <Box mt={"25px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"27px"}
            letterSpacing={"0.05em"}
          >
            Set Ticket Price
          </Heading>
          <Box w={"100%"}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Heading
                mr={"10px"}
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"27px"}
                letterSpacing={"0.05em"}
              >
                $
              </Heading>
              {props.isFree ? (
                <Input
                  type={"number"}
                  placeholder={"00"}
                  borderRadius={"12px"}
                  isDisabled
                />
              ) : (
                <Input
                  type={"number"}
                  placeholder={"00"}
                  borderRadius={"12px"}
                  onChange={(e) => props.setWholePrice(e.target.value)}
                />
              )}

              <Heading
                mx={"10px"}
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"27px"}
                letterSpacing={"0.05em"}
              >
                .
              </Heading>
              {props.isFree ? (
                <Input
                  type={"number"}
                  placeholder={"00"}
                  borderRadius={"12px"}
                  isDisabled
                />
              ) : (
                <Input
                  type={"number"}
                  placeholder={"00"}
                  borderRadius={"12px"}
                  onChange={(e) => props.setFractionPrice(e.target.value)}
                />
              )}
            </Flex>
            <Flex alignItems={"center"}>
              <Heading
                mx={"10px"}
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"27px"}
                letterSpacing={"0.05em"}
              >
                or
              </Heading>
              {props.isFree ? (
                <Button
                  variant={"link"}
                  onClick={() => props.setIsFree(!props.isFree)}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"md"}
                    lineHeight={"27px"}
                    letterSpacing={"0.05em"}
                    color={"#000000"}
                  >
                    set price
                  </Heading>
                </Button>
              ) : (
                <Button
                  variant={"link"}
                  onClick={() => props.setIsFree(!props.isFree)}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"md"}
                    lineHeight={"27px"}
                    letterSpacing={"0.05em"}
                    color={"#000000"}
                  >
                    set free
                  </Heading>
                </Button>
              )}
            </Flex>
          </Box>
          <Flex w={"100%"} h={"20px"}>
            <Heading
              ml={"20px"}
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.05em"}
              color={"#FF5858"}
            >
              {props.priceState}
            </Heading>
          </Flex>
        </Box>

        <Box mt={"5px"}>
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            lineHeight={"27px"}
            letterSpacing={"0.05em"}
          >
            Set Interactions
          </Heading>

          {/* Annoucement Switch */}

          <Box align={"center"} my={"20px"} w={"100%"}>
            <Box>
              <Heading
                fontWeight={"normal"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
              >
                Annoucements
              </Heading>
              <Heading
                fontWeight={"normal"}
                fontSize={"10px"}
                letterSpacing={"0.05em"}
              >
                VIPs can make annoucements each event that will show as a modal
                in the stream
              </Heading>
            </Box>
            {props.annoucementSwitch === true ? (
              <Flex
                my={"10px"}
                w={"130px"}
                h={"30px"}
                overflow={"hidden"}
                boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                borderRadius={"20px"}
              >
                <Flex
                  as={"button"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"50%"}
                  h={"100%"}
                  bgColor={"#F4DFBC"}
                  borderRight={"0.5px solid #000000"}
                  onClick={props.clickAnnoucementSwitch}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"xs"}
                    letterSpacing={"0.05em"}
                  >
                    Active
                  </Heading>
                </Flex>
                <Flex
                  as={"button"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"50%"}
                  h={"100%"}
                  bgColor={"#DCDCDC"}
                  borderLeft={"0.5px solid #000000"}
                  onClick={props.clickAnnoucementSwitch}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"xs"}
                    letterSpacing={"0.05em"}
                  >
                    Disable
                  </Heading>
                </Flex>
              </Flex>
            ) : (
              <Flex
                my={"10px"}
                w={"130px"}
                h={"30px"}
                overflow={"hidden"}
                boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                borderRadius={"20px"}
              >
                <Flex
                  as={"button"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"50%"}
                  h={"100%"}
                  bgColor={"#DCDCDC"}
                  borderRight={"0.5px solid #000000"}
                  onClick={props.clickAnnoucementSwitch}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"xs"}
                    letterSpacing={"0.05em"}
                  >
                    Active
                  </Heading>
                </Flex>
                <Flex
                  as={"button"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"50%"}
                  h={"100%"}
                  bgColor={"#F4DFBC"}
                  borderLeft={"0.5px solid #000000"}
                  onClick={props.clickAnnoucementSwitch}
                >
                  <Heading
                    fontWeight={"medium"}
                    fontSize={"xs"}
                    letterSpacing={"0.05em"}
                  >
                    Disable
                  </Heading>
                </Flex>
              </Flex>
            )}
          </Box>

          {/* Annoucement Cooldown */}

          {props.annoucementSwitch === true ? (
            <Box align={"center"} my={"20px"} w={"100%"}>
              <Box>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"md"}
                  letterSpacing={"0.05em"}
                >
                  Annoucement Cooldown
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"10px"}
                  letterSpacing={"0.05em"}
                >
                  Sets the cooldown in minutes for annoucements
                </Heading>
              </Box>
              <Flex my={"10px"} w={"130px"} alignItems={"flex-end"}>
                <Input
                  type={"number"}
                  placeholder={"0"}
                  h={"30px"}
                  boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                  borderRadius={"20px"}
                  onChange={(e) => props.setAnnoucementCooldown(e.target.value)}
                />
                <Heading
                  mx={"10px"}
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                >
                  minutes
                </Heading>
              </Flex>
              <Heading
                mt={"5px"}
                ml={"20px"}
                fontWeight={"normal"}
                fontSize={"xs"}
                lineHeight={"10px"}
                letterSpacing={"0.05em"}
                color={"#FF5858"}
              >
                {props.annoucementState}
              </Heading>
            </Box>
          ) : (
            <Box align={"center"} my={"20px"} w={"100%"}>
              <Box>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"md"}
                  letterSpacing={"0.05em"}
                  color={"#A9A9A9"}
                >
                  Annoucement Cooldown
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"10px"}
                  letterSpacing={"0.05em"}
                  color={"#A9A9A9"}
                >
                  Sets the cooldown in minutes for annoucements
                </Heading>
              </Box>
              <Flex my={"10px"} w={"130px"} alignItems={"flex-end"}>
                <Input
                  isDisabled
                  type={"number"}
                  placeholder={"0"}
                  h={"30px"}
                  boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                  borderRadius={"20px"}
                  onChange={(e) => props.setAnnoucementCooldown(e.target.value)}
                />
                <Heading
                  mx={"10px"}
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  letterSpacing={"0.05em"}
                  color={"#A9A9A9"}
                >
                  minutes
                </Heading>
              </Flex>
              <Heading
                mt={"5px"}
                ml={"20px"}
                fontWeight={"normal"}
                fontSize={"xs"}
                lineHeight={"10px"}
                letterSpacing={"0.05em"}
                color={"#FF5858"}
              >
                {props.annoucementState}
              </Heading>
            </Box>
          )}

          {/* Chat Cooldown */}

          <Box align={"center"} my={"20px"} w={"100%"}>
            <Box>
              <Heading
                fontWeight={"normal"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
              >
                Chat Cooldown
              </Heading>
              <Heading
                fontWeight={"normal"}
                fontSize={"10px"}
                letterSpacing={"0.05em"}
              >
                Sets the cooldown in seconds for the chat
              </Heading>
            </Box>
            <Flex my={"10px"} w={"130px"} alignItems={"flex-end"}>
              <Input
                type={"number"}
                placeholder={"0"}
                boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                h={"30px"}
                borderRadius={"20px"}
                onChange={(e) => props.setChatCooldown(e.target.value)}
              />
              <Heading
                mx={"10px"}
                fontWeight={"normal"}
                fontSize={"xs"}
                letterSpacing={"0.05em"}
              >
                seconds
              </Heading>
            </Flex>
            <Heading
              mt={"5px"}
              ml={"20px"}
              fontWeight={"normal"}
              fontSize={"xs"}
              lineHeight={"10px"}
              letterSpacing={"0.05em"}
              color={"#FF5858"}
            >
              {props.chatState}
            </Heading>
          </Box>

          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            mb={"25px"}
            h={"50px"}
          >
            <Button
              bgImage={
                "linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"
              }
              borderRadius={"16px"}
              onClick={() => props.createHandler()}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                letterSpacing={"0.05em"}
              >
                Create
              </Heading>
            </Button>
            <Heading mx={"10px"} fontWeight={"normal"} fontSize={"md"}>
              or
            </Heading>
            <Button variant={"link"} onClick={props.clickBackHandler}>
              <Heading fontWeight={"normal"} fontSize={"md"} color={"#000000"}>
                back
              </Heading>
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default GlobalCreateEventResponsiveSecondBase;
