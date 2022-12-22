import { FirebaseApp } from 'firebase/app';
import { FirestoreService, firebaseApp } from './../utils/firebase';
import { token, Factory } from "brandi"
import { ListRepository } from "./list.domain"

export const tokens = {
    todoListRepository: token<Factory<ListRepository>>("ListRepository"),
    firestoreService: token<Factory<FirestoreService, [firebaseApp : FirebaseApp]>>("FirestoreServices")

}