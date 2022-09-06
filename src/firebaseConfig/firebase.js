import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCLzei6rM1wfx1ySiVKtlOaobE6zQ5Bfag",
  authDomain: "react-crud-2ebd7.firebaseapp.com",
  projectId: "react-crud-2ebd7",
  storageBucket: "react-crud-2ebd7.appspot.com",
  messagingSenderId: "803902781234",
  appId: "1:803902781234:web:17531a9d97ac883409092b"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
 
