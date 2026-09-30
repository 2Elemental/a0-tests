// Fixture frontend performs a real backend save and reload.
require('./guard.cjs');
const http = require('node:http');
const html = `<!doctype html><title>Persistence fixture</title><label>Name <input id="name"></label><button id="save">Save</button><p id="saved" role="status"></p><script>
async function load(){const r=await fetch('/api/value');const data=await r.json();document.querySelector('#saved').textContent=data.value;}
document.querySelector('#save').onclick=async()=>{await fetch('/api/value',{method:'POST',body:JSON.stringify({value:document.querySelector('#name').value})});await load();};load();</script>`;
http.createServer((request,response) => {
  if(request.url === '/ready') return response.end('ready');
  if(request.url.startsWith('/api/')) {
    const upstream=http.request({hostname:'127.0.0.1',port:4121,path:'/value',method:request.method},received=>{response.writeHead(received.statusCode,received.headers);received.pipe(response);});
    upstream.on('error',()=>{response.writeHead(503);response.end();});return request.pipe(upstream);
  }
  response.setHeader('content-type','text/html');response.end(html);
}).listen(Number(process.env.PORT),process.env.HOST);
