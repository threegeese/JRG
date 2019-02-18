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
        location.href = "https://" + website;
        //window.open();
    }
}

//按键
let buttonKey = document.getElementsByTagName('button');
for(let i=0; i<buttonKey.length; i++){
    buttonKey[i].onclick = function(e){
        let url = prompt('Please give me a url.');
        let key = e.target.id;
        hash[key] = url;
        localStorage.setItem('nextHash',JSON.stringify(hash));
    }
}
