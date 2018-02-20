import cryptoUtils from '../utils/cryptoUtils';
import base58 from '../utils/base58';
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

const BICTOIN_PREFIXES = {prod: ['00', '05'], testnet: ['6f', 'c4']};

const PREFIXES = {
  [SUPPORTED_CURRENCIES.bitcoin]: BICTOIN_PREFIXES,
  [SUPPORTED_CURRENCIES.litecoin]: {prod: ['30', '05', '32'], testnet: ['6f', 'c4', '3a']},
  [SUPPORTED_CURRENCIES.dogecoin]: {prod: ['1e', '16'], testnet: ['71', 'c4']},
  [SUPPORTED_CURRENCIES.dash]: {prod: ['4c', '10'], testnet: ['8c', '13']},
  [SUPPORTED_CURRENCIES.bitcoin_gold]: {prod: ['26', '17']},
  [SUPPORTED_CURRENCIES.zcash]: {prod: ['1cb8', '1cbd'], testnet: ['1d25', '1cba']},
  [SUPPORTED_CURRENCIES.tether]: BICTOIN_PREFIXES,
  [SUPPORTED_CURRENCIES.unobtamium]: {prod: ['82', '1e'], testnet: ['44', '1e']},
};
// RIPEMD-160 hash function produce a 160-bit output
const bodyBytesCount = 20;
// first 4 bytes are taken from SHA-256(SHA-256(input))
const checksumBytesCount = 4;

export default class DefaultValidator extends BaseValidator {
  constructor() {
    super(Object.keys(PREFIXES));
  }

  getAddressPrefix(address, prefixLength) {
    let decoded;

    try {
      decoded = base58.decode(address);
    } catch (e) {
      // if decoding fails, assume invalid address
      return null;
    }

    const length = decoded.length;

    if (length !== prefixLength + bodyBytesCount + checksumBytesCount) {
      return null;
    }

    const checksum = cryptoUtils.toHex(decoded.slice(length - 4, length));
    const body = cryptoUtils.toHex(decoded.slice(0, length - 4));
    const goodChecksum = cryptoUtils.sha256(cryptoUtils.sha256(body)).substr(0, 8);

    return checksum === goodChecksum ? cryptoUtils.toHex(decoded.slice(0, prefixLength)) : null;
  }

  /**
   * @param {String} address
   * @param {String} currency
   */
  validate(address, currency) {
    const correctAddressTypes = this.getAddressTypes(currency);
    const prefixLength = this.getPrefixLength(correctAddressTypes);
    const addressType = this.getAddressPrefix(address, prefixLength);

    return correctAddressTypes.indexOf(addressType) >= 0;
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
