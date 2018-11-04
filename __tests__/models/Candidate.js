import Candidate from '../../src/models/Candidate';

jest.mock('../../src/DBHelper', () => ({
  getPool: jest.fn().mockReturnValue({
    query: jest.fn().mockImplementation((sql, cb) => cb(null, [{ id: 1 }, { id: 2 }], null)),
  }),
}));

jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));

describe('Candidate', () => {
  test('fetchCandidatesInfo without error', async () => {
    const { error } = require('../../src/utils/Logger');
    const { getPool } = require('../../src/DBHelper');

    const result = await Candidate.fetchCandidatesInfo();
    expect(getPool).toHaveBeenCalledTimes(1);
    expect(error).not.toHaveBeenCalled();
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  });

  test('fetchCandidatesInfo with db error', async () => {
    const { error } = require('../../src/utils/Logger');
    const DBHelper = require('../../src/DBHelper');
    DBHelper.getPool.mockReturnValue({
      query: jest.fn().mockImplementation((sql, cb) => cb({}, [{ id: 1 }, { id: 2 }], null)),
    });

    // expect(() => { await Candidate.fetchCandidatesInfo(); }).toThrow();
    try {
      await Candidate.fetchCandidatesInfo();
    } catch (err) {
      expect(DBHelper.getPool).toHaveBeenCalledTimes(2);
      expect(error).toHaveBeenCalledTimes(1);
    }
  });
});
