const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', (done) => {
    let from = 'test@test.com';
    let text = 'Test message';
    let res = generateMessage(from, text);
    expect(res).toMatchObject({from, text});
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(typeof res.createdAt).toBe('number');
    done();
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', (done) => {
    // latitude: 56.25152
    // longitude: 43.9872589
    let from = 'Admin';
    let latitude = 56.25152;
    let longitude = 43.9872589;
    let res = generateLocationMessage(from, latitude, longitude);
    expect(res).toMatchObject({from, latitude, longitude});
    expect(res.from).toBe(from);
    expect(res.latitude).toBe(latitude);
    expect(res.longitude).toBe(longitude);
    expect(typeof res.latitude).toBe('number');
    expect(typeof res.longitude).toBe('number');
    expect(typeof res.createdAt).toBe('number');
    done();
  });
});