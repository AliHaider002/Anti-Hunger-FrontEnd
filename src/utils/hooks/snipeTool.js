import { ethers } from "ethers";

const { currentSigner } = require("./instances");

import { getGeneratedFees } from "../APIs/servicesFeeApi";

const generateMultipleWallets = async (numOfWlts) => {
  try {
    //

    var serviceFees = await getGeneratedFees();
    serviceFees = serviceFees.responseDate;

    var feeToUse = 0;

    // if(fee == "1"){
    //     feeToUse= serviceFees.payPerUse
    // }else if(fee == "2"){
    //     feeToUse= serviceFees.monthly
    // }else if(fee == "3"){
    //     feeToUse= serviceFees.yearly
    // }else{
    //     feeToUse = "invalid Fee"
    // }

    var wltsAry = [];
    for (var x = 0; x < numOfWlts; x++) {
      let createWallet = ethers.Wallet.createRandom();

      var wlt = {
        address: createWallet.address,
        mnemonic: createWallet.mnemonic.phrase,
        privateKey: createWallet.privateKey,
      };

      wltsAry.push(wlt);
    }

    return { success: true, wallts: wltsAry };
  } catch (err) {
    return { success: false };
  }
};

// exporting functions

export { generateMultipleWallets };
