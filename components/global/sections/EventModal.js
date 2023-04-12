import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import GlobalEvent from "../cards/Event";

const GlobalEventModal = (props) => {
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
        size={"2xl"}
      >
        <ModalOverlay
          display={{
            xxl: "block",
            xl: "block",
            lg: "block",
            md: "none",
            sm: "none",
            base: "none",
          }}
        />
        <ModalContent
          boxShadow={"0px 0px 3px 2px rgba(0, 0, 0, 0.25)"}
          borderRadius={"12px"}
          display={{
            xxl: "block",
            xl: "block",
            lg: "block",
            md: "none",
            sm: "none",
            base: "none",
          }}
        >
          <ModalCloseButton
            boxSize={"30px"}
            bgColor={" rgba(255, 255, 255, 0.1)"}
            borderRadius={"100px"}
            _hover={{
              bgColor: "rgba(255, 255, 255, 0.5)",
            }}
            display={{
              xxl: "block",
              xl: "block",
              lg: "block",
              md: "none",
              sm: "none",
              base: "none",
            }}
          />
          <GlobalEvent />
        </ModalContent>
      </Modal>

      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        closeOnOverlayClick={false}
        size={"full"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "block",
          sm: "block",
          base: "block",
        }}
      >
        <ModalOverlay
          bgColor={"rgba(0, 0, 0, 0.25)"}
          display={{
            xxl: "none",
            xl: "none",
            lg: "none",
            md: "block",
            sm: "block",
            base: "block",
          }}
        />
        <ModalContent
          display={{
            xxl: "none",
            xl: "none",
            lg: "none",
            md: "block",
            sm: "block",
            base: "block",
          }}
        >
          <ModalCloseButton
            boxSize={"3vw"}
            bgColor={" rgba(255, 255, 255, 0.1)"}
            borderRadius={"100px"}
            _hover={{
              bgColor: "rgba(255, 255, 255, 0.5)",
            }}
          />
          <GlobalEvent />
        </ModalContent>
      </Modal>
    </>
  );
};

export default GlobalEventModal;
