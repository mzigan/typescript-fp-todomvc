import { iController, iTodoItem } from './interface'
import { Factory, on, delegate, $, uuid, dot } from './utl'
import { CLASS, CHANGE, STORAGE, KEY, STR, CONST, EVENT } from './const'

export function Header(app: iController) {
    const newTodo = $(dot(CLASS.NEWTODO)).get() as HTMLInputElement
    //---
    on(newTodo, EVENT.KEY_UP, keyUp)
    on(newTodo, EVENT.FOCUSOUT, addTodo)
    //---
    function keyUp(e: Event) {
        if ((e as KeyboardEvent).keyCode != KEY.ENTER) return
        addTodo()
    }
    //---
    function addTodo() {
        const val = newTodo.value.trim();
        if (val) app.emit(STORAGE.ADD, { check: false, title: val, id: uuid() })
        newTodo.value = STR.EMPTY
    }
}