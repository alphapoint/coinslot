import BaseValidator from './BaseValidator';
import base32 from 'base32.js';
import crc16xmodem from 'crc/lib/crc16_xmodem';
import SUPPORTED_CURRENCIES from '../supportedCurrencies';

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
  const decoded = base32.decode(encoded);
  const versionByte = decoded[0];
  const payload = decoded.slice(0, -2);
  const data = payload.slice(1);
  const checksum = decoded.slice(-2);

  if (encoded !== base32.encode(decoded)) {
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

  return new Buffer(data);
}

function calculateChecksum(payload) {
  // This code calculates CRC16-XModem checksum of payload
  // and returns it as Buffer in little-endian order.
  const checksum = new Buffer(2);
  checksum.writeUInt16LE(crc16xmodem(payload), 0);

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
