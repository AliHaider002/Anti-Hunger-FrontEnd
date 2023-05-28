import { format } from "echarts";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import { useContext } from "react";
import AppCtx from "../../Components/Context/MyContext";

import { useCallback, useState, useEffect } from "react";

const tokenABI = require("../../ABIs/Erc20TokenABI.json");

const batchTransferContractABI = require("../../ABIs/batchTransfer.json");

const provider = ethers.getDefaultProvider();
BigNumber.config({ EXPONENTIAL_AT: [-300, 300] });
var contractData;

var signerData;

// var contractAddress="0x6F61c68C767ED16BBc69F833c6b10007666b68f4";

// var contractAddress = "0xa6dbb0EA831eB8E86F7B704872c1CB44Bc379f1E";
var contractAddress = sessionStorage.getItem("SnipeMultisenderContract");

var walletAddress = "";

var sumAmount = new BigNumber(0.0);

// sending contract data while connecting wallet
const useMultiSenderContract = async (contract, signer, waltAddress) => {
  contractData = contract;

  signerData = signer;

  walletAddress = waltAddress;
};

const useMultiSenderContractFun = async () => {
  var batchContract = contractData;

  return batchContract;
};

// Method to approve Token
const approveTokenWithContract = async (tokenAddress, totalAmmount) => {
  try {
    // let tokenAddress = localStorage.getItem("tokenAddress");
    // let tokenAddress = "0xcA70C50Dd4Eb162201EA35fa7A72363Af467dA1E";

    // getting contract of current token
    var tokenContract = new ethers.Contract(tokenAddress, tokenABI, signerData);

    var decimals = await tokenContract.decimals();

    // var totalAmmount = ethers.utils
    //   .parseUnits(totalAmmount, decimals)
    //   .toString();

    //
    //

    var balance = (await tokenContract.balanceOf(walletAddress)).toString();

    balance = await ethers.utils.formatUnits(balance, decimals);

    var tokenName = (await tokenContract.name()).toString();

    var tokenSymbol = (await tokenContract.symbol()).toString();

    var tokenData = {
      tokenBalance: balance,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
    };

    var error2 = "";

    if (Number(balance) < Number(totalAmmount)) {
      return {
        msg: "not enough balance",
        err: true,
        tokenData: "",
        approval: false,
      };
    }

    // var deciamals = (await tokenContract.decimals()).toString();

    var approvedAmount = (
      await tokenContract.allowance(walletAddress, contractAddress)
    ).toString();

    // approvedAmount = parseInt(approvedAmount);

    var finalAmmount = ethers.utils.parseEther(totalAmmount);

    if (Number(approvedAmount) < Number(finalAmmount)) {
      var approve = await tokenContract.approve(contractAddress, finalAmmount);
      // setToken ToHoldAndQuantity

      return { approval: approve, err: false, tokenData: tokenData, msg: "" };
    }

    //
    //

    return {
      msg: "already approved",
      err: false,
      tokenData: tokenData,
      approval: false,
    };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, err: true, msg: "user rejected transaction" };
    }
  }
};

// MultiSenderTokenContract (Multiple token sender)
const getContractMultitSender = async (
  tokenAddressFromInput,
  addressAry,
  valueAry,
  totalAmmount
) => {
  try {
    // contractData

    var fees = (await contractData.fee()).toString();
    const authorizedUser = await contractData.authorizedusers(walletAddress);

    const quantity = (await contractData.quantity()).toString();
    const tokenAddress = await contractData.tokenaddress();

    var tokenContract = new ethers.Contract(
      // tokenAddress,
      tokenAddressFromInput,
      tokenABI,
      signerData
    );

    var balanceofToken = (
      await tokenContract.balanceOf(walletAddress)
    ).toString();

    var decimals = await tokenContract.decimals();

    if (authorizedUser && Number(balanceofToken) >= Number(quantity)) {
      fees = 0;
    }

    // Token transfer
    var tokenTransfer = await contractData.TOKENmultisender(
      tokenAddressFromInput,
      addressAry,
      valueAry,
      {
        value: fees,
      }
    );

    return { success: true, transactionData: tokenTransfer };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return {
        success: false,
        error: "Transaction Rejected, Please Try Again",
        transactionData: false,
      };
    }
    return {
      success: false,
      error: "something went wrong",
      transactionData: false,
    };
  }
};

// Multiple BNB Sender
const sendBNBFunction = async (addressAry, valueAry, totalAmmount) => {
  try {
    const authorizedUser = await contractData.authorizedusers(walletAddress);

    const tokenAddress = await contractData.tokenaddress();

    const quantity = (await contractData.quantity()).toString();

    var tokenContract = new ethers.Contract(tokenAddress, tokenABI, signerData);

    var balanceofToken = (
      await tokenContract.balanceOf(walletAddress)
    ).toString();

    // contractData

    var fees = (await contractData.fee()).toString();
    fees = ethers.utils.formatUnits(fees);

    if (authorizedUser && Number(balanceofToken) >= Number(quantity)) {
      fees = 0;
    }

    var feesBigNum = BigNumber(fees);

    sumAmount = BigNumber(totalAmmount);

    sumAmount = sumAmount.plus(feesBigNum);
    // var totalValue = sumAmount.valueOf();
    var totalValue = sumAmount;

    var totalValue = ethers.utils.parseEther(totalValue.toString()).toString();

    // getBalance
    var signerBalance = (await signerData.getBalance()).toString();

    var totalValueBigNum = BigNumber(totalValue);

    var checkBlc = totalValueBigNum.comparedTo(signerBalance);

    if (checkBlc == 1) {
      return { success: false, error: "not enough balance", response: false };
    }

    // const gasPrice = await ethers.getDefaultProvider().getGasPrice();

    //

    // // getting Estimate fees
    // var estimatedFees = await contractData.estimateGas.BNBmultisender(addressAry,valueAry,{value : totalValue});
    //

    // const transactionFee = gasPrice.mul(estimatedFees);
    //
    //

    // send BNB

    var sendBNB = await contractData.BNBmultisender(addressAry, valueAry, {
      value: totalValue,
    });

    return {
      success: true,
      msg: "BNB transfered successfully",
      response: sendBNB,
    };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return {
        success: false,
        error: "Transaction Rejected, Please Try Again",
        response: false,
      };
    }

    return { success: false, error: "something went wrong", response: false };
  }
};

