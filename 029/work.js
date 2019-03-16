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
        if(text) {
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



/****** ******/
$("ul > li").addClasses(['a','b','c']);
console.log($("ul > li").getText());
$("ul > li").setText("nihao");
