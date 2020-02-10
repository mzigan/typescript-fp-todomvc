import { TAG, ATTR, STR } from './const'

export function $(selector: Element | string, scope: Element | null = null) {
    let elements: NodeListOf<Element> | Element
    (typeof selector == 'string') ? elements = (scope || document).querySelectorAll(selector) : elements = selector
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
            if (index)
                return elements[index]
            else
                return null
        },
        hasClass(cls: string): boolean {
            if (elements instanceof Element)
                return hasClass(elements, cls)
            if (elements.length == 0)
                return false
            let res = true
            elements.forEach(e => { res = hasClass(e, cls) && res })
            return res
        },
        removeClass(cls: string) {
            if (elements instanceof Element) {
                removeClass(elements, cls)
                return this
            }
            if (elements.length == 0)
                return this
            elements.forEach(e => { removeClass(e, cls) })
            return this
        },
        addClass(cls: string) {
            if (elements instanceof Element) {
                addClass(elements, cls)
                return this
            }
            if (elements.length == 0)
                return this
            elements.forEach(e => { addClass(e, cls) })
            return this
        },
        toggleClass(cls: string) {
            if (elements instanceof Element) {
                toggleClass(elements, cls)
                return this
            }
            if (elements.length == 0)
                return this
            elements.forEach(e => { toggleClass(e, cls) })
            return this
        },
        closest(selector: string): Element | null {
            if (elements instanceof Element) {
                let e: any = elements
                while (e) {
                    if (e.matches && e.matches(selector))
                        return e
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
                    return e
                e = e.parentNode
            }
            return null
        },
    }
}

export function on(elem: Element | Window | Document, event: string, func: EventListener, capture: boolean = false) {
    elem.addEventListener(event, func, capture)
}

export function delegate(target: Element | Document, selector: string, event: string, func: EventListener, capture: boolean = false) {
    const dispatchEvent = (e: Event): void => {
        const potentialElements = target.querySelectorAll(selector)
        for (let i = 0; i < potentialElements.length; i++) {
            if (potentialElements[i] === e.target) {
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
    for (let i = 0; i < arr.length; i++) {
        res = elem.classList ? elem.classList.contains(arr[i]) : new RegExp('\\b' + arr[i] + '\\b').test(elem.className)
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
    static createElement(tag: TAG, parent: HTMLElement, cls: string = STR.EMPTY): HTMLElement {
        const r = document.createElement(tag)
        if (cls)
            r.className = cls
        if (parent)
            parent.appendChild(r)
        return r
    }
    //---
    static div(parent: HTMLElement, cls: string) {
        return Factory.createElement(TAG.DIV, parent, cls)
    }

    static button(parent: HTMLElement, cls: string) {
        return Factory.createElement(TAG.BUTTON, parent, cls)
    }

    static editor(parent: HTMLElement, cls: string) {
        return Factory.createElement(TAG.INPUT, parent, cls) as HTMLInputElement
    }

    static li(parent: HTMLElement, id: string) {
        const r = Factory.createElement(TAG.LI, parent)
        r.dataset.id = id
        return r
    }

    static check(parent: HTMLElement, cls: string, checked: boolean = false) {
        const r = Factory.createElement(TAG.INPUT, parent, cls) as HTMLInputElement
        r.setAttribute(ATTR.TYPE, ATTR.CHECKBOX)
        r.checked = checked
        return r as HTMLInputElement
    }

    static label(parent: HTMLElement, cls: string, text: string = STR.EMPTY) {
        const r = Factory.createElement(TAG.LABEL, parent, cls)
        if (text) r.textContent = text
        return r
    }
}

export function dot(cls: string): string {
    return STR.DOT + cls
}

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
const s = new Array<string>()
for (let i = 0; i < 256; i++) { s[i] = (i < 16 ? '0' : '') + (i).toString(16) }
export function uuid() {
    let d0 = Math.random() * 0xffffffff | 0
    let d1 = Math.random() * 0xffffffff | 0
    let d2 = Math.random() * 0xffffffff | 0
    let d3 = Math.random() * 0xffffffff | 0
    return s[d0 & 0xff] + s[d0 >> 8 & 0xff] + s[d0 >> 16 & 0xff] + s[d0 >> 24 & 0xff] + '-' +
        s[d1 & 0xff] + s[d1 >> 8 & 0xff] + '-' +
        s[d1 >> 16 & 0x0f | 0x40] + s[d1 >> 24 & 0xff] + '-' +
        s[d2 & 0x3f | 0x80] + s[d2 >> 8 & 0xff] + '-' +
        s[d2 >> 16 & 0xff] + s[d2 >> 24 & 0xff] + s[d3 & 0xff] + s[d3 >> 8 & 0xff] + s[d3 >> 16 & 0xff] + s[d3 >> 24 & 0xff]
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
