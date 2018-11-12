import bigInt from 'big-integer';
import BaseValidator from './BaseValidator';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';
import base58Check from '../utils/base58Check';

export default class BitcoinCashValidator extends BaseValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.bitcoin_cash,
    ]);
  }

  validate(address) {
    let result = true;
    try {
      result = detectAddressFormat(address);
    } catch (err) {
      result = false;
    }
    return result;
  }
}

const VERSION_BYTE = {};
VERSION_BYTE.testnet = [111, 196];
VERSION_BYTE.prod = [0, 5, 28, 40];

const PREFIXES = ['bitcoincash', 'bchtest', 'regtest'];

function detectAddressFormat(address) {
  return decodeAddress(address);
}

function decodeAddress(address) {
  try {
    return decodeBase58Address(address);
  } catch (error) {
    return decodeCashAddress(address);
  }
}

function decodeBase58Address(address) {
  const payload = base58Check.decode(address);
  const versionByte = payload[0];
  return VERSION_BYTE.testnet.concat(VERSION_BYTE.prod).some(elem => elem === versionByte);
}

function decodeCashAddress(address) {
  if (address.indexOf(':') !== -1) {
    return decodeCashAddressWithPrefix(address);
  } else {
    for (let i = 0; i < PREFIXES.length; ++i) {
      try {
        const prefix = PREFIXES[i];
        return decodeCashAddressWithPrefix(`${prefix}: address`);
      } catch (error) {
      }
    }
  }
  throw new Error();
}

const CHARSET_INVERSE_INDEX = {
  q: 0, p: 1, z: 2, r: 3, y: 4, 9: 5, x: 6, 8: 7,
  g: 8, f: 9, 2: 10, t: 11, v: 12, d: 13, w: 14, 0: 15,
  s: 16, 3: 17, j: 18, n: 19, 5: 20, 4: 21, k: 22, h: 23,
  c: 24, e: 25, 6: 26, m: 27, u: 28, a: 29, 7: 30, l: 31,
};

const base32 = {
  decode: function decode(string) {
    validate(typeof string === 'string', `Invalid base32-encoded string: ${string}.`);
    const data = new Uint8Array(string.length);
    for (let i = 0; i < string.length; ++i) {
      const value = string[i];
      validate(value in CHARSET_INVERSE_INDEX, `Invalid value: ${value}.`);
      data[i] = CHARSET_INVERSE_INDEX[value];
    }
    return data;
  },
};

function concat(a, b) {
  const ab = new Uint8Array(a.length + b.length);
  ab.set(a);
  ab.set(b, a.length);
  return ab;
}

function validChecksum(prefix, payload) {
  const prefixData = concat(prefixToUint5Array(prefix), new Uint8Array(1));
  const checksumData = concat(prefixData, payload);
  return polymod(checksumData).equals(0);
}

function polymod(data) {
  const GENERATOR = [0x98f2bc8e61, 0x79b76d99e2, 0xf33e5fb3c4, 0xae2eabe2a8, 0x1e4f43e470];
  let checksum = bigInt(1);
  for (let i = 0; i < data.length; ++i) {
    const value = data[i];
    const topBits = checksum.shiftRight(35);
    checksum = checksum.and(0x07ffffffff).shiftLeft(5).xor(value);
    for (let j = 0; j < GENERATOR.length; ++j) {
      if (topBits.shiftRight(j).and(1).equals(1)) {
        checksum = checksum.xor(GENERATOR[j]);
      }
    }
  }
  return checksum.xor(1);
}

function prefixToUint5Array(prefix) {
  const result = new Uint8Array(prefix.length);
  for (let i = 0; i < prefix.length; ++i) {
    result[i] = prefix[i].charCodeAt(0) & 31;
  }
  return result;
}

const cashaddr = {
  decode: function decode(address) {
    validate(typeof address === 'string' && hasSingleCase(address), `Invalid address: ${address}.`);
    const pieces = address.toLowerCase().split(':');
    validate(pieces.length === 2, `Missing prefix: ${address}.`);
    const prefix = pieces[0];
    const payload = base32.decode(pieces[1]);
    validate(validChecksum(prefix, payload), `Invalid checksum: ${address}.`);
    const payloadData = fromUint5Array(payload.slice(0, -8));
    const versionByte = payloadData[0];
    const hash = payloadData.slice(1);
    validate(getHashSize(versionByte) === hash.length * 8, `Invalid hash size: ${address}.`);
    return {
      prefix,
    };
  },
};

function hasSingleCase(string) {
  return string === string.toLowerCase() || string === string.toUpperCase();
}

function fromUint5Array(data) {
  return convertBits(data, 5, 8, true);
}

function convertBits(data, from, to, strictMode) {
  const length = strictMode
    ? Math.floor((data.length * from) / to)
    : Math.ceil((data.length * from) / to);
  const mask = (1 << to) - 1;
  const result = new Uint8Array(length);
  let index = 0;
  let accumulator = 0;
  let bits = 0;
  for (let i = 0; i < data.length; ++i) {
    const value = data[i];
    validate(value >= 0 && (value >> from) === 0, `Invalid value: ${value}.`);
    accumulator = (accumulator << from) | value;
    bits += from;
    while (bits >= to) {
      bits -= to;
      result[index] = (accumulator >> bits) & mask;
      ++index;
    }
  }
  if (!strictMode) {
    if (bits > 0) {
      result[index] = (accumulator << (to - bits)) & mask;
      ++index;
    }
  } else {
    validate(
      bits < from && ((accumulator << (to - bits)) & mask) === 0,
      `Input cannot be converted to ${to} bits without padding, but strict mode was used.`
    );
  }
  return result;
}

function getHashSize(versionByte) {
  switch (versionByte & 7) {
    case 0:
      return 160;
    case 1:
      return 192;
    case 2:
      return 224;
    case 3:
      return 256;
    case 4:
      return 320;
    case 5:
      return 384;
    case 6:
      return 448;
    case 7:
      return 512;
  }
}

function decodeCashAddressWithPrefix(address) {
  const decoded = cashaddr.decode(address);
  return PREFIXES.some(elem => elem === decoded.prefix);
}

function validate(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}