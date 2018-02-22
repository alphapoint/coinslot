import {validate} from '../../src';
import SUPPORTED_CURRENCIES from '../../src/supportedCurrencies';

describe('Index', () => {
  describe('Not supported currencies', () => {
    test('Should throw error if currency is not supported', () => {
      const currencty = 'not-supported';

      expect(() => validate('hash', currencty)).toThrow();
    });
  });

  describe('Supported currencies', () => {
    const testSupportOfCurrency = (currency) => {
      test(`Support of ${currency}`, () => {
        const anyWalletAddress = 'f123Fg24Fcas_somehash';

        expect(() => {
          validate(anyWalletAddress, currency);
        }).not.toThrow();
      });
    };

    Object.values(SUPPORTED_CURRENCIES).forEach((SUPPORTED_CURRENCY) => {
      testSupportOfCurrency(SUPPORTED_CURRENCY);
    });
  });
});
