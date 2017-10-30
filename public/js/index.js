let socket = io();
const messageList = document.querySelector('.chat__messages');
let createNewMessage = (message) => {
  message['createdAt'] = moment(message['createdAt']).format('DD-MM-YYYY / h:mm:ss a');
  let template = document.getElementById('message-template').innerHTML;
  return stringToDomObject(Mustache.render(template, message));
};

let createNewLocationMessage = (message) => {
  message['createdAt'] = moment(message['createdAt']).format('DD-MM-YYYY / h:mm:ss a');
  let template = document.getElementById('location-message-template').innerHTML;
  return stringToDomObject(Mustache.render(template, message));
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
  scrollToBottom(messageList, 300);
});

socket.on('newLocationMessage', (message) => {
  console.log('New Location message', message);
  messageList.append(createNewLocationMessage(message));
  scrollToBottom(messageList, 300);
});

const chatForm = document.querySelector('#chat-form');
const locationBtn = document.querySelector('#send-location');
const footer = document.querySelector('.chat__footer');

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
    data => {
      elements['text'].value = '';
    });
});

locationBtn.addEventListener('click', (event) => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  locationBtn.disabled = true;
  locationBtn.innerText = 'Sending location...';

  navigator.geolocation.getCurrentPosition((position) => {
    locationBtn.disabled = false;
    locationBtn.innerText = 'Send location';
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationBtn.disabled = true;
    locationBtn.innerText = 'Sending location...';
    alert('Unable to fetch location.');
  });
});

function stringToDomObject(string) {
  let wrapper = document.createElement('div');
  wrapper.innerHTML = string;
  return wrapper.firstElementChild;
}

function scrollToBottom(el, timeDuration) {
  if (el.offsetHeight >= el.scrollHeight) return;
  let step = el.scrollHeight / (timeDuration / 15);
  let count = el.scrollHeight;
  let interval;
  interval = setInterval(() => {
    el.scrollTop += step;
    count -= step;
    if (count < 0) {
      clearInterval(interval);
    }
  }, 15);
}
