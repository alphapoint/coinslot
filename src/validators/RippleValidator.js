import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';
import rippleAddressApi from 'ripple-address-codec';

export default class RippleValidator extends BaseValidator {
  constructor() {
    super([SUPPORTED_CURRENCIES.ripple]);
  }

  validate(address, currency) {
    return rippleAddressApi.isValidAddress(address);
  }
}