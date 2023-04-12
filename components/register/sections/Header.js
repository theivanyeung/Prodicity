import RegisterHeaderDesktop from "./Header/Desktop";
import RegisterHeaderTablet from "./Header/Tablet";
import RegisterHeaderMobile from "./Header/Mobile";

const RegisterHeader = () => {
  return (
    <div>
      <RegisterHeaderDesktop
        display={{
          xxl: "block",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <RegisterHeaderTablet
        display={{
          xxl: "none",
          xl: "block",
          lg: "block",
          md: "block",
          sm: "none",
          base: "none",
        }}
      />
      <RegisterHeaderMobile
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "block",
          base: "block",
        }}
      />
    </div>
  );
};

export default RegisterHeader;
