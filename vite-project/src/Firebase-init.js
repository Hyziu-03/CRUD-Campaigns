import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKFxGXWohaZ2bKrz7RnZdHqG8-Hf4c-qY",
  authDomain: "crud-57966.firebaseapp.com",
  projectId: "crud-57966",
  storageBucket: "crud-57966.firebasestorage.app",
  messagingSenderId: "878670529218",
  appId: "1:878670529218:web:ea6647c0f37a330736f15b",
  measurementId: "G-0Q88KFEKBG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

const db = getFirestore(app);

export default db;

