import { iController, iTodoItem, iItem } from './interface'
import { Factory, on, delegate, $, uuid, dot } from './utl'
import { CLASS, CHANGE, STORAGE, KEY, STR, CONST, EVENT } from './const'
import { Todolist } from './todolist';

export function Main(app: iController) {
    const element = $(dot(CLASS.MAIN)).get() as HTMLElement;
    const toggleCheckbox = $(dot(CLASS.TOGGLEALL)).get() as HTMLInputElement;
    //---
    Todolist(app)
    on(toggleCheckbox, EVENT.CHANGE, toggleAll)
    app.on(CHANGE.STORAGE, render)
    //---
    function toggleAll(e: Event) {
        app.emit(STORAGE.TOGGLE_ALL)
    }
    //---
    function render(items: iItem) {
        let check = true
        for (const p in items) { check = check && items[p].check }
        toggleCheckbox.checked = check
    }
}