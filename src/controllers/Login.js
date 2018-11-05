const bcrypt = require('bcryptjs');

const { fetchOneUser } = require('../models/User');
const Logger = require('../../src/utils/Logger');
const { signJWT } = require('../utils/JWTUtil');

// Use the old promise then for the test purpose
module.exports = (req, res) => fetchOneUser(req.query.username).then(result => {
  if (!result[1]) res.json({ isFail: true }); // result 1 is name. If it is empty, the user does not exist.
  else {
    const user = { // The result order is decided by Vote's contractor's return order. See Vote.sol
      id: result[0],
      name: result[1],
      password: result[2],
      photo: result[3],
      vote_id: result[4].toNumber(),
    };
    bcrypt.compare(req.query.password, user.password).then(compareResult => {
      if (compareResult) {
        // JWTUtil's signJWT will remove the password before return to the client side.
        res.json(signJWT(user));
      } else res.json({ isFail: true });
    });
  }
}).catch(err => {
  Logger.error('/fetchCandidatesInfo', err);
  res.json({ isFail: true });
});
