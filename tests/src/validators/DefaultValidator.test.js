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

  describe('Method getAddressPrefix', () => {
    const getAddressPrefix = (address) => {
      const defaultValidator = new DefaultValidator();
      return defaultValidator.getAddressPrefix(address);
    };

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('136Ed4MxoHU7K8VdU4n53yjLhPnmzPP5Ch'))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP'))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y'))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('1oNLrsHnBcR6dpaBpwz3LSwutbUNkNSjs'))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef'))
        .toBe('6f');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('1SQHtwR5oJRKLfiWQ2APsAd9miUc4k2ez'))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt'))
        .toBe('05');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7'))
        .toBe('c4');
    });
  });

  describe('Method validate', () => {
    const validAddress = (address, currency) => {
      const defaultValidator = new DefaultValidator();
      const isValid = defaultValidator.validate(address, currency);
      expect(isValid).toBe(true);
    };

    const invalidAddress = (address, currency) => {
      const defaultValidator = new DefaultValidator();
      const isValid = defaultValidator.validate(address, currency);
      expect(isValid).toBe(false);
    };

    const commonInvalid = (currency) => {
      invalidAddress('', currency);
      invalidAddress('%%@', currency);
      invalidAddress('1A1zP1ePQGefi2DMPTifTL5SLmv7DivfNa', currency);
      invalidAddress('bd839e4f6fadb293ba580df5dea7814399989983', currency);
    };

    describe('Bitcoin validation', () => {
      test('Valid addresses', () => {
        validAddress('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', SUPPORTED_CURRENCIES.bitcoin);
        validAddress('12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP', SUPPORTED_CURRENCIES.bitcoin);
        validAddress('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', SUPPORTED_CURRENCIES.bitcoin);

        // p2sh addresses
        validAddress('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', SUPPORTED_CURRENCIES.bitcoin);
        validAddress('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', SUPPORTED_CURRENCIES.bitcoin);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.bitcoin);
      });
    });

    describe('Litecoin validation', () => {
      test('Valid addresses', () => {
        validAddress('LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH9', SUPPORTED_CURRENCIES.litecoin);
        validAddress('LVg2kJoFNg45Nbpy53h7Fe1wKyeXVRhMH9', SUPPORTED_CURRENCIES.litecoin);
        validAddress('LTpYZG19YmfvY2bBDYtCKpunVRw7nVgRHW', SUPPORTED_CURRENCIES.litecoin);
        validAddress('Lb6wDP2kHGyWC7vrZuZAgV7V4ECyDdH7a6', SUPPORTED_CURRENCIES.litecoin);
        validAddress('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', SUPPORTED_CURRENCIES.litecoin);
        validAddress('MHg7DcNPhpCqTxijJDmAyA2U3zjj475uf8', SUPPORTED_CURRENCIES.litecoin);

        // p2sh addresses
        validAddress('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', SUPPORTED_CURRENCIES.litecoin);
        validAddress('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', SUPPORTED_CURRENCIES.litecoin);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.litecoin);
      });
    });

    describe('Dogecoin validation', () => {
      test('Valid addresses', () => {
        validAddress('DPpJVPpvPNP6i6tMj4rTycAGh8wReTqaSU', SUPPORTED_CURRENCIES.dogecoin);
        validAddress('DNzLUN6MyYVS5zf4Xc2yK69V3dXs6Mxia5', SUPPORTED_CURRENCIES.dogecoin);
        validAddress('DPS6iZj7roHquvwRYXNBua9QtKPzigUUhM', SUPPORTED_CURRENCIES.dogecoin);
        validAddress('DPS6iZj7roHquvwRYXNBua9QtKPzigUUhM', SUPPORTED_CURRENCIES.dogecoin);
        validAddress('DP49mExpYVuGk2zheXd1LPvt1wc3nkJmFx', SUPPORTED_CURRENCIES.dogecoin);

        // testnet
        validAddress('2MtF65ZhrkqsHsNoFtA91e1AdveqXLMvS5M', SUPPORTED_CURRENCIES.dogecoin);
        validAddress('2Mz1sMkg86QME5usmr9wKhadF3E4hKWqvwq', SUPPORTED_CURRENCIES.dogecoin);

        // p2sh addresses
        validAddress('A7JjzK9k9x5b2MkkQzqt91WZsuu7wTu6iS', SUPPORTED_CURRENCIES.dogecoin);
        validAddress('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', SUPPORTED_CURRENCIES.dogecoin);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.dogecoin);
      });
    });

    describe('Dash validation', () => {
      test('Valid addresses', () => {
        // 4c
        validAddress('XekiLaxnqpFb2m4NQAEcsKutZcZgcyfo6W', SUPPORTED_CURRENCIES.dash);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.dash);
      });
    });

    describe('Bitcoin gold validation', () => {
      test('Valid addresses', () => {
        validAddress('GKwA3Bgun95QPbnvQ1SBUk5EcZaczuAcpa', SUPPORTED_CURRENCIES.bitcoin_gold);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.bitcoin_gold);
      });
    });
  });
});