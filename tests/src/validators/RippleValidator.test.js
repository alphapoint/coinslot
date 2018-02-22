import RippleValidator from 'validators/RippleValidator';
import SUPPORTED_CURRENCIES from 'supportedCurrencies';

describe('RippleValidator', () => {
  describe('Method validate', () => {
    const validator = new RippleValidator();

    test('Should be applied for ripple', () => {
      const result = validator.isAppliedFor(SUPPORTED_CURRENCIES.ripple);

      expect(result).toBe(true);
    });

    test('Shold validate Ripple address', () => {
      const isValid = validator.validate('rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn');

      expect(isValid).toBe(true);
    });
  });
});