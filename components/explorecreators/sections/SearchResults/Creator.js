// FRONTEND IMPORT

import { useState, useContext } from "react";

import ExploreCreatorsSearchResultsCreatorDesktop from "./Creator/Desktop";
import ExploreCreatorsSearchResultsCreatorTablet from "./Creator/Tablet";
import ExploreCreatorsSearchResultsCreatorMobile from "./Creator/Mobile";

import { numUnitConversion } from "../../../functions";

import { UserContext } from "../../../../utils/context";

// BACKEND IMPORT

import { SubscriptionCheck } from "../../../server";

const ExploreCreatorsSearchResultsCreator = (props) => {
  const { followings } = useContext(UserContext);

  const [isSubscribed, setIsSubscribed] = useState(null);

  SubscriptionCheck(followings, props.username, setIsSubscribed);

  return (
    <>
      <ExploreCreatorsSearchResultsCreatorDesktop
        link={props.link}
        creatorId={props.creatorId}
        creatorData={props.creatorData}
        displayName={props.displayName}
        username={props.username}
        photoURL={props.photoURL}
        numFollowers={numUnitConversion(props.numFollowers)}
        numEvents={numUnitConversion(props.numEvents)}
        description={props.description}
        isSubscribed={isSubscribed}
        display={{
          "2xl": "flex",
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <ExploreCreatorsSearchResultsCreatorTablet
        link={props.link}
        creatorId={props.creatorId}
        creatorData={props.creatorData}
        displayName={props.displayName}
        username={props.username}
        photoURL={props.photoURL}
        numFollowers={numUnitConversion(props.numFollowers)}
        numEvents={numUnitConversion(props.numEvents)}
        description={props.description}
        isSubscribed={isSubscribed}
        display={{
          "2xl": "none",
          xxl: "flex",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <ExploreCreatorsSearchResultsCreatorMobile
        link={props.link}
        creatorId={props.creatorId}
        creatorData={props.creatorData}
        displayName={props.displayName}
        username={props.username}
        photoURL={props.photoURL}
        numFollowers={numUnitConversion(props.numFollowers)}
        numEvents={numUnitConversion(props.numEvents)}
        description={props.description}
        isSubscribed={isSubscribed}
        display={{
          "2xl": "none",
          xxl: "none",
          xl: "flex",
          lg: "flex",
          md: "flex",
          sm: "flex",
          base: "flex",
        }}
      />
    </>
  );
};

export default ExploreCreatorsSearchResultsCreator;
