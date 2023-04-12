// FRONTEND IMPORTS

import { useState, useEffect } from "react";

import Image from "next/image";

import {
  Box,
  Flex,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  SkeletonCircle,
  useDisclosure,
  Input,
  Progress,
  useToast,
} from "@chakra-ui/react";

import CreatorStudioProfileEditProfile from "./Modal/EditProfile";

import { numUnitConversion } from "../../../functions";

// BACKEND IMPORTS

import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firestore } from "../../../../utils/firebase";

import { SubscriptionHandler } from "../../../server";

const CreatorStudioProfileTablet = (props) => {
  const [coverPhotoURL, setCoverPhotoURL] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [numFollowers, setNumFollowers] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(null);

  const toast = useToast();
  const exceedFileSizeToast = () => {
    toast({
      description: "File size exceeds 6 MB",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (props.coverPhotoURL) {
      setCoverPhotoURL(`${props.coverPhotoURL}`);
    }
    if (props.photoURL) {
      setPhotoURL(`${props.photoURL}`);
    }
    if (props.displayName) {
      setDisplayName(props.displayName);
    }
    if (props.description) {
      setDescription(props.description);
    }
    if (props.numFollowers) {
      setNumFollowers(props.numFollowers);
    }
  }, [
    props.coverPhotoURL,
    props.photoURL,
    props.displayName,
    props.description,
    props.numFollowers,
  ]);

  return (
    <Box align={"center"} w={"100%"} h={"450px"} display={props.display}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        h={"60%"}
        bgSize={"cover"}
        bgPosition={"center"}
        bgRepeat={"none"}
        bgImage={`url('${coverPhotoURL}')`}
      >
        {progress && (
          <Progress
            value={progress}
            size={"sm"}
            w={"60%"}
            colorScheme={"twitter"}
            borderRadius={"100px"}
          />
        )}
      </Flex>
      <Flex w={"95%"} h={"40%"}>
        <Box mr={"10px"} marginTop={"-40px"} align={"left"} w={"13%"}>
          <Box
            w={"110px"}
            h={"110px"}
            borderRadius={"1000px"}
            overflow={"hidden"}
          >
            {photoURL ? (
              <Image
                src={photoURL}
                alt={"Profile Pic"}
                width={110}
                height={110}
              />
            ) : (
              <SkeletonCircle size={"110"} />
            )}
          </Box>
        </Box>
        <Flex flexDirection={"column"} w={"55%"}>
          <Flex alignItems={"flex-end"} h={"60px"}>
            <Heading
              mr={"10px"}
              fontWeight={"medium"}
              fontSize={"4xl"}
              letterSpacing={"0.1em"}
            >
              {props.username &&
                (displayName ? displayName : `@${props.username}`)}
            </Heading>
            <Heading
              fontWeight={"normal"}
              fontSize={"xl"}
              lineHeight={"41px"}
              letterSpacing={"0.1em"}
            >
              {displayName && `@${props.username}`}
            </Heading>
          </Flex>
          <Box align={"left"}>
            <Heading
              fontWeight={"medium"}
              fontSize={"xl"}
              lineHeight={"41px"}
              letterSpacing={"0.1em"}
            >
              {numUnitConversion(numFollowers)} followers
            </Heading>
          </Box>
          <Box align={"left"}>
            <Heading
              fontWeight={"medium"}
              fontSize={"xs"}
              lineHeight={"20px"}
              letterSpacing={"0.1em"}
            >
              {description}
            </Heading>
          </Box>
        </Flex>
        <Flex justifyContent={"center"} alignItems={"center"} w={"32%"}>
          {props.currentUsername &&
            (props.currentUsername === props.search ? (
              <SettingBtns
                setCoverPhotoURL={setCoverPhotoURL}
                setProfilePhotoURL={setPhotoURL}
                setProfileDisplayName={setDisplayName}
                setProfileDescription={setDescription}
                setProgress={setProgress}
                exceedFileSizeToast={exceedFileSizeToast}
              />
            ) : (
              <SubscribeBtn
                isSubscribed={props.isSubscribed}
                creatorId={props.creatorId}
                creatorData={props.creatorData}
                currentUsername={props.currentUsername}
                stateHandler={props.stateHandler}
                numFollowers={numFollowers}
                setNumFollowers={setNumFollowers}
              />
            ))}
        </Flex>
      </Flex>
    </Box>
  );
};

const SettingBtns = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const auth = getAuth();
  const user = auth.currentUser;

  const storage = getStorage();

  const addDocumentURL = async (url, fileName) => {
    if (user) {
      await updateDoc(doc(firestore, "users", user.uid), {
        coverPhotoName: fileName,
        coverPhotoURL: url,
      });
    }
  };

  const CoverChangeHandler = async (e) => {
    if (e.target.files[0].size <= 6 * 1024 * 1024) {
      if (user && e.target.files[0]) {
        // Get initial cover name

        const docRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Delete previous cover

          if (docSnap.data().coverPhotoName) {
            const initialCoverRef = ref(
              storage,
              `${user.uid}/profile/cover/${docSnap.data().coverPhotoName}`
            );
            deleteObject(initialCoverRef)
              .then(() => {})
              .catch(() => {});
          }
        }

        // Add new cover

        const coverRef = ref(
          storage,
          `${user.uid}/profile/cover/${e.target.files[0].name}`
        );
        const uploadTask = uploadBytesResumable(coverRef, e.target.files[0]);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            props.setProgress(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          () => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addDocumentURL(downloadURL, e.target.files[0].name);
              props.setCoverPhotoURL(downloadURL);
              props.setProgress(null);
            });
          }
        );
      }
    } else {
      props.exceedFileSizeToast();
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"80%"}
      h={"60%"}
    >
      <Button
        w={"150px"}
        borderRadius={"16px"}
        bgColor={"#FFFFFF"}
        leftIcon={
          <Image
            src={"/images/edit-profile-icon.png"}
            alt={"Edit Profile Icon"}
            width={20}
            height={20}
          />
        }
        onClick={onOpen}
      >
        <Heading fontWeight={"medium"} fontSize={"md"} letterSpacing={"0.1em"}>
          Edit Profile
        </Heading>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"xl"}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <CreatorStudioProfileEditProfile
          onClose={onClose}
          isFull={false}
          setProfilePhotoURL={props.setProfilePhotoURL}
          setProfileDisplayName={props.setProfileDisplayName}
          setProfileDescription={props.setProfileDescription}
        />
      </Modal>

      <Box w={"150px"} position={"relative"}>
        <Button
          w={"150px"}
          borderRadius={"16px"}
          bgColor={"#FFFFFF"}
          position={"absolute"}
          leftIcon={
            <Image
              src={"/images/edit-cover-icon.png"}
              alt={"Edit Cover Icon"}
              width={20}
              height={20}
            />
          }
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"md"}
            letterSpacing={"0.1em"}
          >
            Edit Cover
          </Heading>
        </Button>
        <Input
          type={"file"}
          accept={"image/*"}
          w={"150px"}
          borderRadius={"16px"}
          opacity={"0"}
          onChange={CoverChangeHandler}
        />
      </Box>
    </Flex>
  );
};

