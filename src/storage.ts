import { iController, iItem } from './interface'
import { on, getId } from './utl'
import { EVENT, CHANGE, STORAGE, KEY, STR, CONST } from './const'


export function Storage(app: iController) {
    //const items = new Array()
    let items: iItem = {}
    //---
    on(document, EVENT.CONTENT_LOADED, onLoad)
    app.on(STORAGE.ADD, addTodo)
    app.on(STORAGE.UPDATE, updateTodo)
    app.on(STORAGE.TOGGLE_ALL, toggleAll)
    //---
    function addTodo(e: { check: boolean, title: string, id: string }) {
        // items.push(e)
        items[e.id] = { check: e.check, title: e.title }
        save()
    }
    //---
    function updateTodo(e: { check: boolean, title: string, id: string }) {
        // items.push(e)
        items[e.id] = { check: e.check, title: e.title }
        save()
    }
    //---
    function toggleAll() {
        // const check = items.reduce<boolean>((acc, val) => { return val.check || acc }, false)
        // items.map((val) => { val.check = !check })
        let check = false
        for (const p in items) { check = check || items[p].check }
        for (const p in items) { items[p].check = !check }
        save()
    }
    //---
    function onLoad() {
        const json = localStorage.getItem(CONST.STORAGEKEY)
        if (json) {
            items = JSON.parse(json)
            // for (const p in obj) {
            //     items[obj[p].id] = {
            //         title: obj[p].title,
            //         check: obj[p].check,
            //     }
                // items.push({
                //     title: obj[p].title,
                //     check: obj[p].check,
                //     id: obj[p].id
                // })
            //}
        }
        app.emit(CHANGE.STORAGE, items)
    }
    //---
    function save() {
        // const obj: { [index: number]: { check: boolean, title: string, id: string } } = {}
        // for (const key in items) {
        //     const e = items[key]
        //     obj[key] = { check: e.check, title: e.title, id: e.id }
        // }
        localStorage.setItem(CONST.STORAGEKEY, JSON.stringify(items))
        app.emit(CHANGE.STORAGE, items)
    }
}