import { useContext } from "react";

import { Flex, useToast } from "@chakra-ui/react";

import { v4 as uuidv4 } from "uuid";

import SettingsProdPage from "../../../components/settings/pages/Prod";
import SEO from "../../../components/SEO";

import { UserContext } from "../../../utils/context";

// BACKEND IMPORTS

import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../utils/firebase";

const SettingsBilling = () => {
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

  const purchaseRequestHandler = async (amount) => {
    try {
      const successToken = uuidv4();

      const response = await fetch("/api/prod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          successToken: successToken,
        }),
      });

      if (response.ok && user.uid) {
        const session = await response.json();
        const userRef = doc(firestore, "users", user.uid);
        await updateDoc(userRef, {
          successToken: successToken,
        });
        window.location.href = session.url;
      } else {
        console.error(response.statusText);
      }
    } catch (e) {
      showToast();
    }
  };

  return (
    <>
      <SEO
        title={"Buy Prod - Prodicity"}
        description={""}
        keywords={""}
        image={""}
      />
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        w={"100%"}
        h={"100%"}
        paddingY={"50px"}
      >
        <SettingsProdPage purchaseRequestHandler={purchaseRequestHandler} />
      </Flex>
    </>
  );
};

export default SettingsBilling;

SettingsBilling.getLayoutSettings = function PageLayout(page) {
  return <>{page}</>;
};
