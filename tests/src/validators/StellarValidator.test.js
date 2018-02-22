import StellarValidator from 'validators/StellarValidator';
import SUPPORTED_CURRENCIES from 'supportedCurrencies';

describe('StellarValidator', () => {
  const validator = new StellarValidator();

  test('Should be applied for stellar', () => {
    const result = validator.isAppliedFor(SUPPORTED_CURRENCIES.stellar);

    expect(result).toBe(true);
  });

  describe('Method validate', () => {
    const validAddress = (address) => {
      const isValid = validator.validate(address);
      expect(isValid).toBe(true);
    };

    const invalidAddress = (address) => {
      const isValid = validator.validate(address);
      expect(isValid).toBe(false);
    };

    test('Shold validate stellar address', () => {
      validAddress('GCIXKHQ4K7IMZTTMHHIIBW5JJGATT7HCCFINS6EDZ7R4TGVHTKLYGZY6');
      validAddress('GAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER');
    });

    describe('Incorrect addresses', () => {
      test('Shold validate incorrect addresses', () => {
        invalidAddress('');
        invalidAddress('%%@');
      });

      test('Addresses started not with `G` are incorrect', () => {
        invalidAddress('AAI3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER');
      });

      test('Address symbols belongs to [0-9A-Z]', () => {
        invalidAddress('G_I3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER');
        invalidAddress('G-I3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER');
        invalidAddress('G+I3GJ2Q3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER');
        invalidAddress('Gabcdefg3B35AOZJ36C4ANE3HSS4NK7WI6DNO4ZSHRAX6NG7BMX6VJER');
      });
    });
  });
});