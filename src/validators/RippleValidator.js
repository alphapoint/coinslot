/* eslint-disable */
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';
import baseX from '../utils/baseX';
import cryptoUtils from '../utils/cryptoUtils';

const alphabet = "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz";
const base58ripple = baseX(alphabet);

export default class RippleValidator extends BaseValidator {
  constructor() {
    super([SUPPORTED_CURRENCIES.ripple]);
  }

  validate(address, currency) {

    try {
        this.validateUnsafe(address);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
  }

  validateUnsafe (address) {
    const decoded = base58ripple.decode(address);

    return this.isValidChecksum(decoded) && this.isValidVersion(decoded);
  }

  isValidChecksum(decodedArray) {
    const length = decodedArray.length;

    const checksum = cryptoUtils.toHex(decodedArray.slice(length - 4, length));
    const body = cryptoUtils.toHex(decodedArray.slice(0, length - 4));
    const goodChecksum = cryptoUtils.sha256(cryptoUtils.sha256(body)).substr(0, 8);

    return checksum === goodChecksum;
  }

  isValidVersion(decodedArray) {
    // version should always be 0
    const version = decodedArray.shift();
    return version === 0;
  }
}