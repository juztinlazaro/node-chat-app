require('../.config/config.js');
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

//listen in events
io.on('connection', (socket) => {
	console.log('new user connect');

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	})
});

const port = process.env.PORT;
server.listen(port, () => {
 console.log(`Started up at port ${port}`)
});

module.exports = { app };