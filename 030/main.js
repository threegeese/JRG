/**
 * 原生js
 */
// let img = document.getElementsByClassName("imgs")[0];
// let imgs = document.getElementsByTagName("img");
// let $buttons = document.getElementsByTagName("button");
// for(let i=0; i<$buttons.length; i++){
//     $buttons[i].onclick = function(e) {
//         let px = -500 * i;
//         img.style.left = px + "px";
//         for(let j=0; j<$buttons.length; j++){
//             if(j !== i) {
//                 $buttons[j].style.color = "";
//             }
//             e.currentTarget.style.color = "black";
//         }
//     }
// }

// let timer = player();
// img.onmouseover = function() {
//     clearInterval(timer)
// }
// img.onmouseleave = function() {
//     timer = player();
// }

// let i = 0;
// function player() {
//     return setInterval(() => {
//         let px = -500 * i;
//         img.style.left = px + "px";
//         for(let j=0; j<$buttons.length; j++){
//             if(j !== i) {
//                 $buttons[j].style.color = "";
//             }else {
//                 $buttons[j].style.color = "black";
//             }
//         }
//         if(i === 5) {
//             i = 0;
//         }else{
//             i += 1;
//         }
//     },1500)
// }


/**
 * jQuery
 */
let $buttons = $("#carousel > .buttons > button");
for(let i=0; i<$buttons.length; i++){
    $($buttons[i]).on('click',function(e) {
        let index = $(e.currentTarget).index();
        let px = -500 * index;
        $('.imgs').css({
            transform: 'translate(' + px + 'px)',
        })
        //链式操作
        activeBtn($buttons.eq(index));
    });
}


let index = 0;  //暴露了~_~
let timer = carousel(1500);
$('#carousel > .imgs').on('mouseenter',()=> {
    clearInterval(timer);
});

$('#carousel > .imgs').on('mouseleave',()=> {
    timer = carousel(1500);
});

function activeBtn($btn) {
    $btn.addClass('active').siblings().removeClass('active');
}

function carousel(time) {
    if(!time) {
        time = 1500
    }
    return setInterval(() => {
       $buttons.eq(index).trigger('click');
       if(index === 5) {
            index = 0
       }else {
            index += 1;
       }
    },time)
}