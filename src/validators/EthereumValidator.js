import ethereumAddress from 'ethereum-address-es5';
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

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
    return ethereumAddress.isAddress(address);
  }
}