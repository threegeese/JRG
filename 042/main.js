const prologue = `/**
 * 面试官你好，我是 Brad Pitt (&#128540;)
 * 只用文字作做我介绍太单调了
 * 我就用代码来做介绍吧
 * 首先给页面添加一些样式
 */

* {
    transition: all 1s;
    box-sizing: border-box;
}
body {
    padding: 0;
    margin: 0;
}
html {
    background: rgb(222,222,222);
}
main {
    position: relative;
}
#prompt {
    overflow: auto;
    border: 1px solid #aaa;
    margin: 8px;
    padding: 12px;
    height: 96vh;
    width: 48vw;
    position: absolute;
    letf: 0;
}

/* 让代码高亮起来吧 */

.token.selector { 
    color: #690; 
}
.token.property { 
    color: #905;
}
.token.function {
    color: #DD4A68;
}

/* 来点 3D 效果试试 */

#prompt {
    transform: rotate(360deg);
}

/* 好了，让我来做个自我介绍吧 */
/* 嗯~ o(*￣▽￣*)o，我需要一个白板 &#128466; */
`;

const intro = `#board {
    position: absolute;
    right: 0;
    width: 48vw;
    height: 96vh;
    background: white;
    border: 10px solid black;
    animation: 1.2s board;
    margin: 8px;
    padding: 12px;
}`;



writeCode('', prologue, () => {
    addBoard(() => {
        writeCode(prologue, intro);
    });
});



function writeCode(prefix, code, fn) {

    let n = 0;
    let prompt = document.getElementById("prompt");
    let addStyle = document.getElementById("addStyle");
    prompt.innerHTML = prefix || '';

    let timer = setInterval(() => {
        if(n >= code.length) {
            clearInterval(timer);
            fn && fn.call();
        }
        n += 1;
        prompt.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        prompt.scrollTop = prompt.scrollHeight;
        addStyle.innerHTML = prefix + code.substring(0, n);
    }, 10);

}

function addBoard(fn) {
    let board = document.createElement("pre");
    board.setAttribute("id","board");
    document.getElementsByTagName("main")[0].appendChild(board);
    fn.call();
}

