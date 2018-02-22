import IotaValidator from 'validators/IotaValidator';
import SUPPORTED_CURRENCIES from 'supportedCurrencies';

describe('IotaValidator', () => {
  describe('Method validate', () => {
    const validator = new IotaValidator();

    test('Should be applied for iota', () => {
      const result = validator.isAppliedFor(SUPPORTED_CURRENCIES.iota);

      expect(result).toBe(true);
    });

    test('Shold validate IOTA address', () => {
      const isValid = validator.validate('IIAIKOQPKLXGSIRCYGBUYVGWAPBAQNFUTSNCTZVLYCUJMPPQVPTILWXOOVGXOJSNQBIGOZRWFFLAARUC9RTHQATTU9');

      expect(isValid).toBe(true);
    });

    test('Invalid address', () => {
      const isValid = validator.validate('IIAIKOQPKLXGSIR#!@#!*&SasdasUJMPPQVPTILWXOOVGXOJSNQBIGOZRWFFLAARUC9RTHQATTU9');

      expect(isValid).toBe(false);
    });
  });
});