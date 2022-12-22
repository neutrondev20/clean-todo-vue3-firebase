import { DomainTodo, IDomainTodo } from "../../../domain/todo.domain";
import { Unsubscribe } from "firebase/firestore";
import {
  DomainList,
  IDomainList,
  ListRepository,
} from "../../../domain/list.domain";
import { FirebaseTodoRepositoryImpl } from "../../repository/firebase/todo-list.firebase";

export interface ITodoListViewModel<Unsubscribe> {
  todo_lists: Map<string, DomainList>;
  selected_list_id?: string;
  typing: boolean;
  new_todo: string;
  new_list: string;

  repository: ListRepository<Unsubscribe>;

  // GET METHODS
  current_list: DomainList | undefined;
  todos: Map<string, DomainTodo> | undefined;

  // METHODS
  upsertNewTodo: (todo: IDomainTodo) => void;
  upsertNewList: (list: IDomainList) => void;
  deleteList: (id: string) => void;
  deleteTodo: (id: string) => void;

  // LIFECYCLE METHODS
  init: () => Promise<void>;
  deinit: () => void;
}

export class TodoListViewModel implements ITodoListViewModel<Unsubscribe> {
  todo_lists: Map<string, DomainList> = new Map();
  selected_list_id?: string;
  typing: boolean = false;
  new_todo: string = "";
  new_list: string = "";
  unsubscribe?: Unsubscribe;

  repository: ListRepository<Unsubscribe>;

  constructor() {
    this.repository = new FirebaseTodoRepositoryImpl();
  }
  deleteList(id: string): void {
    throw new Error("Method not implemented.");
  }
  deleteTodo(id: string): void {
    throw new Error("Method not implemented.");
  }

  deinit() {
    this.unsubscribe?.();
  }

  async init() {
    this.todo_lists = await this.get_todo_lists();
    console.log(this.todo_lists);
  }

  async get_todo_lists(): Promise<Map<string, DomainList>> {
    const [lists, unsubscribe, error] = await this.repository.getLists();
    console.log(lists);
    this.unsubscribe = unsubscribe;
    if (error !== undefined) {
      console.log(error);
      return new Map();
    }

    return lists;
  }

  get current_list(): DomainList | undefined {
    return this.todo_lists.get(this.selected_list_id ?? "");
  }

  get todos(): Map<string, DomainTodo> | undefined {
    return this.current_list?.todos;
  }

  upsertNewTodo(todo: IDomainTodo) {
    if (this.current_list === undefined) {
      return;
    }
    if (this.todos === undefined) {
      return;
    }

    this.todo_lists.set(this.current_list.uuid, {
      ...this.current_list,
      todos: this.todos.set(todo.uuid!, DomainTodo.create(todo)),
    });
    this.new_todo = "";
  }

  upsertNewList(list: IDomainList) {
    alert(JSON.stringify(list));
    try {
      this.todo_lists.set(list.uuid!, DomainList.create(list));
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }

    this.new_list = "";
  }
}
