# JS 高级基础知识

## 1. 看代码

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

## 2. `new Fn()` 会执行 `Fn`，并打印出 `this`，请问这个 `this` 有哪些属性？这个 `this` 的原型有哪些属性？

```JS
function Fn(){
    console.log(this)
}
new Fn()
```

答：`this` 没有属性，它的原型是 `Fn` 同样的没有属性。

## 3. JSON 和 JavaScript 是什么关系？JSON 和 JavaScript 的区别有哪些？

答：

## 4. 前端 MVC 是什么？请用代码大概说明 MVC 三个对象分别有哪些重要属性和方法。

答：

## 5. 在 ES5 中如何用函数模拟一个类？

```JS
function Person() {

}

let brad = new Person();
```

## 6. 用过 `Promise` 吗？举例说明。如果要你创建一个返回 `Promise` 对象的函数，你会怎么写？举例说明。

答：