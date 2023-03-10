import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8vzNvfw8oPH-1ODcT2pg2ATZVP2-GRb8",
  authDomain: "diet-mumble.firebaseapp.com",
  projectId: "diet-mumble",
  storageBucket: "diet-mumble.appspot.com",
  messagingSenderId: "420253713270",
  appId: "1:420253713270:web:4ebb6f7e2c2bdb0287f057",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }
