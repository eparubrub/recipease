import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Router from "next/router";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app);
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      sessionStorage.setItem("user", result.user.displayName);
      Router.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
export const signOutWithGoogle = () => {
  auth.signOut();
  sessionStorage.removeItem("user");
  Router.push("/sign-in");
};
