import EtheriumValidator from 'validators/EtheriumValidator';
import SUPPORTED_CURRENCIES from 'supportedCurrencies';

describe('EtheriumValidator', () => {
  describe('Method validate', () => {
    const validator = new EtheriumValidator();

    const validAddress = (address) => {
      const isValid = validator.validate(address);
      expect(isValid).toBe(true);
    };

    test('Should be applied for etherium', () => {
      const result = validator.isAppliedFor(SUPPORTED_CURRENCIES.ethereum);

      expect(result).toBe(true);
    });

    test('Should be applied for etherium classic', () => {
      const result = validator.isAppliedFor(SUPPORTED_CURRENCIES.ethereum_classic);

      expect(result).toBe(true);
    });

    test('Shold validate Etherium address', () => {
      validAddress('0x0096ca31c87771a2ed212d4b2e689e712bd938f9');
    });

    describe('ERC20', () => {
      test('Shold validate OmiseGo address', () => {
        validAddress('0x627306090abaB3A6e1400e9345bC60c78a8BEf57');
      });

      test('Shold validate Augur address', () => {
        validAddress('0xcdaa35c3021841745b2689c975c859065abddba2');
      });

      test('Shold validate Golem address', () => {
        validAddress('0x876eabf441b2ee5b5b0554fd502a8e0600950cfa');
      });

      test('Shold validate EOS address', () => {
        validAddress('0xb90f51c4011eac7bd9e42dbdd608cac8d19ff0ce');
      });

      test('Shold validate FUEL address', () => {
        validAddress('0x05ee546c1a62f90d7acbffd6d846c9c54c7cf94c');
      });

      test('Shold validate StatusNetwork address', () => {
        validAddress('0x60c972e45e2e23e4adc818310698b2dee7912660');
      });

      test('Shold validate SingularDTV address', () => {
        validAddress('0xb694276fef575555c4694ae98a6e0c5089151c93');
      });

      test('Shold validate Genesis Coin address', () => {
        validAddress('0x9dfe4643C04078a46803edCC30a3291b76d4c20c');
      });
    });

    describe('Ethereum classic', () => {
      test('Should validate Ethereum classic address', () => {
        validAddress('0x304a554a310C7e546dfe434669C62820b7D83490');
      });
    });
  });
});