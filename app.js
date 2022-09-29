const http = require('http');
require('dotenv').config({ path: './.env' });
const app = http.createServer();
const publishToQueue = require('./jobs/publisher');
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(val)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
publishToQueue('spot', {
  email: 'orebayopelumi@gmail.com',
  subject: 'Welocome',
  message: 'Hello'
});

const PORT = normalizePort(process.env.PORT) || 8000;
const server = app.on('listening', () => {
  const log = 'Connecting [??...]';
  console.log(log);
  console.log(`Application running on port ${PORT}`);
});
server.listen(PORT);
