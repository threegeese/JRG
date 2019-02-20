const keys = {
    0: ['q','w','e','r','t','y','u','i','o','p'],
    1: ['a','s','d','f','g','h','j','k','l'],
    2: ['z','x','c','v','b','n','m'],
    length: 3
};

let hash = {
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
let hashInLocalStorage = JSON.parse(localStorage.getItem('nextHash') || 'null');

if(hashInLocalStorage){
    hash = hashInLocalStorage;
}

// 生成HTML
let row = 0;
let kbdWrapper = document.getElementById('kbdWrapper');
while(row < keys.length){
    let div,kbd,buttons,index = 0;
    div = document.createElement('div');
    kbdWrapper.appendChild(div);
    while(index < keys[row].length){
        kbd = document.createElement('kbd');
        kbd.textContent = keys[row][index];
        div.appendChild(kbd);
        buttons = document.createElement('button');
        kbd.appendChild(buttons);
        buttons.textContent = 'E';
        buttons.id = keys[row][index];
        index++;
    }
    row++;
}

//键盘监听
let website;
document.onkeypress = function(e){
    website = hash[e.key];
    if(website !== undefined){
        website = "http://" + website;
        window.open(website,"_blank");
    }
}

//按键
let buttonKey = document.getElementsByTagName('button');
let regExp = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
for(let i=0; i<buttonKey.length; i++){
    buttonKey[i].onclick = function(e){
        let ws = prompt('Please give me a website');
        let key = e.target.id;
        if(regExp.test(ws)){
            hash[key] = ws;
            localStorage.setItem('nextHash',JSON.stringify(hash));
        }else if(ws !== null) {
            alert("Error website name!");
        }
    }
}
