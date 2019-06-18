/**
 * 来源：https://github.com/livoras/blog/issues/13
 */

// 1. 用 JS 对象模拟 DOM 树
function VNODE(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
}

// 虚拟节点的 render 方法，将虚拟节点构建为DOM节点
VNODE.prototype.render = function() {
    let el = document.createElement(this.tagName);
    let props = this.props;

    // 设置属性
    for(let propName in props) {
        el.setAttribute(propName, props[propName]);
    }

    // 处理子节点
    let children = this.children || [];
    children.forEach(child => {
        let childNode = (child instanceof VNODE)
                ? child.render()
                : document.createTextNode(child);
        el.appendChild(childNode); 
    });

    return el;
}

function v(tagName, props, children) {
    return new VNODE(tagName, props, children);
}

let ul = new VNODE("ul", { id: "list" }, [
    v("li", { class: "item" }, ["Item 1"]),
    v("li", { class: "item" }, ["Item 2"]),
    v("li", { class: "item" }, ["Item 3"])
]);

document.body.appendChild(ul.render());

// 2. 比较两棵虚拟DOM树的差异
function diff(oldTree, newTree) {
    
}