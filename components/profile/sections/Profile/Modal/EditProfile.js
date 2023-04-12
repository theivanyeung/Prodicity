// FRONTEND IMPORTS

import { useState, useContext, useEffect } from "react";

import Image from "next/image";

import {
  ModalContent,
  Box,
  Heading,
  Flex,
  Input,
  Textarea,
  Button,
  SkeletonCircle,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";

import { UserContext } from "../../../../../utils/context";

// BACKEND IMPORTS

import { firestore } from "../../../../../utils/firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const CreatorStudioProfileEditProfile = (props) => {
  const { user, username } = useContext(UserContext);

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
      description: "File size exceeds 2 MB",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const storage = getStorage();
  const userRef = doc(firestore, "users", user.uid);

  const [initialPhotoName, setInitialPhotoName] = useState();
  const [initialPhotoURL, setInitialPhotoURL] = useState();

  const [photoName, setPhotoName] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [description, setDescription] = useState(null);
  const [descriptionInput, setDescriptionInput] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(null);

  // Initalize Current Data

  const docRef = firestore.collection("users").doc(user.uid);

  useEffect(() => {
    docRef.get().then((doc) => {
      setPhotoURL(doc.data().photoURL);
      setDisplayName(doc.data().displayName);
      setDisplayNameInput(doc.data().displayName);
      setDescription(doc.data().description);
      setDescriptionInput(doc.data().description);
      setInitialPhotoName(doc.data().photoName);
      setInitialPhotoURL(doc.data().photoURL);
    });
  }, []);

  return (
    <ModalContent
      boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
      borderRadius={props.isFull ? "0px" : "12px"}
    >
      <Box align={"center"} w={"100%"} h={"100%"}>
        <Box mt={"15px"} align={"left"} w={"90%"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            h={"40px"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
            >
              Profile Picture
            </Heading>
            <PhotoUpload
              user={user}
              photoName={photoName}
              storage={storage}
              userRef={userRef}
              docRef={docRef}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
              setUploadProgress={setUploadProgress}
              setPhotoURL={setPhotoURL}
              setPhotoName={setPhotoName}
              setProfilePhotoURL={props.setProfilePhotoURL}
              showToast={showToast}
              exceedFileSizeToast={exceedFileSizeToast}
            />
          </Flex>
          <Box mt={"15px"} align={"center"} w={"100%"}>
            {uploadProgress ? (
              <CircularProgress
                value={uploadProgress}
                thickness={"5px"}
                size={"150px"}
                color={"#FFE1B5"}
              />
            ) : photoURL ? (
              <Box
                w={"150px"}
                h={"150px"}
                borderRadius={"1000px"}
                overflow={"hidden"}
              >
                <Image src={photoURL} alt={"Avatar"} width={150} height={150} />
              </Box>
            ) : (
              <SkeletonCircle size={"150"} />
            )}
          </Box>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={"15px"}
            w={"100%"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
            >
              Name
            </Heading>
            <Input
              placeholder={username && (displayName ? displayName : username)}
              w={"80%"}
              borderRadius={"12px"}
              onChange={(e) => {
                setDisplayNameInput(e.target.value);
              }}
            />
          </Flex>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={"15px"}
            w={"100%"}
          >
            <Heading
              fontWeight={"medium"}
              fontSize={"lg"}
              lineHeight={"27px"}
              letterSpacing={"0.1em"}
            >
              About Me
            </Heading>
            <Textarea
              placeholder={description && description}
              w={"80%"}
              h={"150px"}
              borderRadius={"12px"}
              onChange={(e) => {
                setDescriptionInput(e.target.value);
              }}
            />
          </Flex>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            w={"100%"}
            h={"100px"}
          >
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              w={"40%"}
            >
              <CancelBtn
                onClose={props.onClose}
                user={user}
                storage={storage}
                userRef={userRef}
                photoName={photoName}
                photoURL={photoURL}
                initialPhotoName={initialPhotoName}
                initialPhotoURL={initialPhotoURL}
                setProfilePhotoURL={props.setProfilePhotoURL}
                showToast={showToast}
              />
              <SaveBtn
                onClose={props.onClose}
                user={user}
                username={username}
                userRef={userRef}
                storage={storage}
                displayName={displayName}
                displayNameInput={displayNameInput}
                description={description}
                descriptionInput={descriptionInput}
                photoName={photoName}
                photoURL={photoURL}
                initialPhotoName={initialPhotoName}
                initialPhotoURL={initialPhotoURL}
                setProfileDisplayName={props.setProfileDisplayName}
                setProfileDescription={props.setProfileDescription}
                showToast={showToast}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </ModalContent>
  );
};

const PhotoUpload = (props) => {
  useEffect(() => {
    props.docRef.get().then((doc) => {
      props.setPhotoName(doc.data().photoName);
    });
  }, [props.selectedFile]);

  const updatePhoto = async (downloadURL, event) => {
    try {
      await updateDoc(props.userRef, {
        photoURL: downloadURL,
        photoName: event.target.files[0].name,
      });
    } catch (e) {
      props.showToast();
    }
  };

  const fileChangeHandler = async (event) => {
    if (event.target.files[0].size <= 2 * 1024 * 1024) {
      props.setSelectedFile(event.target.files[0]);

      // Upload file to storage

      if (event.target.files[0].name !== props.photoName) {
        const photoRef = ref(
          props.storage,
          `${props.user.uid}/profile/photo/${event.target.files[0].name}`
        );
        const uploadTask = uploadBytesResumable(
          photoRef,
          event.target.files[0]
        );
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            props.setUploadProgress(progress);
          },
          (error) => {
            props.showToast();
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              props.setUploadProgress(null);
              props.setPhotoURL(downloadURL);
              updatePhoto(downloadURL, event);
              props.setSelectedFile(null);
              props.setProfilePhotoURL(downloadURL);
            });
          }
        );
      }
    } else {
      props.exceedFileSizeToast();
    }
  };

  return (
    <Flex w={"100px"} h={"30px"} overflow={"hidden"} borderRadius={"12px"}>
      <Button
        w={"100px"}
        h={"30px"}
        bgColor={"#FFE1B5"}
        borderRadius={"12px"}
        position={"absolute"}
      >
        <Heading fontWeight={"medium"} fontSize={"sm"} position={"absolute"}>
          Upload Photo
        </Heading>
      </Button>
      <Input
        type={"file"}
        accept={"image/*"}
        opacity={"0"}
        onChange={fileChangeHandler}
      />
    </Flex>
  );
};

