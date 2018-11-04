const Logger = require('../utils/Logger');
const { getPool } = require('../DBHelper');

const SQL = 'SELECT c.*, COUNT(u.id) as votes FROM candidates as c LEFT JOIN users as u ON c.id = u.vote_id GROUP BY c.id';

exports.fetchCandidatesInfo = () => new Promise((resolve, reject) => {
  getPool().query(SQL, (err, results, fields) => {
    if (err) {
      Logger.error(SQL, err);
      reject(err);
    }
    resolve(results);
  });
});
