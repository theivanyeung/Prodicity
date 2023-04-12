import CreatorStudioProfileDesktop from "./Profile/Desktop";
import CreatorStudioProfileMobile from "./Profile/Mobile";
import CreatorStudioProfileTablet from "./Profile/Tablet";

const CreatorStudioProfile = (props) => {
  return (
    <>
      <CreatorStudioProfileDesktop
        search={props.search}
        creatorId={props.creatorId}
        currentUsername={props.currentUsername}
        creatorData={props.creatorData}
        photoURL={props.photoURL}
        coverPhotoURL={props.coverPhotoURL}
        displayName={props.displayName}
        username={props.username}
        numFollowers={props.numFollowers}
        description={props.description}
        isSubscribed={props.isSubscribed}
        display={{
          "2xl": "block",
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <CreatorStudioProfileTablet
        search={props.search}
        creatorId={props.creatorId}
        currentUsername={props.currentUsername}
        creatorData={props.creatorData}
        photoURL={props.photoURL}
        coverPhotoURL={props.coverPhotoURL}
        displayName={props.displayName}
        username={props.username}
        numFollowers={props.numFollowers}
        description={props.description}
        isSubscribed={props.isSubscribed}
        display={{
          "2xl": "none",
          xxl: "block",
          xl: "block",
          lg: "block",
          md: "none",
          sm: "none",
          base: "none",
        }}
      />
      <CreatorStudioProfileMobile
        search={props.search}
        creatorId={props.creatorId}
        currentUsername={props.currentUsername}
        creatorData={props.creatorData}
        photoURL={props.photoURL}
        coverPhotoURL={props.coverPhotoURL}
        displayName={props.displayName}
        username={props.username}
        numFollowers={props.numFollowers}
        description={props.description}
        isSubscribed={props.isSubscribed}
        display={{
          "2xl": "none",
          xxl: "none",
          xl: "none",
          lg: "none",
          md: "block",
          sm: "block",
          base: "block",
        }}
      />
    </>
  );
};

export default CreatorStudioProfile;
