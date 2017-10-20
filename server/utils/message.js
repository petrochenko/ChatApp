let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

let generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    latitude,
    longitude,
    createdAt: new Date().getTime()
  };
};

module.exports = {generateMessage, generateLocationMessage};