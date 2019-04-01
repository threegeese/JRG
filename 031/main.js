init();

let n = 1;
let timer = play();
$(".window").on("mouseenter",() => {
    clearInterval(timer);
});

$(".window").on("mouseleave",() => {
    timer = play();
});


function init() {
    $(".images > img:nth-child(1)").addClass("display");
    $(".images > img:nth-child(1)").siblings().addClass("queue");
}

function play() {
    return setInterval(() => {
        $(`.images > img:nth-child(${n}`).addClass("dequeue").removeClass("display")
        .one("transitionend", (e) => {
            $(e.currentTarget).addClass("queue").removeClass("dequeue")
        });
        if(n === 5) {
            n = 0;
        }
        $(`.images > img:nth-child(${n+1}`).removeClass("queue").addClass("display");
        n += 1;
    },2000)
}