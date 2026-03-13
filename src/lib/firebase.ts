import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC8BNimwPaXwibKt8pq5GZCTzVY1eaWPpY",
  authDomain: "escritor-3713e.firebaseapp.com",
  projectId: "escritor-3713e",
  storageBucket: "escritor-3713e.firebasestorage.app",
  messagingSenderId: "399176833618",
  appId: "1:399176833618:web:eca9ff87ad84da42329d8b",
  measurementId: "G-Z61SH6BR7X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
