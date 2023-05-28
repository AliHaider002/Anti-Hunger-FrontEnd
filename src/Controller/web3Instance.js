import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnect from "@walletconnect/web3-provider";
import CoinbasewalletSDK from "@coinbase/wallet-sdk";
const abi = require("../ABIs/walletGeneratorABI.json");
const tokenABI = require("../ABIs/Erc20TokenABI.json");
const { currentSigner } = require("../utils/hooks/instances");
require("dotenv").config();

const provider = "";
async function getProvider() {
  // const web3_wallet = await web3Modal.connect();
  // const provider = new ethers.providers.Web3Provider(web3_wallet);
  provider = currentSigner();

  return provider;
}

const signeraddr = async () => {
  // const prov = await getProvider();
  // return await prov.listAccounts();
  const prov = await currentSigner();

  // var listAcount = await prov.listAccounts();

  return await prov._address;
};

const signer = async () =>
  provider.getSigner("0x189A8beF5EB2d85bD2aFF85553068eA1893Da0dA");
//

// wallet Generator Instance
const walletGeneratorInstance = async () => {
  // const prov = (await getProvider()).getSigner(await signeraddr()[0]);

  const prov = await currentSigner();

  return new ethers.Contract(
    // '0x14736603fcFE60891797569407Db300C51981900',
    // '0x31166e661D33055b15fD71034fFa717892Eb54F6',
    // '0x80f437A7479b5eBaE9b92386fb02E8587fE79A83',
    // '0xe1057bEFcf9f0686aC72eCd80569Ec4b0844cE39',
    "0x2aD6a0C30509a3013123291607E956574b28Faa6",
    abi,
    prov
  );
};

// instance of token Contract
const tokenContractInstance = async () => {
  // const prov = (await getProvider()).getSigner(await signeraddr()[0]);

  const prov = await currentSigner();

  return new ethers.Contract(
    // process.env.tokenContract,
    // '0xEfD81DE38188bef34F5C0E6529C6dDe31Cfc90BF',
    "0x4B7a3995F297865A51aB574a1543372236DAF93e",
    tokenABI,
    prov
  );
};

// var walletGeneratorInstance, tokenContractInstance;

// const providerOptions = {
//   coinbasewallet: {
//     package: CoinbasewalletSDK,
//     options: {
//       appName: 'buenotech',
//       infuraId: process.env.REACT_APP_INFURA_KEY,
//       // rpc: 'https://mainnet.infura.io/v3/ab9630f1994d402794f3288ff330ef9c',
//     },
//   },

//   walletconnect: {
//     package: WalletConnect,
//     options: {
//       infuraId: process.env.REACT_APP_INFURA_KEY,
//       // rpc: 'https://mainnet.infura.io/v3/ab9630f1994d402794f3288ff330ef9c',
//     },
//   },
// };

// const web3Modal = new Web3Modal({
//   network: 'mainnet', // optional
//   cacheProvider: true, // optional
//   providerOptions, // required
// });

export {
  walletGeneratorInstance,
  tokenContractInstance,
  getProvider,
  signeraddr,
};
