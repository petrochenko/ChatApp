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

let createUserList = (users) => {
  let ol = document.createElement('ol');
  let wrap = document.createElement('div');
  for (let user of users) {
    let li = document.createElement('li');
    li.textContent = user;
    ol.append(li);
  }
  wrap.append(ol);
  return wrap.innerHTML;
};

let stringToDomObject = (string) => {
  let wrapper = document.createElement('div');
  wrapper.innerHTML = string;
  return wrapper.firstElementChild;
};

let scrollToBottom = (el, timeDuration) => {
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
};

let getQueryParams = () => {
  let params = {};
  let paramsString = '';
  if (location.search[0] === '?') {
    paramsString = location.search.substr(1).split('&');
  }
  for (let i = 0; i < paramsString.length; i++) {
    let param = paramsString[i].split('=');
    params[decodeURI(param[0])] = decodeURI(param[1]);
  }
  return params;
};
