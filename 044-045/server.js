let http = require('http');
let fs = require('fs');
let url = require('url');
let port = process.argv[2];

if (!port) {
    console.log('请指定端口号？\nnode server.js 8888');
    process.exit(1);
}

let server = http.createServer(function (request, response) {
    let parsedUrl = url.parse(request.url, true);
    let pathWithQuery = request.url;
    let queryString = '';
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')); 
    };
    let path = parsedUrl.pathname;
    let query = parsedUrl.query;
    let method = request.method;

    console.log('请包含查询字符串的路径\n' + pathWithQuery)

    if (path === '/sign_up' && method === 'GET') {
        let string = fs.readFileSync('./sign_up.html', 'utf8');
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write(string);
        response.end();
    } else if (path === '/sign_up' && method === 'POST') {
        readBody(request).then((body) => {
            let strings = body.split('&');
            let hash = {};
            strings.forEach((string) => {
                let parts = string.split('=');
                let key = parts[0];
                let value = parts[1];
                hash[key] = decodeURIComponent(value);
            })
            let { email, password, password_confirmation } = hash;
            if (email.indexOf('@') === -1) {
                response.statusCode = 400;
                response.setHeader('Content-Type', 'application/json;charset=utf-8')
                response.write(`{
                    "errors": {
                        "email": "invalid"
                    }
                }`);
            } else if (password !== password_confirmation) {
                response.statusCode = 400;
                response.write('password not match');
            } else {
                let users = fs.readFileSync('./db/users', 'utf8');
                try {
                    users = JSON.parse(users);
                } catch (exception) {
                    users = [];
                }
                let inUse = false;
                for (let i = 0; i < users.length; i++) {
                    let user = users[i];
                    if (user.email === email) {
                        inUse = true;
                        break;
                    }
                }
                if (inUse) {
                    response.statusCode = 400;
                    response.write('email in use');
                } else {
                    users.push({ email: email, password: password });
                    let usersString = JSON.stringify(users);
                    fs.writeFileSync('./db/users', usersString);
                    response.statusCode = 200;
                }
            }
            response.end();
        })
    } else if (path === '/sign_in' && method === 'GET') {
        let string = fs.readFileSync('./sign_in.html', 'utf8');
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write(string);
        response.end();
    } else if (path === '/sign_in' && method === 'POST') {
        readBody(request).then((body) => {
            let strings = body.split('&');
            let hash = {};
            strings.forEach((string) => {
                let parts = string.split('=');
                let key = parts[0];
                let value = parts[1];
                hash[key] = decodeURIComponent(value);
            })
            let { email, password } = hash;
            let users = fs.readFileSync('./db/users', 'utf8')
            try {
                users = JSON.parse(users);
            } catch (exception) {
                users = [];
            }
            let found;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email && users[i].password === password) {
                    found = true;
                    break;
                }
            }
            if (found) {
                response.setHeader('Set-Cookie', `sign_in_email=${email}`);
                response.statusCode = 200;
            } else {
                response.statusCode = 401;
            }
            response.end();
        })
    }else {
        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.write(`
            {
                "error": "not found"
            }
        `)
        response.end();
    }

});

server.listen(port);
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port);

function readBody(request) {
    return new Promise((resolve, reject) => {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(body);
        })
    });
}