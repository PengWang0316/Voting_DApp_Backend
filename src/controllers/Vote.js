const { vote } = require('../models/User');
const { verifyJWT } = require('../utils/JWTUtil');

module.exports = (req, res) => {
  const { jwt, candidateId } = req.body;
  const userId = verifyJWT(jwt, res).id;
  vote(userId, candidateId);
  res.end();
};
