export default class BaseValidator {
  constructor(supportedCurrencies) {
    this.supportedCurrencies = supportedCurrencies;
  }

  isAppliedFor(currency) {
    return this.supportedCurrencies.some(supportedCurrency => supportedCurrency === currency);
  }

  getSupportedCurrencies() {
    return this.supportedCurrencies;
  }
}