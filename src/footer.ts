import { iController, iTodoItem, iFooter, iItem } from './interface'
import { Factory, on, delegate, $, uuid, dot } from './utl'
import { SELECTOR, CLASS, CHANGE, STORAGE, KEY, STR, CONST, EVENT, TAG, TPL, HASH } from './const'

export function Footer(this: any, app: iController) {
    const element = $(dot(CLASS.FOOTER)).get() as HTMLElement
    const todoCount = $(dot(CLASS.TODOCOUNT)).get() as HTMLSpanElement
    const clearCompleted = $(dot(CLASS.CLEARCOMPLETED)).get() as HTMLButtonElement
    const allFilter = $(SELECTOR.HREF_ALL).get() as HTMLHRElement
    const activeFilter = $(SELECTOR.HREF_ACTIVE).get() as HTMLHRElement
    const completedFilter = $(SELECTOR.HREF_COMPLETED).get() as HTMLHRElement
    //---
    on(clearCompleted, EVENT.CLICK, click.bind(this))
    app.on(CHANGE.STORAGE, render)
    //---
    function click(this: any, e: Event) {
        app.emit(STORAGE.CLEAR_COMPLETED)
    }
    //---
    function render(items: iItem) {
        let activeCount = 0
        let allCount = 0
        //---
        for (const p in items) {
            if (!items[p].check)
                activeCount++
            allCount++
        }
        // todo count
        if (activeCount == 1)
            todoCount.innerHTML = `${TPL.S1}${activeCount}${TPL.S2}`
        else
            todoCount.innerHTML = `${TPL.S1}${activeCount}${TPL.S3}`
        // filter
        $(TAG.A).removeClass(CLASS.SELECTED)
        switch (window.location.hash) {
            case HASH.ACTIVE: $(activeFilter).addClass(CLASS.SELECTED); break
            case HASH.COMPLETED: $(completedFilter).addClass(CLASS.SELECTED); break
            default: $(allFilter).addClass(CLASS.SELECTED); break
        }
        // clear completed
        (allCount - activeCount > 0) ? $(clearCompleted).removeClass(CLASS.HIDDEN) : $(clearCompleted).addClass(CLASS.HIDDEN);
        // footer
        (allCount > 0) ? $(element).removeClass(CLASS.HIDDEN) : $(element).addClass(CLASS.HIDDEN)
    }
}