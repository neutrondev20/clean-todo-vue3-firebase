import { DomainList, IDomainList } from "../../../domain/list.domain";
import { ListRepository } from "../../../domain/list.domain";
import {
  Firestore,
  getDocs,
  collection,
  onSnapshot,
  Unsubscribe,
  enableIndexedDbPersistence,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";

export class FirebaseTodoRepositoryImpl implements ListRepository<Unsubscribe> {
  db: Firestore;

  constructor() {
    this.db = db;
  }

  async getLists(): Promise<
    [Map<string, DomainList>, Unsubscribe | undefined, Error | undefined]
  > {
    return new Promise((r) =>
      onSnapshot(
        collection(this.db, "lists"),
        (querySnapshot) => {
          const todo_lists = new Map<string, DomainList>();
          querySnapshot.forEach((doc) => {
            todo_lists.set(doc.id, DomainList.createFromObject(doc.data()));
          });
          r([todo_lists, undefined, undefined]);
        },
        (error) => {
          r([new Map(), undefined, error]);
        },
        () => console.log("Unsubscribed from lists collection")
      )
    );
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
