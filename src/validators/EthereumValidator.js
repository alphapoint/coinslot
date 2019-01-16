import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';
import cryptoUtils from '../utils/cryptoUtils';

export default class EthereumValidator extends BaseValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.ethereum,
      SUPPORTED_CURRENCIES.omise_go,
      SUPPORTED_CURRENCIES.augur,
      SUPPORTED_CURRENCIES.eos,
      SUPPORTED_CURRENCIES.fuel,
      SUPPORTED_CURRENCIES.status,
      SUPPORTED_CURRENCIES.singularDTV,
      SUPPORTED_CURRENCIES.genesis_coin,
      SUPPORTED_CURRENCIES.walton_chain,
      SUPPORTED_CURRENCIES.ethereum_classic,
      SUPPORTED_CURRENCIES.ubiq,
    ]);
  }

  validate(address, currency) {
    return isValidAddress(address);
  }
}

const isValidAddress = function isAddress(address) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    // Check if it has the basic requirements of an address
    return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    // If it's all small caps or all all caps, return true
    return true;
  } else {
    // Otherwise check each case
    return isChecksumAddress(address);
  }
};

const isChecksumAddress = function isChecksumAddress(addressArg) {
  // Check each case
  const address = addressArg.replace('0x', '');
  const addressHash = cryptoUtils.sha3(address.toLowerCase());
  
  for (let i = 0; i < 40; i++) {
    // The nth letter should be uppercase if the nth digit of casemap is 1
    if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
      return false;
    }
  }
  return true;
};
