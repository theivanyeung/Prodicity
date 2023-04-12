import { useState } from "react";

import {
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import SettingsAccountPageModalEmailSendCode from "../modals/Email/SendCode";

const SettingsAccountPageEmailBase = (props) => {
  const [modal, setModal] = useState(<SettingsAccountPageModalEmailSendCode />);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Heading
        fontWeight={"medium"}
        fontSize={"3.5vw"}
        lineHeight={"54px"}
        letterSpacing={"0.1em"}
        {...props}
      >
        Email: ***********@gmail.com
      </Heading>

      <Button
        width={"70px"}
        height={"36px"}
        bgColor={"#A7A7A7"}
        onClick={onOpen}
        {...props}
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

      <Modal isOpen={isOpen} onClose={onClose} size={"full"} {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton onClose={onClose} />
          {modal}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsAccountPageEmailBase;
