import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '0.0.0.0';
const types = new Map([
  ['.html', 'text/html; charset=utf-8'], ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'], ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'], ['.ico', 'image/x-icon'], ['.json', 'application/json; charset=utf-8']
]);

createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', 'http://localhost');
    const decoded = decodeURIComponent(url.pathname);
    const requested = decoded.endsWith('/') ? decoded + 'index.html' : decoded;
    const file = path.resolve(root, '.' + requested);
    if (file !== root && !file.startsWith(root + path.sep)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) throw new Error('Not a file');
    const content = await readFile(file);
    response.writeHead(200, {
      'Content-Type': types.get(path.extname(file)) || 'application/octet-stream',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer'
    });
    response.end(content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
  }
}).listen(port, host, () => console.log('IntraNest web preview listening on ' + host + ':' + port));
