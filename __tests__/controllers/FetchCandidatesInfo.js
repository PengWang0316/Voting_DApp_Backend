import fetchCandidatesInfoController from '../../src/controllers/FetchCandidatesInfo';

jest.mock('../../src/models/Candidate', () => ({ fetchCandidatesInfo: jest.fn().mockReturnValue(Promise.resolve([{ id: 1 }, { id: 2 }])) }));
jest.mock('../../src/utils/Logger', () => ({ error: jest.fn() }));

describe('FetchCandidatesInfo', () => {
  test('fetch candidates information without error', async () => {
    const { error } = require('../../src/utils/Logger');
    const { fetchCandidatesInfo } = require('../../src/models/Candidate');

    const mockJsonFn = jest.fn();
    const mockEndFn = jest.fn();
    const req = {};
    const res = { json: mockJsonFn, end: mockEndFn };

    await fetchCandidatesInfoController(req, res);
    expect(fetchCandidatesInfo).toHaveBeenCalledTimes(1);
    expect(mockJsonFn).toHaveBeenCalledTimes(1);
    expect(mockJsonFn).toHaveBeenLastCalledWith([{ id: 1 }, { id: 2 }]);
    expect(mockEndFn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  });

  test('fetch candidates information with db error', async () => {
    const { error } = require('../../src/utils/Logger');
    const { fetchCandidatesInfo } = require('../../src/models/Candidate');
    fetchCandidatesInfo.mockReturnValue(Promise.reject());

    const mockJsonFn = jest.fn();
    const mockEndFn = jest.fn();
    const req = {};
    const res = { json: mockJsonFn, end: mockEndFn };

    await fetchCandidatesInfoController(req, res);
    expect(fetchCandidatesInfo).toHaveBeenCalledTimes(2);
    expect(mockJsonFn).not.toHaveBeenCalled();
    expect(mockEndFn).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledTimes(1);
  });
});
