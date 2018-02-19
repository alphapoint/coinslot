import validator from './addressValidator';

function foo() {
  const address1 = '12KYrjTdVGjFMtaxERSk3gphreJ5US8aUP';

  console.log(validator.getAddressType(address1));
}

foo();

export default validator;
