const Logger = require('../utils/Logger');
const { getPool } = require('../DBHelper');
const BlockChainHelper = require('../utils/BlockChainHelper');

// const SQL = 'SELECT c.*, COUNT(u.id) as votes FROM candidates as c LEFT JOIN users as u ON c.id = u.vote_id GROUP BY c.id';
const SQL = 'SELECT * FROM candidates';

exports.fetchCandidatesInfo = () => new Promise((resolve, reject) => {
  getPool().query(SQL, async (err, results, fields) => {
    if (err) {
      Logger.error(SQL, err);
      reject(err);
    }
    // Call the smart contractor to get vote amount.
    const newCandidates = results.map(async candidate => {
      const votes = await BlockChainHelper.countVote(candidate.id.toString());
      return { ...candidate, votes: votes.toNumber() };
    });
    // Need to wait the map function resolve all promise.
    const returnArr = await Promise.all(newCandidates);
    resolve(returnArr);
  });
});
