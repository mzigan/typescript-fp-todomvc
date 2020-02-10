import { EVENT, KEY, STR, CONST } from './const'
import { on, getId } from './utl'
//import { TodoList, Main, TodoItem, Footer } from './view'
import { iTodoItem, iController } from './interface'
import { Storage } from './storage'
import { Header } from './header'
import { Main } from './main'
import { Footer } from './footer'

//type EventHandler = (params: any) => void
//---
export function Controller(): void {
    const handlerMap = new Map<string, Function[]>()
    //---
    const ictrl = {
        emit,
        on,
        // addTodo,
        // toggleAll,
        // clearCompleted,
        // focusoutTodo,
        // delTodo,
        // toggleTodo,
        // keyupTodo,
        // editTodo
    } as iController
    //---
    Storage(ictrl)
    Header(ictrl)
    Main(ictrl)
    Footer(ictrl)
    //---
    function on(action: string, handler: Function) {
        const h = handlerMap.get(action)
        //---
        if (h)
            h.push(handler)
        else {
            let a = []
            a.push(handler)
            handlerMap.set(action, a)
        }
    }
    //---
    function emit(action: string, params?: any) {
        const h = handlerMap.get(action)
        if (!h) return
        //---
        h.forEach(handler => { handler(params) })
    }


    //const main = Main(ictrl);
    // const list = TodoList(ictrl);
    // const footer = Footer(ictrl);
    // const items = Array<iTodoItem>();

    // on(document, EVENT.CONTENT_LOADED, (e) => load());
    // on(window, EVENT.HASHCHANGE, (e) => render());

    // function indexOf(e: EventTarget | null): number {
    //     const id = getId(e);
    //     let res = -1;
    //     let i = items.length;
    //     while (id && i--) {
    //         if (items[i].id == id) {
    //             res = i;
    //             break;
    //         }
    //     }
    //     return res;
    // }

    // function getItem(e: EventTarget | HTMLElement | null): iTodoItem | null {
    //     const index = indexOf(e);
    //     if (index > -1)
    //         return items[index];
    //     else
    //         return null;
    // }

    // function del(index: number) {
    //     items[index].element.remove();
    //     items.splice(index, 1);
    // }

    // function add(text: string, checked: boolean) {
    //     items.push(TodoItem(list.element, text, checked));
    // }

    // function load() {
    //     const json = localStorage.getItem(CONST.STORAGEKEY);
    //     if (json) {
    //         const obj = JSON.parse(json);
    //         for (const p in obj) {
    //             if (obj.hasOwnProperty(p))
    //                 add(obj[p].name, obj[p].checked);
    //         }
    //     }
    //     render();
    // }

    // function save() {
    //     const obj: { [index: number]: { checked: boolean, name: string | null } } = {};
    //     for (const key in items) {
    //         const e = items[key];
    //         obj[key] = { checked: e.toggle.checked, name: e.label.textContent };
    //     }
    //     localStorage.setItem(CONST.STORAGEKEY, JSON.stringify(obj));
    //     render();
    // }

    // function render() {
    //     const allCount = items.length;
    //     let activeCount = 0;
    //     items.forEach(e => { if (!e.toggle.checked) activeCount++; });
    //     // list
    //     items.forEach(e => e.render());
    //     // main
    //     main.render(activeCount, allCount);
    //     // footer
    //     footer.render(activeCount, allCount);
    // }

    // function addTodo(e: Event) {
    //     if (e instanceof KeyboardEvent && e.keyCode != KEY.ENTER)
    //         return;
    //     let val = list.newTodo.value.trim();
    //     if (val) {
    //         add(val, false);
    //         list.newTodo.value = STR.EMPTY;
    //         save();
    //     }
    // }

    // function delTodo(e: Event) {
    //     const index = indexOf(e.target);
    //     if (index > -1) {
    //         del(index);
    //         save();
    //     }
    // }

    // function focusoutTodo(e: Event) {
    //     const item = getItem(e.target);
    //     if (item) {
    //         item.update();
    //         save();
    //     }
    // }

    // function toggleTodo() {
    //     save();
    // }

    // function keyupTodo(e: Event) {
    //     const item = getItem(e.target);
    //     if (item && e instanceof KeyboardEvent) {
    //         if (e.keyCode == KEY.ENTER) {
    //             if (item.editor.value.trim())
    //                 item.update();
    //             else
    //                 delTodo(e);
    //             save();
    //         } else if (e.keyCode == KEY.ESC)
    //             item.cancel();
    //     }
    // }

    // function editTodo(e: Event) {
    //     const item = getItem(e.target);
    //     if (item)
    //         item.edit();
    // }

    // function clearCompleted(e: Event) {
    //     let n = 0;
    //     const cnt = items.length;
    //     for (let i = 0; i < cnt; i++) {
    //         const e = items[n];
    //         (e.toggle.checked) ? del(n) : n++;
    //     }
    //     save();
    // }

    // function toggleAll(e: Event) {
    //     items.forEach(e => { e.toggle.checked = main.toggleAll.checked; });
    //     save();
    // }
}
