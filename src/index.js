import DefaultValidator from './validators/DefaultValidator';
import BitcoinCashValidator from './validators/BitcoinCashValidator';
import EthereumValidator from './validators/EthereumValidator';
import MoneroValidator from './validators/MoneroValidator';
import RippleValidator from './validators/RippleValidator';
import IotaValidator from './validators/IotaValidator';
import StellarValidator from './validators/StellarValidator';
import SUPPORTED_CURRENCIES from './supportedCurrencies';

const supportedValidators = [
  DefaultValidator,
  BitcoinCashValidator,
  EthereumValidator,
  MoneroValidator,
  RippleValidator,
  IotaValidator,
  StellarValidator,
];

export default function (address, currency) {
  if (!SUPPORTED_CURRENCIES[currency]) {
    throw Error(`${currency} is not supported`);
  }

  let validatorForCurrency;

  for (let i = 0; i < supportedValidators.length; i++) {
    const validator = new supportedValidators[i]();

    if (validator.isAppliedFor(currency)) {
      validatorForCurrency = validator;
      break;
    }
  }

  return validatorForCurrency.validate(address, currency);
}
