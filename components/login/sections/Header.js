import LoginHeaderDesktop from "./Header/Desktop";
import LoginHeaderTablet from "./Header/Tablet";
import LoginHeaderMobile from "./Header/Mobile";

const LoginHeader = () => {
  return (
    <div>
      <LoginHeaderDesktop
        display={{
          xxl: "block",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <LoginHeaderTablet
        display={{
          xxl: "none",
          xl: "block",
          lg: "block",
          md: "block",
          sm: "none",
          base: "none",
        }}
      />
      <LoginHeaderMobile
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

export default LoginHeader;
