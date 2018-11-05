const Web3 = require('web3');
const TruffleContract = require('truffle-contract');

const path = require('path');
// const VoteJsonFile = require('../../build/contracts/Vote.json');
const VoteContractJSON = require(path.join(__dirname, '../../build/contracts/Vote.json'));
const config = require('../config');

const BlockChainHelper = {
  web3Provider: null,
  contracts: {},

  init() {
    return this.initWeb3();
  },

  initWeb3() {
    this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    return this.initContract();
  },

  initContract() {
    this.contracts.Vote = TruffleContract(VoteContractJSON);
    this.contracts.Vote.setProvider(this.web3Provider);
    const VoteContract = this.contracts.Vote;
    if (typeof VoteContract.currentProvider.sendAsync !== 'function') {
      VoteContract.currentProvider.sendAsync = function () {
        return VoteContract.currentProvider.send.apply(
          VoteContract.currentProvider, arguments,
        );
      };
    }
  },

  addUser(userId, password, name, photo) {
    this.contracts.Vote.deployed().then(instance => instance.addUser(userId, password, name, photo, { from: config.DEFUALT_ACCOUNT, gas: 3000000 })).catch(err => console.error(err));
  },

  vote(candidateId, userId) {
    this.contracts.Vote.deployed().then(instance => instance.vote(candidateId, userId, { from: config.DEFUALT_ACCOUNT, gas: 3000000 })).catch(err => console.error(err));
  },

  fetchUser(userId) {
    return new Promise((resolve, reject) => {
      this.contracts.Vote.deployed().then(instance => resolve(instance.fetchUser.call(userId, { from: config.DEFUALT_ACCOUNT, gas: 3000000 }))).catch(err => reject(err));
    });
  },

  countVote(candidateId) {
    return new Promise((resolve, reject) => {
      this.contracts.Vote.deployed().then(instance => resolve(instance.countVote.call(candidateId, { from: config.DEFUALT_ACCOUNT, gas: 3000000 }))).catch(err => reject(err));
    });
  },
};
BlockChainHelper.init();

module.exports = BlockChainHelper;
