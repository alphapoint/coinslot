import BitcoinCashValidator from 'validators/BitcoinCashValidator';
import SUPPORTED_CURRENCIES from 'supportedCurrencies';

describe('BitcoinCashValidator', () => {
  describe('Method validate', () => {
    const validator = new BitcoinCashValidator();
    test('Should be applied for bitcoin cash', () => {
      const result = validator.isAppliedFor(SUPPORTED_CURRENCIES.bitcoin_cash);

      expect(result).toBe(true);
    });

    test('Shold validate legacy address format', () => {
      const result = validator.validate('35qL43qYwLdKtnR7yMfGNDvzv6WyZ8yT2n');

      expect(result).toBe(true);
    });

    test('Should validate cash address format', () => {
      const result = validator.validate('bitcoincash:pqkh9ahfj069qv8l6eysyufazpe4fdjq3u4hna323j');

      expect(result).toBe(true);
    });

    test('Should validate bitpay address format', () => {
      const result = validator.validate('CScMwvXjdooDnGevHgfHjGWFi9cjk75Aaj');

      expect(result).toBe(true);
    });

    test('Should return false for non bitcoin cash formats (e.g. litecoin)', () => {
      const result = validator.validate('MHg7DcNPhpCqTxijJDmAyA2U3zjj475uf8');

      expect(result).toBe(false);
    });
  });
});