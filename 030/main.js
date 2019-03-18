/**
 * 原生js
 */
let carousel = document.getElementById("carousel");
let imgs = document.getElementsByTagName("img");
let img = document.getElementsByClassName("imgs")[0];
let buttons = document.getElementsByTagName("button");
for(let i=0; i<buttons.length; i++){
    buttons[i].onclick = function(e) {
        let px = -500 * i;
        img.style.left = px + "px";
        for(let j=0; j<buttons.length; j++){
            if(j !== i) {
                buttons[j].style.color = "";
            }
            e.currentTarget.style.color = "red";
        }
    }
}


let timer = player();
carousel.onmouseover = function() {
    clearInterval(timer)
}
carousel.onmouseleave = function() {
    timer = player();
}

function player() {
    let i = 0;
    return setInterval(() => {
        let px = -500 * i;
        img.style.left = px + "px";
        for(let j=0; j<buttons.length; j++){
            if(j !== i) {
                buttons[j].style.color = "";
            }else {
                buttons[j].style.color = "red";
            }
        }
        if(i === 5) {
            i = 0;
        }else{
            i += 1;
        }
    },1500)
}








/**
 * jQuery
 */