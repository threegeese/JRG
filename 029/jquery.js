/**
 * 获取所有的兄弟节点
 */
function getSilblings(node) {
    let allChildren = node.parentElement.children;
    let array = {
        length: 0,
    }
    for(let i=0; i<allChildren.length; i++){
        if(allChildren[i] !== node) {
            array[array.length] = allChildren[i]; 
            array.length  += 1;
        }
    }
    return array;
}
// console.log(getSilblings(item3));

/**
 * 给节点添加类
 * classes形如{"classA":true,"classB":false,"classC":true}
 */
function addClasses(node,classes) {
    for(let key in classes){
        let value = classes[key];
        let methodName = value ? 'add' : 'remove';
        node.classList[methodName](key);

    }
}
//console.log(addClasses(item2,{a:true,b:false,c:true}));



/**
 * 命名空间
 */
let hhdom = {};
hhdom.getSilblings = function (node) {
    let allChildren = node.parentElement.children;
    let array = {
        length: 0,
    }
    for(let i=0; i<allChildren.length; i++){
        if(allChildren[i] !== node) {
            array[array.length] = allChildren[i]; 
            array.length  += 1;
        }
    }
    return array;
}
hhdom.addClasses = function (node,classes) {
    for(let key in classes){
        let value = classes[key];
        let methodName = value ? 'add' : 'remove';
        node.classList[methodName](key);

    }
}
//hhdom.addClasses(item1,{a:true,b:false,c:true});
//console.log(hhdom.getSilblings(item1));


/**
 * 原型
 */
Node.prototype.getSilblings = function() {
    let allChildren = this.parentElement.children;
    let array = {
        length: 0,
    }
    for(let i=0; i<allChildren.length; i++){
        if(allChildren[i] !== this) {
            array[array.length] = allChildren[i]; 
            array.length  += 1;
        }
    }
    return array;
}

/**
 * classes形如["classA","classB","classC"]
 */
Node.prototype.addClasses = function (classes) {
    classes.forEach( value => this.classList.add(value));
}

// console.log(item4.getSilblings.call(item4));
// item4.addClasses.call(item4,['a','b','c','b']);



/**
 *
 */
let jQuery = function (nodeOrSelector) {

    let node;
    if(typeof nodeOrSelector === "string") {
        node = document.querySelector(nodeOrSelector);
    }else {
        node = nodeOrSelector;
    }

    return {
        getSilblings: function() {
            let allChildren = node.parentElement.children;
            let array = {
                length: 0,
            }
            for(let i=0; i<allChildren.length; i++){
                if(allChildren[i] !== node) {
                    array[array.length] = allChildren[i]; 
                    array.length  += 1;
                }
            }
            return array;
        },
        addClasses: function (classes) {
            classes.forEach( value => node.classList.add(value));
        }
    };
}
// let node = jQuery('#item5');
// console.log(node.getSilblings());
// node.addClasses(['a','b','c']);

let JQuery = function(nodeOrSelector) {
    let nodes = {};
    if(typeof nodeOrSelector === "string") {
        let temp = document.querySelectorAll(nodeOrSelector);
        for(let i=0; i<temp.length; i++){

        }
    }else if() {

    }

    nodes.getSilblings = function() {
        
    }

    nodes.addClasses = function() {

    }

    return nodes;
}