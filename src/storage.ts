import { iController, iItem } from './interface'
import { on } from './utl'
import { EVENT, CHANGE, STORAGE, CONST } from './const'

export function Storage(app: iController) {
    let items: iItem = {}
    //---
    on(window, EVENT.HASHCHANGE, () => app.emit(CHANGE.STORAGE, items))
    //---
    on(document, EVENT.CONTENT_LOADED, () => {
        const json = localStorage.getItem(CONST.STORAGEKEY)
        if (json)
            items = JSON.parse(json)
        app.emit(CHANGE.STORAGE, items)
    })
    //---
    app.on(STORAGE.UPDATE, (e: { check: boolean, title: string, id: string }) => {
        items[e.id] = { check: e.check, title: e.title }
        save()
    })
    //---
    app.on(STORAGE.DEL, (id: string) => {
        delete items[id]
        save()
    })
    //---
    app.on(STORAGE.TOGGLE, (id: string) => {
        items[id].check = !items[id].check
        save()
    })
    //---
    app.on(STORAGE.TOGGLE_ALL, () => {
        let check = true
        for (const p in items) { check = check && items[p].check }
        for (const p in items) { items[p].check = !check }
        save()
    })
    //---
    app.on(STORAGE.CLEAR_COMPLETED, () => {
        for (const p in items) {
            if (items[p].check)
                delete items[p]
        }
        save()
    })
    //---
    function save() {
        localStorage.setItem(CONST.STORAGEKEY, JSON.stringify(items))
        app.emit(CHANGE.STORAGE, items)
    }
}