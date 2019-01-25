# Coinslot
Wallet address validator.

Cryptocurrencies we support:
- bitcoin
- litecoin
- dogecoin
- dash
- bitcoin cash
- bitcoin gold
- ethereum
- omise go
- augur
- eos
- fuel
- status
- singularDTV
- genesis coin
- walton chain
- ethereum classic
- monero
- ripple
- zcash
- tether
- unobtamium
- iota
- stellar
- neo
- ubiq

## Usage
```js
import {validate, SUPPORTED_CURRENCIES} from 'coinslot'

const BTC = SUPPORTED_CURRENCIES.bitcoin;

validate('12QeMLzSrB8XH8FvEzPMVoRxVAzTr5XM2y', BTC)         // true
validate('', BTC)                                           // false
validate('0x627306090abaB3A6e1400e9345bC60c78a8BEf57', BTC) // false, this is Ethereum address, not bitcoin
validate('', 'NOT_SUPPORTED_CURRENCY')                        // throw Error 
```

## Run tests
`npm test`