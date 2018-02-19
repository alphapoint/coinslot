import base58 from './base58';

export default function () {
  const obj = {a: '123'};
  const {a} = obj;
  return base58.decode(a);
}