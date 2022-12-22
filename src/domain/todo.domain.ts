import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { generateRandomUUID } from "../utils/helpers";
import { Timestamp } from "firebase/firestore";

export interface IDomainTodo {
  uuid: string;
  title: string;
  completed?: boolean;
  created_at?: Dayjs;
}

export class DomainTodo implements IDomainTodo {
  uuid: string;
  title: string;
  completed: boolean;
  created_at: Dayjs;

  constructor(todo: IDomainTodo) {
    this.uuid = todo.uuid ?? generateRandomUUID();
    this.title = todo.title;
    this.completed = todo.completed ?? false;
    this.created_at = todo.created_at ?? dayjs();
  }

  static create(todo: IDomainTodo): DomainTodo {
    return new DomainTodo(todo);
  }

  static createFromObject(obj: any): DomainTodo {
    return new DomainTodo({
      uuid: obj.uuid,
      title: obj.title,
      completed: obj.completed,
      created_at: dayjs((obj.created_at as Timestamp).toDate()),
    });
  }

  static createFromObjectArray(obj: any[]): Map<string, DomainTodo> {
    const map = new Map<string, DomainTodo>();
    for (let i = 0; i < obj.length; i++) {
      const todo = DomainTodo.createFromObject(obj[i]);
      map.set(todo.uuid, todo);
    }
    return map;
  }
}
