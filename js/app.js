(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ctrl_1 = require("./ctrl");
ctrl_1.Controller();

},{"./ctrl":3}],2:[function(require,module,exports){
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
const storage_1 = require("./storage");
const header_1 = require("./header");
const main_1 = require("./main");
const footer_1 = require("./footer");
function Controller() {
    const handlerMap = {};
    //---
    const ictrl = {
        emit,
        on,
    };
    //---
    storage_1.Storage(ictrl);
    header_1.Header(ictrl);
    main_1.Main(ictrl);
    footer_1.Footer(ictrl);
    //---
    function on(action, handler) {
        const h = handlerMap[action];
        //---
        if (h)
            h.push(handler);
        else {
            let a = [];
            a.push(handler);
            handlerMap[action] = a;
        }
    }
    //---
    function emit(action, params) {
        const h = handlerMap[action];
        if (!h)
            return;
        //---
        h.forEach(handler => { handler(params); });
    }
}
exports.Controller = Controller;
// export function Controller(): void {
//     const handlerMap = new Map<string, Function[]>()
//     //---
//     const ictrl = {
//         emit,
//         on,
//     } as iController
//     //---
//     Storage(ictrl)
//     Header(ictrl)
//     Main(ictrl)
//     Footer(ictrl)
//     //---
//     function on(action: string, handler: Function) {
//         const h = handlerMap.get(action)
//         //---
//         if (h)
//             h.push(handler)
//         else {
//             let a = []
//             a.push(handler)
//             handlerMap.set(action, a)
//         }
//     }
//     //---
//     function emit(action: string, params: any) {
//         const h = handlerMap.get(action)
//         if (!h) return
//         //---
//         h.forEach(handler => { handler(params) })
//     }
// }

},{"./footer":4,"./header":5,"./main":6,"./storage":7}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
const const_1 = require("./const");
function Footer(app) {
    const element = utl_1.$(utl_1.dot("footer" /* FOOTER */)).get();
    const todoCount = utl_1.$(utl_1.dot("todo-count" /* TODOCOUNT */)).get();
    const clearCompleted = utl_1.$(utl_1.dot("clear-completed" /* CLEARCOMPLETED */)).get();
    const allFilter = utl_1.$(const_1.SELECTOR.HREF_ALL).get();
    const activeFilter = utl_1.$(const_1.SELECTOR.HREF_ACTIVE).get();
    const completedFilter = utl_1.$(const_1.SELECTOR.HREF_COMPLETED).get();
    //---
    utl_1.on(clearCompleted, "click" /* CLICK */, () => app.emit("clear-completed" /* CLEAR_COMPLETED */));
    //---
    app.on("change" /* CHANGE */, (items) => {
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

},{"./const":2,"./utl":9}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
function Header(app) {
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
            app.emit("update" /* UPDATE */, { check: false, title: val, id: utl_1.uuid() });
        newTodo.value = "" /* EMPTY */;
    }
}
exports.Header = Header;

},{"./utl":9}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
const todolist_1 = require("./todolist");
function Main(app) {
    const element = utl_1.$(utl_1.dot("main" /* MAIN */)).get();
    const toggleCheckbox = utl_1.$(utl_1.dot("toggle-all" /* TOGGLEALL */)).get();
    //---
    todolist_1.Todolist(app);
    //---
    utl_1.on(toggleCheckbox, "change" /* CHANGE */, () => app.emit("toggle-all" /* TOGGLE_ALL */));
    app.on("change" /* CHANGE */, (items) => {
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

},{"./todolist":8,"./utl":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
function Storage(app) {
    let items = {};
    //---
    utl_1.on(window, "hashchange" /* HASHCHANGE */, () => app.emit("change" /* CHANGE */, items));
    //---
    utl_1.on(document, "DOMContentLoaded" /* CONTENT_LOADED */, () => {
        const json = localStorage.getItem("todos_typescript5" /* STORAGEKEY */);
        if (json)
            items = JSON.parse(json);
        app.emit("change" /* CHANGE */, items);
    });
    //---
    app.on("update" /* UPDATE */, (e) => {
        items[e.id] = { check: e.check, title: e.title };
        save();
    });
    //---
    app.on("del" /* DEL */, (id) => {
        delete items[id];
        save();
    });
    //---
    app.on("toggle" /* TOGGLE */, (id) => {
        items[id].check = !items[id].check;
        save();
    });
    //---
    app.on("toggle-all" /* TOGGLE_ALL */, () => {
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
    app.on("clear-completed" /* CLEAR_COMPLETED */, () => {
        for (const p in items) {
            if (items[p].check)
                delete items[p];
        }
        save();
    });
    //---
    function save() {
        localStorage.setItem("todos_typescript5" /* STORAGEKEY */, JSON.stringify(items));
        app.emit("change" /* CHANGE */, items);
    }
}
exports.Storage = Storage;

},{"./utl":9}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
function Todo(app, list, title, check, id) {
    const element = utl_1.Factory.li(list, id);
    const view = utl_1.Factory.div(element, "view" /* VIEW */);
    const toggle = utl_1.Factory.check(view, "toggle" /* TOGGLE */, check);
    const label = utl_1.Factory.label(view, "" /* EMPTY */, title);
    const destroy = utl_1.Factory.button(view, "destroy" /* DESTROY */);
    const editor = utl_1.Factory.editor(element, "edit" /* EDIT */);
    //---
    utl_1.on(editor, "focusout" /* FOCUSOUT */, updateTodo);
    utl_1.on(destroy, "click" /* CLICK */, () => app.emit("del" /* DEL */, id));
    utl_1.on(toggle, "change" /* CHANGE */, () => app.emit("toggle" /* TOGGLE */, id));
    //---
    utl_1.on(editor, "keyup" /* KEY_UP */, (e) => {
        if (e.keyCode == 27 /* ESC */) {
            utl_1.$(element).removeClass("editing" /* EDITING */);
        }
        else if (e.keyCode == 13 /* ENTER */)
            updateTodo();
    });
    //---
    utl_1.on(label, "dblclick" /* DBL_CLICK */, () => {
        editor.value = "" /* EMPTY */;
        if (label.textContent)
            editor.value = label.textContent;
        utl_1.$(element).addClass("editing" /* EDITING */);
        editor.focus();
    });
    //---
    function updateTodo() {
        if (editor.value.trim()) {
            label.textContent = editor.value.trim();
            utl_1.$(element).removeClass("editing" /* EDITING */);
            app.emit("update" /* UPDATE */, { check: toggle.checked, title: label.textContent, id: id });
        }
    }
}
function Todolist(app) {
    const element = utl_1.$(utl_1.dot("todo-list" /* TODOLIST */)).get();
    //---
    app.on("change" /* CHANGE */, (items) => {
        element.innerHTML = "" /* EMPTY */;
        for (const p in items) {
            switch (window.location.hash) {
                case "#/active" /* ACTIVE */:
                    if (!items[p].check)
                        Todo(app, element, items[p].title, items[p].check, p);
                    break;
                case "#/completed" /* COMPLETED */:
                    if (items[p].check)
                        Todo(app, element, items[p].title, items[p].check, p);
                    break;
                default:
                    Todo(app, element, items[p].title, items[p].check, p);
            }
        }
    });
}
exports.Todolist = Todolist;

},{"./utl":9}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            if (index)
                return elements[index];
            else
                return null;
        },
        hasClass(cls) {
            if (elements instanceof Element)
                return hasClass(elements, cls);
            if (elements.length == 0)
                return false;
            let res = true;
            elements.forEach(e => { res = hasClass(e, cls) && res; });
            return res;
        },
        removeClass(cls) {
            if (elements instanceof Element) {
                removeClass(elements, cls);
                return this;
            }
            if (elements.length == 0)
                return this;
            elements.forEach(e => { removeClass(e, cls); });
            return this;
        },
        addClass(cls) {
            if (elements instanceof Element) {
                addClass(elements, cls);
                return this;
            }
            if (elements.length == 0)
                return this;
            elements.forEach(e => { addClass(e, cls); });
            return this;
        },
        toggleClass(cls) {
            if (elements instanceof Element) {
                toggleClass(elements, cls);
                return this;
            }
            if (elements.length == 0)
                return this;
            elements.forEach(e => { toggleClass(e, cls); });
            return this;
        },
        closest(selector) {
            if (elements instanceof Element) {
                let e = elements;
                while (e) {
                    if (e.matches && e.matches(selector))
                        return e;
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
                    return e;
                e = e.parentNode;
            }
            return null;
        },
    };
}
exports.$ = $;
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
        // for (let i = 0; i < potentialElements.length; i++) {
        //     if (potentialElements[i] === e.target) {
        //         func.call(e.target, e)
        //         break
        //     }
        // }
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
    // for (let i = 0; i < arr.length; i++) {
    //     res = elem.classList ? elem.classList.contains(arr[i]) : new RegExp('\\b' + arr[i] + '\\b').test(elem.className)
    //     if (!res) break
    // }
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
    static div(parent, cls) {
        return Factory.createElement("div" /* DIV */, parent, cls);
    }
    static button(parent, cls) {
        return Factory.createElement("button" /* BUTTON */, parent, cls);
    }
    static editor(parent, cls) {
        return Factory.createElement("input" /* INPUT */, parent, cls);
    }
    static li(parent, id) {
        const r = Factory.createElement("li" /* LI */, parent);
        r.dataset.id = id;
        return r;
    }
    static check(parent, cls, checked = false) {
        const r = Factory.createElement("input" /* INPUT */, parent, cls);
        r.setAttribute("type" /* TYPE */, "checkbox" /* CHECKBOX */);
        r.checked = checked;
        return r;
    }
    static label(parent, cls, text = "" /* EMPTY */) {
        const r = Factory.createElement("label" /* LABEL */, parent, cls);
        if (text)
            r.textContent = text;
        return r;
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

},{}]},{},[1]);
