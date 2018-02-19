import cryptoUtils from './cryptoUtils';
import base58 from './base58';
import SUPPORTED_CURRENCIES from './supportedCurrencies';

export default {
  getAddressType(address) {
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
  },

  validate(address, currency) {
    if (!SUPPORTED_CURRENCIES[currency]) {
      throw Error(`${currency} is not supported`);
    }

    return true;
  },
};
