// import validator from './addressValidator';
import SUPPORTED_CURRENCIES from './supportedCurrencies';

export default function (address, currency) {
  if (!SUPPORTED_CURRENCIES[currency]) {
    throw Error(`${currency} is not supported`);
  }

  return true;
}
