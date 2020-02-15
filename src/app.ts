import { iApp } from './interface'
import { Storage } from './storage'
import { Header } from './header'
import { Main } from './main'
import { Footer } from './footer'
import { on } from './utl'
import { EVENT } from './const'

export function App(): iApp {
    const handlerMap: { [key: string]: Function[] } = {}
    //---
    on(document, EVENT.CONTENT_LOADED, () => {
        Header()
        Main()
        Footer()
        Storage()
    })
    //---
    return {
        link: (action: string, handler: Function) => {
            const h = handlerMap[action]
            //---
            if (h)
                h.push(handler)
            else {
                let a = []
                a.push(handler)
                handlerMap[action] = a
            }
        },
        emit: (action: string, params: any) => {
            const h = handlerMap[action]
            if (!h) return
            //---
            h.forEach(handler => { handler(params) })
        }
    }
}
//---
export const app = App()