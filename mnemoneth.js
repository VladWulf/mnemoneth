const mnemoneth = function () {
  let self = {};

  const Mnemonic = require('bitcore-mnemonic');
  const bip44 = require('ethereum-bip44');
  const Web3 = require('web3');
  const web3 = new Web3();

  self.gen_key = function(_mnemonic = null) {
    /**
    * @param {string} _mnemonic - mnemonic to provide if exists
    * @returns {Object} - returns an object containing the key and mnemonic
    */
    if(_mnemonic){
      const mnemonic = new Mnemonic(_mnemonic)
      return {key: mnemonic.toHDPrivateKey(), mnemonic: _mnemonic}
    } else {
      const mnemonic = new Mnemonic(Mnemonic.Words.ENGLISH)
      return {key: mnemonic.toHDPrivateKey(), mnemonic: mnemonic.toString()}
    }
  }

  self.to_hd = function(_raw) {
    /**
    * @param {string} _raw - json or string representation of HDPrivateKey
    * @returns {Object} - returns the json HDPrivateKey type
    */

    if (typeof _raw === 'string') {
      _raw = JSON.parse(_raw);
    }
    const proto = new Mnemonic(Mnemonic.Words.ENGLISH).toHDPrivateKey().__proto__;
    _raw.__proto__ = proto;
    return _raw;
  }

  self.gen_account = function(_key = null) {
    /**
    * @param {string} _key - hd private key to provide
    * @returns {Object} - returns an object containing the account information
    */
    if(_key) {
        try {
          const eth_hd = new bip44(_key);
          const eth_priv = eth_hd.key.privateKey.toString();
          return web3.eth.accounts.privateKeyToAccount(eth_priv);
        } catch(e){
          throw ('Something went wrong with the key you provided. \nKey must be an object of type HDPrivateKey');
        }
    } else {
      throw 'Key provided is null';
    }
  }

  return self;
}

module.exports = mnemoneth();
