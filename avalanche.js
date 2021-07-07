const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const sleep = require('ko-sleep');
// const web3 = new Web3(new HDWalletProvider(process.env.PK, "https://rpc.testnet.moonbeam.network"));
const web3 = new Web3(new HDWalletProvider(process.env.PK, "http://192.168.1.36:9650/ext/bc/C/rpc"));

const abi = require("./abi.TokenManagerDelegate.json");

// const scAddr = '0x59ba8f584d9293a8F2ceEEF76760Ef534afDD716';
const scAddr = '0xaFd25d2696b94d6020037cB8942d72b012Bf0846';
const owner = '0x2AA0175Eb8b0FB818fFF3c518792Cc1a327a1338';
const chainId = '43113';

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
  const ret = await web3.eth.sendTransaction({from: owner, to:scAddr, chainId: chainId, gasPrice: 225e9, gas: 8000000, data, value:'0'});
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
      "41",["0x0000000000000000000000000000000000000000","BTC","BTC","8","2147483648"],"2147483648","0x0000000000000000000000000000000000000000","2147492648","0x8ccc028d24e586dcf6cc6e4a6082747ee922a334"
    );
    await sleep(5000);
    await addTokenPair(sc, 
      "42",["0x0000000000000000000000000000000000000000","ETH","ETH","18","2147483708"],"2147483708","0x0000000000000000000000000000000000000000","2147492648","0x4c41c390adc96497be2cceb196d16db6c2a169a4"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "43",["0x28c96b26f6df3cf57a0a4e8fef02e9295e9ca458","USDT","USDT","6","2147483708"],"2147483708","0x28c96b26f6df3cf57a0a4e8fef02e9295e9ca458","2147492648","0x375b1c82f390b67a4b0ee8fd11c5320d378b3590"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "44",["0x0000000000000000000000000000000000000000","WAN","WAN","18","2153201998"],"2153201998","0x0000000000000000000000000000000000000000","2147492648","0x14687d327e54f80582731e3748544762b36ddecd"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "45",["0x0000000000000000000000000000000000000000","LTC","LTC","8","2147483650"],"2147483650","0x0000000000000000000000000000000000000000","2147492648","0xe80934a5e84117d415601d62fcecf8781bda7907"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "46",["0x0000000000000000000000000000000000000000","XRP","XRP","6","2147483792"],"2147483792","0x0000000000000000000000000000000000000000","2147492648","0x18266e440ddaaa5794e922e7125f453f28a6afc0"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "47",["0x0000000000000000000000000000000000000000","WND","WND","12","2147484002"],"2147484002","0x0000000000000000000000000000000000000000","2147492648","0x2a4b8cf0b4c64f06930a9645f58d924ab93b7f7e"
    );
  } catch (error) {
    console.log(error);
  }

  process.exit(0);
}

main();

