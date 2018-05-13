import BaseValidator from './BaseValidator';
// import crc16xmodem from 'crc/lib/crc16_xmodem';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';
/* eslint-disable */
/**
 * Code is copied from https://stellar.github.io/js-stellar-sdk/StrKey.html#.isValidEd25519PublicKey
 */
export default class StellarValidator extends BaseValidator {
  constructor() {
    super([
      SUPPORTED_CURRENCIES.stellar,
    ]);
  }

  validate(address, currency) {
    return isValid('ed25519PublicKey', address);
  }
}

const versionBytes = {
  ed25519PublicKey: 6 << 3, // G
  ed25519SecretSeed: 18 << 3, // S
  preAuthTx: 19 << 3, // T
  sha256Hash: 23 << 3, // X
};

function isValid(versionByteName, encoded) {
  if (encoded && encoded.length !== 56) {
    return false;
  }
  try {
    const decoded = decodeCheck(versionByteName, encoded);

    if (decoded.length !== 32) {
      return false;
    }
  } catch (err) {
    return false;
  }

  return true;
}

export function decodeCheck(versionByteName, encoded) {
  const decoded = decode(encoded);
  const versionByte = decoded[0];
  const payload = decoded.slice(0, -2);
  const data = payload.slice(1);
  const checksum = decoded.slice(-2);

  if (encoded !== encode(decoded)) {
    throw new Error('invalid encoded string');
  }

  const expectedVersion = versionBytes[versionByteName];

  if (expectedVersion === undefined) {
    throw new Error(`${versionByteName} is not a valid version byte name.  expected one of "accountId" or "seed"`);
  }

  if (versionByte !== expectedVersion) {
    throw new Error(`invalid version byte. expected ${expectedVersion}, got ${versionByte}`);
  }

  const expectedChecksum = calculateChecksum(payload);
  if (!verifyChecksum(expectedChecksum, checksum)) {
    throw new Error('invalid checksum');
  }

  return data;
}

function calculateChecksum(payload) {
  // This code calculates CRC16-XModem checksum of payload
  // and returns it as Buffer in little-endian order. 
  const checksum = writeUInt16LE(crc16xmodem(payload), 0);

  return checksum;
}

function verifyChecksum(expected, actual) {
  if (expected.length !== actual.length) {
    return false;
  }
  if (expected.length === 0) {
    return true;
  }
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== actual[i]) {
      return false;
    }
  }
  return true;
}

var crc16xmodem = function(buf, previous) {
  var crc = typeof previous !== 'undefined' ? ~~previous : 0x0;

  for (var index = 0; index < buf.length; index++) {
    var byte = buf[index];
    var code = crc >>> 8 & 0xFF;

    code ^= byte & 0xFF;
    code ^= code >>> 4;
    crc = crc << 8 & 0xFFFF;
    crc ^= code;
    code = code << 5 & 0xFFFF;
    crc ^= code;
    code = code << 7 & 0xFFFF;
    crc ^= code;
  }

  return crc;
}

function writeUInt16LE(value, offset) {
  const result = [];
  value = +value;
  offset = offset >>> 0;
  const bytes = converToByteArray(value);
  result.push(bytes[7]);
  result.push((value >>> 8));
  return result;
};

function converToByteArray(x) {
  var bytes = [];
  var i = 8;
  do {
  bytes[--i] = x & (255);
  x = x>>8;
  } while ( i )
  return bytes;
}

var charmap = function (alphabet, mappings) {
  mappings || (mappings = {});
  alphabet.split("").forEach(function (c, i) {
    if (!(c in mappings)) mappings[c] = i;
  });
  return mappings;
}

/**
 * The RFC 4648 base 32 alphabet and character map.
 * @see {@link https://tools.ietf.org/html/rfc4648}
 */

let rfc4648 = {
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
  charmap: {
    0: 14,
    1: 8,
  },
};
rfc4648.charmap = charmap(rfc4648.alphabet, rfc4648.charmap);

function Decoder() {
  this.buf = [];
  this.shift = 8;
  this.carry = 0;
}

Decoder.prototype.charmap = rfc4648.charmap;

Decoder.prototype.write = function (str) {
  var charmap = this.charmap;
  var buf = this.buf;
  var shift = this.shift;
  var carry = this.carry;

  // decode string
  str.toUpperCase().split("").forEach(function (char) {

    // ignore padding
    if (char == "=") return;

    // lookup symbol
    var symbol = charmap[char] & 0xff;

    // 1: 00000 000
    // 2:          00 00000 0
    // 3:                    0000 0000
    // 4:                             0 00000 00
    // 5:                                       000 00000
    // 6:                                                00000 000
    // 7:                                                         00 00000 0

    shift -= 5;
    if (shift > 0) {
      carry |= symbol << shift;
    } else if (shift < 0) {
      buf.push(carry | (symbol >> -shift));
      shift += 8;
      carry = (symbol << shift) & 0xff;
    } else {
      buf.push(carry | symbol);
      shift = 8;
      carry = 0;
    }
  });

  // save state
  this.shift = shift;
  this.carry = carry;

  // for chaining
  return this;
};

Decoder.prototype.finalize = function (str) {
  if (str) {
    this.write(str);
  }
  if (this.shift !== 8 && this.carry !== 0) {
    this.buf.push(this.carry);
    this.shift = 8;
    this.carry = 0;
  }
  return this.buf;
};

function decode(str) {
  return new Decoder().finalize(str);
}

function Encoder () {
  this.buf = "";
  this.shift = 3;
  this.carry = 0;
}

Encoder.prototype.alphabet = rfc4648.alphabet;

Encoder.prototype.write = function (buf) {
  var shift = this.shift;
  var carry = this.carry;
  var symbol;
  var byte;
  var i;

  // encode each byte in buf
  for (i = 0; i < buf.length; i++) {
    byte = buf[i];

    // 1: 00000 000
    // 2:          00 00000 0
    // 3:                    0000 0000
    // 4:                             0 00000 00
    // 5:                                       000 00000
    // 6:                                                00000 000
    // 7:                                                         00 00000 0

    symbol = carry | (byte >> shift);
    this.buf += this.alphabet[symbol & 0x1f];

    if (shift > 5) {
      shift -= 5;
      symbol = byte >> shift;
      this.buf += this.alphabet[symbol & 0x1f];
    }

    shift = 5 - shift;
    carry = byte << shift;
    shift = 8 - shift;
  }

  // save state
  this.shift = shift;
  this.carry = carry;

  // for chaining
  return this;
};

Encoder.prototype.finalize = function (buf) {
  if (buf) {
    this.write(buf);
  }
  if (this.shift !== 3) {
    this.buf += this.alphabet[this.carry & 0x1f];
    this.shift = 3;
    this.carry = 0;
  }
  return this.buf;
};

function encode(buf) {
  return new Encoder().finalize(buf);
};