// const getFees for transactions
const getFeesDetailsForTransactions = async (
  currentTokenAddress,
  addressAry,
  valueAry,
  totalAmmount,
  isBNB
) => {
  try {
    const authorizedUser = await contractData.authorizedusers(walletAddress);

    const tokenAddress = await contractData.tokenaddress();

    const quantity = (await contractData.quantity()).toString();

    var tokenContract = new ethers.Contract(tokenAddress, tokenABI, signerData);

    console.log("ABC");

    var balanceofToken = (
      await tokenContract.balanceOf(walletAddress)
    ).toString();
    console.log("ABC1");
    // contractData

    var fees = (await contractData.fee()).toString();
    fees = ethers.utils.formatUnits(fees);
    var feesToShow = fees;
    console.log("ABC2");
    if (authorizedUser && Number(balanceofToken) >= Number(quantity)) {
      fees = 0;
      feesToShow = 0;
      console.log("ABC33");
    }

    var feesBigNum = BigNumber(fees);

    console.log("TotalAmount", totalAmmount);

    sumAmount = BigNumber(totalAmmount);

    sumAmount = sumAmount.plus(feesBigNum);
    var totalValue = sumAmount.valueOf();
    console.log("ABC33", totalValue);
    var totalValue = ethers.utils.parseEther(totalValue.toString());
    console.log("ABC35");
    // getBalance
    var signerBalance = (await signerData.getBalance()).toString();

    var totalValueBigNum = BigNumber(totalValue);

    var checkBlc = totalValueBigNum.comparedTo(signerBalance);

    const gasPrice = await ethers.getDefaultProvider().getGasPrice();
    console.log("ABC4");
    if (isBNB == true) {
      // getting Estimate fees
      var estimatedFees = await contractData.estimateGas.BNBmultisender(
        addressAry,
        valueAry,
        { value: totalValue }
      );
      console.log("ABC5");
      // // Why we doing multiplaction here??
      // var transactionFee = gasPrice.mul(estimatedFees);
      // var transactionFee = Number(gasPrice) * Number(estimatedFees);
      // // transactionFee = Number(transactionFee) * 4;
      //
      //

      // Why we doing multiplaction here??
      // const transactionFee = gasPrice.mul(estimatedFees);
      const transactionFee = 10 * estimatedFees;

      var ServiceFees = feesToShow;
      var ChainFees = ethers.utils.formatUnits(transactionFee, "gwei");

      var totalFees = Number(ServiceFees) + Number(ChainFees);

      return { ServiceFees, ChainFees, totalFees, error: false };
    } else {
      isBNB = false;
      // token transfer GetTransactionPRice of token transfer;

      var fees = (await contractData.fee()).toString();
      var feesToShow = feesToShow;

      if (authorizedUser && Number(balanceofToken) >= Number(quantity)) {
        fees = 0;
        feesToShow = 0;
      }

      var estimatedFees = await contractData.estimateGas.TOKENmultisender(
        currentTokenAddress,
        addressAry,
        valueAry,
        {
          value: fees,
        }
      );

      const transactionFee = 10 * Number(estimatedFees);

      var ServiceFees = feesToShow;
      var ChainFees = ethers.utils.formatUnits(transactionFee, "gwei");

      var totalFees = Number(ServiceFees) + Number(ChainFees);

      return { ServiceFees, ChainFees, totalFees, error: false };
    }
  } catch (err) {
    if (err.data) {
      if (err.data.code == "-32000") {
        return {
          ServiceFees: "",
          ChainFees: "",
          totalFees: "",
          error: true,
          msg: "insufficient funds for gas",
        };
      }
    }

    if (err.error.data.code == 3) {
      return {
        ServiceFees: "",
        ChainFees: "",
        totalFees: "",
        error: true,
        msg: "transfer amount exceeds balance",
      };
    }

    return {
      ServiceFees: "",
      ChainFees: "",
      totalFees: "",
      error: true,
      msg: "invalid Address",
    };
  }
};

// check If User AuthorizedTo Used THis Services

const checkIfUserAuthorizedToUse = async () => {
  try {
    const authorizedUser = await contractData.authorizedusers(walletAddress);

    return { success: true, isAuth: authorizedUser };
  } catch (err) {
    return { success: false, isAuth: false };
  }
};

// Exports functions
export default useMultiSenderContract;

export {
  getContractMultitSender,
  approveTokenWithContract,
  sendBNBFunction,
  getFeesDetailsForTransactions,
  useMultiSenderContractFun,
  checkIfUserAuthorizedToUse,
};

// parseEther for BNB
// parseUnit for token
