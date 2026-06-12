import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKFxGXWohaZ2bKrz7RnZdHqG8-Hf4c-qY",
  authDomain: "crud-57966.firebaseapp.com",
  projectId: "crud-57966",
  storageBucket: "crud-57966.firebasestorage.app",
  messagingSenderId: "878670529218",
  appId: "1:878670529218:web:ea6647c0f37a330736f15b",
  measurementId: "G-0Q88KFEKBG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;

