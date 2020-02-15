import { TAG, ATTR, STR } from './const'
import { app } from './app'

export interface i$ {
    get(): Element | null,
    getAll(index?: number): Element | null,
    appendChild(val: i$): i$,
    firstChild(): i$ | null,
    parent(): i$ | null,
    context(): CanvasRenderingContext2D | null,
    emit(event: string, params?: any): i$,
    link(event: string, func: any): i$,
    on(event: string, func: any): i$,
    onw(event: string, func: any): i$,
    ond(event: string, func: any): i$,
    ofw(event: string, func: any): i$,
    do(func: any): i$,
    focus(): i$,
    transform(val?: string): any,
    html(val?: string): any,
    value(val?: string): any,
    textContent(val?: string): any,
    checked(val?: boolean): any,
    attr(name: string, val?: string): any,
    left(val?: number): any,
    top(val?: number): any,
    right(val?: number): any,
    bottom(val?: number): any,
    height(val?: number): any,
    width(val?: number): any,
    htmlHeight(val?: number): any,
    htmlWidth(val?: number): any,
    hasClass(cls: string): boolean,
    removeClass(cls: string): i$,
    addClass(cls: string): i$,
    toggleClass(cls: string): i$,
    closest(selector: string): i$ | null,
}

export function $(selector: Element | string | EventTarget, scope: Element | null = null): i$ {
    let elements: NodeListOf<Element> | Element
    (typeof selector == 'string') ? elements = (scope || document).querySelectorAll(selector) : elements = selector as Element
    //---
    return {
        get(): Element | null {
            if (elements instanceof Element)
                return elements
            if (elements.length == 0)
                return null
            return elements[0]
        },
        getAll(index?: number): Element | null {
            if (elements instanceof Element)
                return elements
            if (elements.length == 0)
                return null
            if (typeof index !== 'undefined')
                return elements[index]
            else
                return null
        },
        do(func: any) {
            func(this)
            return this
        },
        focus(): i$ {
            if (elements instanceof Element) {
                (elements as HTMLElement).focus()
                return this
            }
            if (elements.length == 0) {
                return this
            }
            (elements[0] as HTMLElement).focus()
            return this
        },
        appendChild(val: i$): i$ {
            let el = val.get()
            if (!el) return this
            if (elements instanceof Element) {
                elements.appendChild(el)
                return this
            }
            if (elements.length == 0)
                return this
            for (const e of elements) { e.appendChild(el) }
            return this
        },
        firstChild(): i$ | null {
            if (elements instanceof Element)
                return $(elements.firstChild as Element)
            if (elements.length == 0)
                return null
            return $(elements[0].firstChild as Element)
        },
        parent(): i$ | null {
            if (elements instanceof Element)
                return $(elements.parentElement as Element)
            if (elements.length == 0)
                return null
            return $(elements[0].parentElement as Element)
        },
        context(): CanvasRenderingContext2D | null {
            if (elements instanceof Element)
                return (elements as HTMLCanvasElement).getContext('2d')
            if (elements.length == 0)
                return null
            return (elements[0] as HTMLCanvasElement).getContext('2d')
        },
        emit(event: string, params?: any) {
            app.emit(event, { self: this, param: params })
            return this
        },
        link(event: string, func: any) {
            app.link(event, func)
            return this
        },
        on(this: any, event: string, func: any) {
            if (elements instanceof Element) {
                (elements as HTMLElement).addEventListener(event, func)
                return this
            }
            if (elements.length == 0)
                return this
            for (const e of elements) { (e as HTMLElement).addEventListener(event, func) }
            return this
        },
        onw(event: string, func: any) {
            window.addEventListener(event, func)
            return this
        },
        ond(event: string, func: any) {
            document.addEventListener(event, func)
            return this
        },
        ofw(event: string, func: any) {
            window.removeEventListener(event, func)
            return this
        },
        transform(val?: string): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) { // необязательно использовать typeof val !== 'undefined', потмоу что переменная val объявлена 
                    if (val !== null)    // https://stackoverflow.com/questions/16672743/javascript-null-check
                        el.style.transform = val
                    return this
                } else
                    return el.style.transform
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLElement).style.transform = val }
                return this
            } else
                return (elements[0] as HTMLElement).style.transform
        },
        value(val?: string): any {
            if (elements instanceof Element) {
                const el = elements as HTMLInputElement
                if (val !== undefined) {
                    if (val !== null)
                        el.value = val
                    return this
                } else
                    return el.value
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLInputElement).value = val }
                return this
            } else
                return (elements[0] as HTMLInputElement).value
        },
        textContent(val?: string): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) {
                    if (val !== null)
                        el.textContent = val
                    return this
                } else
                    return el.textContent
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLElement).textContent = val }
                return this
            } else
                return (elements[0] as HTMLElement).textContent
        },
        checked(val?: boolean): any {
            if (elements instanceof Element) {
                const el = elements as HTMLInputElement
                if (val !== undefined) {
                    if (val !== null)
                        el.checked = val
                    return this
                } else
                    return el.checked
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLInputElement).checked = val }
                return this
            } else
                return (elements[0] as HTMLInputElement).checked
        },
        html(val?: string): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) {
                    if (val !== null)
                        el.innerHTML = val
                    return this
                } else
                    return el.innerHTML
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLElement).innerHTML = val }
                return this
            } else
                return (elements[0] as HTMLElement).innerHTML
        },
        attr(name: string, val?: string): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) {
                    if (val !== null)
                        el.setAttribute(name, val)
                    return this
                } else
                    return el.getAttribute(name)
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLElement).setAttribute(name, val) }
                return this
            } else
                return (elements[0] as HTMLElement).getAttribute(name)
        },
        right(val?: number): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) {
                    if (val !== null)
                        el.style.right = val + STR.PX
                    return this
                } else
                    return el.offsetLeft + el.offsetWidth
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLElement).style.right = val + STR.PX }
                return this
            } else
                return (elements[0] as HTMLElement).offsetLeft + (elements[0] as HTMLElement).offsetWidth
        },
        left(val?: number): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) {
                    if (val !== null)
                        el.style.left = val + STR.PX
                    return this
                } else
                    return el.offsetLeft
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLElement).style.left = val + STR.PX }
                return this
            } else
                return (elements[0] as HTMLElement).offsetLeft
        },
        bottom(val?: number): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) {
                    if (val !== null)
                        el.style.bottom = val + STR.PX
                    return this
                } else
                    return el.offsetTop + el.offsetHeight
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLElement).style.bottom = val + STR.PX }
                return this
            } else
                return (elements[0] as HTMLElement).offsetTop + (elements[0] as HTMLElement).offsetHeight
        },
        top(val?: number): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) {
                    if (val !== null)
                        el.style.top = val + STR.PX
                    return this
                } else
                    return el.offsetTop
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) { (e as HTMLElement).style.top = val + STR.PX }
                return this
            } else
                return (elements[0] as HTMLElement).offsetTop
        },
        height(val?: number): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) {
                    if (val !== null) {
                        let df = 0
                        if (el.offsetHeight)
                            df = el.offsetHeight - el.clientHeight
                        el.style.height = (val - df) + STR.PX
                    }
                    return this
                } else {
                    if (el.offsetHeight)
                        return el.offsetHeight
                    else if (el.style.height)
                        return parseInt(el.style.height)
                    else
                        return 0
                }
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        const el = e as HTMLElement
                        let df = 0
                        if (el.offsetHeight)
                            df = el.offsetHeight - el.clientHeight
                        el.style.height = (val - df) + STR.PX
                    }
                return this
            } else {
                const el = (elements[0] as HTMLElement)
                if (el.offsetHeight)
                    return el.offsetHeight
                else if (el.style.height)
                    return parseInt(el.style.height)
                else
                    return 0
            }
        },
        width(val?: number): any {
            if (elements instanceof Element) {
                const el = elements as HTMLElement
                if (val !== undefined) {
                    if (val !== null) {
                        let df = 0
                        if (el.offsetWidth)
                            df = el.offsetWidth - el.clientWidth
                        el.style.width = (val - df) + STR.PX
                    }
                    return this
                } else {
                    if (el.offsetWidth)
                        return el.offsetWidth
                    else if (el.style.width)
                        return parseInt(el.style.width)
                    else
                        return 0
                }
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        const el = e as HTMLElement
                        let df = 0
                        if (el.offsetWidth)
                            df = el.offsetWidth - el.clientWidth
                        el.style.width = (val - df) + STR.PX
                    }
                return this
            } else {
                const el = (elements[0] as HTMLElement)
                if (el.offsetWidth)
                    return el.offsetWidth
                else if (el.style.width)
                    return parseInt(el.style.width)
                else
                    return 0
            }
        },
        htmlHeight(val?: number): any {
            if (elements instanceof Element) {
                if (val !== undefined) {
                    if (val !== null)
                        (<any>elements).height = val
                    return this
                } else
                    return (<any>elements).height
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements)
                        (<any>e).height = val
                return this
            } else
                return (<any>elements[0]).height
        },
        htmlWidth(val?: number): any {
            if (elements instanceof Element) {
                if (val !== undefined) {
                    if (val !== null)
                        (<any>elements).width = val
                    return this
                } else
                    return (<any>elements).width
            }
            if (elements.length == 0)
                return this
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements)
                        (<any>e).width = val
                return this
            } else
                return (<any>elements[0]).width
        },
        hasClass(cls: string): boolean {
            if (elements instanceof Element)
                return hasClass(elements, cls)
            if (elements.length == 0)
                return false
            let res = true
            for (const e of elements) { res = hasClass(e, cls) && res }
            return res
        },
        removeClass(cls: string) {
            if (elements instanceof Element) {
                removeClass(elements, cls)
                return this
            }
            if (elements.length == 0)
                return this
            for (const e of elements) { removeClass(e, cls) }
            return this
        },
        addClass(cls: string) {
            if (elements instanceof Element) {
                addClass(elements, cls)
                return this
            }
            if (elements.length == 0)
                return this
            for (const e of elements) { addClass(e, cls) }
            return this
        },
        toggleClass(cls: string) {
            if (elements instanceof Element) {
                toggleClass(elements, cls)
                return this
            }
            if (elements.length == 0)
                return this
            for (const e of elements) { toggleClass(e, cls) }
            return this
        },
        closest(selector: string): i$ | null {
            if (elements instanceof Element) {
                let e: any = elements
                while (e) {
                    if (e.matches && e.matches(selector))
                        return $(e)
                    e = e.parentNode
                }
                return null
            }
            //---
            if (elements.length == 0)
                return null
            //---    
            let e: any = elements[0]
            while (e) {
                if (e.matches && e.matches(selector))
                    return $(e)
                e = e.parentNode
            }
            return null
        },
    }
}


