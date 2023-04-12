import LayoutHeaderBase from "./Header/Base";
import LayoutHeaderFull from "./Header/Full";

const LayoutHeader = (props) => {
  return (
    <>
      <LayoutHeaderFull
        page={props.page}
        display={{
          xxl: "flex",
          xl: "flex",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />

      <LayoutHeaderBase
        page={props.page}
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

export default LayoutHeader;
