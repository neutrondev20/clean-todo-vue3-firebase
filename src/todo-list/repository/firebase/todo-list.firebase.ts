import { Factory } from 'brandi';
import { FirestoreService } from './../../../utils/firebase';
import { DomainList, IDomainList } from "../../../domain/list.domain";
import { ListRepository } from "../../../domain/list.domain";
import {
    Firestore,
    getDocs,
    collection,
    onSnapshot,
    enableIndexedDbPersistence,
    Unsubscribe
} from "firebase/firestore";
import { Observable } from "rxjs/internal/observable"
import { container } from "../../../core/di";
import { tokens } from "../../../domain/tokens";
import { firebaseApp } from "../../../utils/firebase";
import { FirebaseApp } from 'firebase/app';

export class FirebaseTodoRepositoryImpl implements ListRepository {
    db!: Firestore;

    constructor() {
        const dbFactory = container.get(tokens.firestoreService);
        const firestoreService = dbFactory(firebaseApp);
        this.db = firestoreService.db;
    }

    getLists(): Observable<Map<string, DomainList>> {
        return new Observable(subscribe => {
            const unsubscribe = onSnapshot(
                collection(this.db, "lists"),
                (querySnapshot) => {
                    const todo_lists = new Map<string, DomainList>();
                    querySnapshot.forEach((doc) => {
                        todo_lists.set(doc.id, DomainList.createFromObject(doc.data()));
                    });
                    subscribe.next(todo_lists)
                },
                (error) => {
                    console.log(error)
                },
                () => console.log("Unsubscribed from lists collection")
            )
            return unsubscribe
        })
    }
    async getList(id: string): Promise<DomainList> {
        throw new Error("Method not implemented.");
    }
    async upsertList(list: IDomainList): Promise<DomainList> {
        throw new Error("Method not implemented.");
    }
    async deleteList(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}