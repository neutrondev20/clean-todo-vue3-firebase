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

export const firebaseApp = initializeApp(firebaseConfig)

export class FirestoreService {

    db: Firestore;

    constructor() {
        this.db = markRaw(initializeFirestore(firebaseApp, {
            cacheSizeBytes: CACHE_SIZE_UNLIMITED
        }))
    }

    enableDbPersistence() {

        enableIndexedDbPersistence(this.db)
            .catch((err) => {

                console.log(err)

                if (err.code == 'failed-precondition') {
                    // Multiple tabs open, persistence can only be enabled
                    // in one tab at a a time.
                    // ...
                } else if (err.code == 'unimplemented') {
                    // The current browser does not support all of the
                    // features required to enable persistence
                    // ...
                }
            });
    }
}