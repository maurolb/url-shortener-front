import { envs } from "../Config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

const firebaseConfig = {
  apiKey: envs.VITE_APIKEY,
  authDomain: envs.VITE_AUTHDOMAIN,
  projectId: envs.VITE_PROJECTID,
  storageBucket: envs.VITE_STORAGEBUCKET,
  messagingSenderId: envs.VITE_MESSAGINGSENDERID,
  appId: envs.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const firebaseDB = getFirestore(app);
