import { FirestoreService, firebaseApp } from './../utils/firebase';
import { FirebaseTodoRepositoryImpl } from '../todo-list/repository/firebase/todo-list.firebase';
import { Container } from "brandi"
import { tokens } from "../domain/tokens"


export const container = new Container

container.bind(tokens.firestoreService)
    .toFactory(FirestoreService, (instance, firebaseApp) => instance.init(firebaseApp))

