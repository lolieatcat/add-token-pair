const LedgerWalletProvider = require('@umaprotocol/truffle-ledger-provider');

const ledgerOptions = {
  networkId: 999, // mainnet
  path: "44'/60'/0'/0", // ledger default derivation path
  askConfirm: false,
  accountsLength: 10,
  accountsOffset: 0,
};

const provider = new LedgerWalletProvider(ledgerOptions, 'http://t.m:8545');

const Web3 = require('web3');

const web3 = new Web3(provider);

async function main() {
  console.log(web3.eth.accounts.wallet);

  // let ret = await web3.eth.sendTransaction({from: '0x0242e3f6ced3817bd4cbC80B66f59BF2970c157c', to: '0x0242e3f6ced3817bd4cbC80B66f59BF2970c157c', value: 1, gasPrice: 1e9});
  // console.log('ret', ret);

}

main();
