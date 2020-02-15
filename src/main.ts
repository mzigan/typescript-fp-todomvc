import { iApp, iItem } from './interface'
import { on, $, dot } from './utl'
import { CLASS, ITEMS, EVENT } from './const'
import { Todolist } from './todolist'
import { app } from './app'

export function Main() {
    const element = $(dot(CLASS.MAIN)).get() as HTMLElement
    const toggleCheckbox = $(dot(CLASS.TOGGLEALL)).get() as HTMLInputElement
    //---
    Todolist()
    //---
    on(toggleCheckbox, EVENT.CHANGE, () => app.emit(ITEMS.TOGGLE_ALL))
    app.link(ITEMS.CHANGE, (items: iItem) => {
        let activeCount = 0
        let allCount = 0
        //---
        for (const p in items) {
            if (!items[p].check)
                activeCount++
            allCount++
        }
        //---
        if (allCount > 0)
            $(element).removeClass(CLASS.HIDDEN)
        else
            $(element).addClass(CLASS.HIDDEN)
        toggleCheckbox.checked = allCount > 0 && activeCount == 0
    })
}