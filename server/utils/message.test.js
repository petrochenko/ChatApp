const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', (done) => {
    let from = 'test@test.com';
    let text = 'Test message';
    let res = generateMessage(from, text);
    expect(res).toMatchObject({from, text});
    expect(res.from).toBe(from);
    expect(res.text).toBe(text);
    expect(typeof  res.createdAt).toBe('number');
    done();
  });
});