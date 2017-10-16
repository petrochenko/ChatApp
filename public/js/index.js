let socket = io();

socket.on('connect', () => {
  console.log('Connected to server.');

  socket.emit('createMessage', {
    from: 'sergey@example.com',
    text: 'Yep, that works for me.'
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});

socket.on('newMessage', (message) => {
  console.log('New message', message);
});

