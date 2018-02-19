import cryptoUtils from './utils/cryptoUtils';
import base58 from './utils/base58';
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

export default class DefaultValidator extends BaseValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.bitcoin,
      SUPPORTED_CURRENCIES.litecoin,
      SUPPORTED_CURRENCIES.dogecoin,
      SUPPORTED_CURRENCIES.dash,
    ]);
  }

  getAddressPreffix(address) {
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
}
