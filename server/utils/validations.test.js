const expect = require('expect');
const {isRealString} = require('./validations');

describe('isRealString', () => {
  it('should reject non-string value', (done) => {
    let string = 1234567890;
    let res = isRealString(string);
    expect(res).toBe(false);
    done();
  });

  it('should reject string with only spaces', (done) => {
    let string = '         ';
    let res = isRealString(string);
    expect(res).toBe(false);
    done();
  });

  it('should allow string with non-space characters', (done) => {
    let string = '  Sergey Petrochenko ';
    let res = isRealString(string);
    expect(res).toBe(true);
    done();
  });
});