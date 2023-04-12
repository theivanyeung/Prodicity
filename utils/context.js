import { createContext } from "react";

export const UserContext = createContext({
  user: null,
  uid: null,
  username: null,
  photoURL: null,
  displayName: null,
  coverPhotoURL: null,
  description: null,
  numEvents: null,
  followings: null,
  eventIdInitializer: null,
});
