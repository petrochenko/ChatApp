const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '234',
        name: 'Mike',
        room: 'Room 1'
      },
      {
        id: '345',
        name: 'Alex',
        room: 'Room 2'
      },
      {
        id: '456',
        name: 'John',
        room: 'Room 1'
      }
    ]
  });

  it('should add new user', (done) => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Sergey',
      room: 'Room'
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual(expect.arrayContaining([user]));
    done();
  });

  it('should return names for Room 1', (done) => {
    let usersList = users.getUserList('Room 1');
    expect(usersList).toEqual(expect.arrayContaining(['Mike', 'John']));
    done();
  });

  it('should return names for Room 2', (done) => {
    let usersList = users.getUserList('Room 2');
    expect(usersList).toEqual(expect.arrayContaining(['Alex']));
    done();
  });

  it('should remove user', (done) => {
    let user = users.removeUser('345');
    expect(users.users).not.toEqual(expect.arrayContaining([{
      id: '345',
      name: 'Alex',
      room: 'Room 2'
    }]));
    expect(users.users.length).toBe(2);
    expect(user).toMatchObject({
      id: '345',
      name: 'Alex',
      room: 'Room 2'
    });
    done();
  });

  it('should not remove user', (done) => {
    let user = users.removeUser('21323123131321');
    expect(users.users).toEqual(expect.arrayContaining([{
      id: '345',
      name: 'Alex',
      room: 'Room 2'
    }]));
    expect(users.users.length).toBe(3);
    expect(user).toBe(undefined);
    done();
  });

  it('should find user', (done) => {
    let user = users.getUser('345');
    expect(user).toMatchObject({
      id: '345',
      name: 'Alex',
      room: 'Room 2'
    });
    done();
  });

  it('should not find user', (done) => {
    let user = users.getUser('21323123131321');
    expect(user).toBe(undefined);
    done();
  });
});