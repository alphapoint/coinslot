import base58Check from 'utils/base58Check';
import cryptoUtils from 'utils/cryptoUtils';

describe('base58Check', () => {
  describe('decode', () => {
    const testValid = (input, expected) => {
      const decoded = base58Check.decode(input);
      const result = cryptoUtils.toHex(decoded).toUpperCase();
      expect(result).toEqual(expected);
    };

    it('return valid decoded string', () => {
      testValid('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', '000F70DF2B81BD9F09A28A5185005728426B7B0BBF');
      testValid('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', '6FCCC198C15D8344C73DA67A75509A85A8F4226636');
    });
  });

  describe('encode', () => {
    const testValid = (input, expected) => {
      const encoded = base58Check.encode(input);
      expect(encoded).toEqual(expected);
    };

    it('return valid encoded string', () => {
      testValid('0099BC78BA577A95A11F1A344D4D2AE55F2F857B98', '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX');
      testValid('6FCCC198C15D8344C73DA67A75509A85A8F4226636', 'mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef');
    });
  });
});