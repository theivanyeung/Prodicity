import MainCarouselMain from "./Carousel/Main";

const MainCarousel = () => {
  return (
    <>
      <MainCarouselMain
        width={"768px"}
        height={"432px"}
        yOffset={10}
        translateX={"20vw"}
        display={{
          xxl: "block",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />

      <MainCarouselMain
        width={"576px"}
        height={"324px"}
        yOffset={15}
        translateX={"20vw"}
        display={{
          xxl: "none",
          xl: "block",
          lg: "block",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />

      <MainCarouselMain
        width={"75vw"}
        height={"42.1875vw"}
        yOffset={5}
        translateX={"0vw"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "block",
          sm: "block",
          base: "none",
        }}
      />

      <MainCarouselMain
        width={"75vw"}
        height={"42.1875vw"}
        yOffset={-10}
        translateX={"0vw"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "block",
        }}
      />
    </>
  );
};

export default MainCarousel;
