import DefaultValidator from 'validators/DefaultValidator';
import SUPPORTED_CURRENCIES from 'supportedCurrencies';

describe('DefaultValidator', () => {
  describe('Method isAppliedFor', () => {
    const isAppliedFor = (currency) => {
      test(`Should be applied for ${currency}`, () => {
        const defaultValidator = new DefaultValidator();
        const isApplied = defaultValidator.isAppliedFor(currency);

        expect(isApplied).toBe(true);
      });
    };

    isAppliedFor(SUPPORTED_CURRENCIES.bitcoin);
    isAppliedFor(SUPPORTED_CURRENCIES.litecoin);
    isAppliedFor(SUPPORTED_CURRENCIES.dogecoin);
    isAppliedFor(SUPPORTED_CURRENCIES.dash);
    isAppliedFor(SUPPORTED_CURRENCIES.tether);

    test('Should not be applied for unknown currency', () => {
      const defaultValidator = new DefaultValidator();
      const isApplied = defaultValidator.isAppliedFor('unknown-currency');

      expect(isApplied).toBe(false);
    });
  });

  describe('Method getAddressPrefix', () => {
    const getAddressPrefix = (address, prefixLength) => {
      const defaultValidator = new DefaultValidator();
      return defaultValidator.getAddressPrefix(address, prefixLength);
    };

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('136Ed4MxoHU7K8VdU4n53yjLhPnmzPP5Ch', 1))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP', 1))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', 1))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('1oNLrsHnBcR6dpaBpwz3LSwutbUNkNSjs', 1))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', 1))
        .toBe('6f');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('1SQHtwR5oJRKLfiWQ2APsAd9miUc4k2ez', 1))
        .toBe('00');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', 1))
        .toBe('05');
    });

    test('Should return correct address prefix', () => {
      expect(getAddressPrefix('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', 1))
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
      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.bitcoin);
      });

      describe('Valid formats', () => {
        test('p2pkh', () => {
          validAddress('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', SUPPORTED_CURRENCIES.bitcoin);
          validAddress('12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP', SUPPORTED_CURRENCIES.bitcoin);
          validAddress('mzBc4XEFSdzCDcTxAgf6EZXgsZWpztRhef', SUPPORTED_CURRENCIES.bitcoin);
          validAddress('1AGNa15ZQXAZUgFiqJ2i7Z2DPU2J6hW62i', SUPPORTED_CURRENCIES.bitcoin);
        });

        // p2sh addresses
        test('p2sh address', () => {
          validAddress('3NJZLcZEEYBpxYEUGewU4knsQRn1WM5Fkt', SUPPORTED_CURRENCIES.bitcoin);
          validAddress('2MxKEf2su6FGAUfCEAHreGFQvEYrfYNHvL7', SUPPORTED_CURRENCIES.bitcoin);
        });

        // Segwit addresses.
        test('Segwit addresses', () => {
          validAddress('bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde450xdlk4ugp7szw5tk9', SUPPORTED_CURRENCIES.bitcoin);
          validAddress('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', SUPPORTED_CURRENCIES.bitcoin);
        });
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

    describe('Zcash validation', () => {
      test('Valid addresses', () => {
        validAddress('t1RwJ3uKwHacZXSPWzMsYk4vq5nC3NUMNSo', SUPPORTED_CURRENCIES.zcash);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.zcash);
      });
    });

    describe('Tether validation', () => {
      test('Valid addresses', () => {
        // 00 address prefix
        validAddress('1HckjUpRGcrrRAtFaaCAUaGjsPx9oYmLaZ', SUPPORTED_CURRENCIES.tether);
        validAddress('1FoWyxwPXuj4C6abqwhjDWdz6D4PZgYRjA', SUPPORTED_CURRENCIES.tether);
        // 05 address prefix
        validAddress('3GyeFJmQynJWd8DeACm4cdEnZcckAtrfcN', SUPPORTED_CURRENCIES.tether);
        validAddress('3EEFW1BuoZ2a3Jbtjwa8w54K3cBXTfAWmc', SUPPORTED_CURRENCIES.tether);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.tether);
      });
    });

    describe('Unobtamium validation', () => {
      test('Valid addresses', () => {
        validAddress('uewrE9QWc54EXjCZehWDPkjqgsyRDpQmK8', SUPPORTED_CURRENCIES.unobtamium);
        validAddress('udd3MtriehuH5vbT2w9ALJdcFLctUY3GfY', SUPPORTED_CURRENCIES.unobtamium);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.zcash);
      });
    });

    describe('Neo validation', () => {
      test('Valid addresses', () => {
        validAddress('ASNTYS3gWwD9W6JCEMzMjJ93Ssu2ei7gos', SUPPORTED_CURRENCIES.neo);
        validAddress('ASw26FWgCbgXf38G1JNvLjnkYrQhmaaJtA', SUPPORTED_CURRENCIES.neo);
        validAddress('ANMDLP26dPkJE4mNM1YX6GuBf3JeoizMZ5', SUPPORTED_CURRENCIES.neo);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.neo);
      });
    });

    describe('Qtum validation', () => {
      test('Valid addresses', () => {
        validAddress('QjHVMg32PtgkGTVQAb1EgnothX13SFugRF', SUPPORTED_CURRENCIES.qtum);
        validAddress('QbSeum1op1YYc23NVwHT7Bio7Cb2TrJESW', SUPPORTED_CURRENCIES.qtum);
      });

      test('Invalid addresses', () => {
        commonInvalid(SUPPORTED_CURRENCIES.qtum);
      });
    });
  });
});