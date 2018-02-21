import DefaultValidator from './validators/DefaultValidator';
import BitcoinCashValidator from './validators/BitcoinCashValidator';
import EthereumValidator from './validators/EthereumValidator';
import MoneroValidator from './validators/MoneroValidator';
import RippleValidator from './validators/RippleValidator';
import IotaValidator from './validators/IotaValidator';
import SUPPORTED_CURRENCIES from './supportedCurrencies';

export default function (address, currency) {
  if (!SUPPORTED_CURRENCIES[currency]) {
    throw Error(`${currency} is not supported`);
  }

  return true;
}
