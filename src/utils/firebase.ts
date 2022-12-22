import { FirebaseApp, initializeApp } from "firebase/app";
import { enableIndexedDbPersistence, Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA2AsX-Y9M42EKwJ7KsZEWKHfmJF6f6T9o",
    authDomain: "todo-list-555f9.firebaseapp.com",
    projectId: "todo-list-555f9",
    storageBucket: "todo-list-555f9.appspot.com",
    messagingSenderId: "681110574715",
    appId: "1:681110574715:web:32377ac06e3578208f74de"
};

export const firebaseApp = initializeApp(firebaseConfig);


export class FirestoreService {

    db!: Firestore;

    init(firebaseApp: FirebaseApp) {
        this.db = getFirestore(firebaseApp);
    }

    enablePersistence() {

        enableIndexedDbPersistence(this.db)
    }
}