// export function $(selector: Element | string, scope: Element | null = null) {
//     let elements: NodeListOf<Element> | Element
//     (typeof selector == 'string') ? elements = (scope || document).querySelectorAll(selector) : elements = selector as Element
//     let element: Element
//     if (elements instanceof Element)
//         element = elements
//     else
//         element = elements[0]
//     //---
//     return {
//         get(): Element {
//             return element
//         },
//         appendChild(val: i$): i$ {
//             element.appendChild(val.get())
//             return this
//         },
//         firstChild(): i$ | null {
//             if(element.firstChild)
//                 return $(element.firstChild as Element)
//             else
//                 return null    
//         },
//         parent(): i$ | null {
//             if(element.parentElement)
//                 return $(element.parentElement as Element)
//             else   
//                 return null
//         },
//         context(): CanvasRenderingContext2D | null {
//             return (element as HTMLCanvasElement).getContext('2d')
//         },
//         emit(event: string, params?: any) {
//             app.emit(event, { self: this, param: params })
//             return this
//         },
//         link(event: string, func: any) {
//             app.link(event, func)
//             return this
//         },
//         on(this: any, event: string, func: any) {
//             (element as HTMLElement).addEventListener(event, func)
//             return this
//         },
//         onw(event: string, func: any) {
//             window.addEventListener(event, func)
//             return this
//         },
//         ond(event: string, func: any) {
//             document.addEventListener(event, func)
//             return this
//         },
//         ofw(event: string, func: any) {
//             window.removeEventListener(event, func)
//             return this
//         },
//         do(func: any){
//             func()
//             return this
//         },
//         transform(val?: string): any {
//             const el = element as HTMLElement
//             if (val !== undefined) { // необязательно использовать typeof val !== 'undefined', потмоу что переменная val объявлена 
//                 el.style.transform = val      // https://stackoverflow.com/questions/16672743/javascript-null-check
//                 return this
//             } else
//                 return el.style.transform
//         },
//         html(val?: string): any {
//             const el = element as HTMLElement
//             if (val !== undefined) {
//                 el.innerHTML = val
//                 return this
//             } else
//                 return el.innerHTML
//         },
//         attr(name: string, val?: string): any {
//             const el = element as HTMLElement
//             if (val !== undefined) {
//                 el.setAttribute(name, val)
//                 return this
//             } else
//                 return el.getAttribute(name)
//         },
//         right(val?: number): any {
//             const el = element as HTMLElement
//             if (val !== undefined) {
//                 if (val !== null)
//                     el.style.right = val + STR.PX
//                 return this
//             } else
//                 return el.offsetLeft + el.offsetWidth
//         },
//         left(val?: number): any {
//             const el = element as HTMLElement
//             if (val !== undefined) {
//                 if (val !== null)
//                     el.style.left = val + STR.PX
//                 return this
//             } else
//                 return el.offsetLeft
//         },
//         bottom(val?: number): any {
//             const el = element as HTMLElement
//             if (val !== undefined) {
//                 if (val !== null)
//                     el.style.bottom = val + STR.PX
//                 return this
//             } else
//                 return el.offsetTop + el.offsetHeight
//         },
//         top(val?: number): any {
//             const el = element as HTMLElement
//             if (val !== undefined) {
//                 if (val !== null)
//                     el.style.top = val + STR.PX
//                 return this
//             } else
//                 return el.offsetTop
//         },
//         height(val?: number): any {
//             const el = element as HTMLElement
//             if (val !== undefined) {
//                 let df = 0
//                 if (el.offsetHeight)
//                     df = el.offsetHeight - el.clientHeight
//                 el.style.height = (val - df) + STR.PX
//                 return this
//             } else {
//                 if (el.offsetHeight)
//                     return el.offsetHeight
//                 else if (el.style.height)
//                     return parseInt(el.style.height)
//                 else
//                     return 0
//             }
//         },
//         width(val?: number): any {
//             const el = element as HTMLElement
//             if (val !== undefined) {
//                 let df = 0
//                 if (el.offsetWidth)
//                     df = el.offsetWidth - el.clientWidth
//                 el.style.width = (val - df) + STR.PX
//                 return this
//             } else {
//                 if (el.offsetWidth)
//                     return el.offsetWidth
//                 else if (el.style.width)
//                     return parseInt(el.style.width)
//                 else
//                     return 0
//             }
//         },
//         htmlHeight(val?: number): any {
//             if (val !== undefined) {
//                 (<any>element).height = val
//                 return this
//             } else
//                 return (<any>element).height
//         },
//         htmlWidth(val?: number): any {
//             if (val !== undefined) {
//                 (<any>element).width = val
//                 return this
//             } else
//                 return (<any>element).width
//         },
//         hasClass(cls: string): boolean {
//             return hasClass(element, cls)
//         },
//         removeClass(cls: string) {
//             removeClass(element, cls)
//             return this
//         },
//         addClass(cls: string) {
//             addClass(element, cls)
//             return this
//         },
//         toggleClass(cls: string) {
//             toggleClass(element, cls)
//             return this
//         },
//         closest(selector: string): i$ | null {
//             let e: any = element
//             while (e) {
//                 if (e.matches && e.matches(selector))
//                     return $(e)
//                 e = e.parentNode
//             }
//             return null
//         },
//     }
// }

