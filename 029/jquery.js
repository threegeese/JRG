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
 *
 */
Node.prototype.getSilblings = 