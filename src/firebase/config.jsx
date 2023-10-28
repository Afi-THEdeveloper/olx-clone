import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth,createUserWithEmailAndPassword } from "firebase/auth";
import {getStorage} from 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASdaxkwpoucOjtcO6UZS_4JQF1nCkRHXU",
  authDomain: "olxclone-ad154.firebaseapp.com",
  projectId: "olxclone-ad154",
  storageBucket: "olxclone-ad154.appspot.com",
  messagingSenderId: "733288459018",
  appId: "1:733288459018:web:5a8a3132b9953e6a4ea8f3",
  measurementId: "G-7XDZ7PCY6N",
};

export const Firebase =  initializeApp(firebaseConfig);
export const db = getFirestore(Firebase)
export const auth = getAuth(Firebase)
export const storage=getStorage(Firebase)


