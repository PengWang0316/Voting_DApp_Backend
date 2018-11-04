import VoteController from '../../src/controllers/Vote';

jest.mock('../../src/utils/JWTUtil', () => ({ verifyJWT: jest.fn().mockReturnValue({ id: 'userId' }) }));
jest.mock('../../src/models/User', () => ({ vote: jest.fn() }));

describe('Vote Controller', () => {
  test('Vote', () => {
    const { verifyJWT } = require('../../src/utils/JWTUtil');
    const { vote } = require('../../src/models/User');
    const req = {
      body: {
        jwt: 'jwt',
        candidateId: 'candidateId',
      },
    };
    const res = {
      end: jest.fn(),
    };
    VoteController(req, res);

    expect(verifyJWT).toHaveBeenCalledTimes(1);
    expect(verifyJWT).toHaveBeenLastCalledWith('jwt', res);
    expect(vote).toHaveBeenCalledTimes(1);
    expect(vote).toHaveBeenLastCalledWith('userId', 'candidateId');
  });
});
