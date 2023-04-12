import { useState } from "react";

import GlobalCreateEventResponsiveSecondFull from "./Second/Full";
import GlobalCreateEventResponsiveSecondBase from "./Second/Base";

const GlobalCreateEventResponsiveSecond = (props) => {
  const [wholePrice, setWholePrice] = useState("0");
  const [fractionPrice, setFractionPrice] = useState("0");
  const [priceState, setPriceState] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [annoucementSwitch, setAnnoucementSwitch] = useState(true);
  const [annoucementCooldown, setAnnoucementCooldown] = useState("0");
  const [annoucementState, setAnnoucementState] = useState("");
  const [chatCooldown, setChatCooldown] = useState("0");
  const [chatState, setChatState] = useState("");

  const clickAnnoucementSwitch = () => {
    setAnnoucementSwitch(!annoucementSwitch);
  };

  const secondModalErrorHandler = () => {
    let error = false;

    if (wholePrice < 0 || fractionPrice < 0 || fractionPrice > 99) {
      setPriceState("Invalid Price");
      console.log("Invalid price");
      error = true;
    } else if (isFree === false && wholePrice == 0 && fractionPrice == 0) {
      setPriceState("Set a price");
      console.log("Set a price");
      error = true;
    } else {
      setPriceState("");
    }

    if (annoucementSwitch === true && annoucementCooldown < 0) {
      setAnnoucementState("Invalid cooldown time");
      console.log("Invalid cooldown time");
      error = true;
    } else {
      setAnnoucementState("");
    }

    if (chatCooldown < 0) {
      setChatState("Invalid cooldown time");
      console.log("Invalid cooldown time");
      error = true;
    } else {
      setAnnoucementState("");
    }

    return error;
  };

  const createHandler = () => {
    if (secondModalErrorHandler() === false) {
      if (isFree === true) {
        props.createHandler(
          0,
          0,
          isFree,
          annoucementSwitch,
          annoucementCooldown,
          chatCooldown
        );
      } else {
        props.createHandler(
          wholePrice,
          fractionPrice,
          isFree,
          annoucementSwitch,
          annoucementCooldown,
          chatCooldown
        );
      }
    }
  };

  return (
    <>
      <GlobalCreateEventResponsiveSecondFull
        priceState={priceState}
        isFree={isFree}
        setIsFree={setIsFree}
        setWholePrice={setWholePrice}
        setFractionPrice={setFractionPrice}
        annoucementSwitch={annoucementSwitch}
        annoucementState={annoucementState}
        chatState={chatState}
        setAnnoucementCooldown={setAnnoucementCooldown}
        setChatCooldown={setChatCooldown}
        clickAnnoucementSwitch={clickAnnoucementSwitch}
        clickBackHandler={props.clickBackHandler}
        createHandler={createHandler}
        display={{
          xxl: "none",
          xl: "none",
          lg: "block",
          md: "block",
          sm: "none",
          base: "none",
        }}
      />
      <GlobalCreateEventResponsiveSecondBase
        priceState={priceState}
        isFree={isFree}
        setIsFree={setIsFree}
        setWholePrice={setWholePrice}
        setFractionPrice={setFractionPrice}
        annoucementSwitch={annoucementSwitch}
        annoucementState={annoucementState}
        chatState={chatState}
        setAnnoucementCooldown={setAnnoucementCooldown}
        setChatCooldown={setChatCooldown}
        clickAnnoucementSwitch={clickAnnoucementSwitch}
        clickBackHandler={props.clickBackHandler}
        createHandler={createHandler}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "block",
          base: "block",
        }}
      />
    </>
  );
};

export default GlobalCreateEventResponsiveSecond;
