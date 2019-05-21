const prologue = `/**
 * 面试官你好，我是 Brad Pitt (&#128540;)
 * 只用文字作做我介绍太单调了
 * 我就用代码来做介绍吧
 * 首先给页面添加一些样式
 */

* {
    transition: all 1s;
}
html {
    background: rgb(222,222,222);
}
#prompt {
    border: 1px solid #aaa;
    margin: 8px;
    padding: 10px;
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


let n = 0;
let prompt = document.getElementById("prompt");
let addStyle = document.getElementById("addStyle");
let timer = setInterval(() => {

    if(n >= prologue.length - 1) {
        clearInterval(timer);
        addBoard();
        showBoard();
    }
    n += 1;
    prompt.innerHTML = prologue.substring(0, n);
    prompt.innerHTML = Prism.highlight(prompt.innerHTML, Prism.languages.css);
    addStyle.innerHTML = prologue.substring(0, n);
}, 10);

function addBoard() {
    let board = document.createElement("div");
    board.setAttribute("id","board");
    document.getElementsByTagName("main")[0].appendChild(board);
}

function showBoard(prePrompt) {

    const intro = `#board {
    width: 100px;
    height: 100px;
    background: red;
}`;

    let n = 0;
    let timer = setInterval(() => {

        if(n >= intro.length - 1) {
            clearInterval(timer);
        }
        n += 1;
        prompt.innerHTML = prologue + intro.substring(0, n);
        prompt.innerHTML = Prism.highlight(prompt.innerHTML, Prism.languages.css);
        addStyle.innerHTML = prologue + intro.substring(0, n);
    }, 10);
    
}
