const { Transaction } = require('@ethereumjs/tx');
const Common =  require('@ethereumjs/common');

const txParams = {
  nonce: '0x02',
  gasPrice: '0x09184e72a000',
  gasLimit: '0x2710',
  to: '0x0000000000000000000000000000000000000000',
  value: '0x00',
  data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
}

const common = new Common({ chain: 'mainnet' })
const tx = Transaction.fromTxData(txParams, { common })

const privateKey = Buffer.from(
  process.env.PK,
  'hex',
)

const signedTx = tx.sign(privateKey)

const serializedTx = signedTx.serialize()

console.log('serializedTx', serializedTx);