const SubscribeBtn = (props) => {
  return (
    <>
      {props.isSubscribed ? (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"80%"}
          h={"60%"}
        >
          <Button
            w={"150px"}
            borderRadius={"16px"}
            bgColor={"#F2F2F2"}
            onClick={() => {
              SubscriptionHandler(
                props.isSubscribed,
                props.creatorId,
                props.creatorData
              );
              props.setNumFollowers(props.numFollowers - 1);
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.1em"}
            >
              SUBSCRIBED
            </Heading>
          </Button>
        </Flex>
      ) : (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          w={"80%"}
          h={"60%"}
        >
          <Button
            w={"150px"}
            borderRadius={"16px"}
            bgImage={
              "linear-gradient(98.57deg, #FFDE9F 8.46%, #FFC8FD 115.67%)"
            }
            _hover={{
              bgImage:
                "linear-gradient(98.57deg, #FFCD6F 8.46%, #FFC8FD 115.67%)",
            }}
            onClick={() => {
              SubscriptionHandler(
                props.isSubscribed,
                props.creatorId,
                props.creatorData
              );
              props.setNumFollowers(props.numFollowers + 1);
            }}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"md"}
              letterSpacing={"0.1em"}
            >
              SUBSCRIBE
            </Heading>
          </Button>
        </Flex>
      )}
    </>
  );
};

export default CreatorStudioProfileTablet;
