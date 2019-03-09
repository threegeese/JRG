portfolio1.onclick = function() {
    portfolioBar.className = 'bar state-1'
}
portfolio2.onclick = function() {
    portfolioBar.className = 'bar state-2'
}
portfolio3.onclick = function() {
    portfolioBar.className = 'bar state-3'
}

let specialTags = document.querySelectorAll('[data-x]');
for(let i =0;i<specialTags.length; i++){
  specialTags[i].classList.add('offset');
}

setTimeout(findClosest(),800);
window.onscroll = function(e){
    window.scrollY > 25 ? topNavBar.classList.add("sticky") : topNavBar.classList.remove("sticky");
    findClosest();
    
}

function findClosest() {
    let dataX = document.querySelectorAll("[data-x]");
    let min = 0;
    for(let i=1; i<dataX.length; i++){
        //如何判断window.scrollY离哪个元素最近?
        //遍历元素，取出最近的即可
        if(Math.abs(dataX[i].offsetTop - window.scrollY) < Math.abs(dataX[min].offsetTop - window.scrollY)){
            min = i;
        }
    }
    dataX[min].classList.remove('offset');
    let ID = dataX[min].getAttribute("id");
    let aTag = document.querySelector('a[href="#' + ID + '"]');
    let li = aTag.parentNode;
    let bro = li.parentNode.children;
    for(let i=0; i<bro.length; i++){
        bro[i].classList.remove("highlight");
    }
    li.classList.add("highlight");
}

    let liTags = document.querySelectorAll("nav > ul > li");
    // let liTags = document.getElementsByClassName("menuTigger");
    for(let i=0; i<liTags.length; i++){
        liTags[i].onmouseenter = function(e) {
            e.currentTarget.classList.add("active");
        }
        liTags[i].onmouseleave = function(e) {
            e.currentTarget.classList.remove("active");
        }
}

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

let aTags = document.querySelectorAll("nav > ul > li > a");
for(let i=0; i<aTags.length; i++){
    aTags[i].onclick = function(e) {
        e.preventDefault();
        let a = e.currentTarget;
        let href = a.getAttribute("href");
        try {
            let ele = document.querySelector(href);
            let top = ele.offsetTop;

            let currentTop = window.scrollY;    //当前高度
            let targetTop = top - 80;           //目标高度
            // let race = (targetTop - currentTop) / 25;   //每次移动的像素,同时控制方向
            // let count = 1;
            // let timer = setInterval(()=>{
            //     if(count === 25){
            //         clearInterval(timer);
            //         return;
            //     }
            //     count++;
            //     window.scrollTo(0,currentTop + race * count);
            // },20);
            
            var coords = { y: currentTop };            // Start at (0, 0)
            var tween = new TWEEN.Tween(coords)     // Create a new tween that modifies 'coords'.
                .to({ y: targetTop }, 800)       // Move to (300, 200) in 1 second.
                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                .onUpdate(function() {              // Called after tween.js updates 'coords'.
                    window.scrollTo(0,coords.y);
                })
                .start();                           // Start the tween immediately.

        } catch (error) {
            //console.log("#");
        }
    }
}

