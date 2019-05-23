const PROLOGUE = `/**
 * 面试官你好，我是 Brad Pitt
 * 只用文字作做我介绍太单调了
 * 我就用代码来做介绍
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
    overflow: hidden;
    border: 1px solid #aaa;
    margin: 8px;
    padding: 12px;
    width: 48vw;
    height: 96vh;
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

/* 再加一个呼吸灯效果 */
#prompt {
    animation: breath 1s infinite alternate-reverse;
}

/* 好了，让我来做个自我介绍吧 */
/* 嗯~ o(*￣▽￣*)o，我需要一个白板 */
`;

const BOARD = `#board {
    position: absolute;
    right: 0;
    width: 48vw;
    height: 96vh;
    background: white;
    border: 10px solid black;
    animation: 1.2s board;
    margin: 8px;
    padding: 10px;
    overflow: auto;
}

/* 好了，我开始在白板上写简历了 */
/* 请看右边... */
`;

const MD = `
# 自我介绍

我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS
ddddddd
dddddddd

# 工作经历

* xxx 公司实习半年
* xxx 公司担任前端
* ... ...
* ... ...

# 项目介绍

1. XXX 轮播
2. XXX 简历
3. XXX 画板
4. XXX 

# 兴趣爱好

Lodds
dsadsd
dsadas
dasd
dsddd

# 联系方式

- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`;

const GUIDE1 = `
/* 把它变成 Markdown 的形式吧 */
`;

writeCode('', PROLOGUE, () => {
    addBoard(() => {
        writeCode(PROLOGUE, BOARD, () => {
            writeMarkdown(MD, () => {
                writeCode(PROLOGUE + BOARD, GUIDE1, () => {
                    convertToMarkdown(() => {

                    });
                });
            });
        });
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
    fn && fn.call();
}

function writeMarkdown(markdown, fn) {

    let n = 0;
    let board = document.getElementById("board");

    let timer = setInterval(() => {
        if(n >= markdown.length) {
            clearInterval(timer);
            fn && fn.call();
        }
        n += 1;
        board.innerHTML = markdown.substring(0, n);
        board.scrollTop = board.scrollHeight;
    }, 10);

}

function convertToMarkdown(fn) {
    let div = document.createElement('div');
    div.className = 'html markdown-body';
    let board = document.getElementById("board");
    div.innerHTML = marked(MD);
    board.replaceWith(div)
    fn && fn.call()
}