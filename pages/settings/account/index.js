import { Flex } from "@chakra-ui/react";

import SettingsAccountPage from "../../../components/settings/pages/AccountPage";
import SEO from "../../../components/SEO";

const SettingsAccount = () => {
  return (
    <>
      <SEO
        title={"Account - Prodicity"}
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
        <SettingsAccountPage />
      </Flex>
    </>
  );
};

export default SettingsAccount;

SettingsAccount.getLayoutSettings = function PageLayout(page) {
  return <>{page}</>;
};
