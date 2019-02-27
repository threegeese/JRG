let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//画笔与橡皮擦
let painting = false;
let position = {'x': undefined, 'y': undefined};

let actions = document.getElementById("actions");
let eraserButton = document.getElementById("eraser");
let brush = document.getElementById("brush");
let clear = document.getElementById("clear");
let download =document.getElementById("download")

let redBrush = document.getElementById("red");
let yellowBrush = document.getElementById("yellow");
let greenBrush = document.getElementById("green");

let eraserEnabled = false;
let usingEraser = false;


/**
 * 设置canvas与页面同宽高
 */
let pageWidth = document.documentElement.clientWidth;
let pageHeight = document.documentElement.clientHeight;
canvas.width = pageWidth;
canvas.height = pageHeight;

window.onresize = function(){
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

// document.body.ontouchstart = function(e){
//     e.preventDefault();
// }

/**
 * 监听用户鼠标动作，对应相应操作(画与擦)
 * 
 */
if(document.body.ontouchstart === undefined){
    canvas.onmousedown = function(e){
        let x,y;
        x = e.clientX;
        y = e.clientY;
        position = {'x': x,'y': y};
        painting = true;
        if(eraserEnabled){
            usingEraser = true;
        }
        if(usingEraser){
            eraser(x,y);
        }
    }
    canvas.onmousemove = function(e){
        let x,y,nextPosition;
        x = e.clientX;
        y = e.clientY;
        nextPosition = {'x': x, 'y': y};
        if(!usingEraser){
            if(painting){
                //drawCircle(x,y,5)
                drawLine(position.x,position.y,nextPosition.x,nextPosition.y);
                position = nextPosition;
            }
        }else{
            eraser(x,y);
        }
    }
    canvas.onmouseup = function(e){
        painting = false;
        if(eraserEnabled){
            usingEraser = false;
        }
    }
}else{
    canvas.ontouchstart = function(e){
        e.preventDefault();
        let x,y;
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
        position = {'x': x,'y': y};
        painting = true;
        if(eraserEnabled){
            usingEraser = true;
        }
        if(usingEraser){
            eraser(x,y);
        }
    }
    canvas.ontouchmove = function(e){
        let x,y,nextPosition;
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
        nextPosition = {'x': x, 'y': y};
        if(!usingEraser){
            if(painting){
                //drawCircle(x,y,5)
                drawLine(position.x,position.y,nextPosition.x,nextPosition.y);
                position = nextPosition;
            }
        }else{
            eraser(x,y);
        }
    }
    canvas.ontouchend = function(e){
        painting = false;
        if(eraserEnabled){
            usingEraser = false;
        }
    }   
}


/**
 * 启用橡皮擦,画笔,清屏或下载
 */
eraserButton.onclick = function(){
    eraserEnabled = true;
    eraserButton.classList.add("active");
    brush.classList.remove("active");
}

brush.onclick = function(){
    eraserEnabled = false;
    brush.classList.add("active");
    eraserButton.classList.remove("active");
}

clear.onclick = function(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
download.onclick = function(){
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvas.toDataURL("image/png");
    a.download = "canvas";
    a.click();
}


/**
 * 画笔颜色
 */
redBrush.onclick = function(){
    ctx.strokeStyle = "red";
    redBrush.classList.add("active");
    yellowBrush.classList.remove("active");
    greenBrush.classList.remove("active");
}

yellowBrush.onclick = function(){
    ctx.strokeStyle = "yellow";
    yellowBrush.classList.add("active");
    redBrush.classList.remove("active");
    greenBrush.classList.remove("active");
}

greenBrush.onclick = function(){
    ctx.strokeStyle = "green";
    greenBrush.classList.add("active");
    redBrush.classList.remove("active");
    yellowBrush.classList.remove("active");
}



/******** 工具函数 *********/


//以(x,y)为圆心radius为半径画圆
function drawCircle(x,y,radius){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

//从点(x1,y1)画到点(x2,y2)
function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}

//擦除(x,y)点画迹
function eraser(x,y){
    ctx.clearRect(x-5,y-5,10,10);
}