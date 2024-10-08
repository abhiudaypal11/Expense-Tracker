// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY_k-3EPIDE-Ljnq8QkowIkebo3T196Do",
  authDomain: "expense-tracker-c6a9f.firebaseapp.com",
  projectId: "expense-tracker-c6a9f",
  storageBucket: "expense-tracker-c6a9f.appspot.com",
  messagingSenderId: "173108918901",
  appId: "1:173108918901:web:57ae333f3a5e440126963c",
  measurementId: "G-XQ1TF5YDX4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth , provider, doc, setDoc };