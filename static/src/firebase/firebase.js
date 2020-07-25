import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/**I have removed my firebase creds from here you can go to firebase and get your creds from there */

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();