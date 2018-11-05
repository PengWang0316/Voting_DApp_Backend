import User from '../../src/models/User';

// jest.mock('../../src/DBHelper', () => ({
//   getPool: jest.fn().mockReturnValue({
//     query: jest.fn().mockImplementation((sql, paramters, cb) => cb(null, [{ id: 1 }], null)),
//   }),
// }));
jest.mock('../../src/utils/BlockChainHelper', () => ({ addUser: jest.fn(), fetchUser: jest.fn(), vote: jest.fn() }));
jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));

describe('User Model', () => {
  test('fetchOneUser', () => {
    const { fetchUser } = require('../../src/utils/BlockChainHelper');

    User.fetchOneUser('username');

    expect(fetchUser).toHaveBeenCalledTimes(1);
    expect(fetchUser).toHaveBeenLastCalledWith('username');
  });

  test('registerNewUser', () => {
    const { addUser } = require('../../src/utils/BlockChainHelper');

    const user = {
      id: 'id',
      password: 'password',
      name: 'name',
      photo: 'photo',
    };
    User.registerNewUser(user);

    expect(addUser).toHaveBeenCalledTimes(1);
    expect(addUser).toHaveBeenLastCalledWith(user.id, user.password, user.name, user.photo);
  });

  test('vote', () => {
    const { vote } = require('../../src/utils/BlockChainHelper');

    User.vote('userId', 'candidateId');

    expect(vote).toHaveBeenCalledTimes(1);
    expect(vote).toHaveBeenLastCalledWith('candidateId', 'userId');
  });
});
