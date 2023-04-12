import AboutMainBase from "./Main/Base";
import AboutMainFull from "./Main/Full";

const AboutMain = () => {
  return (
    <>
      <AboutMainFull
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />

      <AboutMainBase
        display={{
          xxl: "none",
          xl: "none",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      />
    </>
  );
};

export default AboutMain;
