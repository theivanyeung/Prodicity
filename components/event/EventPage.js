// FRONTEND IMPORTS

import { useEffect, useState, useRef } from "react";

import { useRouter } from "next/router";

import {
  Flex,
  Button,
  Heading,
  useToast,
  Modal,
  ModalOverlay,
  useDisclosure,
  ModalContent,
} from "@chakra-ui/react";

import EventMain from "./sections/Main";
import EventInteractives from "./sections/Interactives";

import { speech } from "../../utils/speech-tts";

import { v4 as uuidv4 } from "uuid";

// BACKEND IMPORTS

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  limit,
  startAfter,
  query,
  updateDoc,
  increment,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import { firestore } from "../../utils/firebase";

// SERVER IMPORTS

import AgoraRTC from "agora-rtc-sdk-ng";

import { useClient } from "../../utils/agora";

const EventPage = (props) => {
  const toast = useToast();
  const showToast = () => {
    toast({
      description: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  // Check if token is about to expire

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [countDownTimer, setCountDownTimer] = useState(5);
  const [noticeSent, setNoticeSent] = useState(false);

  const checkTimeUntilThreeHours = (timestamp) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const firebaseTime = timestamp.seconds;
    const targetTime = firebaseTime + 3 * 60 * 60;
    const timeLeft = targetTime - currentTime;

    const intervals = [
      { interval: 10800, choice: "3 hours" },
      { interval: 7200, choice: "2 hours" },
      { interval: 3600, choice: "1 hour" },
      { interval: 1800, choice: "30 minutes" },
      { interval: 600, choice: "10 minutes" },
      { interval: 300, choice: "5 minutes" },
      { interval: 240, choice: "4 minutes" },
      { interval: 180, choice: "3 minutes" },
      { interval: 120, choice: "2 minutes" },
      { interval: 60, choice: "1 minute" },
      { interval: 7 },
    ];

    const closestInterval = intervals.reduce((prev, curr) => {
      return Math.abs(curr.interval - timeLeft) <
        Math.abs(prev.interval - timeLeft)
        ? curr
        : prev;
    });

    return closestInterval;
  };

  useEffect(() => {
    if (
      props.eventData &&
      props.creatorId &&
      props.eventData.host === props.userId &&
      props.eventData.expireTime &&
      noticeSent === false
    ) {
      toast({
        description: `You have around ${
          checkTimeUntilThreeHours(props.eventData.expireTime).choice &&
          checkTimeUntilThreeHours(props.eventData.expireTime).choice
        } seconds left of streaming time!`,
        status: "info",
        duration: 2500,
        isClosable: true,
      });
      setNoticeSent(true);
    }
  }, [props.eventData, props.userId]);

  useEffect(() => {
    if (props.eventData && props.eventData.expireTime) {
      const timeLeft = checkTimeUntilThreeHours(props.eventData.expireTime);

      const timeWarning = (time, status) => {
        toast({
          description: `There's ${time} left of streaming time!`,
          status: status,
          duration: 2500,
          isClosable: true,
        });
      };

      if (timeLeft.interval === 300) {
        timeWarning(timeLeft.choice, "warning");
      }
      if (timeLeft.interval === 60) {
        timeWarning(timeLeft.choice, "error");
      }
      if (timeLeft.interval === 7) {
        onOpen();
        startCountDown();
      }
    }
  });

  const startCountDown = () => {
    const intervalId = setInterval(() => {
      setCountDownTimer((prevCount) => {
        if (prevCount === 0) {
          clearInterval(intervalId);
          if (
            props.eventData &&
            props.userId &&
            props.eventData.host === props.userId
          ) {
            endStream();
          }
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  // Fetch Attendees

  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const attendeesRef = collection(
          doc(doc(firstore, "users", props.creatorId), "events", props.eventId),
          "attendees"
        );

        const querySnapshot = await getDocs(
          collection(
            doc(
              doc(firestore, "users", props.creatorId),
              "events",
              props.eventId
            ),
            "attendees"
          )
        );
        const attendeeList = [];

        querySnapshot.forEach((attendee) => {
          const attendeeRef = firestore.collection("users").doc(attendee.id);
          attendeeRef.onSnapshot((doc) => {
            if (doc.exists) {
              attendeeList.push({
                id: doc.id,
                hasVoted: attendee.hasVoted,
                data: doc.data(),
              });
            }
          });
        });
        setAttendees(attendeeList);
      } catch (e) {
        showToast();
      }
    };

    if (props.eventId && props.creatorId) {
      init();
    }
  }, [props.eventId, props.creatorId]);

  const eventRef = doc(
    doc(firestore, "users", `${props.creatorId}`),
    "events",
    `${props.eventId}`
  );

  // STREAM

  const [streamActive, setStreamActive] = useState(false);
  const [video, setVideo] = useState();
  const [audio, setAudio] = useState();
  const [otherAudio, setOtherAudio] = useState([]);
  const [screenAudio, setScreenAudio] = useState();
  const [videoTracks, setVideoTracks] = useState();
  const [audioTracks, setAudioTracks] = useState();
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  const client = useClient();

  // JOIN STREAM

  useEffect(() => {
    const init = async () => {
      if (
        props.eventData.host !== props.userId &&
        client.state !== "connected"
      ) {
        try {
          const response = await fetch("/api/agora", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();

            await client.setClientRole("audience");
            await client.join(
              data.appId,
              props.eventData.title,
              props.eventData.token,
              0
            );
          }
        } catch (e) {}
      }

      client.on("user-published", async (user, mediaType) => {
        console.log(user);
        try {
          await client.subscribe(user, mediaType);

          if (mediaType === "video") {
            setVideo(user.videoTrack);
          }

          if (mediaType === "audio") {
            console.log("SHITTTTTT");
            setOtherAudio((prevUsers) => {
              return [...prevUsers, user.audioTrack];
            });
            user.audioTrack.play();
          }
        } catch (e) {
          showToast();
        }
      });

      client.on("user-unpublished", async (user, mediaType) => {
        try {
          await client.unsubscribe(user, mediaType);
          if (mediaType === "video") {
            setVideo(user.videoTrack);
          }
          if (mediaType === "audio") {
            if (user.audioTrack) user.audioTrack.stop();
          }
        } catch (e) {
          showToast();
        }
      });
    };
    if (props.userId && props.eventData && props.eventData.isLive) {
      init();
    }

    // Leave stream

    if (
      props.userId &&
      props.eventData &&
      props.userId !== props.eventData.host &&
      props.eventData.isLive === false
    ) {
      router.push("/home");
    }
  }, [client, props.eventData, props.userId]);

  // MEDIA TRACKS REF

  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (video) {
      videoRef.current = video;
    }
    if (audio) {
      audioRef.current = audio;
    }
  }, [video, audio]);

  // REDIRECTION HANDLER

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = async () => {
      try {
        // Leave the Agora channel and close the local tracks when the user is being redirected to another page
        if (videoRef && videoRef.current) {
          await videoRef.current.close();
        }
        if (audioRef && audioRef.current) {
          await audioRef.current.close();
        }
        client.leave();
        client.removeAllListeners();
      } catch (e) {
        showToast();
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.pathname]);

  // SCREEN SHARE

  const [screenShared, setScreenShared] = useState(false);
  const [screenAudioActive, setScreenAudioActive] = useState();

  const toggleScreenShare = async () => {
    if (screenShared) {
      try {
        video.close();
        await client.unpublish(video);
        if (screenAudio) {
          screenAudio.close();
          await client.unpublish(screenAudio);
        }
        const localVideo = AgoraRTC.createCustomVideoTrack({
          mediaStreamTrack: videoTracks[0],
        });
        await client.publish(localVideo);
        setVideo(localVideo);
        localVideo.setEnabled(false);
        localVideo.setEnabled(true);
        setScreenShared(false);
      } catch (e) {
        showToast();
      }
    } else {
      try {
        const screen = await AgoraRTC.createScreenVideoTrack({}, "auto");
        await video.setEnabled(false);
        await client.unpublish(video);
        if (Array.isArray(screen)) {
          await client.publish(screen[0], screen[1]);
          console.log(screen);
          setVideo(screen[0]);
          setScreenAudio(screen[1]);
          setScreenAudioActive(true);
        } else {
          await client.publish(screen);
          setVideo(screen);
          setScreenAudioActive(null);
        }
        setScreenShared(true);
      } catch (e) {
        showToast();
      }
    }
  };

  // Screen share audio

  const toggleScreenAudio = async () => {
    if (streamActive && screenAudio) {
      try {
        await screenAudio.setEnabled(!screenAudioActive);
        setScreenAudioActive(!screenAudioActive);
      } catch (e) {
        showToast();
      }
    }
  };

  // HOST STREAM

  const clickStreamHandler = async () => {
    // Store token in firestore and set to live
    const storeLiveInDB = async (token) => {
      await updateDoc(
        doc(doc(firestore, "users", props.creatorId), "events", props.eventId),
        {
          isLive: true,
        }
      );
    };

    // Publish stream

    const publishStream = async (localAudio, localVideo) => {
      try {
        await client.publish([localAudio, localVideo]);
        storeLiveInDB();
        setStreamActive(true);
      } catch (e) {
        showToast();
      }
    };

    // Join stream
    const joinStream = async () => {
      // Join channel

      try {
        const response = await fetch("/api/agora", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();

          await client.setClientRole("host");
          await client.join(
            data.appId,
            props.eventData.title.length > 64
              ? props.eventData.title.substring(0, 63)
              : props.eventData.title,
            props.eventData.token,
            0
          );
        }
      } catch (e) {
        showToast();
      }

      var constraints = (window.constraints = { audio: true, video: true });

      // Publish local audio/video track

      await navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          var videoTracks = stream.getVideoTracks();
          setVideoTracks(videoTracks);

          const localVideo = AgoraRTC.createCustomVideoTrack({
            mediaStreamTrack: videoTracks[0],
          });

          setVideo(localVideo);
          setHasVideo(true);

          // Publish local audio track

          var audioTracks = stream.getAudioTracks();
          setAudioTracks(audioTracks);

          const localAudio = AgoraRTC.createCustomAudioTrack({
            mediaStreamTrack: audioTracks[0],
          });

          console.log(localAudio);

          setAudio(localAudio);
          setHasAudio(true);

          publishStream(localAudio, localVideo);
        })
        .catch(function (error) {
          console.log(error);
          showToast();
        });
    };

    if (streamActive === false) {
      joinStream();
    } else {
      endStream();
    }
  };

  const endStream = async () => {
    const userRef = doc(firestore, "users", props.userId);
    const eventRef = doc(
      doc(firestore, "users", props.userId),
      "events",
      props.eventId
    );

    try {
      await client.unpublish();
      await client.leave();
      client.removeAllListeners();
      video.close();
      audio.close();
      setAudio(null);
      setVideo(null);
      setMic(true);
      setCamera(true);
    } catch (e) {
      showToast();
    }

    try {
      const successToken = uuidv4();
      await updateDoc(eventRef, {
        isLive: false,
      });
      await updateDoc(userRef, {
        successToken: successToken,
        totalAttendees: increment(attendees.length),
        numEvents: increment(-1),
      });
      router.push(
        `/settings/billing/${successToken}?amount=${
          props.eventData.price * 90 * attendees.length
        }&eventId=${props.eventId}`
      );
    } catch (e) {
      showToast();
    }
  };

  // CHECK TOKEN EXPIRATION

  useEffect(() => {}, [props.eventData, props]);

  // ONCHANGE COMMS

  AgoraRTC.onMicrophoneChanged = async (changedDevice) => {
    try {
      if (audio) {
        // When plugging in a device, switch to a device that is newly plugged in.
        if (changedDevice.state === "ACTIVE") {
          audio.setDevice(changedDevice.device.deviceId);
          // Switch to an existing device when the current device is unplugged.
        } else if (changedDevice.device.label === audio.getTrackLabel()) {
          const oldMicrophones = await AgoraRTC.getMicrophones();
          oldMicrophones[0] && audio.setDevice(oldMicrophones[0].deviceId);
        }
      }
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  AgoraRTC.onCameraChanged = async (changedDevice) => {
    try {
      if (video) {
        // When plugging in a device, switch to a device that is newly plugged in.
        if (changedDevice.state === "ACTIVE") {
          video.setDevice(changedDevice.device.deviceId);
          // Switch to an existing device when the current device is unplugged.
        } else if (changedDevice.device.label === video.getTrackLabel()) {
          const oldCameras = await AgoraRTC.getCameras();
          oldCameras[0] && video.setDevice(oldCameras[0].deviceId);
        }
      }
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  // CHANGE TRACKS

  const onChangeAudioVideoTracks = async (track, trackType) => {
    if (trackType === "audio") {
      try {
        setHasAudio(false);
        audio.setEnabled(false);
        await client.unpublish(audio);
        const localAudio = AgoraRTC.createCustomAudioTrack({
          mediaStreamTrack: track,
        });
        await client.publish(localAudio);
        setAudio(localAudio);
      } catch (e) {
        showToast();
      }
    } else {
      try {
        setHasVideo(false);
        video.setEnabled(false);
        await client.unpublish(video);
        const localVideo = AgoraRTC.createCustomVideoTrack({
          mediaStreamTrack: track,
        });
        await client.publish(localVideo);
        setVideo(localVideo);
      } catch (e) {
        showToast();
      }
    }
  };

  // COMMS

  const [mic, setMic] = useState(true);
  const [camera, setCamera] = useState(true);

  const clickMicHandler = async () => {
    if (streamActive || props.eventData.isLive || audio) {
      try {
        await audio.setEnabled(!mic);
        setMic(!mic);
      } catch (e) {
        showToast();
      }
    }
  };

  const clickCameraHandler = async () => {
    if (
      streamActive ||
      props.eventData.isLive ||
      (video && props.userId === props.creatorId)
    ) {
      try {
        await video.setEnabled(!camera);
        setCamera(!camera);
      } catch (e) {
        showToast();
      }
    }
  };

  // VIDEO CONTROL SETTINGS

  const [play, setPlay] = useState(true);

  const toggleStreamPlay = async () => {
    if (video && audio) {
      if (play) {
        video.stop();
        audio.stop();
      } else {
        video.play(videoPlayerRef.current);
        audio.play();
      }
      setPlay(!play);
    }
  };

  const [volume, setVolume] = useState(50);

  useEffect(() => {
    if (audio && speech) {
      otherAudio.forEach((audio) => {
        audio.setVolume(50);
      });
      speech.setVolume(0.5);
    }
  }, [audio, speech]);

  const volumeChangeHandler = (value) => {
    if (audio && speech) {
      otherAudio.forEach((audio) => {
        audio.setVolume(parseInt(value));
      });
      speech.setVolume(parseInt(value) / 100);
    }
  };

  const videoPlayerRef = useRef(null);

  const handleFullscreen = () => {
    if (videoPlayerRef.current) {
      // if (document.fullscreenElement !== null) {
      //   document.exitFullscreen();
      // } else {
      //   videoPlayerRef.current.requestFullscreen();
      // }
      videoPlayerRef.current.requestFullscreen();
    }
  };

  // CHAT

  const [chat, setChat] = useState();
  const [cursor, setCursor] = useState();

  useEffect(() => {
    try {
      if (props.creatorId && props.eventId && firestore) {
        const q = query(
          collection(
            doc(
              doc(firestore, "users", props.creatorId),
              "events",
              props.eventId
            ),
            "chat"
          ),
          orderBy("createdAt", "desc"),
          limit(50)
        );
        onSnapshot(q, (querySnapshot) => {
          const chatList = querySnapshot.docs.map((doc) => doc.data());
          setChat(chatList.reverse());
          setCursor(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [props.creatorId, props.eventId, firestore]);

  const observer = useRef(null);
  const lastMessageElement = useRef(null);

  const fetchTexts = () => {
    const q = query(
      collection(
        doc(doc(firestore, "users", props.creatorId), "events", props.eventId),
        "chat"
      ),
      orderBy("createdAt", "desc"),
      limit(50),
      startAfter(cursor)
    );
    onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.size !== 0) {
        const newMessages = querySnapshot.docs
          .map((doc) => doc.data())
          .reverse();
        setChat((prevMessages) => [...newMessages, ...prevMessages]);
        setCursor(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    });
  };

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchTexts();
      }
    });

    if (lastMessageElement.current) {
      observer.current.observe(lastMessageElement.current);
    }
  });

  const submitChatHandler = async (message) => {
    // Add message to chat array

    try {
      await addDoc(collection(eventRef, "chat"), {
        username: props.userData.username,
        message: message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (e) {
      console.log(e);
      showToast();
    }

    // Add to latest creator message

    if (props.eventData.host === props.userId) {
      try {
        await updateDoc(eventRef, {
          latestCreatorMessage: message,
        });
      } catch (e) {
        showToast();
      }
    }
  };

  // ANNOUCEMENT

  const [annoucementTimer, setAnnoucementTimer] = useState(false);
  const [annoucementCount, setAnnoucementCount] = useState(1);

  useEffect(() => {
    setAnnoucementTimer(true);
  }, []);

  useEffect(() => {
    let slowMode = null;
    if (annoucementTimer && annoucementCount > 0) {
      slowMode = setInterval(() => {
        setAnnoucementCount((count) => count - 1);
      }, 1000);
    } else if (annoucementCount < 1) {
      clearInterval(slowMode);
      setAnnoucementTimer(false);
      setAnnoucementCount(
        props.eventData && props.eventData.annoucementCooldown * 60
      );
    }
    return () => clearInterval(slowMode);
  }, [annoucementTimer, annoucementCount]);

  const submitAnnoucementHandler = async (annoucement) => {
    try {
      await addDoc(collection(eventRef, "annoucement"), {
        username: props.userData.username,
        annoucement: annoucement,
      });
      if (props.eventData.annoucementCooldown !== 0) {
        setAnnoucementTimer(true);
      }
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  // TTS

  const [annoucements, setAnnoucements] = useState();

  useEffect(() => {
    const init = async () => {
      const q = query(
        collection(
          doc(
            doc(firestore, "users", props.creatorId),
            "events",
            props.eventId
          ),
          "annoucement"
        )
      );
      onSnapshot(q, (querySnapshot) => {
        const annoucementList = [];
        querySnapshot.forEach((doc) => {
          annoucementList.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setAnnoucements(annoucementList);
      });
    };
    if (props.creatorId && props.eventId) {
      init();
    }
  }, [props.creatorId, props.eventId]);

  useEffect(() => {
    const toggleAnnoucement = async (annoucement) => {
      speech
        .speak({
          text: `${annoucement.data.username} said ${annoucement.data.annoucement}`,
          queue: true,
        })
        .then(() => {
          console.log("Success !");
        })
        .catch((e) => {
          showToast();
        });
      if (props.creatorId === props.userId) {
        try {
          await deleteDoc(
            doc(
              doc(
                doc(firestore, "users", props.creatorId),
                "events",
                props.eventId
              ),
              "annoucement",
              annoucement.id
            )
          );
        } catch (e) {
          showToast();
        }
      }
    };
    if (annoucements && annoucements.length !== 0) {
      annoucements.forEach(() => {
        toggleAnnoucement(annoucements[0]);
        annoucements.shift();
      });
    }
  }, [annoucements]);

  // EDIT SETTINGS

  const editSettings = async (
    annoucementSwitch,
    annoucementCooldown,
    chatCooldown
  ) => {
    await updateDoc(eventRef, {
      annoucement: annoucementSwitch,
      annoucementCooldown: parseInt(annoucementCooldown),
      chatCooldown: parseInt(chatCooldown),
    });
  };

  // CHECK VOTE

  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const init = async () => {
      const attendeeRef = doc(
        doc(doc(firestore, "users", props.creatorId), "events", props.eventId),
        "attendees",
        props.userId
      );
      onSnapshot(attendeeRef, (doc) => {
        if (doc.exists) {
          setHasVoted(doc.data() && doc.data().hasVoted);
        }
      });
    };

    if (
      props.userId &&
      props.creatorId &&
      props.eventId &&
      props.creatorId !== props.userId
    ) {
      init();
    }
  }, [props.userId, props.eventId, props.creatorId]);

  // CREATE VOTE

  const addChoice = async (choice) => {
    try {
      await addDoc(collection(eventRef, "voting"), {
        choice: choice,
        votes: 0,
      });
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  const createVoteHandler = async (title, choices) => {
    try {
      await updateDoc(eventRef, {
        voting: {
          title: title,
          active: true,
          totalVotes: 0,
        },
      });
      choices.map((choice) => {
        addChoice(choice);
      });
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  // CLOSE VOTE

  const deleteChoices = async (id) => {
    try {
      await deleteDoc(doc(eventRef, "voting", id));
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  const updateAttendee = async (id) => {
    try {
      await updateDoc(doc(eventRef, "attendees", id), {
        hasVoted: false,
      });
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  const closeVoteHandler = async () => {
    try {
      const querySnapshot = await getDocs(collection(eventRef, "voting"));
      querySnapshot.forEach((doc) => {
        deleteChoices(doc.id);
      });
      await updateDoc(eventRef, {
        voting: {
          active: false,
        },
      });

      const attendeesSnapshot = await getDocs(
        collection(eventRef, "attendees")
      );
      attendeesSnapshot.forEach((doc) => {
        updateAttendee(doc.id);
        console.log(doc.id);
      });
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  // SUBMIT VOTE

  const clickChoiceHandler = async (choiceId) => {
    try {
      const choiceRef = doc(eventRef, "voting", choiceId);
      await updateDoc(choiceRef, {
        votes: increment(1),
      });
      await updateDoc(eventRef, {
        voting: {
          title: props.eventData.voting.title,
          active: props.eventData.voting.active,
          totalVotes: increment(1),
        },
      });

      const attendeeRef = doc(
        doc(doc(firestore, "users", props.creatorId), "events", props.eventId),
        "attendees",
        props.userId
      );
      await updateDoc(attendeeRef, {
        hasVoted: true,
      });
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  // INVITE TO STAGE

  const inviteToStageHandler = async (uid) => {
    try {
      await updateDoc(doc(eventRef, "attendees", uid), {
        hasInvite: true,
      });
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  // RECEIVE INVITE TO STAGE

  const id = "call-toast";

  const publishAttendeeAudio = async (localAudio) => {
    try {
      await client.publish(localAudio);
      declineCallHandler();
    } catch (error) {
      console.log(e);
      showToast();
    }
  };

  const joinCallHandler = async () => {
    try {
      await client.setClientRole("host");

      var constraints = (window.constraints = { audio: true, video: false });

      await navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // Publish local audio track

          var audioTracks = stream.getAudioTracks();
          setAudioTracks(audioTracks);

          const localAudio = AgoraRTC.createCustomAudioTrack({
            mediaStreamTrack: audioTracks[0],
          });

          setAudio(localAudio);
          setHasAudio(true);

          publishAttendeeAudio(localAudio);
        })
        .catch(function (error) {
          showToast();
        });
    } catch (error) {
      console.log(e);
      showToast();
    }

    toast.closeAll();
  };

  const leaveCallHandler = async () => {
    try {
      await client.unpublish();
      await client.setClientRole("audience");
      const attendeeRef = doc(eventRef, "attendees", props.userId);
      await updateDoc(attendeeRef, {
        hasInvite: false,
      });
    } catch (e) {
      console.log(e);
      showToast();
    }
    audio.close();
    setMic(true);
    setCamera(true);
    setHasAudio(false);
  };

  const declineCallHandler = async () => {
    try {
      const attendeeRef = doc(eventRef, "attendees", props.userId);
      await updateDoc(attendeeRef, {
        hasInvite: false,
      });
      toast.closeAll();
    } catch (e) {
      console.log(e);
      showToast();
    }
  };

  useEffect(() => {
    if (props.userId && eventRef) {
      onSnapshot(doc(eventRef, "attendees", props.userId), (doc) => {
        if (doc.data() && doc.data().hasInvite && !toast.isActive(id)) {
          toast({
            id,
            position: "top-right",
            duration: null,
            render: () => (
              <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                paddingX={"50px"}
                gap={"25px"}
                w={"400px"}
                h={"150px"}
                bgColor={"#FFFFFF"}
                bgImage={
                  "linear-gradient(96.08deg, rgba(244, 206, 150, 0.5) 16.62%, rgba(248, 56, 253, 0.5) 234.5%)"
                }
                borderRadius={"12px"}
              >
                <Heading
                  textAlign={"center"}
                  fontWeight={"medium"}
                  fontSize={"lg"}
                  letterSpacing={"0.05em"}
                >{`${props.creatorData.displayName} (@${props.creatorData.username}) has invited you to stage!`}</Heading>
                <Flex gap={"40px"}>
                  <Button
                    w={"70px"}
                    h={"30px"}
                    borderRadius={"12px"}
                    onClick={declineCallHandler}
                  >
                    <Heading fontWeight={"medium"} fontSize={"sm"}>
                      Decline
                    </Heading>
                  </Button>
                  <Button
                    w={"70px"}
                    h={"30px"}
                    bgColor={"#FFE7D0"}
                    borderRadius={"12px"}
                    onClick={joinCallHandler}
                  >
                    <Heading fontWeight={"medium"} fontSize={"sm"}>
                      Join Call
                    </Heading>
                  </Button>
                </Flex>
              </Flex>
            ),
          });
        }
      });
    }
  }, [props.userId, eventRef]);

  return (
    <>
      {/* FULL VIEW */}
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={"1vw"}
        w={"98%"}
        h={"97%"}
      >
        <EventMain
          userId={props.userId}
          userData={props.userData}
          eventData={props.eventData}
          creatorId={props.creatorId}
          creatorData={props.creatorData}
          attendees={attendees}
          voting={props.voting}
          isSubscribed={props.isSubscribed}
          streamActive={streamActive}
          clickStreamHandler={clickStreamHandler}
          video={video}
          audio={audio}
          hasAudio={hasAudio}
          mic={mic}
          camera={camera}
          videoPlayerRef={videoPlayerRef}
          screenShared={screenShared}
          screenAudioActive={screenAudioActive}
          toggleScreenShare={toggleScreenShare}
          toggleScreenAudio={toggleScreenAudio}
          handleFullscreen={handleFullscreen}
          hasVoted={hasVoted}
          createVoteHandler={createVoteHandler}
          clickChoiceHandler={clickChoiceHandler}
          closeVoteHandler={closeVoteHandler}
          play={play}
          setPlay={setPlay}
          toggleStreamPlay={toggleStreamPlay}
          volume={volume}
          setVolume={setVolume}
          volumeChangeHandler={volumeChangeHandler}
          leaveCallHandler={leaveCallHandler}
        />
        <EventInteractives
          userId={props.userId}
          creatorId={props.creatorId}
          creatorData={props.creatorData}
          eventData={props.eventData}
          chat={chat}
          lastMessageElement={lastMessageElement}
          attendees={attendees}
          video={video}
          audio={audio}
          audioTracks={audioTracks}
          videoTracks={videoTracks}
          hasAudio={hasAudio}
          hasVideo={hasVideo}
          mic={mic}
          camera={camera}
          onChangeAudioVideoTracks={onChangeAudioVideoTracks}
          clickMicHandler={clickMicHandler}
          clickCameraHandler={clickCameraHandler}
          submitChatHandler={submitChatHandler}
          annoucementTimer={annoucementTimer}
          annoucementCount={annoucementCount}
          submitAnnoucementHandler={submitAnnoucementHandler}
          editSettings={editSettings}
          inviteToStageHandler={inviteToStageHandler}
        />
      </Flex>

      {/* BASE VIEW */}

      {/* <Box
        align={"center"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "block",
          md: "block",
          sm: "block",
          base: "block",
        }}
      >
        <EventMain
          userId={props.userId}
          userData={props.userData}
          eventData={props.eventData}
          chatQuery={props.chatQuery}
          creatorId={props.creatorId}
          creatorData={props.creatorData}
          attendees={attendees}
          voting={props.voting}
          isSubscribed={props.isSubscribed}
          streamActive={streamActive}
          clickStreamHandler={clickStreamHandler}
          hasAudio={audio ? true : false}
          hasVideo={video ? true : false}
          mic={mic}
          camera={camera}
          clickMicHandler={clickMicHandler}
          clickCameraHandler={clickCameraHandler}
          annoucementTimer={annoucementTimer}
          annoucementCount={annoucementCount}
          submitAnnoucementHandler={submitAnnoucementHandler}
          editSettings={editSettings}
          createVoteHandler={createVoteHandler}
          clickChoiceHandler={clickChoiceHandler}
          closeVoteHandler={closeVoteHandler}
          chat={props.chat}
          submitChatHandler={submitChatHandler}
        />
      </Box> */}

      {/** AUTOMATIC SHUTOFF NOTICE */}

      <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
        <ModalOverlay />
        <ModalContent
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"25px"}
          h={"200px"}
          bgImage={
            "linear-gradient(96.08deg, rgba(244, 206, 150, 0.25) 16.62%, rgba(248, 56, 253, 0.25) 234.5%)"
          }
          borderRadius={"12px"}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"3xl"}
            letterSpacing={"0.05em"}
          >
            Streaming is ending 😭
          </Heading>
          <Heading
            fontWeight={"medium"}
            fontSize={"3xl"}
            letterSpacing={"0.05em"}
          >{`Closing in ${countDownTimer}`}</Heading>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EventPage;
