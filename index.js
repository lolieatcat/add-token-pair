const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const web3 = new Web3(new HDWalletProvider(process.env.PK, "https://data-seed-prebsc-1-s1.binance.org:8545"));

const abi = require("./abi.TokenManagerDelegate.json");

const scAddr = '0xe110fcEd02DF3b3ABB9E13145bd62491ac3A0032';

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

  // const ret = await web3.eth.sendTransaction({from: '0x2AA0175Eb8b0FB818fFF3c518792Cc1a327a1338', chainId:'97', gasPrice: 20e9, gas: 1000000, data, value:'0'});
  // console.log('ret', ret);
}

async function updateTokenPair(sc, id, aInfo, fromChainID, fromAccount, toChainID, toAccount) {
  const aInfoParam = Array.from(aInfo);
  if (typeof (aInfo[0]) === 'string') {
    aInfoParam[0] = hexToBytes(aInfo[0])
  }
  const fromAccountParam = typeof (fromAccount) === 'string' ? hexToBytes(fromAccount) : fromAccount 

  const data = await sc.methods.updateTokenPair(id, aInfoParam, fromChainID, fromAccountParam, toChainID, toAccount).encodeABI();

  console.log('ret', data);

  // const ret = await web3.eth.sendTransaction({from: '0x2AA0175Eb8b0FB818fFF3c518792Cc1a327a1338', chainId:'97', gasPrice: 20e9, gas: 1000000, data, value:'0'});
  // console.log('ret', ret);
}

async function main() {
  // console.log(await sc.methods.owner().call());
  try {
    await addTokenPair(sc, 
      "39",["0x0000000000000000000000000000000000000000","AVAX","AVAX","18","2147492648"],"2147492648","0x0000000000000000000000000000000000000000","2153201998","0xc8f5b26589392fde84ee0482e2b5a77dfbe943fc"
    );
    // await addTokenPair(sc, 
    //   "33",["0xaec65404ddc3af3c897ad89571d5772c1a695f22","Phoenix Token","PHX","18","2147483708"],"2153201998","0xf17c59bf0f6326da7a8cc2ce417e4f53a26707bd","2147484362","0xac86e5f9ba48d680516df50c72928c2ec50f3025"
    // );
    // await addTokenPair(sc, 
    //   "35",["0xbdd50c7b6c871d9afb278445d5b74fdc4705a234","Convertible Phoenix Token","cPHX","18","2147483708"],"2147483708","0xbdd50c7b6c871d9afb278445d5b74fdc4705a234","2147484362","0xd8fa6921b24ab1cd52ab553d1f99aaedc321e562"
    // );
    // await addTokenPair(sc, 
    //   "36",["0xbdd50c7b6c871d9afb278445d5b74fdc4705a234","Convertible Phoenix Token","cPHX","18","2147483708"],"2153201998","0xd8fa6921b24ab1cd52ab553d1f99aaedc321e562","2147484362","0xd8fa6921b24ab1cd52ab553d1f99aaedc321e562"
    // );
  } catch (error) {
    console.log(error);
  }

  process.exit(0);
}

main();

