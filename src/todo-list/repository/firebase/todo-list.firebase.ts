import { FirestoreServiceOffline } from './../../../utils/firebase';
import { DomainList, IDomainList } from "../../../domain/list.domain";
import { ListRepository } from "../../../domain/list.domain";
import {
    collection,
    onSnapshot,
    setDoc,
    doc,
    deleteDoc
} from "firebase/firestore";
import { Observable } from "rxjs/internal/observable"
import { tokens } from "../../../core/tokens";
import { injected } from "brandi";

export class FirebaseTodoRepositoryImpl implements ListRepository {

    firestoreService: FirestoreServiceOffline;

    constructor(firestoreService: FirestoreServiceOffline) {
        this.firestoreService = firestoreService;
    }

    getLists(): Observable<Map<string, DomainList>> {
        return new Observable(subscribe => {
            return onSnapshot(
                collection(this.firestoreService.db, "lists"),
                (querySnapshot) => {
                    const todo_lists = new Map<string, DomainList>();
                    querySnapshot.forEach((doc) => {
                        todo_lists.set(doc.id, DomainList.createFromObject(doc.data()));
                    });
                    subscribe.next(todo_lists)
                },
                // Error
                (error) => {
                    subscribe.error(error);
                },
                // Complete
                () => subscribe.complete()
            )
        })
    }

    async getList(id: string): Promise<DomainList> {
        throw new Error("Method not implemented.");
    }

    async upsertList(list: IDomainList): Promise<DomainList> {

        const reference = collection(this.firestoreService.db, "lists")

        const document = doc(reference, list.uuid);

        await setDoc(document, {
            ...DomainList.toDto(list),
        })

        return new DomainList(list);
    }

    async deleteList(id: string): Promise<void> {

        const reference = collection(this.firestoreService.db, "lists")

        const document = doc(reference, id);

        await deleteDoc(document);
    }
}

injected(FirebaseTodoRepositoryImpl, tokens.firestoreOfflineService)