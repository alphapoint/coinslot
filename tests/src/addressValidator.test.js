// import addressValidator from 'addressValidator';
import validator from '../../src';

describe('addressValidator', () => {
  describe('not supported currencies', () => {
    test('Should throw error if currency is not supported', () => {
      const currencty = 'not-supported';

      expect(() => validator.validate('hash', currencty)).toThrow();
    });
  });
});
