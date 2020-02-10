import { iController, iItem } from './interface'
import { Factory, on, $, dot } from './utl'
import { CLASS, ITEMS, KEY, STR, EVENT, HASH } from './const'

function Todo(app: iController, list: HTMLUListElement, title: string, check: boolean, id: string) {
    const element = Factory.li(list, id)
    const view = Factory.div(element, CLASS.VIEW)
    const toggle = Factory.check(view, CLASS.TOGGLE, check)
    const label = Factory.label(view, CLASS.EMPTY, title)
    const destroy = Factory.button(view, CLASS.DESTROY)
    const editor = Factory.editor(element, CLASS.EDIT)
    //---
    on(editor, EVENT.FOCUSOUT, updateTodo)
    on(destroy, EVENT.CLICK, () => app.emit(ITEMS.DEL, id))
    on(toggle, EVENT.CHANGE, () => app.emit(ITEMS.TOGGLE, id))
    //---
    on(editor, EVENT.KEY_UP, (e: Event) => {
        if ((e as KeyboardEvent).keyCode == KEY.ESC) {
            $(element).removeClass(CLASS.EDITING)
        } else if ((e as KeyboardEvent).keyCode == KEY.ENTER)
            updateTodo()
    })
    //---
    on(label, EVENT.DBL_CLICK, () => {
        editor.value = STR.EMPTY
        if (label.textContent)
            editor.value = label.textContent
        $(element).addClass(CLASS.EDITING)
        editor.focus()
    })
    //---
    function updateTodo() {
        if (editor.value.trim()) {
            label.textContent = editor.value.trim()
            $(element).removeClass(CLASS.EDITING)
            app.emit(ITEMS.UPDATE, { check: toggle.checked, title: label.textContent, id: id })
        }
    }
}

export function Todolist(this: any, app: iController) {
    const element = $(dot(CLASS.TODOLIST)).get() as HTMLUListElement
    //---
    app.on(ITEMS.CHANGE, (items: iItem) => {
        element.innerHTML = STR.EMPTY
        for (const p in items) {
            switch (window.location.hash) {
                case HASH.ACTIVE:
                    if (!items[p].check) Todo(app, element, items[p].title, items[p].check, p)
                    break
                case HASH.COMPLETED:
                    if (items[p].check) Todo(app, element, items[p].title, items[p].check, p)
                    break
                default:
                    Todo(app, element, items[p].title, items[p].check, p)
            }
        }
    })
}
