const BlockChainHelper = require('../utils/BlockChainHelper');

exports.fetchOneUser = username => BlockChainHelper.fetchUser(username);

exports.registerNewUser = user => BlockChainHelper
  .addUser(user.id, user.password, user.name, user.photo);

exports.vote = (userId, candidateId) => BlockChainHelper.vote(candidateId.toString(), userId);
