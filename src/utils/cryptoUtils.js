import SHA from 'jssha/src/sha256';
// import sha256 from 'crypto-js/sha256';
// import SHA3 from 'crypto-js/sha3';
// import crypto from 'crypto-js';
// import hex from 'crypto-js';
// console.log(hex);
import sha3 from './sha3';

const keccak256 = sha3.keccak256;

function numberToHex(number) {
  let hex = Math.round(number).toString(16);

  if (hex.length === 1) {
    hex = `0${hex}`;
  }

  return hex;
}

export default {
  toHex(arrayOfBytes) {
    let hex = '';

    for (let i = 0; i < arrayOfBytes.length; i++) {
      hex += numberToHex(arrayOfBytes[i]);
    }

    return hex;
  },

  sha256(hexString) {
    const sha = new SHA('SHA-256', 'HEX');
    sha.update(hexString);
    return sha.getHash('HEX');
  },

  sha3(hexString) {
    return keccak256(hexString);
  },
};
