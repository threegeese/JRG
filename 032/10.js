/**
 * 数组去重
 */

let arr = [1,5,2,3,4,2,3,1,3,4];

// 1. 利用 ES6 Set去重
function unique_01 (arr) {
    return Array.from(new Set(arr))
}

console.log("unique_01", unique_01(arr));

// 2. 
function unique_02(array) {
    var res = [];
    for (var i = 0, len = array.length; i < len; i++) {
        var current = array[i];
        if (res.indexOf(current) === -1)
        res.push(current)
    }
    return res;
}

console.log("unique_02", unique_02(arr));
