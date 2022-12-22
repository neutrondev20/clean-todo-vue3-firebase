import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfvv3P2J9kDG3I_98CUpFGXdlsFyJjXak",
  authDomain: "utility-pad-222015.firebaseapp.com",
  databaseURL: "https://utility-pad-222015.firebaseio.com",
  projectId: "utility-pad-222015",
  storageBucket: "utility-pad-222015.appspot.com",
  messagingSenderId: "938858255105",
  appId: "1:938858255105:web:e2b858cc1ea97645d70100",
};

const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
