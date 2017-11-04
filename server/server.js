require('../.config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

let app = express();
const server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

const port = process.env.PORT;
server.listen(port, () => {
 console.log(`Started up at port ${port}`)
});

require('./module/server.emiter.js')(io);
module.exports = { app, server };