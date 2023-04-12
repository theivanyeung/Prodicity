import { useEffect } from "react";

import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import SettingsAccountPageModalUsername from "../modals/Username";

const SettingsAccountPageUsernameBase = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.changed) {
      onClose();
    }
  }, [props.changed]);

  return (
    <>
      <Heading
        fontWeight={"medium"}
        fontSize={"3.5vw"}
        lineHeight={"54px"}
        letterSpacing={"0.1em"}
        display={props.display}
      >
        Username: @{props.username}
      </Heading>

      <Button
        width={"70px"}
        height={"36px"}
        bgColor={"#A7A7A7"}
        onClick={onOpen}
        display={props.display}
      >
        <Heading
          fontWeight={"medium"}
          fontSize={"md"}
          lineHeight={"27px"}
          letterSpacing={"0.1em"}
        >
          Edit
        </Heading>
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        display={props.display}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <SettingsAccountPageModalUsername
            usernameInputRef={props.usernameInputRef}
            passwordInputRef={props.passwordInputRef}
            usernameState={props.usernameState}
            passwordState={props.passwordState}
            username={props.username}
            submitHandler={props.submitHandler}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsAccountPageUsernameBase;
