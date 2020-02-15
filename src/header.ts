import { iController } from './interface'
import { on, $, uuid, dot } from './utl'
import { CLASS, ITEMS, KEY, STR, EVENT } from './const'
import { app } from './app'

export function Header() {
    const newTodo = $(dot(CLASS.NEWTODO)).get() as HTMLInputElement
    //---
    on(newTodo, EVENT.FOCUSOUT, addTodo)
    //---
    on(newTodo, EVENT.KEY_UP, (e: Event) =>{
        if ((e as KeyboardEvent).keyCode != KEY.ENTER) return
        addTodo()
    })
    //---
    function addTodo() {
        const val = newTodo.value.trim()
        if (val) app.emit(ITEMS.UPDATE, { check: false, title: val, id: uuid() })
        newTodo.value = STR.EMPTY
    }
}