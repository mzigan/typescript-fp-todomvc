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
const utl_1 = require("./utl");
const view_1 = require("./view");
function Controller() {
    const ictrl = {
        addTodo,
        toggleAll,
        clearCompleted,
        focusoutTodo,
        delTodo,
        toggleTodo,
        keyupTodo,
        editTodo
    };
    const main = view_1.Main(ictrl);
    const list = view_1.TodoList(ictrl);
    const footer = view_1.Footer(ictrl);
    const items = Array();
    utl_1.on(document, "DOMContentLoaded" /* CONTENT_LOADED */, (e) => load());
    utl_1.on(window, "hashchange" /* HASHCHANGE */, (e) => render());
    function indexOf(e) {
        const id = utl_1.getId(e);
        let res = -1;
        let i = items.length;
        while (id && i--) {
            if (items[i].id == id) {
                res = i;
                break;
            }
        }
        return res;
    }
    function getItem(e) {
        const index = indexOf(e);
        if (index > -1)
            return items[index];
        else
            return null;
    }
    function del(index) {
        items[index].element.remove();
        items.splice(index, 1);
    }
    function add(text, checked) {
        items.push(view_1.TodoItem(list.element, text, checked));
    }
    function load() {
        const json = localStorage.getItem("todos_typescript" /* STORAGEKEY */);
        if (json) {
            const obj = JSON.parse(json);
            for (const p in obj) {
                if (obj.hasOwnProperty(p))
                    add(obj[p].name, obj[p].checked);
            }
        }
        render();
    }
    function save() {
        const obj = {};
        for (const key in items) {
            const e = items[key];
            obj[key] = { checked: e.toggle.checked, name: e.label.textContent };
        }
        localStorage.setItem("todos_typescript" /* STORAGEKEY */, JSON.stringify(obj));
        render();
    }
    function render() {
        const allCount = items.length;
        let activeCount = 0;
        items.forEach(e => { if (!e.toggle.checked)
            activeCount++; });
        // list
        items.forEach(e => e.render());
        // main
        main.render(activeCount, allCount);
        // footer
        footer.render(activeCount, allCount);
    }
    function addTodo(e) {
        if (e instanceof KeyboardEvent && e.keyCode != 13 /* ENTER */)
            return;
        let val = list.newTodo.value.trim();
        if (val) {
            add(val, false);
            list.newTodo.value = "" /* EMPTY */;
            save();
        }
    }
    function delTodo(e) {
        const index = indexOf(e.target);
        if (index > -1) {
            del(index);
            save();
        }
    }
    function focusoutTodo(e) {
        const item = getItem(e.target);
        if (item) {
            item.update();
            save();
        }
    }
    function toggleTodo() {
        save();
    }
    function keyupTodo(e) {
        const item = getItem(e.target);
        if (item && e instanceof KeyboardEvent) {
            if (e.keyCode == 13 /* ENTER */) {
                if (item.editor.value.trim())
                    item.update();
                else
                    delTodo(e);
                save();
            }
            else if (e.keyCode == 27 /* ESC */)
                item.cancel();
        }
    }
    function editTodo(e) {
        const item = getItem(e.target);
        if (item)
            item.edit();
    }
    function clearCompleted(e) {
        let n = 0;
        const cnt = items.length;
        for (let i = 0; i < cnt; i++) {
            const e = items[n];
            (e.toggle.checked) ? del(n) : n++;
        }
        save();
    }
    function toggleAll(e) {
        items.forEach(e => { e.toggle.checked = main.toggleAll.checked; });
        save();
    }
}
exports.Controller = Controller;

},{"./utl":4,"./view":5}],4:[function(require,module,exports){
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
        }
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

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
const utl_1 = require("./utl");
function TodoItem(list, text, checked) {
    const id = utl_1.uuid();
    const element = utl_1.Factory.li(list, id);
    const view = utl_1.Factory.div(element, "view" /* VIEW */);
    const toggle = utl_1.Factory.check(view, "toggle" /* TOGGLE */, checked);
    const label = utl_1.Factory.label(view, "" /* EMPTY */, text);
    const destroy = utl_1.Factory.button(view, "destroy" /* DESTROY */);
    const editor = utl_1.Factory.editor(element, "edit" /* EDIT */);
    function update() {
        if (editor.value.trim()) {
            label.textContent = editor.value.trim();
            utl_1.$(element).removeClass("editing" /* EDITING */);
        }
    }
    function cancel() {
        editor.value = "" /* EMPTY */;
        utl_1.$(element).removeClass("editing" /* EDITING */);
    }
    function edit() {
        editor.value = "" /* EMPTY */;
        if (label.textContent)
            editor.value = label.textContent;
        utl_1.$(element).addClass("editing" /* EDITING */);
        editor.focus();
    }
    function render() {
        // completed
        (toggle.checked) ? utl_1.$(element).addClass("completed" /* COMPLETED */) : utl_1.$(element).removeClass("completed" /* COMPLETED */);
        // hidden
        switch (window.location.hash) {
            case "#/active" /* ACTIVE */:
                (toggle.checked) ? utl_1.$(element).addClass("hidden" /* HIDDEN */) : utl_1.$(element).removeClass("hidden" /* HIDDEN */);
                break;
            case "#/completed" /* COMPLETED */:
                (toggle.checked) ? utl_1.$(element).removeClass("hidden" /* HIDDEN */) : utl_1.$(element).addClass("hidden" /* HIDDEN */);
                break;
            default:
                utl_1.$(element).removeClass("hidden" /* HIDDEN */);
                break;
        }
    }
    return {
        id,
        element,
        toggle,
        label,
        editor,
        update,
        edit,
        cancel,
        render
    };
}
exports.TodoItem = TodoItem;
function TodoList(app) {
    const element = utl_1.$(utl_1.dot("todo-list" /* TODOLIST */)).get();
    const newTodo = utl_1.$(utl_1.dot("new-todo" /* NEWTODO */)).get();
    utl_1.on(newTodo, "keyup" /* KEY_UP */, app.addTodo);
    utl_1.on(newTodo, "focusout" /* FOCUSOUT */, app.addTodo);
    utl_1.delegate(element, utl_1.dot("edit" /* EDIT */), "focusout" /* FOCUSOUT */, app.focusoutTodo);
    utl_1.delegate(element, utl_1.dot("destroy" /* DESTROY */), "click" /* CLICK */, app.delTodo);
    utl_1.delegate(element, utl_1.dot("toggle" /* TOGGLE */), "change" /* CHANGE */, app.toggleTodo);
    utl_1.delegate(element, utl_1.dot("edit" /* EDIT */), "keyup" /* KEY_UP */, app.keyupTodo);
    utl_1.delegate(element, "label" /* LABEL */, "dblclick" /* DBL_CLICK */, app.editTodo);
    return {
        element,
        newTodo
    };
}
exports.TodoList = TodoList;
function Main(app) {
    const element = utl_1.$(utl_1.dot("main" /* MAIN */)).get();
    const toggleAll = utl_1.$(utl_1.dot("toggle-all" /* TOGGLEALL */)).get();
    utl_1.on(toggleAll, "change" /* CHANGE */, app.toggleAll);
    function render(activeCount, allCount) {
        toggleAll.checked = allCount > 0 && activeCount == 0;
        (allCount > 0) ? utl_1.$(element).removeClass("hidden" /* HIDDEN */) : utl_1.$(element).addClass("hidden" /* HIDDEN */);
    }
    return {
        toggleAll,
        render
    };
}
exports.Main = Main;
function Footer(app) {
    const element = utl_1.$(utl_1.dot("footer" /* FOOTER */)).get();
    const todoCount = utl_1.$(utl_1.dot("todo-count" /* TODOCOUNT */)).get();
    const clearCompleted = utl_1.$(utl_1.dot("clear-completed" /* CLEARCOMPLETED */)).get();
    const allFilter = utl_1.$(const_1.SELECTOR.HREF_ALL).get();
    const activeFilter = utl_1.$(const_1.SELECTOR.HREF_ACTIVE).get();
    const completedFilter = utl_1.$(const_1.SELECTOR.HREF_COMPLETED).get();
    utl_1.on(clearCompleted, "click" /* CLICK */, app.clearCompleted);
    function render(activeCount, allCount) {
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
        (allCount - activeCount > 0) ? utl_1.$(clearCompleted).removeClass("hidden" /* HIDDEN */) : utl_1.$(clearCompleted).addClass("hidden" /* HIDDEN */);
        // footer
        (allCount > 0) ? utl_1.$(element).removeClass("hidden" /* HIDDEN */) : utl_1.$(element).addClass("hidden" /* HIDDEN */);
    }
    return {
        render
    };
}
exports.Footer = Footer;

},{"./const":2,"./utl":4}]},{},[1]);
