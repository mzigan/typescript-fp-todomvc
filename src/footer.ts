import { iController, iTodoItem, iFooter } from './interface'
import { Factory, on, delegate, $, uuid, dot } from './utl'
import { SELECTOR, CLASS, CHANGE, STORAGE, KEY, STR, CONST, EVENT } from './const'

export function Footer(this: any, app: iController) {
    const todoCount = $(dot(CLASS.TODOCOUNT)).get() as HTMLSpanElement;
    const clearCompleted = $(dot(CLASS.CLEARCOMPLETED)).get() as HTMLButtonElement;
    const allFilter = $(SELECTOR.HREF_ALL).get() as HTMLHRElement;
    const activeFilter = $(SELECTOR.HREF_ACTIVE).get() as HTMLHRElement;
    const completedFilter = $(SELECTOR.HREF_COMPLETED).get() as HTMLHRElement;
    //---
    on(clearCompleted, EVENT.CLICK, click.bind(this))
    //---
    function click(this: any, e: Event) {
        console.log(this);
    }
}