// Per-execution file-backed fixture service; it never reads a shared or production database.
require('./guard.cjs');
const http = require('node:http'), fs = require('node:fs'), path = require('node:path');
const file = path.join(process.env.A0_TEST_DATA,'value.json');
fs.writeFileSync(file, JSON.stringify({value:''}));
http.createServer((request,response) => {
  if(request.url === '/ready') return response.end('ready');
  if(request.url !== '/value') { response.writeHead(404); return response.end(); }
  response.setHeader('content-type','application/json');
  if(request.method === 'GET') return response.end(fs.readFileSync(file));
  let data=''; request.on('data', chunk => { data += chunk; if(data.length > 2048) request.destroy(); });
  request.on('end', () => { const value=JSON.parse(data); fs.writeFileSync(file, JSON.stringify(value)); response.end(JSON.stringify(value)); });
}).listen(Number(process.env.PORT),process.env.HOST);
