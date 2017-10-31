let socket = io();
const messageList = document.querySelector('.chat__messages');
const chatForm = document.getElementById('chat-form');
const locationBtn = document.getElementById('send-location');
const usersWrapper = document.getElementById('users')

socket.on('connect', () => {
  let params = getQueryParams();
  socket.emit('join', params, (err) => {
    if (err) {
      console.error(err);
      alert(err);
      window.location.href = '/';
    }
  });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});

socket.on('updateUserList', (users) => {
  usersWrapper.innerHTML = createUserList(users);
});

socket.on('newMessage', (message) => {
  messageList.append(createNewMessage(message));
  scrollToBottom(messageList, 300);
});

socket.on('newLocationMessage', (message) => {
  messageList.append(createNewLocationMessage(message));
  scrollToBottom(messageList, 300);
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let elements = event.target.elements;
  let message = {};
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
