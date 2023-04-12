import AboutJoinFull from "./Join/Full";
import AboutJoinBase from "./Join/Base";

const AboutJoin = () => {
  return (
    <>
      <AboutJoinFull
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />

      <AboutJoinBase
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

export default AboutJoin;
