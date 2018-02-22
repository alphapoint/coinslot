import DefaultValidator from './validators/DefaultValidator';
import BitcoinCashValidator from './validators/BitcoinCashValidator';
import EthereumValidator from './validators/EthereumValidator';
import MoneroValidator from './validators/MoneroValidator';
import RippleValidator from './validators/RippleValidator';
import IotaValidator from './validators/IotaValidator';
import StellarValidator from './validators/StellarValidator';
import SUPPORTED_CURRENCIES from './supportedCurrencies';

const supportedValidators = [
  new BitcoinCashValidator(),
  new EthereumValidator(),
  new MoneroValidator(),
  new RippleValidator(),
  new IotaValidator(),
  new StellarValidator(),
  new DefaultValidator(),
];
const supportedCurrencies = Object.values(SUPPORTED_CURRENCIES);

export function validate(address, currency) {
  if (supportedCurrencies.indexOf(currency) === -1) {
    throw Error(`${currency} is not supported`);
  }

  const validatorForCurrency = supportedValidators.find(item => item.isAppliedFor(currency));

  return validatorForCurrency.validate(address, currency);
}

export {SUPPORTED_CURRENCIES};