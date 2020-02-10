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
//type EventHandler = (params: any) => void
//---
function Controller() {
    const handlerMap = new Map();
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
        const h = handlerMap.get(action);
        //---
        if (h)
            h.push(handler);
        else {
            let a = [];
            a.push(handler);
            handlerMap.set(action, a);
        }
    }
    //---
    function emit(action, params) {
        const h = handlerMap.get(action);
        if (!h)
            return;
        //---
        h.forEach(handler => { handler(params); });
    }
    //const main = Main(ictrl);
    // const list = TodoList(ictrl);
    // const footer = Footer(ictrl);
    // const items = Array<iTodoItem>();
    // on(document, EVENT.CONTENT_LOADED, (e) => load());
    // on(window, EVENT.HASHCHANGE, (e) => render());
    // function indexOf(e: EventTarget | null): number {
    //     const id = getId(e);
    //     let res = -1;
    //     let i = items.length;
    //     while (id && i--) {
    //         if (items[i].id == id) {
    //             res = i;
    //             break;
    //         }
    //     }
    //     return res;
    // }
    // function getItem(e: EventTarget | HTMLElement | null): iTodoItem | null {
    //     const index = indexOf(e);
    //     if (index > -1)
    //         return items[index];
    //     else
    //         return null;
    // }
    // function del(index: number) {
    //     items[index].element.remove();
    //     items.splice(index, 1);
    // }
    // function add(text: string, checked: boolean) {
    //     items.push(TodoItem(list.element, text, checked));
    // }
    // function load() {
    //     const json = localStorage.getItem(CONST.STORAGEKEY);
    //     if (json) {
    //         const obj = JSON.parse(json);
    //         for (const p in obj) {
    //             if (obj.hasOwnProperty(p))
    //                 add(obj[p].name, obj[p].checked);
    //         }
    //     }
    //     render();
    // }
    // function save() {
    //     const obj: { [index: number]: { checked: boolean, name: string | null } } = {};
    //     for (const key in items) {
    //         const e = items[key];
    //         obj[key] = { checked: e.toggle.checked, name: e.label.textContent };
    //     }
    //     localStorage.setItem(CONST.STORAGEKEY, JSON.stringify(obj));
    //     render();
    // }
    // function render() {
    //     const allCount = items.length;
    //     let activeCount = 0;
    //     items.forEach(e => { if (!e.toggle.checked) activeCount++; });
    //     // list
    //     items.forEach(e => e.render());
    //     // main
    //     main.render(activeCount, allCount);
    //     // footer
    //     footer.render(activeCount, allCount);
    // }
    // function addTodo(e: Event) {
    //     if (e instanceof KeyboardEvent && e.keyCode != KEY.ENTER)
    //         return;
    //     let val = list.newTodo.value.trim();
    //     if (val) {
    //         add(val, false);
    //         list.newTodo.value = STR.EMPTY;
    //         save();
    //     }
    // }
    // function delTodo(e: Event) {
    //     const index = indexOf(e.target);
    //     if (index > -1) {
    //         del(index);
    //         save();
    //     }
    // }
    // function focusoutTodo(e: Event) {
    //     const item = getItem(e.target);
    //     if (item) {
    //         item.update();
    //         save();
    //     }
    // }
    // function toggleTodo() {
    //     save();
    // }
    // function keyupTodo(e: Event) {
    //     const item = getItem(e.target);
    //     if (item && e instanceof KeyboardEvent) {
    //         if (e.keyCode == KEY.ENTER) {
    //             if (item.editor.value.trim())
    //                 item.update();
    //             else
    //                 delTodo(e);
    //             save();
    //         } else if (e.keyCode == KEY.ESC)
    //             item.cancel();
    //     }
    // }
    // function editTodo(e: Event) {
    //     const item = getItem(e.target);
    //     if (item)
    //         item.edit();
    // }
    // function clearCompleted(e: Event) {
    //     let n = 0;
    //     const cnt = items.length;
    //     for (let i = 0; i < cnt; i++) {
    //         const e = items[n];
    //         (e.toggle.checked) ? del(n) : n++;
    //     }
    //     save();
    // }
    // function toggleAll(e: Event) {
    //     items.forEach(e => { e.toggle.checked = main.toggleAll.checked; });
    //     save();
    // }
}
exports.Controller = Controller;

},{"./footer":4,"./header":5,"./main":6,"./storage":7}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
const const_1 = require("./const");
function Footer(app) {
    const todoCount = utl_1.$(utl_1.dot("todo-count" /* TODOCOUNT */)).get();
    const clearCompleted = utl_1.$(utl_1.dot("clear-completed" /* CLEARCOMPLETED */)).get();
    const allFilter = utl_1.$(const_1.SELECTOR.HREF_ALL).get();
    const activeFilter = utl_1.$(const_1.SELECTOR.HREF_ACTIVE).get();
    const completedFilter = utl_1.$(const_1.SELECTOR.HREF_COMPLETED).get();
    //---
    utl_1.on(clearCompleted, "click" /* CLICK */, click.bind(this));
    //---
    function click(e) {
        console.log(this);
    }
}
exports.Footer = Footer;

},{"./const":2,"./utl":9}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
function Header(app) {
    const newTodo = utl_1.$(utl_1.dot("new-todo" /* NEWTODO */)).get();
    //---
    utl_1.on(newTodo, "keyup" /* KEY_UP */, keyUp);
    utl_1.on(newTodo, "focusout" /* FOCUSOUT */, addTodo);
    //---
    function keyUp(e) {
        if (e.keyCode != 13 /* ENTER */)
            return;
        addTodo();
    }
    //---
    function addTodo() {
        const val = newTodo.value.trim();
        if (val)
            app.emit("add" /* ADD */, { check: false, title: val, id: utl_1.uuid() });
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
    utl_1.on(toggleCheckbox, "change" /* CHANGE */, toggleAll);
    app.on("storage" /* STORAGE */, render);
    //---
    function toggleAll(e) {
        app.emit("toggle-all" /* TOGGLE_ALL */);
    }
    //---
    function render(items) {
        //const check = items.reduce<boolean>((acc, val) => { return val.check || acc }, false)
        let check = false;
        for (const p in items) {
            check = check || items[p].check;
        }
        toggleCheckbox.checked = check;
    }
}
exports.Main = Main;

},{"./todolist":8,"./utl":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
function Storage(app) {
    //const items = new Array()
    let items = {};
    //---
    utl_1.on(document, "DOMContentLoaded" /* CONTENT_LOADED */, onLoad);
    app.on("add" /* ADD */, addTodo);
    app.on("update" /* UPDATE */, updateTodo);
    app.on("toggle-all" /* TOGGLE_ALL */, toggleAll);
    //---
    function addTodo(e) {
        // items.push(e)
        items[e.id] = { check: e.check, title: e.title };
        save();
    }
    //---
    function updateTodo(e) {
        // items.push(e)
        items[e.id] = { check: e.check, title: e.title };
        save();
    }
    //---
    function toggleAll() {
        // const check = items.reduce<boolean>((acc, val) => { return val.check || acc }, false)
        // items.map((val) => { val.check = !check })
        let check = false;
        for (const p in items) {
            check = check || items[p].check;
        }
        for (const p in items) {
            items[p].check = !check;
        }
        save();
    }
    //---
    function onLoad() {
        const json = localStorage.getItem("todos_typescript5" /* STORAGEKEY */);
        if (json) {
            items = JSON.parse(json);
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
        app.emit("storage" /* STORAGE */, items);
    }
    //---
    function save() {
        // const obj: { [index: number]: { check: boolean, title: string, id: string } } = {}
        // for (const key in items) {
        //     const e = items[key]
        //     obj[key] = { check: e.check, title: e.title, id: e.id }
        // }
        localStorage.setItem("todos_typescript5" /* STORAGEKEY */, JSON.stringify(items));
        app.emit("storage" /* STORAGE */, items);
    }
}
exports.Storage = Storage;

},{"./utl":9}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utl_1 = require("./utl");
function Todo(app, list, title, check, id) {
    //const id = uuid()
    const element = utl_1.Factory.li(list, id);
    const view = utl_1.Factory.div(element, "view" /* VIEW */);
    const toggle = utl_1.Factory.check(view, "toggle" /* TOGGLE */, check);
    const label = utl_1.Factory.label(view, "" /* EMPTY */, title);
    const destroy = utl_1.Factory.button(view, "destroy" /* DESTROY */);
    const editor = utl_1.Factory.editor(element, "edit" /* EDIT */);
    //---
    utl_1.on(label, "dblclick" /* DBL_CLICK */, edit);
    utl_1.on(editor, "focusout" /* FOCUSOUT */, update);
    //---
    function edit() {
        editor.value = "" /* EMPTY */;
        if (label.textContent)
            editor.value = label.textContent;
        utl_1.$(element).addClass("editing" /* EDITING */);
        editor.focus();
    }
    //---
    function update() {
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
    app.on("storage" /* STORAGE */, render);
    //---
    function render(items) {
        element.innerHTML = "" /* EMPTY */;
        for (const p in items) {
            Todo(app, element, items[p].title, items[p].check, p);
        }
        //items.map((val) => { Todo(app, element, val.title, val.check, val.id) })
    }
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
        for (let i = 0; i < potentialElements.length; i++) {
            if (potentialElements[i] === e.target) {
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
    for (let i = 0; i < arr.length; i++) {
        res = elem.classList ? elem.classList.contains(arr[i]) : new RegExp('\\b' + arr[i] + '\\b').test(elem.className);
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
const s = new Array();
for (var i = 0; i < 256; i++) {
    s[i] = (i < 16 ? '0' : '') + (i).toString(16);
}
function uuid() {
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    return s[d0 & 0xff] + s[d0 >> 8 & 0xff] + s[d0 >> 16 & 0xff] + s[d0 >> 24 & 0xff] + '-' +
        s[d1 & 0xff] + s[d1 >> 8 & 0xff] + '-' +
        s[d1 >> 16 & 0x0f | 0x40] + s[d1 >> 24 & 0xff] + '-' +
        s[d2 & 0x3f | 0x80] + s[d2 >> 8 & 0xff] + '-' +
        s[d2 >> 16 & 0xff] + s[d2 >> 24 & 0xff] + s[d3 & 0xff] + s[d3 >> 8 & 0xff] + s[d3 >> 16 & 0xff] + s[d3 >> 24 & 0xff];
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
