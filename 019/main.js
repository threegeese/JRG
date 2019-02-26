let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let painting = false;
let position = {'x': undefined, 'y': undefined};


let eraserButton = document.getElementById("eraser");
let actions = document.getElementById("actions");
let brush = document.getElementById("brush");
let eraserEnabled = false;
let usingEraser = false;


/**
 * 设置canvas与页面同高
 */
let pageWidth = document.documentElement.clientWidth;
let pageHeight = document.documentElement.clientHeight;
canvas.width = pageWidth;
canvas.height = pageHeight;

window.onresize = function(){
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

/**
 * 监听用户鼠标动作，对应相应操作(画与擦)
 */
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

/**
 * 橡皮擦与画笔
 */
eraserButton.onclick = function(){
    eraserEnabled = true;
    actions.setAttribute("class","actions etb");
}

brush.onclick = function(){
    eraserEnabled = false;
    actions.setAttribute("class","actions");
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
    ctx.strokeStyle = "blue";
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