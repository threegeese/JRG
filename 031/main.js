let n = 1;
$(".images > img:nth-child(1)").addClass("display");
$(".images > img:nth-child(2)").addClass("queue");

setInterval(() => {
    $(`.images > img:nth-child(${n}`).addClass("dequeue").removeClass("display")
    .one("transitionend", (e) => {
        $(e.currentTarget).addClass("queue").removeClass("dequeue");
    });
    if(n === 5) {
        n = 0;
    }
    $(`.images > img:nth-child(${n+1}`).removeClass("queue").addClass("display");
    n += 1;
},2000)