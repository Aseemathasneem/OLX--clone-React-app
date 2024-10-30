import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyB8YfZwdDloJuK1Fhp5WaJ8Ykuczm6nScs",
    authDomain: "olx-clone-d2b8e.firebaseapp.com",
    projectId: "olx-clone-d2b8e",
    storageBucket: "olx-clone-d2b8e.appspot.com",
    messagingSenderId: "383112754739",
    appId: "1:383112754739:web:3f2114cd2f5af6c0e9d546"
  };
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth(firebase);
  const firestore = getFirestore(firebase);
  const storage = getStorage(firebase);
  export default firebase;
  export {auth,firestore,storage }