const CancelBtn = (props) => {
  const cancelHandler = async () => {
    try {
      if (
        props.initialPhotoName !== props.photoName &&
        props.initialPhotoURL !== props.photoURL
      ) {
        await updateDoc(props.userRef, {
          photoURL: props.initialPhotoURL,
          photoName: props.initialPhotoName,
        });
      }
      if (props.initialPhotoName !== props.photoName) {
        const photoRef = ref(
          props.storage,
          `${props.user.uid}/profile/photo/${props.photoName}`
        );
        deleteObject(photoRef)
          .then(() => {})
          .catch(() => {
            props.showToast();
          });
      }
      props.setProfilePhotoURL(props.initialPhotoURL);
    } catch (e) {
      props.showToast();
    }
  };

  return (
    <Button
      w={"70px"}
      h={"30px"}
      bgColor={"#EFEFEF"}
      borderRadius={"12px"}
      onClick={() => {
        props.onClose();
        cancelHandler();
      }}
    >
      <Heading fontWeight={"medium"} fontSize={"sm"}>
        Cancel
      </Heading>
    </Button>
  );
};

const SaveBtn = (props) => {
  const saveHandler = async () => {
    try {
      if (props.displayName !== props.displayNameInput) {
        await updateDoc(props.userRef, {
          displayName: props.displayNameInput,
        });
        props.setProfileDisplayName(props.displayNameInput);
      }
      if (props.description !== props.descriptionInput) {
        await updateDoc(props.userRef, {
          description: props.descriptionInput,
        });
        props.setProfileDescription(props.descriptionInput);
      }
      if (props.initialPhotoName !== props.photoName) {
        const photoRef = ref(
          props.storage,
          `${props.user.uid}/profile/photo/${props.initialPhotoName}`
        );
        deleteObject(photoRef)
          .then(() => {})
          .catch(() => {
            props.showToast();
          });

        const docRef = doc(firestore, "users", props.user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.data().followers) {
          docSnap.data().followers.map((creatorId) => {
            firestore
              .collection("users")
              .doc(creatorId)
              .collection("followings")
              .doc(props.username)
              .update({
                displayName: props.displayName,
                photoURL: props.photoURL,
              });
          });
        }
      }
    } catch (e) {
      props.showToast();
    }
  };

  return (
    <Button
      w={"70px"}
      h={"30px"}
      bgColor={"#FFE1B5"}
      borderRadius={"12px"}
      onClick={() => {
        props.onClose();
        saveHandler();
      }}
    >
      <Heading fontWeight={"medium"} fontSize={"sm"}>
        Save
      </Heading>
    </Button>
  );
};

export default CreatorStudioProfileEditProfile;