export function on(elem: Element | Window | Document, event: string, func: EventListener, capture: boolean = false) {
    elem.addEventListener(event, func, capture)
}

export function delegate(target: Element | Document, selector: string, event: string, func: EventListener, capture: boolean = false) {
    const dispatchEvent = (e: Event): void => {
        const potentialElements = target.querySelectorAll(selector)
        for (const p of potentialElements) { // для NodeList  for of должен работать https://developer.mozilla.org/ru/docs/Web/API/NodeList
            if (p === e.target) {
                func.call(e.target, e)
                break
            }
        }
    }
    target.addEventListener(event, dispatchEvent, capture)
}

function hasClass(elem: Element | null, cls: string): boolean {
    if (!elem)
        return false
    let res = false
    const arr = cls.split(STR.SPACE)
    for (const p of arr) {
        res = elem.classList ? elem.classList.contains(p) : new RegExp('\\b' + p + '\\b').test(elem.className)
        if (!res) break
    }
    return res
}

function removeClass(elem: Element, cls: string) {
    if (!elem)
        return
    if (elem.classList) {
        const arr = cls.split(STR.SPACE)
        arr.forEach((item) => elem.classList.remove(item))
    }
    else
        elem.className = elem.className.replace(new RegExp('\\b' + cls + '\\b', 'g'), STR.EMPTY)
}

