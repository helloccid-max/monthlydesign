const http = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const defaultPort = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOSTNAME || 'localhost';

const app = next({ dev, hostname, port: defaultPort });
const handle = app.getRequestHandler();

// Do not silently start a second Next dev server on a neighbouring port.
// Two servers from the same checkout share `.next` and can trigger an HMR
// full-refresh loop as they overwrite each other's hot-update manifests.
function tryListen(server, port, maxTries = 0) {
  return new Promise((resolve, reject) => {
    const doListen = (p) => {
      server.listen(p, () => {
        const bound = server.address();
        resolve(bound && typeof bound.port === 'number' ? bound.port : p);
      });
      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE' && p - defaultPort < maxTries) {
          doListen(p + 1);
        } else {
          reject(err);
        }
      });
    };
    doListen(port);
  });
}

app.prepare().then(() => {
  const server = http.createServer();

  import('./lib/socket/server.js')
    .then(({ ensureIO }) => ensureIO(server))
    .then(() => {
      server.on('request', (req, res) => {
        const pathname = (req.url && req.url.split('?')[0]) || '';
        if (pathname.startsWith('/api/socketio')) return;
        if (res.headersSent) return;
        handle(req, res);
      });

      tryListen(server, defaultPort)
        .then((port) => {
          const url = `http://${hostname}:${port}`;
          console.log(`> Ready on ${url}`);
          if (port !== defaultPort) {
            console.log(`> (Port ${defaultPort} was in use. Open the URL above.)`);
          }
          console.log(`> Open in browser: ${url}/mobile or ${url}/wall`);
        })
        .catch((err) => {
          if (err?.code === 'EADDRINUSE') {
            console.error(
              `Port ${defaultPort} is already in use. Reuse the running server or stop it before starting another one.`
            );
          }
          console.error(err);
          process.exit(1);
        });
    })
    .catch((err) => {
      console.error('Socket server init failed:', err);
      process.exit(1);
    });
});
