import { useState } from "react";

import Image from "next/image";

import {
  Flex,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import EventModalResolution from "../../../../modal/Resolution";

const EventMainScreenControlsBase = (props) => {
  const [volume, setVolume] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMouseEnter = () => {
    setVolume(
      <Slider
        aria-label="slider-ex-1"
        w={"150px"}
        defaultValue={30}
        size={"sm"}
      >
        <SliderTrack bgColor={"#585858"}>
          <SliderFilledTrack bgColor={"#FFFFFF"} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    );
  };

  const handleMouseLeave = () => {
    setVolume();
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      h={"50px"}
      bgImage={
        "linear-gradient(180deg, rgba(5, 5, 5, 0) -34.44%, rgba(0, 0, 0, 0.63) 100%)"
      }
      display={props.display}
    >
      <Flex
        ml={"10px"}
        w={"210px"}
        bg="blue"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box w={"20px"} h={"20px"}>
          <Image
            src={"/images/stream/pause-btn.png"}
            alt={"Pause Button"}
            layout="responsive"
            width={20}
            height={20}
          />
        </Box>
        <Flex
          justifyContent={"space-between"}
          w={"180px"}
          onMouseLeave={handleMouseLeave}
        >
          <Box w={"20px"} h={"20px"} onMouseEnter={handleMouseEnter}>
            <Image
              src={"/images/stream/volume-btn.png"}
              alt={"Volumn Button"}
              layout="responsive"
              width={20}
              height={20}
            />
          </Box>
          {volume}
        </Flex>
      </Flex>
      <Flex
        mr={"20px"}
        w={"50px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box as={"button"} w={"20px"} h={"20px"} onClick={onOpen}>
          <Image
            src={"/images/stream/settings-btn.png"}
            alt={"Settings Button"}
            layout="responsive"
            width={20}
            height={20}
          />
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <EventModalResolution />
          </ModalContent>
        </Modal>

        <Box w={"18px"} h={"18px"}>
          <Image
            src={"/images/stream/full-screen-btn.png"}
            alt={"Full Screen Button"}
            layout="responsive"
            width={18}
            height={18}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default EventMainScreenControlsBase;
