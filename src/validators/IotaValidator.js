import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

export default class IotaValidator extends BaseValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.iota,
    ]);

    this.addressLength = 81;
    this.regexTrytes = new RegExp(`^[9A-Z]{${this.addressLength}}$`);
  }

  validate(address, currency) {
    const addressWithoutChecksum = this.removeChecksum(address);

    return this.regexTrytes.test(addressWithoutChecksum);
  }

  removeChecksum(address) {
    return address.slice(0, this.addressLength);
  }
}