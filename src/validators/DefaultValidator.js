import cryptoUtils from '../utils/cryptoUtils';
import base58 from '../utils/base58';
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

const PREFIXES = {
  [SUPPORTED_CURRENCIES.bitcoin]: {prod: ['00', '05'], testnet: ['6f', 'c4']},
  [SUPPORTED_CURRENCIES.litecoin]: {prod: ['30', '05', '32'], testnet: ['6f', 'c4', '3a']},
  [SUPPORTED_CURRENCIES.dogecoin]: {prod: ['1e', '16'], testnet: ['71', 'c4']},
  [SUPPORTED_CURRENCIES.dash]: {prod: ['4c', '10'], testnet: ['8c', '13']},
};

export default class DefaultValidator extends BaseValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.bitcoin,
      SUPPORTED_CURRENCIES.litecoin,
      SUPPORTED_CURRENCIES.dogecoin,
      SUPPORTED_CURRENCIES.dash,
    ]);
  }

  getAddressPrefix(address) {
    let decoded;

    try {
      decoded = base58.decode(address);
    } catch (e) {
      // if decoding fails, assume invalid address
      return null;
    }

    const length = decoded.length;

    // should be 25 bytes per btc address spec
    if (length !== 25) {
      return null;
    }

    const checksum = cryptoUtils.toHex(decoded.slice(length - 4, length));
    const body = cryptoUtils.toHex(decoded.slice(0, length - 4));
    const goodChecksum = cryptoUtils.sha256(cryptoUtils.sha256(body)).substr(0, 8);

    return checksum === goodChecksum ? cryptoUtils.toHex(decoded.slice(0, 1)) : null;
  }

  /**
   * @param {String} address
   * @param {String} currency
   */
  validate(address, currency) {
    const addressType = this.getAddressPrefix(address);
    const correctAddressTypes = this.getAddressTypes(currency);

    return correctAddressTypes.indexOf(addressType) >= 0;
  }

  /**
   * @param {String} currency
   */
  getAddressTypes(currency) {
    const addressesTypesObj = PREFIXES[currency];

    return addressesTypesObj.prod.concat(addressesTypesObj.testnet);
  }
}
