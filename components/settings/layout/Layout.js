import {
  Flex,
  Box,
  Button,
  Modal,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

import SettingsLayoutLayoutView from "./Layout/LayoutView";

const SettingsLayout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      w={"100%"}
      h={"100%"}
      overflowX={"hidden"}
      overflowY={"auto"}
      sx={{
        "::-webkit-scrollbar": {
          width: "5px",
        },
        "::-webkit-scrollbar-thumb": {
          background: "#777777",
          borderRadius: "10px",
        },
      }}
    >
      <SettingsLayoutLayoutView
        w={"250px"}
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <Box align={"center"} w={"100%"}>
        <Flex
          w={"90%"}
          h={"40px"}
          display={{
            xxl: "none",
            xl: "none",
            lg: "none",
            md: "block",
            sm: "block",
            base: "block",
          }}
        >
          <Button variant={"ghost"} onClick={onOpen}>
            <ArrowBackIcon />
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
          <ModalContent bgColor={"EFEFEF"}>
            <Box h={"50px"}>
              <ModalCloseButton />
            </Box>
            <SettingsLayoutLayoutView w={"100%"} onClose={onClose} />
          </ModalContent>
        </Modal>

        {children}
      </Box>
    </Flex>
  );
};

export default SettingsLayout;
