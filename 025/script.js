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

let atags = document.querySelectorAll("nav > ul > li > a");
for(let i=0; i<atags.length; i++){
    console.log(atags[i]);
    atags[i].onclick = function(e) {
        e.preventDefault();
        let a = e.currentTarget;
        let href = a.getAttribute("href");
        try {
            let ele = document.querySelector(href);
            let top = ele.offsetTop;
            window.scrollTo(0,top - 80);
        } catch (error) {
            //console.log("#");
        }
    }
}