const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const sleep = require('ko-sleep');
const web3 = new Web3(new HDWalletProvider(process.env.PK, "https://rpc.testnet.moonbeam.network"));

const abi = require("./abi.TokenManagerDelegate.json");

// const scAddr = '0x59ba8f584d9293a8F2ceEEF76760Ef534afDD716';
const scAddr = '0x59ba8f584d9293a8F2ceEEF76760Ef534afDD716';
const owner = '0x2AA0175Eb8b0FB818fFF3c518792Cc1a327a1338';
const chainId = '1287';

const sc = new web3.eth.Contract(abi, scAddr);

const hexToBytes = web3.utils.hexToBytes;

async function addTokenPair(sc, id, aInfo, fromChainID, fromAccount, toChainID, toAccount) {
  const aInfoParam = Array.from(aInfo);
  if (typeof (aInfo[0]) === 'string') {
    aInfoParam[0] = hexToBytes(aInfo[0])
  }
  const fromAccountParam = typeof (fromAccount) === 'string' ? hexToBytes(fromAccount) : fromAccount 

  const data = await sc.methods.addTokenPair(id, aInfoParam, fromChainID, fromAccountParam, toChainID, toAccount).encodeABI();

  console.log('');
  console.log(data);
  console.log('');

  // const ret = await web3.eth.sendTransaction({from: '0x2AA0175Eb8b0FB818fFF3c518792Cc1a327a1338', to:scAddr, chainId:'1287', gasPrice: 1e9, gas: 8000000, data, value:'0'});
  const ret = await web3.eth.sendTransaction({from: owner, to:scAddr, chainId: chainId, gasPrice: 1e9, gas: 8000000, data, value:'0'});
  console.log('ret', ret);
}

async function updateTokenPair(sc, id, aInfo, fromChainID, fromAccount, toChainID, toAccount) {
  const aInfoParam = Array.from(aInfo);
  if (typeof (aInfo[0]) === 'string') {
    aInfoParam[0] = hexToBytes(aInfo[0])
  }
  const fromAccountParam = typeof (fromAccount) === 'string' ? hexToBytes(fromAccount) : fromAccount 

  const data = await sc.methods.updateTokenPair(id, aInfoParam, fromChainID, fromAccountParam, toChainID, toAccount).encodeABI();

  console.log('ret', data);

  // const ret = await web3.eth.sendTransaction({from: '0x2AA0175Eb8b0FB818fFF3c518792Cc1a327a1338', chainId:'43113', gasPrice: 225e9, gas: 2000000, data, value:'0'});
  // console.log('ret', ret);
}

async function main() {
  // console.log(await sc.methods.owner().call());
  try {
    await addTokenPair(sc, 
      "49",["0x0000000000000000000000000000000000000000","BTC","BTC","8","2147483648"],"2147483648","0x0000000000000000000000000000000000000000","1073741825","0xc6ae1db6c66d909f7bfeeeb24f9adb8620bf9dbf"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "50",["0x0000000000000000000000000000000000000000","WND","WND","12","2147484002"],"2147484002","0x0000000000000000000000000000000000000000","1073741825","0xbe5187c2a7eb776c1caeed2c37e7599fb05000d3"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "51",["0x0000000000000000000000000000000000000000","ETH","ETH","18","2147483708"],"2147483708","0x0000000000000000000000000000000000000000","1073741825","0x09cdfc56439643d151585b77899d0dc0f982bcd2"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "52",["0x0000000000000000000000000000000000000000","LTC","LTC","8","2147483650"],"2147483650","0x0000000000000000000000000000000000000000","1073741825","0x4f1ab74c2a9e8f591e8a80768e115c9f75935bad"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "53",["0x28c96b26f6df3cf57a0a4e8fef02e9295e9ca458","USDT","USDT","6","2147483708"],"2147483708","0x28c96b26f6df3cf57a0a4e8fef02e9295e9ca458","1073741825","0x2715aa7156634256ae75240c2c5543814660cd04"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "54",["0x0000000000000000000000000000000000000000","XRP","XRP","6","2147483792"],"2147483792","0x0000000000000000000000000000000000000000","1073741825","0x70114d2a0ec788bafee869acf7fd1f8c76491799"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "55",["0x0000000000000000000000000000000000000000","WAN","WAN","18","2153201998"],"2153201998","0x0000000000000000000000000000000000000000","1073741825","0x50133f6836cb91237e17177e2985cbdad51f0cf2"
    );
    await sleep(5000);

  
  } catch (error) {
    console.log(error);
  }

  process.exit(0);
}

main();

