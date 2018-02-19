// import addressValidator from 'addressValidator';
import addressValidator from '../../src/addressValidator';

describe('addressValidator', () => {
  describe('not supported currencies', () => {
    test('Should throw error if currency is not supported', () => {
      const currencty = 'not-supported';

      expect(() => addressValidator.validate('hash', currencty)).toThrow();
    });
  });
});
