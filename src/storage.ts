import { iController, iItem } from './interface'
import { on, getId } from './utl'
import { EVENT, CHANGE, STORAGE, KEY, STR, CONST } from './const'


export function Storage(app: iController) {
    let items: iItem = {}
    //---
    on(document, EVENT.CONTENT_LOADED, onLoad)
    app.on(STORAGE.UPDATE, updateTodo)
    app.on(STORAGE.DEL, delTodo)
    app.on(STORAGE.TOGGLE, toggleTodo)
    app.on(STORAGE.TOGGLE_ALL, toggleAll)
    //---
    function updateTodo(e: { check: boolean, title: string, id: string }) {
        items[e.id] = { check: e.check, title: e.title }
        save()
    }
    //---
    function delTodo(id: string) {
        delete items[id]
        save()
    }
    //---
    function toggleTodo(id: string) {
        items[id].check = !items[id].check
        save()
    }
    //---
    function toggleAll() {
        let check = true
        for (const p in items) { check = check && items[p].check }
        for (const p in items) { items[p].check = !check }
        save()
    }
    //---
    function onLoad() {
        const json = localStorage.getItem(CONST.STORAGEKEY)
        if (json)
            items = JSON.parse(json)
        app.emit(CHANGE.STORAGE, items)
    }
    //---
    function save() {
        localStorage.setItem(CONST.STORAGEKEY, JSON.stringify(items))
        app.emit(CHANGE.STORAGE, items)
    }
}