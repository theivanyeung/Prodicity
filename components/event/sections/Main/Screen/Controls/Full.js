import { useState } from "react";

import Image from "next/image";

import {
  Flex,
  Box,
  Heading,
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

const EventMainScreenControlsFull = (props) => {
  const { isHost, volume, setVolume, play, setPlay } = props;

  const [slider, setSlider] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMouseEnter = () => {
    setSlider(
      <Slider
        aria-label="slider-ex-1"
        w={"7.81vw"}
        defaultValue={volume}
        onChange={(value) => {
          props.volumeChangeHandler(value);
          setVolume(value);
        }}
      >
        <SliderTrack bgColor={"#585858"}>
          <SliderFilledTrack bgColor={"#FFFFFF"} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    );
  };

  const handleMouseLeave = () => {
    setSlider();
  };

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      w={"100%"}
      h={"2.08vw"}
      bgImage={
        "linear-gradient(180deg, rgba(5, 5, 5, 0) -34.44%, rgba(0, 0, 0, 0.63) 100%)"
      }
      display={props.display}
    >
      <Flex
        ml={"1.04vw"}
        w={"20%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          mr={"0.78vw"}
          w={"2.9325vw"}
          h={"1.3275vw"}
          bgColor={"#FF5858"}
          borderRadius={"0.315vw"}
        >
          <Heading fontSize={"0.705vw"} color={"#FFFFFF"}>
            LIVE
          </Heading>
        </Flex>
        {/* {isHost ? (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            mr={"0.78vw"}
            w={"2.9325vw"}
            h={"1.3275vw"}
            bgColor={"#FF5858"}
            borderRadius={"0.315vw"}
          >
            <Heading fontSize={"0.705vw"} color={"#FFFFFF"}>
              LIVE
            </Heading>
          </Flex>
        ) : play ? (
          <Box
            as={"button"}
            w={"1.3vw"}
            h={"1.3vw"}
            onClick={props.toggleStreamPlay}
          >
            <Image
              src={"/images/stream/pause-btn.png"}
              alt={"Pause Button"}
              layout="responsive"
              width={25}
              height={25}
            />
          </Box>
        ) : (
          <Box
            as={"button"}
            w={"1.3vw"}
            h={"1.3vw"}
            onClick={props.toggleStreamPlay}
          >
            <Image
              src={"/images/stream/play-btn.png"}
              alt={"Pause Button"}
              layout="responsive"
              width={25}
              height={25}
            />
          </Box>
        )} */}

        <Flex
          justifyContent={"space-between"}
          w={"9.64vw"}
          onMouseLeave={handleMouseLeave}
        >
          <Box w={"1.3vw"} h={"1.3vw"} onMouseEnter={handleMouseEnter}>
            <Image
              src={"/images/stream/volume-btn.png"}
              alt={"Volumn Button"}
              layout="responsive"
              width={25}
              height={25}
            />
          </Box>
          {slider}
        </Flex>
      </Flex>
      <Flex
        mr={"1.3vw"}
        w={"7%"}
        justifyContent={"flex-end"}
        alignItems={"center"}
      >
        {/* <Box as={"button"} w={"1.3vw"} h={"1.3vw"} onClick={onOpen}>
          <Image
            src={"/images/stream/settings-btn.png"}
            alt={"Settings Button"}
            layout="responsive"
            width={25}
            height={25}
          />
        </Box> */}

        <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <EventModalResolution />
          </ModalContent>
        </Modal>

        {/* <Box
          as={"button"}
          w={"1.15vw"}
          h={"1.15vw"}
          onClick={props.handleFullscreen}
        >
          <Image
            src={"/images/stream/full-screen-btn.png"}
            alt={"Full Screen Button"}
            layout="responsive"
            width={22}
            height={22}
          />
        </Box> */}
      </Flex>
    </Flex>
  );
};

export default EventMainScreenControlsFull;
