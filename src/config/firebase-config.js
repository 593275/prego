// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkcTFy_kum2oBIr5K58BnGgrDndj77keA",
  authDomain: "prego-258a6.firebaseapp.com",
  projectId: "prego-258a6",
  storageBucket: "prego-258a6.appspot.com",
  messagingSenderId: "203663059901",
  appId: "1:203663059901:web:87b58bc20689f702bac0d4",
  measurementId: "G-Q9PH1H48DF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);