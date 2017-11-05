const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('../utils/message');

module.exports = function(io) {
	io.on('connection', (socket) => {
		console.log('new user connect');
		//remind server one of the client has discoonn
		socket.on('disconnect', () => {
			socket.broadcast.emit('newMessage',  generateMessage('admin', '1 user discounted'));
		});

		//emit all 
		socket.emit('newMessage', generateMessage('admin', 'Welcome to the public chat'));

		socket.broadcast.emit('newMessage',  generateMessage('admin', 'New user join'));

		//event listener
		socket.on('createMessage', (message, callback) => {
			console.log('createMessage', message);
			io.emit('newMessage', generateMessage(message.from, message.text));
			callback('This is from the server');
			// socket.broadcast.emit('newMessage', {
			// 	from: message.from, 
			// 	text: message.text,
			// 	createAt: new Date().getTime()
			// });
		});

		//listener for create location
		socket.on('createLocationMessage', (coords) => {
			io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
		});
	});
}