function addClass(elem: Element, cls: string) {
    if (!elem)
        return
    if (elem.classList) {
        const arr = cls.split(STR.SPACE)
        arr.forEach((item) => elem.classList.add(item))
    }
    else if (!$(elem).hasClass(cls))
        elem.className += ' ' + cls
}

function toggleClass(elem: Element, cls: string) {
    const e = $(elem).getAll()
    if (e)
        $(e).hasClass(cls) ? $(e).removeClass(cls) : $(e).addClass(cls)
}

export class Factory {
    static createElement(tag: TAG, parent: HTMLElement | null, cls: string = STR.EMPTY): HTMLElement {
        const r = document.createElement(tag)
        if (cls)
            r.className = cls
        if (parent)
            parent.appendChild(r)
        return r
    }
    //---
    static canvas(cls: string, parent: HTMLElement | null = null) {
        return $(Factory.createElement(TAG.CANVAS, parent, cls))// as HTMLCanvasElement
    }

    static div(cls: string, parent: HTMLElement | null = null) {
        return $(Factory.createElement(TAG.DIV, parent, cls))
    }

    static span(cls: string, parent: HTMLElement | null = null) {
        return $(Factory.createElement(TAG.SPAN, parent, cls))
    }

    static button(cls: string, parent: HTMLElement | null = null) {
        return $(Factory.createElement(TAG.BUTTON, parent, cls))
    }

