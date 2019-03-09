portfolio1.onclick = function() {
    portfolioBar.className = 'bar state-1'
}
portfolio2.onclick = function() {
    portfolioBar.className = 'bar state-2'
}
portfolio3.onclick = function() {
    portfolioBar.className = 'bar state-3'
}

window.onscroll = function(e){
    window.scrollY > 25 ? topNavBar.classList.add("sticky") : topNavBar.classList.remove("sticky");
}

let litags = document.querySelectorAll("nav > ul > li");
// let litags = document.getElementsByClassName("menuTigger");
for(let i=0; i<litags.length; i++){
    litags[i].onmouseenter = function(e) {
       e.currentTarget.classList.add("active");
    }
    litags[i].onmouseleave = function(e) {
        e.currentTarget.classList.remove("active");
    }
}

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

let atags = document.querySelectorAll("nav > ul > li > a");
for(let i=0; i<atags.length; i++){
    atags[i].onclick = function(e) {
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

