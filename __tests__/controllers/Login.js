import LoginController from '../../src/controllers/Login';

jest.mock('bcryptjs', () => ({ compare: jest.fn().mockReturnValue(Promise.resolve(true)) }));
jest.mock('../../src/models/User', () => ({ fetchOneUser: jest.fn().mockReturnValue(Promise.resolve(['id', 'name', 'hashed password', 'photo', { toNumber: jest.fn().mockReturnValue(0) }])) }));
jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));
jest.mock('../../src/utils/JWTUtil', () => ({ signJWT: jest.fn().mockReturnValue('JWT') }));

describe('Login controller', () => {
  test('fetchOneUser with user and passes compare', async () => {
    const { fetchOneUser } = require('../../src/models/User');
    const { error } = require('../../src/utils/Logger');
    const { compare } = require('bcryptjs');
    const { signJWT } = require('../../src/utils/JWTUtil');

    const req = { query: { username: 'username', password: 'password' } };
    const res = { json: jest.fn() };

    await LoginController(req, res);

    expect(fetchOneUser).toHaveBeenCalledTimes(1);
    expect(fetchOneUser).toHaveBeenLastCalledWith(req.query.username);
    expect(error).not.toHaveBeenCalled();
    expect(compare).toHaveBeenCalledTimes(1);
    expect(compare).toHaveBeenLastCalledWith(req.query.password, 'hashed password');
    expect(signJWT).toHaveBeenCalledTimes(1);
    expect(signJWT).toHaveBeenLastCalledWith({ id: 'id', name: 'name', password: 'hashed password', photo: 'photo', vote_id: 0 });
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith('JWT');
  });

  test('fetchOneUser with user and does not pass compare', async () => {
    const { fetchOneUser } = require('../../src/models/User');
    // fetchOneUser.mockReturnValueOnce(Promise.resolve([{ password: 'password' }]));
    const { error } = require('../../src/utils/Logger');
    const { compare } = require('bcryptjs');
    compare.mockReturnValueOnce(Promise.resolve(false));

    const req = { query: { username: 'username', password: 'password' } };
    const res = { json: jest.fn() };

    await LoginController(req, res);

    expect(fetchOneUser).toHaveBeenCalledTimes(2);
    expect(fetchOneUser).toHaveBeenLastCalledWith(req.query.username);
    expect(error).not.toHaveBeenCalled();
    expect(compare).toHaveBeenCalledTimes(2);
    expect(compare).toHaveBeenLastCalledWith(req.query.password, 'hashed password');
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith({ isFail: true });
  });

  test('fetchOneUser no result', async () => {
    const { fetchOneUser } = require('../../src/models/User');
    fetchOneUser.mockReturnValueOnce(Promise.resolve(['111']));
    const { error } = require('../../src/utils/Logger');
    const { compare } = require('bcryptjs');

    const req = { query: { username: 'username', password: 'password' } };
    const res = { json: jest.fn() };

    await LoginController(req, res);

    expect(fetchOneUser).toHaveBeenCalledTimes(3);
    expect(fetchOneUser).toHaveBeenLastCalledWith(req.query.username);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith({ isFail: true });
  });

  test('fetchOneUser throw error', async () => {
    const { fetchOneUser } = require('../../src/models/User');
    fetchOneUser.mockReturnValueOnce(Promise.reject());
    const { error } = require('../../src/utils/Logger');
    const req = { query: { username: 'username', password: 'password' } };
    const res = { json: jest.fn() };

    await LoginController(req, res);

    expect(error).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith({ isFail: true });
  });
});
