$(".images > img:nth-child(1)").addClass("display");
$(".images > img:nth-child(2)").addClass("queue");

/*setTimeout(() => {
    $(".images > img:nth-child(1)").addClass("dequeue").removeClass("display")
    .one("transitionend", (e) => {
        $(e.currentTarget).addClass("queue").removeClass("dequeue");
    });
    $(".images > img:nth-child(2)").removeClass("queue").addClass("display");
},2000)

setTimeout(() => {
    $(".images > img:nth-child(2)").addClass("dequeue").removeClass("display")
    .one("transitionend", (e) => {
        $(e.currentTarget).addClass("queue").removeClass("dequeue");
    });
    $(".images > img:nth-child(3)").removeClass("queue").addClass("display");
},4000)

setTimeout(() => {
    $(".images > img:nth-child(3)").addClass("dequeue").removeClass("display")
    .one("transitionend", (e) => {
        $(e.currentTarget).addClass("queue").removeClass("dequeue");
    });
    $(".images > img:nth-child(4)").removeClass("queue").addClass("display");
},6000)

setTimeout(() => {
    $(".images > img:nth-child(4)").addClass("dequeue").removeClass("display")
    .one("transitionend", (e) => {
        $(e.currentTarget).addClass("queue").removeClass("dequeue");
    });
    $(".images > img:nth-child(5)").removeClass("queue").addClass("display");
},8000)

setTimeout(() => {
    $(".images > img:nth-child(5)").addClass("dequeue").removeClass("display")
    .one("transitionend", (e) => {
        $(e.currentTarget).addClass("queue").removeClass("dequeue");
    });
    $(".images > img:nth-child(1)").removeClass("queue").addClass("display");
},10000)
*/
let n = 1;
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