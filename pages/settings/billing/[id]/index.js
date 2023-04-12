// FRONTEND IMPORTS

import { useEffect, useContext } from "react";

import { useRouter } from "next/router";

import { Flex, Spinner, useToast } from "@chakra-ui/react";

import { UserContext } from "../../../../utils/context";

// BACKEND IMPORTS

import {
  deleteField,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../../../utils/firebase";
import { DeleteEventDraft } from "../../../../components/server";

const SettingsBillingPurchase = () => {
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

  const router = useRouter();

  useEffect(() => {
    const updateAmount = async (amount) => {
      try {
        const userRef = doc(firestore, "users", user.uid);
        await updateDoc(userRef, {
          successToken: true,
          money: increment(amount),
        });
        await updateDoc(userRef, {
          successToken: deleteField(),
        });
      } catch (e) {
        showToast();
      }
    };

    const deleteEvent = async (eventId) => {
      try {
        DeleteEventDraft(user.uid, eventId);
      } catch (e) {
        showToast();
      }
    };

    const init = async () => {
      try {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          if (router.query.id === userSnap.data().successToken) {
            updateAmount(router.query.amount);
            if (router.query.eventId) {
              deleteEvent(router.query.eventId);
            }
            router.push("/home");
          } else {
            router.push("/home");
          }
        } else {
          router.push("/home");
        }
      } catch (e) {
        showToast();
      }
    };
    if (firestore && user && router) {
      init();
    }
  }, [firestore, user, router]);

  return (
    <Flex
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100%"}
      h={"100%"}
      paddingY={"50px"}
    >
      <Spinner size={"xl"} />
    </Flex>
  );
};

export default SettingsBillingPurchase;

SettingsBillingPurchase.getLayoutSettings = function PageLayout(page) {
  return <>{page}</>;
};
