const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.PORT || 4175);
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.ttf':'font/ttf'};
http.createServer((req,res)=>{
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const file = path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()) {
      res.writeHead(404);res.end('Not found');return;
    }
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  } catch {res.writeHead(400);res.end('Invalid request');}
}).listen(port,'127.0.0.1',()=>console.log(`ZOZO Lab preview: http://127.0.0.1:${port}/`));
