import { Flex } from "@chakra-ui/react";
import SettingsProdPageBase from "./Prod/Base";

import SettingsProdPageFull from "./Prod/Full";

const SettingsProdPage = (props) => {
  return (
    <>
      {/** FULL VIEW */}

      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#EFEFEF"}
        borderRadius={"12px"}
        gap={"25px"}
        w={"700px"}
        paddingY={"25px"}
        display={{
          xxl: "flex",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      >
        <SettingsProdPageFull
          purchaseRequestHandler={props.purchaseRequestHandler}
        />
      </Flex>

      {/** BASE VIEW */}

      <Flex
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#EFEFEF"}
        borderRadius={"12px"}
        gap={"15px"}
        w={"95%"}
        paddingY={"15px"}
        display={{
          xxl: "none",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      >
        <SettingsProdPageBase
          purchaseRequestHandler={props.purchaseRequestHandler}
        />
      </Flex>
    </>
  );
};

export default SettingsProdPage;
