import CreatorStudioMainAnalyticsTimeTypeSelectFull from "./TimeTypeSelect/Full";
import CreatorStudioMainAnalyticsTimeTypeSelectBase from "./TimeTypeSelect/Base";

const CreatorStudioMainAnalyticsTimeTypeSelect = (props) => {
  return (
    <>
      <CreatorStudioMainAnalyticsTimeTypeSelectFull
        selectTypeOptions={props.selectTypeOptions}
        display={{
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "block",
          sm: "none",
          base: "none",
        }}
      />
      <CreatorStudioMainAnalyticsTimeTypeSelectBase
        selectTypeOptions={props.selectTypeOptions}
        display={{
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "block",
          base: "block",
        }}
      />
    </>
  );
};

export default CreatorStudioMainAnalyticsTimeTypeSelect;
