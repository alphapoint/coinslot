/* eslint-disable */
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';
import baseXCheck from '../utils/baseXCheck';
import cryptoUtils from '../utils/cryptoUtils';

const alphabet = "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz";
const base58ripple = baseXCheck(alphabet);

export default class RippleValidator extends BaseValidator {
  constructor() {
    super([SUPPORTED_CURRENCIES.ripple]);
  }

  validate(address, currency) {

    try {
      const decoded = base58ripple.decode(address);
      if(!decoded) {
        return false;
      }
      return this.isValidVersion(decoded);
    } catch (err) {
        console.log(err);
        return false;
    }
  }

  isValidVersion(decodedArray) {
    // version should always be 0
    const version = decodedArray.shift();
    return version === 0;
  }
}