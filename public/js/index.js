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

let chatForm = document.querySelector('#chat-form');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let elements = event.target.elements;
  let message = {from: 'User'};
  for(let element of elements) {
    if(element.tagName === 'BUTTON'){
      continue;
    }
    message[element.name] = element.value
  }
  socket.emit('createMessage',
    message,
    data => console.log('Got it.', data));
});
