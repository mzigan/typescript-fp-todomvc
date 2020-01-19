export interface iController {
    addTodo(e: Event): void;
    toggleAll(e: Event): void;
    clearCompleted(e: Event): void;
    focusoutTodo(e: Event): void;
    delTodo(e: Event): void;
    toggleTodo(e: Event): void;
    keyupTodo(e: Event): void;
    editTodo(e: Event): void;
}

export interface iTodoItem {
    readonly id: string;
    readonly element: HTMLElement;
    readonly toggle: HTMLInputElement
    readonly label: HTMLElement;
    readonly editor: HTMLInputElement;
    update(): void,
    edit(): void,
    cancel(): void,
    render(): void;
}

export interface iTodoList {
    readonly element: HTMLUListElement;
    readonly newTodo: HTMLInputElement;
}

export interface iMain {
    readonly toggleAll: HTMLInputElement;
    render(activeCount: number, allCount: number): void;
}

export interface iFooter {
    render(activeCount: number, allCount: number): void;
}
