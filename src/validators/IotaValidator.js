import {isValidChecksum} from 'iota.lib.js/lib/utils/utils';
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

export default class IotaValidator extends BaseValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.iota,
    ]);
  }

  validate(address, currency) {
    return isValidChecksum(address);
  }
}