    static editor(cls: string, parent: HTMLElement | null = null) {
        return $(Factory.createElement(TAG.INPUT, parent, cls))// as HTMLInputElement
    }

    static li(id: string, parent: HTMLElement | null = null) {
        const r = Factory.createElement(TAG.LI, parent)
        r.dataset.id = id
        return $(r)
    }

    static check(cls: string, checked: boolean = false, parent: HTMLElement | null = null) {
        const r = Factory.createElement(TAG.INPUT, parent, cls) as HTMLInputElement
        r.setAttribute(ATTR.TYPE, ATTR.CHECKBOX)
        r.checked = checked
        return $(r)// as HTMLInputElement
    }

    static label(cls: string, text: string = STR.EMPTY, parent: HTMLElement | null = null) {
        const r = Factory.createElement(TAG.LABEL, parent, cls)
        if (text) r.textContent = text
        return $(r)
    }
}

export function dot(cls: string): string {
    return STR.DOT + cls
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
export function uuid() {
    return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, c => {
        const n = parseInt(c)
        return (n ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> n / 4).toString(16)
    })
}

export function getId(e: EventTarget | HTMLElement | null): string | undefined {
    let res: string | undefined
    if (e instanceof HTMLElement && e.parentNode) {
        res = (e.parentNode as HTMLElement).dataset.id
        if (!res && e.parentNode.parentNode)
            res = (e.parentNode.parentNode as HTMLElement).dataset.id
    }
    return res
}
