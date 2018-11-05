const bcrypt = require('bcryptjs');
const logger = require('../utils/Logger');

const { registerNewUser } = require('../models/User');

module.exports = (req, res) => bcrypt.hash(req.body.password, process.env.SALT_ROUNDS * 1)
  .then(hash => {
    registerNewUser({
      id: req.body.id,
      password: hash,
      name: req.body.name,
      photo: req.body.photo,
    });
    res.end();
  }).catch(err => {
    res.end();
    logger.error('/registerNewUser', err);
  });
