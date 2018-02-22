import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';
import {detectAddressFormat} from 'bchaddrjs';

export default class BitcoinCashValidator extends BaseValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.bitcoin_cash,
    ]);
  }

  validate(address, currency) {
    let result = true;
    try {
      detectAddressFormat(address);
    } catch (err) {
      result = false;
    }

    return result;
  }
}