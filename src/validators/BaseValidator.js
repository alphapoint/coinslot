export default class BaseValidator {
  constructor(supportedCurrencies) {
    this.supportedCurrencies = supportedCurrencies;
  }

  isApplied(currency) {
    return this.supportedCurrencies.some(supportedCurrency => supportedCurrency === currency);
  }
}