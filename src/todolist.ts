import { iItem } from './interface'
import { Factory, $, dot, i$ } from './utl'
import { CLASS, ITEMS, KEY, STR, EVENT, HASH } from './const'
import { app } from './app'

function Todo(list: HTMLUListElement, title: string, check: boolean, id: string) {
    let label: i$
    let editor: i$
    let toggle: i$
    const element = Factory.li(id, list)
    element
        .appendChild(Factory.div(CLASS.VIEW)
            .appendChild(toggle = Factory.check(CLASS.TOGGLE, check)
                .on(EVENT.CHANGE, () => app.emit(ITEMS.TOGGLE, id)))
            .appendChild(label = Factory.label(CLASS.EMPTY, title)
                .on(EVENT.DBL_CLICK, () => {
                    editor.value(label.textContent())
                    element.addClass(CLASS.EDITING)
                    editor.focus()
                }))
            .appendChild(Factory.button(CLASS.DESTROY)
                .on(EVENT.CLICK, () => app.emit(ITEMS.DEL, id))))
        .appendChild(editor = Factory.editor(CLASS.EDIT)
            .on(EVENT.FOCUSOUT, updateTodo)
            .on(EVENT.KEY_UP, (e: Event) => {
                if ((e as KeyboardEvent).keyCode == KEY.ESC) {
                    element.removeClass(CLASS.EDITING)
                } else if ((e as KeyboardEvent).keyCode == KEY.ENTER)
                    updateTodo()
            }))
    //---
    function updateTodo() {
        if (editor.value().trim()) {
            label.textContent(editor.value().trim())
            element.removeClass(CLASS.EDITING)
            app.emit(ITEMS.UPDATE, { check: toggle.checked(), title: label.textContent(), id: id })
        }
    }
}

export function Todolist(this: any) {
    const element = $(dot(CLASS.TODOLIST)).get() as HTMLUListElement
    //---
    app.link(ITEMS.CHANGE, (items: iItem) => {
        element.innerHTML = STR.EMPTY
        for (const p in items) {
            switch (window.location.hash) {
                case HASH.ACTIVE:
                    if (!items[p].check) Todo(element, items[p].title, items[p].check, p)
                    break
                case HASH.COMPLETED:
                    if (items[p].check) Todo(element, items[p].title, items[p].check, p)
                    break
                default:
                    Todo(element, items[p].title, items[p].check, p)
            }
        }
    })
}
