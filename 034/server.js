var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号!')
  process.exit(1)
}

var server = http.createServer(function(request, response){
var parsedUrl = url.parse(request.url, true)
var path = request.url 
var query = ''
if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
var pathNoQuery = parsedUrl.pathname
var queryObject = parsedUrl.query
var method = request.method

/******** 从这里开始看，上面不要看 ************/

console.log('HTTP 路径为\n' + path)
if(path === '/') {
    var string = fs.readFileSync("./index.html","utf8");
    var amount = fs.readFileSync("./db","utf8");
    string = string.replace("$$$amount$$$",amount);
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write(string);
    response.end();
} else if(path === '/pay') {
    var amount = fs.readFileSync("./db","utf8");
    fs.writeFileSync("./db", amount - 1);
    response.setHeader("Content-Type","application/javascript; charset=utf-8");
    response.write(`
        //amount.innerText = amount.innerText - 1;
        ${query.callback}.call(undefined,"success");
    `);
    response.end();
}else {
    response.statusCode = 404
    response.end()
}

/******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请尝试打开 http://localhost:' + port)