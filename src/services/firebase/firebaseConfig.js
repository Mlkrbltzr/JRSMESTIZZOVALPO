
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyBc8BRYxXvxR860AIYm1hpFU_-JRLzJbAU",
  authDomain: "basedatosmestizzo.firebaseapp.com",
  projectId: "basedatosmestizzo",
  storageBucket: "basedatosmestizzo.appspot.com",
  messagingSenderId: "1064271145550",
  appId: "1:1064271145550:web:7b706cf562ff0fb89cf11f"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
