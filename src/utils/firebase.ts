import { FirebaseApp, initializeApp, } from "firebase/app";
import { CACHE_SIZE_UNLIMITED, enableIndexedDbPersistence, Firestore, initializeFirestore } from "firebase/firestore";
import { markRaw } from "vue";

const firebaseConfig = {
    apiKey: "AIzaSyBcfbk0RpE3kCp-ABFkyN-WNYo1bbuQHi8",
    authDomain: "todo-list-f0108.firebaseapp.com",
    projectId: "todo-list-f0108",
    storageBucket: "todo-list-f0108.appspot.com",
    messagingSenderId: "886483750167",
    appId: "1:886483750167:web:be54c0d0c9faff1f443b52"
};

export class FirestoreServiceOnline {
    db: Firestore;

    constructor() {
        const app = initializeApp(firebaseConfig, "online-only")
        this.db = markRaw(initializeFirestore(app, {
            cacheSizeBytes: CACHE_SIZE_UNLIMITED
        }))
    }
}

export class FirestoreServiceOffline {
    db: Firestore;

    constructor() {
        const app = initializeApp(firebaseConfig)
        this.db = markRaw(initializeFirestore(app, {
            cacheSizeBytes: CACHE_SIZE_UNLIMITED
        }))
        enableIndexedDbPersistence(this.db)
    }
}