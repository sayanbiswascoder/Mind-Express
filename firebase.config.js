// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {getAuth, onAuthStateChanged} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKfBJ9ERudcClvsxHlx2dZ-_JLOpD28Tg",
  authDomain: "the-mind-express.firebaseapp.com",
  projectId: "the-mind-express",
  storageBucket: "the-mind-express.appspot.com",
  messagingSenderId: "259581594506",
  appId: "1:259581594506:web:d978fea82e55e7c443d673",
  measurementId: "G-W19LS47234"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth(app);
let currentUser;

const avatarStorageRef = getStorage(app, 'gs://the-mind-express.appspot.com/')


export {db, auth, avatarStorageRef};
