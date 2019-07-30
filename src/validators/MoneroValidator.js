import RegExpValidator from './RegExpValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

/**
 * http://monero.wikia.com/wiki/Address_validation
 */
export default class MoneroValidator extends RegExpValidator {
  constructor() {
    super(
      [SUPPORTED_CURRENCIES.monero],
      /^4([0-9]|[A-B])([0-9a-zA-Z]){93}$|^4([0-9]|[A-B])([0-9a-zA-Z]){104}$/
    );
  }
}
