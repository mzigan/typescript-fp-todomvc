import { iController } from './interface'
import { Storage } from './storage'
import { Header } from './header'
import { Main } from './main'
import { Footer } from './footer'

export function Controller(): void {
    const handlerMap = new Map<string, Function[]>()
    //---
    const ictrl = {
        emit,
        on,
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
    function emit(action: string, params: any) {
        const h = handlerMap.get(action)
        if (!h) return
        //---
        h.forEach(handler => { handler(params) })
    }
}
