// FRONTEND IMPORTS

import { useState, useEffect, useContext } from "react";

import Image from "next/image";

import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Flex,
  CircularProgress,
  Skeleton,
  useToast,
} from "@chakra-ui/react";

import GlobalCreateEventFixedSecond from "./Second";
import GlobalCreateEventTimeHour from "../Time/Hour";
import GlobalCreateEventTimeMinute from "../Time/Minute";
import GlobalCreateEventTimePeriod from "../Time/Period";

import { UserContext } from "../../../../../utils/context";

import { createPrice } from "../../../../functions";

// BACKEND IMPORTS

import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";

import {
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { firestore, storage } from "../../../../../utils/firebase";

const GlobalCreateEventFixedFirst = (props) => {
  const { user } = useContext(UserContext);

  const toast = useToast();
  const showToast = () => {
    toast({
      description: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };
  const exceedFileSizeToast = () => {
    toast({
      description: "File size exceeds 3 MB",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const [modal, setModal] = useState(false);
  const [eventId, setEventId] = useState();
  const [titleInput, setTitleInput] = useState("");
  const [titleState, setTitleState] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [thumbnailName, setThumbnailName] = useState();
  const [thumbnailURL, setThumbnailURL] = useState();
  const [isLive, setIsLive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState();
  const [date, setDate] = useState(null);
  const [tempDate, setTempDate] = useState();
  const [dateState, setDateState] = useState();
  const [hour, setHour] = useState("10");
  const [minute, setMinute] = useState("55");
  const [period, setPeriod] = useState("PM");

  useEffect(() => {
    firestore
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setEventId(doc.data().eventIdInitializer + 1);
      });
    setThumbnailURL(
      "https://firebasestorage.googleapis.com/v0/b/prodicity-ee47a.appspot.com/o/default%2Fthumbnail.png?alt=media&token=b849a1f2-d74c-4c6e-9ca5-0a1ed05bf7d9"
    );
  }, [user]);

  const firstModalErrorHandler = () => {
    let error = false;

    // TITLE HANDLER

    if (titleInput === "") {
      setTitleState("Enter a title");
      error = true;
    } else {
      setTitleState("");
    }

    // DATE HANDLER

    if (isLive === false && date === null) {
      setDateState("Enter a date");
      error = true;
    } else if (isLive === true) {
      setDateState("");
    } else {
      const today = new Date();
      const inputtedDate = new Date().setFullYear(
        parseInt(date.substring(0, 4)),
        parseInt(date.substring(5, 7)) - 1,
        parseInt(date.slice(-2))
      );

      const currentTime = new Date().toLocaleTimeString();
      let currentHour;
      let currentMinute;
      let currentPeriod;
      let count;
      for (let n = 0; n < currentTime.length; n++) {
        if (currentTime.charAt(n) == ":") {
          if (currentHour) {
            if (currentMinute) {
            } else {
              currentMinute = parseInt(currentTime.substring(count + 1, n));
              count = n;
            }
          } else {
            if (parseInt(currentTime.substring(0, n)) == 12) {
              currentHour = 0;
            } else {
              currentHour = parseInt(currentTime.substring(0, n));
            }
            count = n;
          }
        }
      }
      currentPeriod = currentTime.slice(-2);
      if (inputtedDate < today) {
        setDateState("Invalid date");
        error = true;
      } else if (
        inputtedDate == today &&
        !(currentPeriod == "PM" && period == "AM")
      ) {
        if (currentHour > parseInt(hour) || currentMinute > parseInt(minute)) {
          setDateState("Invalid date");
          error = true;
        } else {
          setDateState("");
        }
      } else {
        setDateState("");
      }
    }

    return error;
  };

  const clickNextHandler = () => {
    if (firstModalErrorHandler() === false) {
      setModal(!modal);
    }
  };

  const clickBackHandler = () => {
    console.log("SHIT");
    setModal(false);
    setTitleInput("");
    setDescriptionInput("");
  };

  const createHandler = async (
    wholePrice,
    fractionPrice,
    isFree,
    annoucementSwitch,
    annoucementCooldown,
    chatCooldown
  ) => {
    const userRef = doc(firestore, "users", user.uid);
    const eventRef = doc(
      doc(firestore, "users", user.uid),
      "events",
      `${eventId}`
    );
    try {
      await updateDoc(eventRef, {
        title: titleInput,
        date: `${date} ${hour}:${minute} ${period}`,
        description: descriptionInput,
        price: createPrice(wholePrice, fractionPrice),
        isFree: isFree,
        isLive: false,
        annoucement: annoucementSwitch,
        annoucementCooldown: parseInt(annoucementCooldown),
        chatCooldown: parseInt(chatCooldown),
        isDraft: false,
      });
      await updateDoc(userRef, {
        numEvents: increment(1),
      });
    } catch (e) {
      showToast();
    }
    props.onClose();
  };

  const updateDocument = async (thumbnailName, thumbnailURL) => {
    const userRef = firestore
      .collection("users")
      .doc(user.uid)
      .collection("events")
      .doc(`${eventId}`);
    return userRef
      .update({
        thumbnailName: thumbnailName,
        thumbnailURL: thumbnailURL,
      })
      .then(() => {})
      .catch((error) => {
        showToast();
      });
  };

  const fileChangeHandler = async (e) => {
    if (e.target.files[0].size <= 3 * 1024 * 1024) {
      setThumbnailName(e.target.files[0].name);

      // Delete Previous Image

      if (
        thumbnailURL !==
        "https://firebasestorage.googleapis.com/v0/b/prodicity-ee47a.appspot.com/o/default%2Fthumbnail.png?alt=media&token=b849a1f2-d74c-4c6e-9ca5-0a1ed05bf7d9"
      ) {
        const previousThumbnailRef = ref(
          storage,
          `${user.uid}/events/${eventId}/thumbnail/${thumbnailName}`
        );
        deleteObject(previousThumbnailRef)
          .then(() => {})
          .catch(() => {
            showToast();
          });
      }

      // Upload Image
      if (e.target.files[0].name !== thumbnailName) {
        const storageRef = ref(
          storage,
          `${user.uid}/events/${eventId}/thumbnail/${e.target.files[0].name}`
        );

        const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setUploadProgress(null);
              setThumbnailURL(downloadURL);
              updateDocument(e.target.files[0].name, downloadURL);
            });
          }
        );
      }
    } else {
      exceedFileSizeToast();
    }
  };

  const setCurrentDateTime = () => {
    var today = new Date();
    var year = today.getFullYear();
    var month = (today.getMonth() + 1).toString().padStart(2, "0");
    var day = today.getDate().toString().padStart(2, "0");
    var hours = today.getHours();
    var minutes = today.getMinutes().toString().padStart(2, "0");
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    setDate(year + "-" + month + "-" + day);
    setHour(hours);
    setMinute(minutes);
    setPeriod(ampm);
  };

  return (
    <>
      {user && modal === false ? (
        <Box align={"center"} w={"100%"}>
          <Box align={"left"} mt={"10px"} w={"80%"}>
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              lineHeight={"41px"}
              letterSpacing={"0.05em"}
            >
              DETAILS
            </Heading>

            <Box mt={"25px"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"27px"}
                letterSpacing={"0.05em"}
              >
                Title
              </Heading>
              <Input
                boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                borderRadius={"12px"}
                maxLength={"100"}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
              <Flex justifyContent={"space-between"} w={"97%"}>
                <Heading
                  ml={"20px"}
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  lineHeight={"20px"}
                  letterSpacing={"0.05em"}
                  color={"#FF5858"}
                >
                  {titleState}
                </Heading>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  lineHeight={"20px"}
                  letterSpacing={"0.05em"}
                >
                  {titleInput.length} / 100
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
                Description
              </Heading>
              <Textarea
                boxShadow={"0px 0px 4px rgba(0, 0, 0, 0.25)"}
                borderRadius={"12px"}
                maxLength={"1000"}
                onChange={(e) => {
                  setDescriptionInput(e.target.value);
                }}
              />
              <Flex justifyContent={"flex-end"} w={"97%"}>
                <Heading
                  fontWeight={"normal"}
                  fontSize={"xs"}
                  lineHeight={"20px"}
                  letterSpacing={"0.05em"}
                >
                  {descriptionInput.length} / 1000
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
                Date
              </Heading>

              <Flex alignItems={"center"}>
                {isLive ? (
                  <>
                    <Input
                      isDisabled
                      type={"date"}
                      mr={"10px"}
                      w={"40%"}
                      borderRadius={"12px"}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setTempDate(e.target.value);
                      }}
                    />
                    <GlobalCreateEventTimeHour
                      isLive={isLive}
                      hour={hour}
                      setHour={setHour}
                    />
                    <GlobalCreateEventTimeMinute
                      isLive={isLive}
                      minute={minute}
                      setMinute={setMinute}
                    />
                    <GlobalCreateEventTimePeriod
                      isLive={isLive}
                      period={period}
                      setPeriod={setPeriod}
                    />
                  </>
                ) : (
                  <>
                    <Input
                      type={"date"}
                      mr={"10px"}
                      w={"40%"}
                      borderRadius={"12px"}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setTempDate(e.target.value);
                      }}
                    />
                    <GlobalCreateEventTimeHour hour={hour} setHour={setHour} />
                    <GlobalCreateEventTimeMinute
                      minute={minute}
                      setMinute={setMinute}
                    />
                    <GlobalCreateEventTimePeriod
                      period={period}
                      setPeriod={setPeriod}
                    />
                  </>
                )}

                <Heading
                  mx={"10px"}
                  fontWeight={"medium"}
                  fontSize={"md"}
                  lineHeight={"27px"}
                  letterSpacing={"0.05em"}
                >
                  or
                </Heading>
                {isLive ? (
                  <Button
                    variant={"link"}
                    onClick={() => {
                      setIsLive(false);
                      if (tempDate) {
                        setDate(tempDate);
                      } else {
                        setDate(null);
                      }
                    }}
                  >
                    <Heading
                      fontWeight={"medium"}
                      fontSize={"md"}
                      lineHeight={"27px"}
                      letterSpacing={"0.05em"}
                      color={"#000000"}
                    >
                      set date
                    </Heading>
                  </Button>
                ) : (
                  <Button
                    variant={"link"}
                    onClick={() => {
                      setIsLive(true);
                      setCurrentDateTime();
                    }}
                  >
                    <Heading
                      fontWeight={"medium"}
                      fontSize={"md"}
                      lineHeight={"27px"}
                      letterSpacing={"0.05em"}
                      color={"#000000"}
                    >
                      set live
                    </Heading>
                  </Button>
                )}
              </Flex>

              <Heading
                ml={"20px"}
                fontWeight={"normal"}
                fontSize={"xs"}
                lineHeight={"20px"}
                letterSpacing={"0.05em"}
                color={"#FF5858"}
              >
                {dateState}
              </Heading>
            </Box>

            <Box mt={"25px"}>
              <Heading
                fontWeight={"medium"}
                fontSize={"md"}
                lineHeight={"27px"}
                letterSpacing={"0.05em"}
              >
                Thumbnail
              </Heading>
              <Flex justifyContent={"space-between"} w={"537.5px"}>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"calc(100% - 275px)"}
                  h={"154px"}
                >
                  <Button w={"50%"} borderRadius={"16px"}>
                    <Heading
                      fontWeight={"medium"}
                      fontSize={"sm"}
                      letterSpacing={"0.05em"}
                      position={"absolute"}
                    >
                      Upload Thumbnail
                    </Heading>
                    <Input
                      type={"file"}
                      accept={"image/*"}
                      opacity={"0"}
                      onChange={fileChangeHandler}
                    />
                  </Button>
                </Flex>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"274px"}
                  h={"154px"}
                >
                  {uploadProgress ? (
                    <CircularProgress
                      value={uploadProgress}
                      thickness={"5px"}
                      size={"100px"}
                      color={"#FFE1B5"}
                    />
                  ) : thumbnailURL ? (
                    <Image
                      src={thumbnailURL}
                      alt={"Thumbnail"}
                      width={275}
                      height={154}
                    />
                  ) : (
                    <Skeleton w={"274px"} h={"154px"} />
                  )}
                </Flex>
              </Flex>
            </Box>

            <Flex
              justifyContent={"flex-end"}
              alignItems={"center"}
              w={"100%"}
              h={"100px"}
            >
              <Button
                bgImage={
                  "linear-gradient(93.25deg, #FFCB8E -8.32%, #ECA0F9 113%)"
                }
                borderRadius={"16px"}
                onClick={clickNextHandler}
              >
                <Heading fontWeight={"medium"} fontSize={"md"}>
                  Next
                </Heading>
              </Button>
            </Flex>
          </Box>
        </Box>
      ) : (
        <GlobalCreateEventFixedSecond
          clickBackHandler={clickBackHandler}
          createHandler={createHandler}
        />
      )}
    </>
  );
};

export default GlobalCreateEventFixedFirst;
