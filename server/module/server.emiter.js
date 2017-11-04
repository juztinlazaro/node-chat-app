const socketIO = require('socket.io');

module.exports = function(io) {
	io.on('connection', (socket) => {
		console.log('new user connect');

		socket.on('disconnect', () => {
			console.log('User was disconnected');
		});

		socket.on('createMessage', (message) => {
			console.log('data from client side', message);
			io.emit('newMessage', {
				from: message.from,
				text: message.text,
				createAt: new Date().getTime()
			});
		})
	});
}

