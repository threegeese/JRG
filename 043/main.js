const CSS = `.code-wrapper {
    height: 50%;
    flex: 1;
}

.pre-wrapper {
    height: 50%;
    background: #ffe600;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.pikachu {
    width: 100%;
    height: 178px;
    position: relative;
}

.nose {
    border-style: solid;
    border-width: 12px;
    border-color: black transparent transparent;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 26px;
    margin-left: -12px;
    animation: nose .23s infinite linear;
}

.eye {
    width: 47px;
    height: 47px;
    background: #2e2e2e;
    border-radius: 50%;
    border: 2px solid #000;
    position: absolute;
}

.eye::after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    border: 2px solid #000;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    left: 4px;
}

.eye.right {
    left: 50%;
    margin-left: 68px;
}

.eye.left {
    right: 50%;
    margin-right: 68px;
}

.face {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    border: 2px solid #000;
    background: #ff0000;
    position: absolute;
    bottom: 28px;
}

.face.right {
    left: 50%;
    margin-left: 96px; 
}

.face.left {
    right: 50%;
    margin-right: 96px;
}

.upperlips {
    width: 68px;
    height: 18px;
    background: #FFE600;
    border: 2px solid black;
    border-top: none;
    position: absolute;
    top: 62px;
}

.upperlips.right {
    border-bottom-left-radius: 40px 22px;
    border-right: none;
    right: 50%;
    transform: rotate(-20deg);
}

.upperlips.left {
    border-bottom-right-radius: 40px 22px;
    border-left: none;
    left: 50%;
    transform: rotate(20deg);
}

.mouth {
    position: absolute;
    left: 50%;
    bottom: 1px;
    margin-left: -160px;
    width: 320px;
    height: 110px;
    overflow: hidden;
}

.tongue {
    width: 140px;
    height: 1000px;
    background: #9b000a;
    border: 2px solid #000;
    border-radius: 100px/500px;
    position: absolute;
    margin-left: -70px;
    left: 50%;
    bottom: 0px;
    overflow: hidden;
}

.tongue::after {
    content: '';
    width: 100px;
    height: 100px;
    background: #ff485f;
    position: absolute;
    left: 50%;
    bottom: -10px;
    margin-left: -50px;
    border-radius: 50%;
}
`;


// !function() {
//     function writeCode(prefix, code, fn) {

//         let container = document.querySelector("#code");
//         let styleTag = document.getElementById("styleTag");
//         let n = 0;
//         let timer = setInterval(() => {
//             if(n >= code.length) {
//                 clearInterval(timer);
//                 fn && fn();
//             }
//             n += 1;
//             container.innerHTML = code.substring(0, n);
//             styleTag.innerHTML = code.substring(0, n);
//             container.scrollTop = container.scrollHeight;
//         }, 10);
//     }

//     writeCode('', CSS);

// }.call();


!function() {

    let duration = 50;
    let buttons = document.querySelectorAll("button");
    for(let i=0; i<buttons.length; i++) {
        buttons[i].onclick = (e) => {
            for(let j=0; j<buttons.length; j++) {
                buttons[j].classList.remove('active');
            }
            e.currentTarget.classList.add('active');
            let speed = e.currentTarget.getAttribute('data-speed');
            switch(speed) {
                case 'slow':
                    duration = 100;
                    break;
                case 'normal':
                    duration = 50;
                    break;
                case 'fast':
                    duration = 10;
                    break;
                default:
                    break;
            }
        }
    }

    function writeCode(prefix, code, fn) {

        let container = document.querySelector("#code");
        let styleTag = document.getElementById("styleTag");
        let n = 0;
        setTimeout(function run() {
            if(n < code.length) {
                setTimeout(run, duration);
            } else {
                fn && fn();
            }
            n += 1;
            container.innerHTML = code.substring(0, n);
            styleTag.innerHTML = code.substring(0, n);
            container.scrollTop = container.scrollHeight;
        }, duration);

    }

    writeCode('', CSS);

}.call();