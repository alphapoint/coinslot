import MoneroValidator from 'validators/MoneroValidator';
import SUPPORTED_CURRENCIES from 'supportedCurrencies';

describe('MoneroValidator', () => {
  const validator = new MoneroValidator();

  test('Should be applied for monero', () => {
    const result = validator.isAppliedFor(SUPPORTED_CURRENCIES.monero);

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

    test('Shold validate monero address', () => {
      validAddress('44AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A');
    });

    describe('Incorrect addresses', () => {
      test('Shold validate incorrect addresses', () => {
        invalidAddress('');
        invalidAddress('%%@');
      });

      test('Addresses started not with `4` are incorrect', () => {
        invalidAddress('34AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A');
      });

      test('Second character can only be a number (0-9), or letters A or B', () => {
        invalidAddress('3-AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A');
        invalidAddress('3_AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A');
        invalidAddress('3+AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A');
      });

      test('Addresses with length not equal to 95 are incorrect', () => {
        const valid = '44AFFq5kSiGBoZ4NMDwYtN18obc8AemS33DBLWs3H7otXft3XjrpDtQGv7SqSsaBYBb98uNbr2VBBEt7f2wfn3RVGQBEP3A';

        invalidAddress(valid.substring(0, 93));
        invalidAddress(`${valid}FFq54`);
      });
    });
  });
});