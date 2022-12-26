import { FirestoreServiceOffline, FirestoreServiceOnline } from './../utils/firebase';
import { FirebaseApp } from 'firebase/app';
import { token, Factory } from "brandi"
import { ListRepository } from "../domain/list.domain"
import { TodoListViewModel } from '../todo-list/view/viewmodel/todo-list.view-model';

export const tokens = {
    firestoreOnlineService: token<FirestoreServiceOnline>("FirestoreonlineService"),
    firestoreOfflineService: token<FirestoreServiceOffline>("FirestoreOfflineService"),
    todoListRepository: token<ListRepository>("ListRepository"),
    todoListViewModel: token<TodoListViewModel>("TodoListViewModel")
}