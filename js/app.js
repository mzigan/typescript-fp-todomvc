(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./storage");
const header_1 = require("./header");
const main_1 = require("./main");
const footer_1 = require("./footer");
const utl_1 = require("./utl");
function App() {
    const handlerMap = {};
    //---
    utl_1.on(document, "DOMContentLoaded" /* CONTENT_LOADED */, () => {
        header_1.Header();
        main_1.Main();
        footer_1.Footer();
        storage_1.Storage();
    });
    //---
    return {
        link: (action, handler) => {
            const h = handlerMap[action];
            //---
            if (h)
                h.push(handler);
            else {
                let a = [];
                a.push(handler);
                handlerMap[action] = a;
            }
        },
        emit: (action, params) => {
            const h = handlerMap[action];
            if (!h)
                return;
            //---
            h.forEach(handler => { handler(params); });
        }
    };
}
exports.App = App;
//---
exports.app = App();

},{"./footer":3,"./header":4,"./main":5,"./storage":6,"./utl":8}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SELECTOR {
}
SELECTOR.HREF_ALL = `${"a[href=\"" /* P1 */}${"#/" /* ALL */}${"\"]" /* P2 */}`;
SELECTOR.HREF_ACTIVE = `${"a[href=\"" /* P1 */}${"#/active" /* ACTIVE */}${"\"]" /* P2 */}`;
SELECTOR.HREF_COMPLETED = `${"a[href=\"" /* P1 */}${"#/completed" /* COMPLETED */}${"\"]" /* P2 */}`;
exports.SELECTOR = SELECTOR;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
const const_1 = require("./const");
const app_1 = require("./app");
function Footer() {
    const element = utl_1.$(utl_1.dot("footer" /* FOOTER */)).get();
    const todoCount = utl_1.$(utl_1.dot("todo-count" /* TODOCOUNT */)).get();
    const clearCompleted = utl_1.$(utl_1.dot("clear-completed" /* CLEARCOMPLETED */)).get();
    const allFilter = utl_1.$(const_1.SELECTOR.HREF_ALL).get();
    const activeFilter = utl_1.$(const_1.SELECTOR.HREF_ACTIVE).get();
    const completedFilter = utl_1.$(const_1.SELECTOR.HREF_COMPLETED).get();
    //---
    utl_1.on(clearCompleted, "click" /* CLICK */, () => app_1.app.emit("clear-completed" /* CLEAR_COMPLETED */));
    //---
    app_1.app.link("change" /* CHANGE */, (items) => {
        let activeCount = 0;
        let allCount = 0;
        //---
        for (const p in items) {
            if (!items[p].check)
                activeCount++;
            allCount++;
        }
        // todo count
        if (activeCount == 1)
            todoCount.innerHTML = `${"<strong>" /* S1 */}${activeCount}${"</strong> item left" /* S2 */}`;
        else
            todoCount.innerHTML = `${"<strong>" /* S1 */}${activeCount}${"</strong> items left" /* S3 */}`;
        // filter
        utl_1.$("a" /* A */).removeClass("selected" /* SELECTED */);
        switch (window.location.hash) {
            case "#/active" /* ACTIVE */:
                utl_1.$(activeFilter).addClass("selected" /* SELECTED */);
                break;
            case "#/completed" /* COMPLETED */:
                utl_1.$(completedFilter).addClass("selected" /* SELECTED */);
                break;
            default:
                utl_1.$(allFilter).addClass("selected" /* SELECTED */);
                break;
        }
        // clear completed
        if (allCount - activeCount > 0)
            utl_1.$(clearCompleted).removeClass("hidden" /* HIDDEN */);
        else
            utl_1.$(clearCompleted).addClass("hidden" /* HIDDEN */);
        // footer
        if (allCount > 0)
            utl_1.$(element).removeClass("hidden" /* HIDDEN */);
        else
            utl_1.$(element).addClass("hidden" /* HIDDEN */);
    });
}
exports.Footer = Footer;

},{"./app":1,"./const":2,"./utl":8}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
const app_1 = require("./app");
function Header() {
    const newTodo = utl_1.$(utl_1.dot("new-todo" /* NEWTODO */)).get();
    //---
    utl_1.on(newTodo, "focusout" /* FOCUSOUT */, addTodo);
    //---
    utl_1.on(newTodo, "keyup" /* KEY_UP */, (e) => {
        if (e.keyCode != 13 /* ENTER */)
            return;
        addTodo();
    });
    //---
    function addTodo() {
        const val = newTodo.value.trim();
        if (val)
            app_1.app.emit("update" /* UPDATE */, { check: false, title: val, id: utl_1.uuid() });
        newTodo.value = "" /* EMPTY */;
    }
}
exports.Header = Header;

},{"./app":1,"./utl":8}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
const todolist_1 = require("./todolist");
const app_1 = require("./app");
function Main() {
    const element = utl_1.$(utl_1.dot("main" /* MAIN */)).get();
    const toggleCheckbox = utl_1.$(utl_1.dot("toggle-all" /* TOGGLEALL */)).get();
    //---
    todolist_1.Todolist();
    //---
    utl_1.on(toggleCheckbox, "change" /* CHANGE */, () => app_1.app.emit("toggle-all" /* TOGGLE_ALL */));
    app_1.app.link("change" /* CHANGE */, (items) => {
        let activeCount = 0;
        let allCount = 0;
        //---
        for (const p in items) {
            if (!items[p].check)
                activeCount++;
            allCount++;
        }
        //---
        if (allCount > 0)
            utl_1.$(element).removeClass("hidden" /* HIDDEN */);
        else
            utl_1.$(element).addClass("hidden" /* HIDDEN */);
        toggleCheckbox.checked = allCount > 0 && activeCount == 0;
    });
}
exports.Main = Main;

},{"./app":1,"./todolist":7,"./utl":8}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
const app_1 = require("./app");
function Storage() {
    let items = {};
    //---
    const json = localStorage.getItem("todos_typescript5" /* STORAGEKEY */);
    if (json)
        items = JSON.parse(json);
    app_1.app.emit("change" /* CHANGE */, items);
    //---
    utl_1.on(window, "hashchange" /* HASHCHANGE */, () => app_1.app.emit("change" /* CHANGE */, items));
    //---
    app_1.app.link("update" /* UPDATE */, (e) => {
        items[e.id] = { check: e.check, title: e.title };
        save();
    });
    //---
    app_1.app.link("del" /* DEL */, (id) => {
        delete items[id];
        save();
    });
    //---
    app_1.app.link("toggle" /* TOGGLE */, (id) => {
        items[id].check = !items[id].check;
        save();
    });
    //---
    app_1.app.link("toggle-all" /* TOGGLE_ALL */, () => {
        let check = true;
        for (const p in items) {
            check = check && items[p].check;
        }
        for (const p in items) {
            items[p].check = !check;
        }
        save();
    });
    //---
    app_1.app.link("clear-completed" /* CLEAR_COMPLETED */, () => {
        for (const p in items) {
            if (items[p].check)
                delete items[p];
        }
        save();
    });
    //---
    function save() {
        localStorage.setItem("todos_typescript5" /* STORAGEKEY */, JSON.stringify(items));
        app_1.app.emit("change" /* CHANGE */, items);
    }
}
exports.Storage = Storage;

},{"./app":1,"./utl":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
const app_1 = require("./app");
function Todo(list, title, check, id) {
    let label;
    let editor;
    let toggle;
    const element = utl_1.Factory.li(id, list);
    element
        .appendChild(utl_1.Factory.div("view" /* VIEW */)
        .appendChild(toggle = utl_1.Factory.check("toggle" /* TOGGLE */, check)
        .on("change" /* CHANGE */, () => app_1.app.emit("toggle" /* TOGGLE */, id)))
        .appendChild(label = utl_1.Factory.label("" /* EMPTY */, title)
        .on("dblclick" /* DBL_CLICK */, () => {
        editor.value(label.textContent());
        element.addClass("editing" /* EDITING */);
        editor.focus();
    }))
        .appendChild(utl_1.Factory.button("destroy" /* DESTROY */)
        .on("click" /* CLICK */, () => app_1.app.emit("del" /* DEL */, id))))
        .appendChild(editor = utl_1.Factory.editor("edit" /* EDIT */)
        .on("focusout" /* FOCUSOUT */, updateTodo)
        .on("keyup" /* KEY_UP */, (e) => {
        if (e.keyCode == 27 /* ESC */) {
            element.removeClass("editing" /* EDITING */);
        }
        else if (e.keyCode == 13 /* ENTER */)
            updateTodo();
    }));
    //---
    function updateTodo() {
        if (editor.value().trim()) {
            label.textContent(editor.value().trim());
            element.removeClass("editing" /* EDITING */);
            app_1.app.emit("update" /* UPDATE */, { check: toggle.checked(), title: label.textContent(), id: id });
        }
    }
}
function Todolist() {
    const element = utl_1.$(utl_1.dot("todo-list" /* TODOLIST */)).get();
    //---
    app_1.app.link("change" /* CHANGE */, (items) => {
        element.innerHTML = "" /* EMPTY */;
        for (const p in items) {
            switch (window.location.hash) {
                case "#/active" /* ACTIVE */:
                    if (!items[p].check)
                        Todo(element, items[p].title, items[p].check, p);
                    break;
                case "#/completed" /* COMPLETED */:
                    if (items[p].check)
                        Todo(element, items[p].title, items[p].check, p);
                    break;
                default:
                    Todo(element, items[p].title, items[p].check, p);
            }
        }
    });
}
exports.Todolist = Todolist;

},{"./app":1,"./utl":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
function $(selector, scope = null) {
    let elements;
    (typeof selector == 'string') ? elements = (scope || document).querySelectorAll(selector) : elements = selector;
    //---
    return {
        get() {
            if (elements instanceof Element)
                return elements;
            if (elements.length == 0)
                return null;
            return elements[0];
        },
        getAll(index) {
            if (elements instanceof Element)
                return elements;
            if (elements.length == 0)
                return null;
            if (typeof index !== 'undefined')
                return elements[index];
            else
                return null;
        },
        do(func) {
            func(this);
            return this;
        },
        focus() {
            if (elements instanceof Element) {
                elements.focus();
                return this;
            }
            if (elements.length == 0) {
                return this;
            }
            elements[0].focus();
            return this;
        },
        appendChild(val) {
            let el = val.get();
            if (!el)
                return this;
            if (elements instanceof Element) {
                elements.appendChild(el);
                return this;
            }
            if (elements.length == 0)
                return this;
            for (const e of elements) {
                e.appendChild(el);
            }
            return this;
        },
        firstChild() {
            if (elements instanceof Element)
                return $(elements.firstChild);
            if (elements.length == 0)
                return null;
            return $(elements[0].firstChild);
        },
        parent() {
            if (elements instanceof Element)
                return $(elements.parentElement);
            if (elements.length == 0)
                return null;
            return $(elements[0].parentElement);
        },
        context() {
            if (elements instanceof Element)
                return elements.getContext('2d');
            if (elements.length == 0)
                return null;
            return elements[0].getContext('2d');
        },
        emit(event, params) {
            app_1.app.emit(event, { self: this, param: params });
            return this;
        },
        link(event, func) {
            app_1.app.link(event, func);
            return this;
        },
        on(event, func) {
            if (elements instanceof Element) {
                elements.addEventListener(event, func);
                return this;
            }
            if (elements.length == 0)
                return this;
            for (const e of elements) {
                e.addEventListener(event, func);
            }
            return this;
        },
        onw(event, func) {
            window.addEventListener(event, func);
            return this;
        },
        ond(event, func) {
            document.addEventListener(event, func);
            return this;
        },
        ofw(event, func) {
            window.removeEventListener(event, func);
            return this;
        },
        transform(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) { // необязательно использовать typeof val !== 'undefined', потмоу что переменная val объявлена 
                    if (val !== null) // https://stackoverflow.com/questions/16672743/javascript-null-check
                        el.style.transform = val;
                    return this;
                }
                else
                    return el.style.transform;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.style.transform = val;
                    }
                return this;
            }
            else
                return elements[0].style.transform;
        },
        value(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null)
                        el.value = val;
                    return this;
                }
                else
                    return el.value;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.value = val;
                    }
                return this;
            }
            else
                return elements[0].value;
        },
        textContent(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null)
                        el.textContent = val;
                    return this;
                }
                else
                    return el.textContent;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.textContent = val;
                    }
                return this;
            }
            else
                return elements[0].textContent;
        },
        checked(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null)
                        el.checked = val;
                    return this;
                }
                else
                    return el.checked;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.checked = val;
                    }
                return this;
            }
            else
                return elements[0].checked;
        },
        html(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null)
                        el.innerHTML = val;
                    return this;
                }
                else
                    return el.innerHTML;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.innerHTML = val;
                    }
                return this;
            }
            else
                return elements[0].innerHTML;
        },
        attr(name, val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null)
                        el.setAttribute(name, val);
                    return this;
                }
                else
                    return el.getAttribute(name);
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.setAttribute(name, val);
                    }
                return this;
            }
            else
                return elements[0].getAttribute(name);
        },
        right(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null)
                        el.style.right = val + "px" /* PX */;
                    return this;
                }
                else
                    return el.offsetLeft + el.offsetWidth;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.style.right = val + "px" /* PX */;
                    }
                return this;
            }
            else
                return elements[0].offsetLeft + elements[0].offsetWidth;
        },
        left(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null)
                        el.style.left = val + "px" /* PX */;
                    return this;
                }
                else
                    return el.offsetLeft;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.style.left = val + "px" /* PX */;
                    }
                return this;
            }
            else
                return elements[0].offsetLeft;
        },
        bottom(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null)
                        el.style.bottom = val + "px" /* PX */;
                    return this;
                }
                else
                    return el.offsetTop + el.offsetHeight;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.style.bottom = val + "px" /* PX */;
                    }
                return this;
            }
            else
                return elements[0].offsetTop + elements[0].offsetHeight;
        },
        top(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null)
                        el.style.top = val + "px" /* PX */;
                    return this;
                }
                else
                    return el.offsetTop;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        e.style.top = val + "px" /* PX */;
                    }
                return this;
            }
            else
                return elements[0].offsetTop;
        },
        height(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null) {
                        let df = 0;
                        if (el.offsetHeight)
                            df = el.offsetHeight - el.clientHeight;
                        el.style.height = (val - df) + "px" /* PX */;
                    }
                    return this;
                }
                else {
                    if (el.offsetHeight)
                        return el.offsetHeight;
                    else if (el.style.height)
                        return parseInt(el.style.height);
                    else
                        return 0;
                }
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        const el = e;
                        let df = 0;
                        if (el.offsetHeight)
                            df = el.offsetHeight - el.clientHeight;
                        el.style.height = (val - df) + "px" /* PX */;
                    }
                return this;
            }
            else {
                const el = elements[0];
                if (el.offsetHeight)
                    return el.offsetHeight;
                else if (el.style.height)
                    return parseInt(el.style.height);
                else
                    return 0;
            }
        },
        width(val) {
            if (elements instanceof Element) {
                const el = elements;
                if (val !== undefined) {
                    if (val !== null) {
                        let df = 0;
                        if (el.offsetWidth)
                            df = el.offsetWidth - el.clientWidth;
                        el.style.width = (val - df) + "px" /* PX */;
                    }
                    return this;
                }
                else {
                    if (el.offsetWidth)
                        return el.offsetWidth;
                    else if (el.style.width)
                        return parseInt(el.style.width);
                    else
                        return 0;
                }
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements) {
                        const el = e;
                        let df = 0;
                        if (el.offsetWidth)
                            df = el.offsetWidth - el.clientWidth;
                        el.style.width = (val - df) + "px" /* PX */;
                    }
                return this;
            }
            else {
                const el = elements[0];
                if (el.offsetWidth)
                    return el.offsetWidth;
                else if (el.style.width)
                    return parseInt(el.style.width);
                else
                    return 0;
            }
        },
        htmlHeight(val) {
            if (elements instanceof Element) {
                if (val !== undefined) {
                    if (val !== null)
                        elements.height = val;
                    return this;
                }
                else
                    return elements.height;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements)
                        e.height = val;
                return this;
            }
            else
                return elements[0].height;
        },
        htmlWidth(val) {
            if (elements instanceof Element) {
                if (val !== undefined) {
                    if (val !== null)
                        elements.width = val;
                    return this;
                }
                else
                    return elements.width;
            }
            if (elements.length == 0)
                return this;
            if (val !== undefined) {
                if (val !== null)
                    for (const e of elements)
                        e.width = val;
                return this;
            }
            else
                return elements[0].width;
        },
        hasClass(cls) {
            if (elements instanceof Element)
                return hasClass(elements, cls);
            if (elements.length == 0)
                return false;
            let res = true;
            for (const e of elements) {
                res = hasClass(e, cls) && res;
            }
            return res;
        },
        removeClass(cls) {
            if (elements instanceof Element) {
                removeClass(elements, cls);
                return this;
            }
            if (elements.length == 0)
                return this;
            for (const e of elements) {
                removeClass(e, cls);
            }
            return this;
        },
        addClass(cls) {
            if (elements instanceof Element) {
                addClass(elements, cls);
                return this;
            }
            if (elements.length == 0)
                return this;
            for (const e of elements) {
                addClass(e, cls);
            }
            return this;
        },
        toggleClass(cls) {
            if (elements instanceof Element) {
                toggleClass(elements, cls);
                return this;
            }
            if (elements.length == 0)
                return this;
            for (const e of elements) {
                toggleClass(e, cls);
            }
            return this;
        },
        closest(selector) {
            if (elements instanceof Element) {
                let e = elements;
                while (e) {
                    if (e.matches && e.matches(selector))
                        return $(e);
                    e = e.parentNode;
                }
                return null;
            }
            //---
            if (elements.length == 0)
                return null;
            //---    
            let e = elements[0];
            while (e) {
                if (e.matches && e.matches(selector))
                    return $(e);
                e = e.parentNode;
            }
            return null;
        },
    };
}
exports.$ = $;
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
function on(elem, event, func, capture = false) {
    elem.addEventListener(event, func, capture);
}
exports.on = on;
function delegate(target, selector, event, func, capture = false) {
    const dispatchEvent = (e) => {
        const potentialElements = target.querySelectorAll(selector);
        for (const p of potentialElements) { // для NodeList  for of должен работать https://developer.mozilla.org/ru/docs/Web/API/NodeList
            if (p === e.target) {
                func.call(e.target, e);
                break;
            }
        }
    };
    target.addEventListener(event, dispatchEvent, capture);
}
exports.delegate = delegate;
function hasClass(elem, cls) {
    if (!elem)
        return false;
    let res = false;
    const arr = cls.split(" " /* SPACE */);
    for (const p of arr) {
        res = elem.classList ? elem.classList.contains(p) : new RegExp('\\b' + p + '\\b').test(elem.className);
        if (!res)
            break;
    }
    return res;
}
function removeClass(elem, cls) {
    if (!elem)
        return;
    if (elem.classList) {
        const arr = cls.split(" " /* SPACE */);
        arr.forEach((item) => elem.classList.remove(item));
    }
    else
        elem.className = elem.className.replace(new RegExp('\\b' + cls + '\\b', 'g'), "" /* EMPTY */);
}
function addClass(elem, cls) {
    if (!elem)
        return;
    if (elem.classList) {
        const arr = cls.split(" " /* SPACE */);
        arr.forEach((item) => elem.classList.add(item));
    }
    else if (!$(elem).hasClass(cls))
        elem.className += ' ' + cls;
}
function toggleClass(elem, cls) {
    const e = $(elem).getAll();
    if (e)
        $(e).hasClass(cls) ? $(e).removeClass(cls) : $(e).addClass(cls);
}
class Factory {
    static createElement(tag, parent, cls = "" /* EMPTY */) {
        const r = document.createElement(tag);
        if (cls)
            r.className = cls;
        if (parent)
            parent.appendChild(r);
        return r;
    }
    //---
    static canvas(cls, parent = null) {
        return $(Factory.createElement("canvas" /* CANVAS */, parent, cls)); // as HTMLCanvasElement
    }
    static div(cls, parent = null) {
        return $(Factory.createElement("div" /* DIV */, parent, cls));
    }
    static span(cls, parent = null) {
        return $(Factory.createElement("span" /* SPAN */, parent, cls));
    }
    static button(cls, parent = null) {
        return $(Factory.createElement("button" /* BUTTON */, parent, cls));
    }
    static editor(cls, parent = null) {
        return $(Factory.createElement("input" /* INPUT */, parent, cls)); // as HTMLInputElement
    }
    static li(id, parent = null) {
        const r = Factory.createElement("li" /* LI */, parent);
        r.dataset.id = id;
        return $(r);
    }
    static check(cls, checked = false, parent = null) {
        const r = Factory.createElement("input" /* INPUT */, parent, cls);
        r.setAttribute("type" /* TYPE */, "checkbox" /* CHECKBOX */);
        r.checked = checked;
        return $(r); // as HTMLInputElement
    }
    static label(cls, text = "" /* EMPTY */, parent = null) {
        const r = Factory.createElement("label" /* LABEL */, parent, cls);
        if (text)
            r.textContent = text;
        return $(r);
    }
}
exports.Factory = Factory;
function dot(cls) {
    return "." /* DOT */ + cls;
}
exports.dot = dot;
// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuid() {
    return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, c => {
        const n = parseInt(c);
        return (n ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> n / 4).toString(16);
    });
}
exports.uuid = uuid;
function getId(e) {
    let res;
    if (e instanceof HTMLElement && e.parentNode) {
        res = e.parentNode.dataset.id;
        if (!res && e.parentNode.parentNode)
            res = e.parentNode.parentNode.dataset.id;
    }
    return res;
}
exports.getId = getId;

},{"./app":1}]},{},[1]);
