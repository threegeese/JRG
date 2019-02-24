let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let painting = false;
canvas.onmousedown = function(e){
    let x,y;
    painting = true;
    x = e.clientX;
    y = e.clientY;
    drawCircle(x,y,5);
}

canvas.onmousemove = function(e){
    if(painting){
        let x = e.clientX,y = e.clientY;
        drawCircle(x,y,5)
    }
}

canvas.onmouseup = function(e){
    painting = false;
}




function drawCircle(x,y,radius){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

function drawLine(){

}