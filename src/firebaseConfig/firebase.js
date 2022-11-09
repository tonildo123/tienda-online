import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAF7v7tGCoW-JWewSEmQ7c9BwrspXaLTqg",
  authDomain: "tienda-online-b2907.firebaseapp.com",
  projectId: "tienda-online-b2907",
  storageBucket: "tienda-online-b2907.appspot.com",
  messagingSenderId: "209636417189",
  appId: "1:209636417189:web:e835d9752a8ba25f63774c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


