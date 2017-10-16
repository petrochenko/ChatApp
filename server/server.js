const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
let app = express();
const port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.emit('newMessage', {
    from: 'John',
    text: 'See you then!',
    createdAt: 1234567890
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage: ', message);
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected.');
  });
});

if (!module.parent) {
  server.listen(port, () => {
    console.log(`Server is up on + ${port}`);
  });
}
