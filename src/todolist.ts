import { iController, iTodoItem, iItem } from './interface'
import { Factory, on, delegate, $, uuid, dot } from './utl'
import { CLASS, CHANGE, STORAGE, TAG, KEY, STR, CONST, EVENT } from './const'


function Todo(app: iController, list: HTMLUListElement, title: string, check: boolean, id: string) {
    //const id = uuid()
    const element = Factory.li(list, id)
    const view = Factory.div(element, CLASS.VIEW);
    const toggle = Factory.check(view, CLASS.TOGGLE, check)
    const label = Factory.label(view, CLASS.EMPTY, title)
    const destroy = Factory.button(view, CLASS.DESTROY)
    const editor = Factory.editor(element, CLASS.EDIT);
    //---
    on(label, EVENT.DBL_CLICK, edit)
    on(editor, EVENT.FOCUSOUT, update)
    //---
    function edit() {
        editor.value = STR.EMPTY;
        if (label.textContent)
            editor.value = label.textContent;
        $(element).addClass(CLASS.EDITING);
        editor.focus();
    }
    //---
    function update() {
        if (editor.value.trim()) {
            label.textContent = editor.value.trim();
            $(element).removeClass(CLASS.EDITING);
            app.emit(STORAGE.UPDATE, { check: toggle.checked, title: label.textContent, id: id })
        }
    }
}

export function Todolist(this: any, app: iController) {
    const element = $(dot(CLASS.TODOLIST)).get() as HTMLUListElement
    //---
    app.on(CHANGE.STORAGE, render)
    //---
    function render(items: iItem) {
        element.innerHTML = STR.EMPTY
        for (const p in items) { Todo(app, element, items[p].title, items[p].check, p) }
        //items.map((val) => { Todo(app, element, val.title, val.check, val.id) })
    }
}