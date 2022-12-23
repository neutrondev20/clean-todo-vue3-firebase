import { FirestoreService } from './../utils/firebase';
import { Container } from "brandi"
import { tokens } from "./tokens"
import { FirebaseTodoRepositoryImpl } from '../todo-list/repository/firebase/todo-list.firebase';
import { TodoListViewModel } from '../todo-list/view/viewmodel/todo-list.view-model';


export const container = new Container

container.bind(tokens.firestoreService)
    .toInstance(FirestoreService)
    .inSingletonScope();

container.bind(tokens.todoListRepository)
    .toInstance(FirebaseTodoRepositoryImpl)
    .inSingletonScope();

container.bind(tokens.todoListViewModel)
    .toInstance(TodoListViewModel)
    .inTransientScope();

