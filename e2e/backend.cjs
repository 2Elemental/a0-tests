// Fixture backend proxies only its owned persistence service.
require('./guard.cjs');
const http = require('node:http');
http.createServer((request,response) => {
  if(request.url === '/ready') return response.end('ready');
  const upstream = http.request({hostname:'127.0.0.1',port:4122,path:'/value',method:request.method}, received => {
    response.writeHead(received.statusCode,received.headers); received.pipe(response);
  });
  upstream.on('error',()=>{response.writeHead(503);response.end();}); request.pipe(upstream);
}).listen(Number(process.env.PORT),process.env.HOST);
