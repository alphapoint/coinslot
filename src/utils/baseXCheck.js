import baseX from './baseX';
import cryptoUtils from './cryptoUtils';

export default function baseXCheck(ALPHABET) {
  const codec = baseX(ALPHABET);

  return {
    encode: payload => {
      const checksum = cryptoUtils.sha256(cryptoUtils.sha256(payload)).slice(0, 8);

      return codec.encode(cryptoUtils.toByteArray(payload.concat(checksum)));
    },
    decode: payload => {
      const decoded = codec.decode(payload);

      const length = decoded.length;

      const body = cryptoUtils.toHex(decoded.slice(0, length - 4));
      const newChecksum = cryptoUtils.sha256(cryptoUtils.sha256(body)).substr(0, 8);
      const checksum = cryptoUtils.toHex(decoded.slice(length - 4, length));

      return checksum === newChecksum ? decoded.slice(0, length - 4) : null;
    },
  };
}