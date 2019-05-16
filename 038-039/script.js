// portfolio1.onclick = function() {
//     portfolioBar.className = 'bar state-1'
// }
// portfolio2.onclick = function() {
//     portfolioBar.className = 'bar state-2'
// }
// portfolio3.onclick = function() {
//     portfolioBar.className = 'bar state-3'
// }

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

var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});





/**
 * leancould
 */


// 初始化
// var APP_ID = 'iw2yCnCeNTAoI2OaeH9U9Cjh-gzGzoHsz';
// var APP_KEY = 'Fu7xLh11SSKTzoC2etW3CzpV';
// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY
// });

// // 获取留言并展示
// let msgList = document.querySelector("#showMsg");
// var query = new AV.Query('Message');
// query.find().then(function(msg) {
//     //console.log(msg)
//     let arr = msg.map((item) => item.attributes);
//     //console.log(arr);
//     arr.forEach((item) => {
//         let li = document.createElement("li");
//         li.innerText = `${item.name}: ${item.content}`;
//         msgList.appendChild(li);
//     });
// });

// // 留言
// let msgForm = document.querySelector("#postMsgForm");
// msgForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     let name = msgForm.querySelector('input[name=name]').value;
//     let content = msgForm.querySelector('input[name=content]').value;
//     var Message = AV.Object.extend('Message');
//     var msg = new Message();
//     msg.save({
//         'name': name,
//         'content': content
//     }).then(function(object) {
//         let li = document.createElement("li");
//         li.innerText = `${object.attributes.name}: ${object.attributes.content}`;
//         msgList.appendChild(li);
//         msgForm.querySelector("input[name=content]").value = '';
//     })
// });



/**
 * MVC
 */
!function() {

    var view = document.querySelector("section.messageBoard");

    var model = {

        init: function() {
            var APP_ID = 'iw2yCnCeNTAoI2OaeH9U9Cjh-gzGzoHsz';
            var APP_KEY = 'Fu7xLh11SSKTzoC2etW3CzpV';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },

        // 获取数据
        fetch: function() {
            var query = new AV.Query('Message');
            return query.find();    // 返回 Promise 对象
        },

        // 保存数据
        save: function(name, content) {
            var Message = AV.Object.extend('Message');
            var msg = new Message();
            return msg.save({   // 返回 Promise 对象
                'name': name,
                'content': content
            });
        }

    }

    var controller = {

        view: null,
        msgList: null,
        form: null,
        model: null,


        init: function(view, model) {
            this.view = view;
            this.model = model;
            this.msgForm = view.querySelector("#postMsgForm");
            this.msgList = view.querySelector("#showMsg");
            this.model.init();
            this.loadMsg();
            this.bindEvents();
        },

        loadMsg: function() {
            this.model.fetch().then((msg) => {
                //console.log(msg)
                let arr = msg.map((item) => item.attributes);
                //console.log(arr);
                arr.forEach((item) => {
                    let li = document.createElement("li");
                    li.innerText = `${item.name}: ${item.content}`;
                    this.msgList.appendChild(li);
                });
            });
        },

        bindEvents: function() {
            this.msgForm.addEventListener("submit", (e) => {
                e.preventDefault();
                this.saveMsg();
            });
        },

        saveMsg: function() {
            let name = this.msgForm.querySelector('input[name=name]').value;
            let content = this.msgForm.querySelector('input[name=content]').value;
            this.model.save(name, content).then((object) => {
                let li = document.createElement("li");
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`;
                this.msgList.appendChild(li);
                this.msgForm.querySelector("input[name=content]").value = '';
            });
        }

    };

    controller.init(view, model);

}.call();