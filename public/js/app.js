// starting / maintaining iniatite the request IO
var socket = io();
socket.on('connect', function() {
	console.log('Connected to server');
	socket.emit('createMessage', {
		from: 'Justin.client',
		text: 'Hey im your client'
	});
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('message from server', message);
});
