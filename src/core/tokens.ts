import { FirebaseApp } from 'firebase/app';
import { FirestoreService, firebaseApp } from '../utils/firebase';
import { token, Factory } from "brandi"
import { ListRepository } from "../domain/list.domain"
import { TodoListViewModel } from '../todo-list/view/viewmodel/todo-list.view-model';

export const tokens = {
    firestoreService: token<FirestoreService>("FirestoreServices"),
    todoListRepository: token<ListRepository>("ListRepository"),
    todoListViewModel : token<TodoListViewModel>("TodoListViewModel")
}