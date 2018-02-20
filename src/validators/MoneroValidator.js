import RegExpValidator from './RegExpValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

/**
 * http://monero.wikia.com/wiki/Address_validation
 */
export default class BitcoinCashValidator extends RegExpValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.monero,
    ], /^4([0-9]|[A-B])(.){93}$/);
  }
}