import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXPVFNkrq3BnEvxfjWvWV5uhSnUsqiwrg",
  authDomain: "palette-bank.firebaseapp.com",
  projectId: "palette-bank",
  storageBucket: "palette-bank.appspot.com",
  messagingSenderId: "1059735556440",
  appId: "1:1059735556440:web:1419101fa2e8f686af552d",
  measurementId: "G-8PELP3B3JQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
