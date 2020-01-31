import { CLASS, EVENT, SELECTOR, STR, TAG, HASH, TPL } from './const'
import { Factory, on, delegate, $, uuid, dot } from './utl'
import { iController, iTodoList, iMain, iTodoItem, iFooter } from './interface'

export function TodoItem(list: HTMLUListElement, text: string, checked: boolean): iTodoItem {
    const id = uuid();
    const element = Factory.li(list, id);
    const view = Factory.div(element, CLASS.VIEW);
    const toggle = Factory.check(view, CLASS.TOGGLE, checked);
    const label = Factory.label(view, CLASS.EMPTY, text);
    const destroy = Factory.button(view, CLASS.DESTROY);
    const editor = Factory.editor(element, CLASS.EDIT);

    function update() {
        if (editor.value.trim()) {
            label.textContent = editor.value.trim();
            $(element).removeClass(CLASS.EDITING);
        }
    }

    function cancel() {
        editor.value = STR.EMPTY;
        $(element).removeClass(CLASS.EDITING);
    }

    function edit() {
        editor.value = STR.EMPTY;
        if (label.textContent)
            editor.value = label.textContent;
        $(element).addClass(CLASS.EDITING);
        editor.focus();
    }

    function render() {
        // completed
        (toggle.checked) ? $(element).addClass(CLASS.COMPLETED) : $(element).removeClass(CLASS.COMPLETED);
        // hidden
        switch (window.location.hash) {
            case HASH.ACTIVE: (toggle.checked) ? $(element).addClass(CLASS.HIDDEN) : $(element).removeClass(CLASS.HIDDEN); break;
            case HASH.COMPLETED: (toggle.checked) ? $(element).removeClass(CLASS.HIDDEN) : $(element).addClass(CLASS.HIDDEN); break;
            default: $(element).removeClass(CLASS.HIDDEN); break;
        }
    }

    return {
        id,
        element,
        toggle,
        label,
        editor,
        update,
        edit,
        cancel,
        render
    } as iTodoItem;
}

export function TodoList(app: iController): iTodoList {
    const element = $(dot(CLASS.TODOLIST)).get() as HTMLUListElement;
    const newTodo = $(dot(CLASS.NEWTODO)).get() as HTMLInputElement;

    on(newTodo, EVENT.KEY_UP, app.addTodo);
    on(newTodo, EVENT.FOCUSOUT, app.addTodo);
    delegate(element, dot(CLASS.EDIT), EVENT.FOCUSOUT, app.focusoutTodo);
    delegate(element, dot(CLASS.DESTROY), EVENT.CLICK, app.delTodo);
    delegate(element, dot(CLASS.TOGGLE), EVENT.CHANGE, app.toggleTodo);
    delegate(element, dot(CLASS.EDIT), EVENT.KEY_UP, app.keyupTodo);
    delegate(element, TAG.LABEL, EVENT.DBL_CLICK, app.editTodo);

    return {
        element,
        newTodo
    } as iTodoList;
}

export function Main(app: iController): iMain {
    const element = $(dot(CLASS.MAIN)).get() as HTMLElement;
    const toggleAll = $(dot(CLASS.TOGGLEALL)).get() as HTMLInputElement;

    on(toggleAll, EVENT.CHANGE, app.toggleAll);

    function render(activeCount: number, allCount: number) {
        toggleAll.checked = allCount > 0 && activeCount == 0;
        (allCount > 0) ? $(element).removeClass(CLASS.HIDDEN) : $(element).addClass(CLASS.HIDDEN);
    }

    return {
        toggleAll,
        render
    } as iMain;
}

export function Footer(app: iController): iFooter {
    const element = $(dot(CLASS.FOOTER)).get() as HTMLElement;
    const todoCount = $(dot(CLASS.TODOCOUNT)).get() as HTMLSpanElement;
    const clearCompleted = $(dot(CLASS.CLEARCOMPLETED)).get() as HTMLButtonElement;
    const allFilter = $(SELECTOR.HREF_ALL).get() as HTMLHRElement;
    const activeFilter = $(SELECTOR.HREF_ACTIVE).get() as HTMLHRElement;
    const completedFilter = $(SELECTOR.HREF_COMPLETED).get() as HTMLHRElement;

    on(clearCompleted, EVENT.CLICK, app.clearCompleted);

    function render(activeCount: number, allCount: number) {
        // todo count
        if (activeCount == 1)
            todoCount.innerHTML = `${TPL.S1}${activeCount}${TPL.S2}`;
        else
            todoCount.innerHTML = `${TPL.S1}${activeCount}${TPL.S3}`;
        // filter
        $(TAG.A).removeClass(CLASS.SELECTED);
        switch (window.location.hash) {
            case HASH.ACTIVE: $(activeFilter).addClass(CLASS.SELECTED); break;
            case HASH.COMPLETED: $(completedFilter).addClass(CLASS.SELECTED); break;
            default: $(allFilter).addClass(CLASS.SELECTED); break;
        }
        // clear completed
        (allCount - activeCount > 0) ? $(clearCompleted).removeClass(CLASS.HIDDEN) : $(clearCompleted).addClass(CLASS.HIDDEN);
        // footer
        (allCount > 0) ? $(element).removeClass(CLASS.HIDDEN) : $(element).addClass(CLASS.HIDDEN);
    }

    return {
        render
    } as iFooter;
}
