import { useState } from "react";

import Image from "next/image";

import { Flex, Box, Heading } from "@chakra-ui/react";

import EventModalInvite from "./host/Invite";

const EventModalAttendees = (props) => {
  const [selectedUser, setSelectedUser] = useState();
  const [selected, setSelected] = useState(false);

  return (
    <>
      {selected ? (
        <EventModalInvite
          selectedUser={selectedUser}
          setSelected={setSelected}
          inviteToStageHandler={props.inviteToStageHandler}
          onClose={props.onClose}
        />
      ) : (
        <Flex justifyContent={"center"}>
          <Box align={"center"} mb={"25px"} w={"90%"}>
            <Flex alignItems={"center"} h={"50px"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"20px"}
                letterSpacing={"0.1em"}
              >
                Attendees
              </Heading>
            </Flex>

            {props.isHost && (
              <Heading
                w={"100%"}
                textAlign={"center"}
                fontWeight={"normal"}
                fontSize={"sm"}
                letterSpacing={"0.1em"}
              >
                Click on any attendee to invite to stage
              </Heading>
            )}

            <Box
              align={"left"}
              w={"90%"}
              maxH={"50vh"}
              overflowY={"scroll"}
              sx={{
                "::-webkit-scrollbar": {
                  width: "0.26vw",
                },
                "::-webkit-scrollbar-thumb": {
                  background: "#777777",
                  borderRadius: "0.52vw",
                },
              }}
            >
              {props.attendees.map((attendee, index) => (
                <>
                  {props.isHost ? (
                    <Flex
                      as={"button"}
                      key={index}
                      alignItems={"center"}
                      my={"10px"}
                      w={"100%"}
                      borderRadius={"12px"}
                      _hover={{
                        background: "#EDF2F7",
                      }}
                      onClick={() => {
                        setSelectedUser(attendee);
                        setSelected(true);
                      }}
                    >
                      <Box
                        w={"35"}
                        h={"35"}
                        borderRadius={"100px"}
                        overflow={"hidden"}
                      >
                        <Image
                          src={attendee.data.photoURL}
                          alt={"Avatar"}
                          width={35}
                          height={35}
                        />
                      </Box>
                      <Heading
                        ml={"10px"}
                        fontWeight={"normal"}
                        fontSize={"lg"}
                        letterSpacing={"0.05em"}
                      >
                        @{attendee.data.username}
                      </Heading>
                    </Flex>
                  ) : (
                    <Flex
                      key={index}
                      alignItems={"center"}
                      my={"10px"}
                      w={"100%"}
                      borderRadius={"12px"}
                    >
                      <Box
                        w={"35"}
                        h={"35"}
                        borderRadius={"100px"}
                        overflow={"hidden"}
                      >
                        <Image
                          src={attendee.data.photoURL}
                          alt={"Avatar"}
                          width={35}
                          height={35}
                        />
                      </Box>
                      <Heading
                        ml={"10px"}
                        fontWeight={"normal"}
                        fontSize={"lg"}
                        letterSpacing={"0.05em"}
                      >
                        @{attendee.data.username}
                      </Heading>
                    </Flex>
                  )}
                </>
              ))}
            </Box>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default EventModalAttendees;
