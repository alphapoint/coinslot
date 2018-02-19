import SHA from 'jssha';

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
};
