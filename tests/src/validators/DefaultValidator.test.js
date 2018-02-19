import DefaultValidator from 'validators/DefaultValidator';
import SUPPORTED_CURRENCIES from 'supportedCurrencies';

describe('DefaultValidator', () => {
  describe('Method isAppliedFor', () => {
    test('Should be applied for bitcoin', () => {
      const defaultValidator = new DefaultValidator();
      const isApplied = defaultValidator.isAppliedFor(SUPPORTED_CURRENCIES.bitcoin);

      expect(isApplied).toBe(true);
    });

    test('Should be applied for litecoin', () => {
      const defaultValidator = new DefaultValidator();
      const isApplied = defaultValidator.isAppliedFor(SUPPORTED_CURRENCIES.litecoin);

      expect(isApplied).toBe(true);
    });

    test('Should be applied for dogecoin', () => {
      const defaultValidator = new DefaultValidator();
      const isApplied = defaultValidator.isAppliedFor(SUPPORTED_CURRENCIES.dogecoin);

      expect(isApplied).toBe(true);
    });

    test('Should be applied for dash', () => {
      const defaultValidator = new DefaultValidator();
      const isApplied = defaultValidator.isAppliedFor(SUPPORTED_CURRENCIES.dash);

      expect(isApplied).toBe(true);
    });

    test('Should not be applied for unknown currency', () => {
      const defaultValidator = new DefaultValidator();
      const isApplied = defaultValidator.isAppliedFor('unknown-currency');

      expect(isApplied).toBe(false);
    });
  });
});