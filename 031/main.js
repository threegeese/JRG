setTimeout(() => {
    $(".images > img:nth-child(2)").css({
        transform: "translateX(-100%)"
    });
    $(".images > img:nth-child(1)").css({
        transform: "translateX(-100%)"
    }).one("transitionend",(e) => {
        $(e.currentTarget).addClass("right").css({
            transform: "none"
        });
    })
},2000);

setTimeout(() => {
    $(".images > img:nth-child(3)").css({
        transform: "translateX(-100%)"
    });
    $(".images > img:nth-child(2)").css({
        transform: "translateX(-200%)"
    }).one("transitionend",(e) => {
        $(e.currentTarget).addClass("right").css({
            transform: "none"
        });
    });
},4000)

setTimeout(() => {
    $(".images > img:nth-child(4)").css({
        transform: "translateX(-100%)"
    });
    $(".images > img:nth-child(3)").css({
        transform: "translateX(-200%)"
    }).one("transitionend",(e) => {
        $(e.currentTarget).addClass("right").css({
            transform: "none"
        });
    });
},6000);

setTimeout(() => {
    $(".images > img:nth-child(5)").css({
        transform: "translateX(-100%)"
    });
    $(".images > img:nth-child(4)").css({
        transform: "translateX(-200%)"
    }).one("transitionend",(e) => {
        $(e.currentTarget).addClass("right").css({
            transform: "none"
        });
    });
},8000);

setTimeout(() => {
    $(".images > img:nth-child(1)").css({
        transform: "translateX(-100%)"
    });
    $(".images > img:nth-child(5)").css({
        transform: "translateX(-200%)"
    }).one("transitionend",(e) => {
        $(e.currentTarget).addClass("right").css({
            transform: "none"
        });
    });
},10000);