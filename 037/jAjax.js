window.jQuery = function(nodeOrSelector) {
   
    let nodes = {};

    if(typeof nodeOrSelector === "string") {
        let temp = document.querySelectorAll(nodeOrSelector);
        for(let i=0; i<temp.length; i++){
            nodes[i] = temp[i];
        }
        nodes.length = temp.length;
    }else if(nodeOrSelector instanceof Node) {
        node = {
            0: nodeOrSelector,
            length: 1
        }
    }

    // 添加类
    nodes.addClasses = function(classes) {
        classes.forEach( value => {
            for(let i=0; i<nodes.length; i++){
                nodes[i].classList.add(value);
            }
        });
    }

    // 删除类
    nodes.removeClass= function(className){
        for(let i=0;i<nodes.length;i++){
            nodes[i].classList.remove(className);
        }
    }

    // 获取文本
    nodes.getText = function() {
        let texts = [];
        for(let i=0; i<nodes.length; i++){
            texts[i] = nodes[i].textContent;
        }
        return texts;
    }

    // 设置文本
    nodes.setText = function(text) {
        for(let i=0; i<nodes.length; i++){
            nodes[i].textContent = text;
        }
    }

    // 合并后的文本方法
    nodes.text = function(text) {
        if(text === undefined) {
            let texts = [];
            for(let i=0; i<nodes.length; i++){
                texts[i] = nodes[i].textContent;
            }
            return texts;
        }else {
            for(let i=0; i<nodes.length; i++){
                nodes[i].textContent = text;
            }
        }
    }

    return nodes;
}

window.$ = jQuery

/**
 * 封装 AJAX
 * First Version
 */
jQuery.ajax = function(url, method, body, headers, successFn, failFn) {
    const xhr = new XMLHttpRequest();
    xhr.open(method,url);
    for (let key in headers) {
        xhr.setRequestHeader(key,header[key]);
    }
    xhr.onreadystatechange = ()=> {
        if(xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr < 300) {
                successFn.call(undefined,xhr.responseText)
            }else if(xhr.status >= 400) {
                failFn.call(undefined,xhr);
            }
        }
    }
    xhr.send(body)
}

// 省略传参可能出错
btn.click = ()=> {
    jQuery.ajax('xxx', 'get', 'a=1', {'Content-Type': 'x-www-form-urlencoded'});
}



/**
 * Second Version
 */
jQuery.ajax = function(options) {
    let url = options.url;
    let method = options.method;
    let body = options.body;
    let successFn = options.successFn;
    let failFn = options.failFn;
    const xhr = new XMLHttpRequest();
    xhr.open(method,url);
    for (let key in headers) {
        xhr.setRequestHeader(key,header[key]);
    }
    xhr.onreadystatechange = ()=> {
        if(xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr < 300) {
                successFn.call(undefined,xhr.responseText)
            }else if(xhr.status >= 400) {
                failFn.call(undefined,xhr);
            }
        }
    }
    xhr.send(body)
}

//
btn.click = ()=> {
    jQuery.ajax({
        url: 'xxx',
        method: 'get',
        headers: {'Content-Type': 'x-www-form-urlencoded'}
    });
}



/**
 * Third Version
 */
jQuery.ajax = function({url, method, body, headers, successFn, failFn}) {   // 解构赋值
    const xhr = new XMLHttpRequest();
    xhr.open(method,url);
    for (let key in headers) {
        xhr.setRequestHeader(key,header[key]);
    }
    xhr.onreadystatechange = ()=> {
        if(xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr < 300) {
                successFn.call(undefined,xhr.responseText)
            }else if(xhr.status >= 400) {
                failFn.call(undefined,xhr);
            }
        }
    }
    xhr.send(body);
}


/**
 * Promise
 */
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