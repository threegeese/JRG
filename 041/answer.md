# JS 高级基础知识

1. 看代码

```JS
// 1
var object = {}
object.__proto__ ===  Object.prototype      // true

// 2
var fn = function(){}
fn.__proto__ === Function.prototype             // true
fn.__proto__.__proto__ === Object.prototype     // true

// 3
var array = []
array.__proto__ === Array.prototype // true
array.__proto__.__proto__ === Object.prototype // true

// 3
Function.__proto__ === Function.prototype   // true
Array.__proto__ === Function.prototype      // true
Object.__proto__ === Function.prototype     // true

// 4
true.__proto__ === Boolean.prototype        // true

// 5
Function.prototype.__proto__ === Object.prototype      // true
```

<hr>

2. `new Fn()` 会执行 `Fn`，并打印出 `this`，请问这个 `this` 有哪些属性？这个 `this` 的原型有哪些属性？

```JS
function Fn(){
    console.log(this)
}
new Fn()
```

答：
- 在这段代码中 `this` 没有属性（只有一个隐藏的 `__proto__` 属性）
- 且它的原型是 `Fn.prototype` 同样的没有属性（只有一个属性 `constructor`，且 `constructor === fn` 和一个隐藏属性 `__proto__`，指向 `Object.prototype`）。

<hr>

3. JSON 和 JavaScript 是什么关系？JSON 和 JavaScript 的区别有哪些？

答：
- JSON 是一种数据交互格式，JSON 是 JavaScript 的子集（或者说 JSON 只抄袭了一部分 JavaScript 语法，而且没有新增任何原创的语法）。
- JSON 对值的类型和格式有严格的规定:
    - 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
    - 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
    - 字符串必须使用双引号表示，不能使用单引号。
    - 对象的键名必须放在双引号里面。
    - 数组或对象最后一个成员的后面，不能加逗号。

<hr>

4. 前端 MVC 是什么？请用代码大概说明 MVC 三个对象分别有哪些重要属性和方法。

答：
- MVC模式（Model–View–Controller）是软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller）。
    - 控制器（Controller）- 负责转发请求，对请求进行处理。
    - 视图（View） - 界面设计人员进行图形界面设计。
    - 模型（Model） - 程序员编写程序应有的功能（实现算法等等）、数据库专家进行数据管理和数据库设计(可以实现具体的功能)。
- 前端 MVC
    - Model 数据管理，包括数据逻辑、数据请求、数据存储等功能。前端 Model 主要负责 AJAX 请求或者 LocalStorage 存储
    - View 负责用户界面，前端 View 主要负责 HTML 渲染。
    - Controller 负责处理 View 的事件，并更新 Model；也负责监听 Model 的变化，并更新 View，Controller 控制其他的所有流程。

```JS
let model = {
    data: null,
    init(){}
    fetch(){}
    save(){}
    update(){}
    delete(){}
};

let view = {
    init() {}
    template: '<h1>hi</h1'>
};

let controller = {
    view: null,
    model: null,
    init(view, model){
        this.view = view
        this.model = model
        this.bindEvents()
    }
    render(){
        this.view.querySelector('name').innerText = this.model.data.name
    },
    bindEvents(){}
}
```

<hr>

5. 在 ES5 中如何用函数模拟一个类？

```JS
function Person(name) {
    this.name = name;
}
Person.prototype.say = function () {
    console.log('my name is ' + name)
};

let brad = new Person('brad');
```

<hr>

6. 用过 `Promise` 吗？举例说明。如果要你创建一个返回 `Promise` 对象的函数，你会怎么写？举例说明。

答：用过 Promise

```JS
jQuery.ajax = function({url, method, body, headers}) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method,url);
        for (let key in headers) {
            xhr.setRequestHeader(key,header[key]);
        }
        xhr.onreadystatechange = ()=> {
            if(xhr.readyState === 4) {
                if(xhr.status >= 200 && xhr < 300) {
                    resolve.call(undefined,xhr.responseText)
                }else if(xhr.status >= 400) {
                    reject.call(undefined,xhr);
                }
            }
        }
        xhr.send(body);
    });
}
```

用过 Promise，比如 jQuery 或者 axios 的 AJAX 功能，都返回的是 Promise 对象。

`$.ajax({url:'/xxx', method:'get'}).then(success1, error1).then(success2, error2)`

如果我自己创建 Promise 对象，我会这么写

```JS
function asyncMethod(){
    return new Promise(function (resolve, reject){
        setTimeout(function(){
            成功则调用 resolve
            失败则调用 reject
        },3000)
    })
}
```