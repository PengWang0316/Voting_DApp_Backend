const { fetchCandidatesInfo } = require('../../src/models/Candidate');
const Logger = require('../../src/utils/Logger');

module.exports = async (req, res) => {
  try {
    res.json(await fetchCandidatesInfo());
  } catch (err) {
    Logger.error('/fetchCandidatesInfo', err);
    res.end();
  }
};
