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

import SettingsAccountPageModalPassword from "../modals/Password";

const SettingsAccountPagePasswordBase = (props) => {
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
        Password
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

      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <SettingsAccountPageModalPassword
            currentPasswordRef={props.currentPasswordRef}
            newPasswordRef={props.newPasswordRef}
            confirmNewPasswordRef={props.confirmNewPasswordRef}
            currentPasswordState={props.currentPasswordState}
            newPasswordState={props.newPasswordState}
            confirmNewPasswordState={props.confirmNewPasswordState}
            submitHandler={props.submitHandler}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsAccountPagePasswordBase;
