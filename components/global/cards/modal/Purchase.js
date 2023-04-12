// FRONTEND IMPORTS

import { useEffect, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { Button, Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

// BACKEND IMPORTS

import firebase from "firebase/compat/app";
import { firestore } from "../../../../utils/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const GlobalEventPurchase = (props) => {
  const { eventId, creatorId, userId, price, isFree, setAccessed, onClose } =
    props;

  const router = useRouter();

  const toast = useToast();
  const showToast = () => {
    toast({
      description: "error",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const [loading, setLoading] = useState(true);
  const [hasFunds, setHasFunds] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const q = query(
          collection(
            doc(doc(firestore, "users", creatorId), "events", eventId),
            "attendees"
          ),
          where(firebase.firestore.FieldPath.documentId(), "==", userId)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size === 0) {
          setAccessed(false);
          setLoading(false);
        } else {
          setAccessed(true);
          onClose();
        }
      } catch (e) {
        showToast();
      }
    };
    if (eventId && creatorId && userId) {
      init();
    }
  }, [eventId, creatorId, userId]);

  const purchaseEventHandler = async (purchase) => {
    const attendeeRef = doc(
      doc(doc(firestore, "users", creatorId), "events", eventId),
      "attendees",
      userId
    );
    if (purchase) {
      try {
        const userRef = doc(firestore, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          if (userSnap.data().money - price * 100 < 0) {
            setHasFunds(false);
          } else {
            await updateDoc(userRef, {
              money: increment(-price * 100),
            });
            await setDoc(attendeeRef, {
              hasVoted: false,
              hasInvite: false,
            });
            setAccessed(true);
            onClose();
          }
        }
      } catch (e) {
        showToast();
      }
    } else {
      try {
        await setDoc(attendeeRef, {
          hasVoted: false,
          hasInvite: false,
        });
        setAccessed(true);
        onClose();
      } catch (e) {
        showToast();
      }
    }
  };

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      bgColor={"#FFFFFF"}
      paddingY={"35px"}
      gap={"35px"}
    >
      {loading ? (
        <Flex justifyContent={"center"} alignItems={"center"} h={"100px"}>
          <Spinner size={"lg"} />
        </Flex>
      ) : hasFunds ? (
        <>
          <Heading
            fontWeight={"normal"}
            fontSize={"2xl"}
            letterSpacing={"0.05em"}
          >
            Confirm {isFree ? "Access" : "Purchase"}
          </Heading>
          {!isFree && (
            <Flex justifyContent={"center"} gap={"10px"}>
              <Image
                src={"/images/prod-coin.png"}
                width={"25px"}
                height={"25px"}
              />
              <Heading
                fontWeight={"medium"}
                fontSize={"xl"}
                letterSpacing={"0.05em"}
              >
                {price * 100}
              </Heading>
            </Flex>
          )}
          <Flex justifyContent={"center"} gap={"50px"}>
            <Button
              bgImage={
                "linear-gradient(96.08deg, rgba(244, 206, 150, 0.5) 16.62%, rgba(248, 56, 253, 0.5) 234.5%)"
              }
              _hover={{
                bgImage:
                  "linear-gradient(96.08deg, rgba(244, 206, 150, 0.75) 16.62%, rgba(248, 56, 253, 0.75) 234.5%)",
              }}
              onClick={() => purchaseEventHandler(isFree ? false : true)}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"lg"}
                letterSpacing={"0.05em"}
              >
                {isFree ? "Access" : "Purchase"}
              </Heading>
            </Button>
            <Button colorScheme={"blackAlpha"} onClick={onClose}>
              <Heading
                fontWeight={"normal"}
                fontSize={"lg"}
                letterSpacing={"0.05em"}
              >
                Cancel
              </Heading>
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Flex alignItems={"center"} gap={"10px"}>
            <WarningTwoIcon boxSize={"25px"} />
            <Heading
              fontWeight={"normal"}
              fontSize={"2xl"}
              letterSpacing={"0.05em"}
            >
              {"Insufficient Funds :("}
            </Heading>
          </Flex>
          <Flex flexDirection={"column"} alignItems={"center"} gap={"10px"}>
            <Button
              bgImage={
                "linear-gradient(96.08deg, rgba(244, 206, 150, 0.5) 16.62%, rgba(248, 56, 253, 0.5) 234.5%)"
              }
              _hover={{
                bgImage:
                  "linear-gradient(96.08deg, rgba(244, 206, 150, 0.75) 16.62%, rgba(248, 56, 253, 0.75) 234.5%)",
              }}
              onClick={() => router.push("/settings/billing")}
            >
              <Heading
                fontWeight={"medium"}
                fontSize={"lg"}
                letterSpacing={"0.05em"}
              >
                Click here to purchase Prod
              </Heading>
            </Button>
            <Heading
              fontWeight={"normal"}
              fontSize={"md"}
              letterSpacing={"0.05em"}
            >
              or
            </Heading>
            <Button colorScheme={"blackAlpha"} onClick={onClose}>
              <Heading
                fontWeight={"normal"}
                fontSize={"lg"}
                letterSpacing={"0.05em"}
              >
                Exit
              </Heading>
            </Button>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default GlobalEventPurchase;
