var keys = {
    0: ['q','w','e','r','t','y','u','i','o','p'],
    1: ['a','s','d','f','g','h','j','k','l'],
    2: ['z','x','c','v','b','n','m'],
    length: 3
};

var hash = {
    q: 'qq.com',
    w: 'weibo.com',
    e: 'ele.me',
    r: 'renren.com',
    t: 'tianya.com',
    y: 'youtube.com',
    u: 'uc.com',
    i: 'iqiyi.com',
    o: 'opera.com',
    p: undefined,
    a: 'acfun.tv',
    s: 'sohu.com',
    z: 'zhihu.com',
    m: 'www.mcdonalds.com.cn',
};

//
var hashInLocalStorage = JSON.parse(localStorage.getItem('nextHash') || 'null');

if(hashInLocalStorage){
    hash = hashInLocalStorage;
}

// 生成HTML
var row = 0;
var kbdWrapper = document.getElementById('kbdWrapper');
while(row < keys.length){
    var div,kbd,buttons,imgIcon,spans;
    div = document.createElement('div');
    div.className = "row";
    kbdWrapper.appendChild(div);
    for(let index=0; index<keys[row].length; index++){
        kbd = document.createElement('kbd');
        buttons = document.createElement('button');
        imgIcon = document.createElement('img');
        spans = document.createElement('span');

        spans.textContent = keys[row][index];
        buttons.textContent = 'E';
        buttons.id = keys[row][index];
        if(hash[keys[row][index]]){
            imgIcon.src = "http://" + hash[keys[row][index]] + "/favicon.ico";
        }else {
            imgIcon.src = "./img/5a05afbc5e183.png";
        }

        imgIcon.onerror = function(e){
            e.target.src = "./img/5a05afbc5e183.png";
        }

        div.appendChild(kbd);
        kbd.appendChild(spans);
        kbd.appendChild(buttons);
        kbd.appendChild(imgIcon);
    }
    row++;
}

//
var website;
document.onkeypress = function(e){
    website = hash[e.key];
    if(website !== undefined){
        website = "http://" + website;
        window.open(website,"_blank");
    }
}

//按键
var buttonKey = document.getElementsByTagName('button');
var regExp = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
for(let i=0; i<buttonKey.length; i++){
    buttonKey[i].onclick = function(e){
        var ws = prompt('Please give me a website');
        var key = e.target.id;
        var img = e.target.previousSibling;
        if(regExp.test(ws)){
            hash[key] = ws;
            img.src = "http://" + ws + "/favicon.ico";

            img.onerror = function(e){
                e.target.src = "./img/5a05afbc5e183.png";
            }

            localStorage.setItem('nextHash',JSON.stringify(hash));
        }else if(ws !== null) {
            alert("Error website name!");
        }
    }
}
