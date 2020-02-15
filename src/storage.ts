import { iApp, iItem } from './interface'
import { on } from './utl'
import { EVENT, ITEMS, CONST } from './const'
import { app } from './app'

export function Storage() {
    let items: iItem = {}
    //---
    const json = localStorage.getItem(CONST.STORAGEKEY)
    if (json)
        items = JSON.parse(json)
    app.emit(ITEMS.CHANGE, items)
    //---
    on(window, EVENT.HASHCHANGE, () => app.emit(ITEMS.CHANGE, items))
    //---
    app.link(ITEMS.UPDATE, (e: { check: boolean, title: string, id: string }) => {
        items[e.id] = { check: e.check, title: e.title }
        save()
    })
    //---
    app.link(ITEMS.DEL, (id: string) => {
        delete items[id]
        save()
    })
    //---
    app.link(ITEMS.TOGGLE, (id: string) => {
        items[id].check = !items[id].check
        save()
    })
    //---
    app.link(ITEMS.TOGGLE_ALL, () => {
        let check = true
        for (const p in items) { check = check && items[p].check }
        for (const p in items) { items[p].check = !check }
        save()
    })
    //---
    app.link(ITEMS.CLEAR_COMPLETED, () => {
        for (const p in items) {
            if (items[p].check)
                delete items[p]
        }
        save()
    })
    //---
    function save() {
        localStorage.setItem(CONST.STORAGEKEY, JSON.stringify(items))
        app.emit(ITEMS.CHANGE, items)
    }
}