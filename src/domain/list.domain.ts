import { Observable } from 'rxjs/internal/Observable';
import { DomainTodo } from "./todo.domain";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { generateRandomUUID } from "../utils/helpers";
import { Timestamp } from "firebase/firestore";

export interface IDomainList {
    uuid: string;
    title: string;
    icon?: string;

    todos?: Map<string, DomainTodo>;
    created_at?: Dayjs;
}

export class DomainList implements IDomainList {
    uuid: string;
    title: string;
    icon: string;

    todos: Map<string, DomainTodo>;
    created_at: Dayjs;

    constructor(list: IDomainList) {
        this.uuid = list.uuid ?? generateRandomUUID();
        this.title = list.title;
        this.icon = list.icon ?? "📁";
        this.todos = list.todos ?? new Map();
        this.created_at = list.created_at ?? dayjs();
    }

    static create(list: IDomainList): DomainList {
        return new DomainList(list);
    }

    static createFromObject(obj: any): DomainList {
        return new DomainList({
            uuid: obj.uuid,
            title: obj.title,
            icon: obj.icon,
            todos: DomainTodo.createFromObjectArray(obj.todos),
            created_at: dayjs((obj.created_at as Timestamp).toDate()),
        });
    }

    static toDto(domainList: IDomainList) {

        const list = new DomainList(domainList);

        return {
            uuid: list.uuid,
            title: list.title,
            icon: list.icon,
            todos: Array.from(list.todos, todo => ({
                uuid: todo[1].uuid,
                title: todo[1].title,
                completed: todo[1].completed,
                created_at: new Date(todo[1].created_at.toDate())
            })),
            created_at: new Date(list.created_at.toDate())
        }
    }
}

/**
 * @description This is the interface for the repository that will be used to
 *             store and retrieve the data from the database.
 * @method getLists() - Returns a map of all the lists and a function to
 *                   unsubscribe from the database and an error if there is one.
 *
 */
export interface ListRepository {
    getLists(): Observable<Map<string, DomainList>>;
    getList(id: string): Promise<DomainList>;
    upsertList(list: IDomainList): Promise<DomainList>;
    deleteList(id: string): Promise<void>;
}
