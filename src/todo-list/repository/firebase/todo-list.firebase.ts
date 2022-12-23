import { DomainList, IDomainList } from "../../../domain/list.domain";
import { ListRepository } from "../../../domain/list.domain";
import {
    collection,
    onSnapshot,
    setDoc,
    doc,
    updateDoc
} from "firebase/firestore";
import { Observable } from "rxjs/internal/observable"
import { tokens } from "../../../core/tokens";
import { FirestoreService } from "../../../utils/firebase";
import { injected } from "brandi";



export class FirebaseTodoRepositoryImpl implements ListRepository {

    firestoreService: FirestoreService;

    constructor(firestoreService: FirestoreService) {
        this.firestoreService = firestoreService;
        this.firestoreService.enableDbPersistence();
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

        console.log(DomainList.toDto(list))

        await setDoc(document, {
            ...DomainList.toDto(list),
            todos: [],
            created_at: new Date()
        })

        return new DomainList(list);
    }

    async deleteList(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

injected(FirebaseTodoRepositoryImpl, tokens.firestoreService)