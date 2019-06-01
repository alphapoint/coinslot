import cryptoUtils from '../utils/cryptoUtils';
import base58Check from '../utils/base58Check';
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';
import {isValidAddress as isValidSegwitAddress} from '../utils/segwit';

const BITCOIN_PREFIXES = {
  prod: ['00', '05'],
  testnet: ['6f', 'c4'],
};

const PREFIXES = {
  [SUPPORTED_CURRENCIES.bitcoin]: BITCOIN_PREFIXES,
  [SUPPORTED_CURRENCIES.tether]: BITCOIN_PREFIXES,
  [SUPPORTED_CURRENCIES.litecoin]: {prod: ['30', '05', '32'], testnet: ['6f', 'c4', '3a']},
  [SUPPORTED_CURRENCIES.dogecoin]: {prod: ['1e', '16'], testnet: ['71', 'c4']},
  [SUPPORTED_CURRENCIES.dash]: {prod: ['4c', '10'], testnet: ['8c', '13']},
  [SUPPORTED_CURRENCIES.bitcoin_gold]: {prod: ['26', '17']},
  [SUPPORTED_CURRENCIES.zcash]: {prod: ['1cb8', '1cbd'], testnet: ['1d25', '1cba']},
  [SUPPORTED_CURRENCIES.unobtamium]: {prod: ['82', '1e'], testnet: ['44', '1e']},
  [SUPPORTED_CURRENCIES.neo]: {prod: ['17']},
  [SUPPORTED_CURRENCIES.qtum]: {prod: ['3a', '32'], testnet: ['78', '6e']},
};

export default class DefaultValidator extends BaseValidator {
  constructor() {
    super(Object.keys(PREFIXES));
  }

  getAddressPrefix(address, prefixLength) {
    let decoded;

    try {
      decoded = base58Check.decode(address);
    } catch (e) {
      // if decoding fails, assume invalid address
      return null;
    }

    return decoded ? cryptoUtils.toHex(decoded.slice(0, prefixLength)) : null;
  }

  /**
   * @param {String} address
   * @param {String} currency
   */
  validate(address, currency) {
    const correctAddressTypes = this.getAddressTypes(currency);
    const prefixLength = this.getPrefixLength(correctAddressTypes);
    const addressType = this.getAddressPrefix(address, prefixLength);

    return correctAddressTypes.indexOf(addressType) >= 0 || isValidSegwitAddress(address);
  }

  /**
   * @param {String} currency
   */
  getAddressTypes(currency) {
    const addressesTypesObj = PREFIXES[currency];

    return addressesTypesObj.prod.concat(addressesTypesObj.testnet);
  }

  getPrefixLength(prefixes) {
    // prefix is two letter hex number
    const result = prefixes[0].length / 2;
    return result;
  }
}
