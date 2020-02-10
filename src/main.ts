import { iController, iItem } from './interface'
import { on, $, dot } from './utl'
import { CLASS, CHANGE, STORAGE, EVENT } from './const'
import { Todolist } from './todolist'

export function Main(app: iController) {
    const element = $(dot(CLASS.MAIN)).get() as HTMLElement
    const toggleCheckbox = $(dot(CLASS.TOGGLEALL)).get() as HTMLInputElement
    //---
    Todolist(app)
    on(toggleCheckbox, EVENT.CHANGE, () => app.emit(STORAGE.TOGGLE_ALL))
    app.on(CHANGE.STORAGE, (items: iItem) => {
        let activeCount = 0
        let allCount = 0
        //---
        for (const p in items) {
            if (!items[p].check)
                activeCount++
            allCount++
        }
        //---
        (allCount > 0) ? $(element).removeClass(CLASS.HIDDEN) : $(element).addClass(CLASS.HIDDEN)
        toggleCheckbox.checked = allCount > 0 && activeCount == 0
    })
}