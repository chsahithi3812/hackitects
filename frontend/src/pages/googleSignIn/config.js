import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCysHa0haH0MlN8ODk5mf5JqSX2dCTrM4Q",
  authDomain: "finexa-11000.firebaseapp.com",
  projectId: "finexa-11000",
  storageBucket: "finexa-11000.appspot.com",
  messagingSenderId: "9941110957",
  appId: "1:9941110957:web:f087f8bc08b2029d6bb624",
  measurementId: "G-3E1REBZBMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};