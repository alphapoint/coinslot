import ethereumAddress from 'ethereum-address';
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

export default class EthereumValidator extends BaseValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.ethereum,
      SUPPORTED_CURRENCIES.ethereum_classic,
      SUPPORTED_CURRENCIES.ubiq,
    ]);
  }

  validate(address, currency) {
    return ethereumAddress.isAddress(address);
  }
}