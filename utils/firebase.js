import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// const {
//   FIREBASE_APIKEY,
//   FIREBASE_AUTHDOMAIN,
//   FIREBASE_PROJECTID,
//   FIREBASE_STORAGEBUCKET,
//   FIREBASE_MESSAGINGSENDERID,
//   FIREBASE_APPID,
//   FIREBASE_MEASUREMENTID,
// } = process.env;

const firebaseConfig = {
  apiKey: "AIzaSyAv9MwpCEVlywoMj7mbQrg1WQU95qfS_SA",
  authDomain: "prodicity-6e1f4.firebaseapp.com",
  projectId: "prodicity-6e1f4",
  storageBucket: "prodicity-6e1f4.appspot.com",
  messagingSenderId: "894364126209",
  appId: "1:894364126209:web:f04bfdc240b08ac33dc400",
  measurementId: "G-Y7QY0V155S",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// FIRESTORE EXPORTS
export const firestore = firebase.firestore();

// STORAGE EXPORTS
export const storage = firebase.storage();
