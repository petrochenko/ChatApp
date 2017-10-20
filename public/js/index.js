let socket = io();
const messageList = document.querySelector('.message-list');
let createNewMessage = (message) => {
  let date = new Date(message.createdAt);
  let newMessage = document.createElement("div");
  newMessage.setAttribute('class', 'message-item');
  newMessage.innerHTML = `
    <div class="message-item-date">
      ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} / 
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
    </div>
    <div class="message-item-from">From: ${message.from}</div>
    <div class="message-item-body">Message:</div>
    <div class="message-item-body">${message.text}</div>
  `;
  return newMessage;
};

let createNewLocationMessage = (message) => {
  let date = new Date(message.createdAt);
  let newMessage = document.createElement("div");
  newMessage.setAttribute('class', 'message-item');
  newMessage.innerHTML = `
    <div class="message-item-date">
      ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} / 
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
    </div>
    <div class="message-item-from">From: ${message.from}</div>
    <div class="message-item-body">Location: 
      <a href="https://www.google.com/maps?q=${message.latitude},${message.longitude}" target="_blank">look at the map</a>
    </div>
  `;
  return newMessage;
};

socket.on('connect', () => {
  console.log('Connected to server.');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});

socket.on('newMessage', (message) => {
  console.log('New message', message);
  messageList.append(createNewMessage(message));
});

socket.on('newLocationMessage', (message) => {
  console.log('New Location message', message);
  messageList.append(createNewLocationMessage(message));
});

const chatForm = document.querySelector('#chat-form');
const locationBtn = document.querySelector('#send-location');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let elements = event.target.elements;
  let message = {from: 'User'};
  for (let element of elements) {
    if (element.tagName === 'BUTTON') {
      continue;
    }
    message[element.name] = element.value
  }
  socket.emit('createMessage',
    message,
    data => console.log('Got it.', data));
});

locationBtn.addEventListener('click', (event) => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    alert('Unable to fetch location.');
  });
});
