import BaseValidator from './BaseValidator';

export default class RegExpValidator extends BaseValidator {
  constructor(supportedCurrencies, regExp) {
    super(supportedCurrencies);

    this.regExp = regExp;
  }

  validate(address, currency) {
    return this.regExp.test(address);
  }
}