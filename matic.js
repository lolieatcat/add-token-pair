const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const sleep = require('ko-sleep');
const web3 = new Web3(new HDWalletProvider(process.env.PK, "https://rpc-mumbai.maticvigil.com"));

const abi = require("./abi.TokenManagerDelegate.json");

// const scAddr = '0x59ba8f584d9293a8F2ceEEF76760Ef534afDD716';
const scAddr = '0x15Ad86ebE92EccE4347E65DA59122E2F495D6a48';
const owner = '0x2AA0175Eb8b0FB818fFF3c518792Cc1a327a1338';
const chainId = '80001';

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
      "56",["0x0000000000000000000000000000000000000000","MATIC","MATIC","18","2147484614"],"2147484614","0x0000000000000000000000000000000000000000","2153201998","0xdc5707d4425c45144b7d2d8da5927ce818dbd113"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "57",["0x0000000000000000000000000000000000000000","BTC","BTC","8","2147483648"],"2147483648","0x0000000000000000000000000000000000000000","2147484614","0xb3407f46a2b73e103d17e45965b0026f6e14ecb8"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "58",["0x0000000000000000000000000000000000000000","ETH","ETH","18","2147483708"],"2147483708","0x0000000000000000000000000000000000000000","2147484614","0xeaf2cc7d58a896c4f5fdf3c23a171c1207ce5eb2"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "59",["0x28c96b26f6df3cf57a0a4e8fef02e9295e9ca458","USDT","USDT","6","2147483708"],"2147483708","0x28c96b26f6df3cf57a0a4e8fef02e9295e9ca458","2147484614","0x149f1650f0ff097bca88118b83ed58fb1cfc68ef"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "60",["0x0000000000000000000000000000000000000000","XRP","XRP","6","2147483792"],"2147483792","0x0000000000000000000000000000000000000000","2147484614","0x29cd651f41bcc93186adf1c267cb9ba648968a7f"
    );
    await sleep(5000);

    await addTokenPair(sc, 
      "61",["0x0000000000000000000000000000000000000000","WAN","WAN","18","2153201998"],"2153201998","0x0000000000000000000000000000000000000000","2147484614","0x8d6ed180cf8232e492b5accb05b367dbfb595edb"
    );
    await sleep(5000);
  
  } catch (error) {
    console.log(error);
  }

  process.exit(0);
}

main();

