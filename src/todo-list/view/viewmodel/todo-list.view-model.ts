import { DomainTodo, IDomainTodo } from "../../../domain/todo.domain";
import {
    DomainList,
    IDomainList,
    ListRepository,
} from "../../../domain/list.domain";
import { tap, Subscription } from "rxjs"
import { injected } from "brandi";
import { tokens } from "../../../core/tokens";

export class TodoListViewModel {
    todo_lists: Map<string, DomainList> = new Map();
    selected_list_id?: string;
    typing: boolean = false;
    new_todo: string = "";
    new_list: string = "";
    subscripion?: Subscription;

    repository: ListRepository;

    constructor(repository: ListRepository) {

        this.repository = repository;
    }

    get current_list(): DomainList | undefined {

        return this.todo_lists.get(this.selected_list_id ?? "");
    }

    get todos(): Map<string, DomainTodo> | undefined {
        return this.current_list?.todos;
    }

    async deleteList(id: string) {

        await this.repository.deleteList(id);
    }

    deleteTodo(id: string): void {

        throw new Error("Method not implemented.");
    }

    deinit() {
        this.subscripion?.unsubscribe()
    }

    async init() {
        const lists$ = this.repository.getLists();
        this.subscripion = lists$
            .pipe(
                tap(v => { this.todo_lists = v })
            )
            .subscribe()
    }

    upsertNewTodo(todo: IDomainTodo) {

        if (this.current_list === undefined) {
            return;
        }
        if (this.todos === undefined) {
            return;
        }

        this.repository.upsertList({
            ...this.current_list,
            todos: this.current_list.todos.set(todo.uuid, DomainTodo.createFromObject((todo)))
        });

        this.new_todo = ""
    }

    upsertNewList(list: IDomainList) {
        try {

            this.repository.upsertList(list);

        } catch (e) {

            if (e instanceof Error) {

                alert(e.message);
            }
        }

        this.new_list = "";
    }
}

injected(TodoListViewModel, tokens.todoListRepository)