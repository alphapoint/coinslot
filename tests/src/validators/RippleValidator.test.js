import RippleValidator from 'validators/RippleValidator';
import SUPPORTED_CURRENCIES from 'supportedCurrencies';

describe('RippleValidator', () => {
  describe('Method validate', () => {
    const validator = new RippleValidator();

    test('Should be applied for ripple', () => {
      const result = validator.isAppliedFor(SUPPORTED_CURRENCIES.ripple);

      expect(result).toBe(true);
    });

    test('Should validate Ripple address', () => {
      const isValid = validator.validate('rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn');

      expect(isValid).toBe(true);
    });

    test('Should return false for non-Ripple address', () => {
      const isValid = validator.validate('44AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A');

      expect(isValid).toBe(false);
    });
  });
});