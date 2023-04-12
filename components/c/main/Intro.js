import MainIntroMain from "./Intro/Main";

const MainIntro = () => {
  return (
    <>
      <MainIntroMain
        marginTop={"4vh"}
        heroWidth={"1000px"}
        descriptionWidth={"800px"}
        heroFontSize={"6xl"}
        descriptionFontSize={"lg"}
        display={{
          xxl: "flex",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />

      <MainIntroMain
        marginTop={"4vh"}
        heroWidth={"90%"}
        descriptionWidth={"90%"}
        heroFontSize={"4xl"}
        descriptionFontSize={"md"}
        display={{
          xxl: "none",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "none",
          base: "none",
        }}
      />

      <MainIntroMain
        marginTop={"4vh"}
        heroWidth={"90%"}
        descriptionWidth={"90%"}
        heroFontSize={"2xl"}
        descriptionFontSize={"sm"}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "flex",
          base: "flex",
        }}
      />
    </>
  );
};

export default MainIntro;
