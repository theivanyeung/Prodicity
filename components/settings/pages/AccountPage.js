import { Flex } from "@chakra-ui/react";

import SettingsAccountPageUsername from "./AccountPage/Username";
import SettingsAccountPageEmail from "./AccountPage/Email";
import SettingsAccountPagePassword from "./AccountPage/Password";

const SettingsAccountPage = () => {
  return (
    <>
      {/* FULL VIEW */}

      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#EFEFEF"}
        borderRadius={"12px"}
        w={"700px"}
        display={{
          xxl: "flex",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <SettingsAccountPageUsername />
        <SettingsAccountPageEmail />
        <SettingsAccountPagePassword />
      </Flex>

      {/* BASE VIEW */}

      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#EFEFEF"}
        borderRadius={"12px"}
        w={"95%"}
        display={{
          xxl: "none",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      >
        <SettingsAccountPageUsername />
        <SettingsAccountPageEmail />
        <SettingsAccountPagePassword />
      </Flex>
    </>
  );
};

export default SettingsAccountPage;
