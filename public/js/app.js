// starting / maintaining iniatite the request IO
var socket = io();

socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log(`newMessage from ${message.from}:`, message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

//event emiter
// socket.emit('createMessage', {
// 	from: 'Frank',
// 	text: 'yooo'
// }, function(data) {
// 	console.log('GOT IT, ', data);
// });

socket.on('newLocationMessage', function(data) {
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current location</a>');
  li.text(`${data.from}:`);
  a.attr('href', data.url);
  li.append(a);
  $('#messages').append(li);
});

var message_form = $('#message-form');

message_form.on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {

	});
});

var locationButton = $('#send-location');

locationButton.on('click', function() {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported by your browser');
	}

	navigator.geolocation.getCurrentPosition(function(position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function() {
		alert('Unable to fetch location.');
	});
});