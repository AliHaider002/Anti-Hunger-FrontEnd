import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import batchTransferTokenLockABI from "../../ABIs/pinkLock.json";
import erc20ABI from "../../ABIs/Erc20TokenABI.json";

import { useMultiSenderContractFun } from "./use-MultiSenderContract";

import {
  lockTokenBackendFun,
  deletTokenFromBackend,
  addBNBLock,
  deleteBNb,
  updateLockedToken,
  extendTokenLockAPI,
  transferLockOwnerShipBNBAPI,
  getTokenByID,
  getLockedBNbById,
  extendLockBNBAPI,
  liquidityBackendFun,
} from "../APIs/apis";

// BigNumber.config({ EXPONENTIAL_AT: [-300, 300] });
// var sumAmount = new BigNumber('0.0');

// const contractAddress = "0xd2ce571c138e000142f8b47EA91a4DC511B7f059";
// const contractAddress = "0x4F59259686604D64b30A01B57408467d8Cbfb4d5";
// const contractAddress = "0x39bd70577d7AcE96b548c5B3C75bD49E2d42b3Fc";

// const contractAddress = "0xa6A5e0AB5aD11DA4e02E15A4478f7261eFBf35d0";
// const contractAddress = "0x53818777dDDD1e295f75CB18417F98425403CF1B";
// const contractAddress = "0xb03e2f2807764b2493e11170c98A8B599d717854";
// const contractAddress = '0xaDD1129A89eeBfDbd5d52575fe5522918f82F467';
// const contractAddress = "0xaE4D193c03B85bb1F5A71A4Cb3eF138403C4967e";

// const contractAddress = "0x50947Ff069c276d335aEc63aA25F5976B9Fb2708";
const contractAddress = sessionStorage.getItem("ContractAddress");

const { currentSigner } = require("./instances");

var tokenLockContract;

console.log("ThisIsContractAddress", contractAddress);

// this function to use to fetch data from Batch Transfer contract
const MultiSenderContractFunctions = async (wAddress) => {
  try {
    var batchTransferContract = await useMultiSenderContractFun();

    const authorizedUser = await batchTransferContract.authorizedusers(
      wAddress
    );
    const quantity = (await batchTransferContract.quantity()).toString();

    // var tokenContract = new ethers.Contract(
    //     tokenAddress,
    //     tokenABI,
    //     signers
    //     );

    //
    //

    return { authorizedusers: authorizedUser };
  } catch (err) {}
};

// getSpecificLock using Backend and Blockhcain contract

async function getSpecificLockIDToken(locksAry, tokenID) {
  try {
    var result = await getTokenByID(tokenID);

    var tokenData = result.data;

    var tokenAddress = tokenData.tokenAddress;
    var decimal = tokenData.tokenDecimal;
    var lockDate = tokenData.Date;

    lockDate = new Date(lockDate);

    const dt = Date.parse(lockDate);
    var lockDate = dt;

    var lockedAmountBackend = tokenData.total_Locked_Amount;
    lockedAmountBackend = ethers.utils
      .parseUnits(lockedAmountBackend.toString(), decimal)
      .toString();
    var unLOckDate = Number(result.unLockDateUnix);

    var currentTokenData = [];
    locksAry.forEach((item, index) => {
      //
      // if(item[1])
      if (item[1] === tokenAddress) {
        currentTokenData.push(item);
      }
    });

    var currenTToken = [];
    currentTokenData.forEach((item, index) => {
      var unLockDateContract = Number(item.tgeDate.toString());
      var amount = Number(item.amount.toString());

      var lockDate2 = Number(item.lockDate.toString());
      var lockDate3 = Number(lockDate2) - Number(lockDate);

      lockDate3 = Math.abs(lockDate3);

      if (
        unLockDateContract === unLOckDate &&
        Number(amount) == Number(lockedAmountBackend)
      ) {
        if (lockDate3 <= 5) {
          var object = {
            Amount: Number(item.amount.toString()),
            id: Number(item.id.toString()),
            unLockDate: Number(item.tgeDate.toString()),
            token: item.token,
            lockDate2: lockDate2,
            lockDate: lockDate,
          };

          currenTToken.push(object);
        }
      }
    });

    //

    return currenTToken[0];
  } catch (err) {}
}

// get specified Locked BNB Detials

async function getSpecifiedLockedBNBDetials(locksAry, bnbID) {
  try {
    var result = await getLockedBNbById(bnbID);

    console.log("ThisIsResult", result);

    var bnbData = result.data;

    var unLockDate = Number(result.unLockUnix);
    var lockDate = result.lockDate;
    lockDate = new Date(lockDate);

    const dt = Date.parse(lockDate);
    var lockDate = dt;

    var walletAddress = result.lockOwner;
    var lockedAmountBackend = result.lockedAmount;

    var currentTokenData = [];
    locksAry.forEach((item, index) => {
      //
      if (item[1] === walletAddress) {
        currentTokenData.push(item);
      }
    });

    var currenTToken = [];
    currentTokenData.forEach((item, index) => {
      var unLockDateContract = Number(item.tgeDate.toString());
      var amount = Number(item.amount.toString());
      var lockDate2 = Number(item.lockDate.toString());
      var lockDate3 = Number(lockDate2) - Number(lockDate);

      lockDate3 = Math.abs(lockDate3);

      if (
        unLockDateContract === unLockDate &&
        Number(amount) == Number(lockedAmountBackend)
      ) {
        if (lockDate3 <= 5) {
          var object = {
            Amount: Number(item.amount.toString()),
            id: Number(item.id.toString()),
            unLockDate: Number(item.tgeDate.toString()),
            lockDate2: lockDate2,
            lockDate: lockDate,
          };

          currenTToken.push(object);
        }
      }
    });

    //

    return currenTToken[0];
  } catch (err) {}
}

// approve token for Lock
const approveToken = async (tokenAddress, totalAmmount) => {
  try {
    var signer = await currentSigner();
    var walletAddress = signer._address;

    // getting contract of current token
    var tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

    var decimals = await tokenContract.decimals();

    var totalAmmount = ethers.utils
      .parseUnits(totalAmmount.toString(), decimals)
      .toString();
    //    var totalAmmount = (ethers.utils.parseUnits((totalAmmount).toString(), "ether")).toString();

    //
    //

    var balance = (await tokenContract.balanceOf(walletAddress)).toString();

    //    balance = await ethers.utils.formatUnits(balance,decimals);
    //    balance = (ethers.utils.parseUnits((balance).toString(),decimals)).toString();
    var totalBalanceFOrApprove = balance;

    var tokenName = (await tokenContract.name()).toString();

    var tokenSymbol = (await tokenContract.symbol()).toString();

    var tokenData = {
      tokenBalance: balance,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
    };

    var error2 = "";

    var approvedAmount = (
      await tokenContract.allowance(walletAddress, contractAddress)
    ).toString();

    if (Number(balance) < Number(totalAmmount)) {
      return {
        approval: "",
        err: "not enough Balance",
        tokenData: "",
        msg: "not enough Balance",
      };
    }

    if (Number(approvedAmount) <= Number(totalAmmount)) {
      var approve = await tokenContract.approve(
        contractAddress,
        totalBalanceFOrApprove
      );

      return { approval: approve, err: false, tokenData: tokenData, msg: "" };
    } else {
      return {
        msg: "already approved",
        err: false,
        tokenData: tokenData,
        approval: false,
      };
    }
  } catch (err) {
    return { approval: "", err: true, tokenData: "", msg: "" };
  }
};

// token lock

const LockTOkenBlockChainFun = async (
  owner,
  tokenAddress,
  isLpToken,
  TotalAmmount,
  unlockDate,
  description
) => {
  try {
    var signer = await currentSigner();
    var totalAmountWithoutDecimal = TotalAmmount;

    var walletAddress = signer._address;
    var chainID = signer.provider._network.chainId;
    var walletAddress2 = signer._address;
    var network = signer.provider._network.name;

    // unlockDate = new Date(unlockDate).toUTCString();
    unlockDate = new Date(unlockDate);

    const dt = Date.parse(unlockDate);
    var unlockDate = dt;

    var otherOwnser = "";
    if (owner == "") {
      owner = signer._address;
    }

    // contract  of token lock
    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    isLpToken = await pinkLockContract.checkValidLPToken(tokenAddress);

    // tokenContract
    var tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

    var decimals = (await tokenContract.decimals()).toString();

    //
    var feeforTokenLock = (await pinkLockContract.lockFee()).toString();

    // var TotalAmmount = (ethers.utils.parseUnits((TotalAmmount).toString(), "ether")).toString();
    var TotalAmmount = ethers.utils
      .parseUnits(TotalAmmount.toString(), decimals)
      .toString();
    // var amount = ethers.utils.parseEther(amount).toString()

    //  TotalAmmount = BigNumber(TotalAmmount);
    //  sumAmount = sumAmount.plus(TotalAmmount)
    //  TotalAmmount = sumAmount.valueOf();

    var approvedAmount = (
      await tokenContract.allowance(walletAddress, contractAddress)
    ).toString();

    var { authorizedusers } = await MultiSenderContractFunctions(owner);

    if (authorizedusers == true) {
      feeforTokenLock = 0;
    }

    //  lock token blockchain function
    var lockToken = await pinkLockContract.lock(
      owner,
      tokenAddress,
      isLpToken,
      TotalAmmount,
      unlockDate,
      description,
      {
        value: feeforTokenLock,
      }
    );

    //

    // getting TokenData
    var tokenName = await tokenContract.name();
    var tokenSymbol = await tokenContract.symbol();
    var tokenDecimal = await tokenContract.decimals();

    var TGE_Date = "";
    var tGE_Percentage = "";
    var cycle_Days = "";
    var cycle_ReleasePercentage = "";

    var lockID = "";

    await lockTokenBackendFun(
      lockID,
      cycle_ReleasePercentage,
      cycle_Days,
      tGE_Percentage,
      TGE_Date,
      isLpToken,
      walletAddress2,
      tokenAddress,
      description,
      totalAmountWithoutDecimal,
      owner,
      unlockDate,
      network,
      chainID,
      tokenName,
      tokenSymbol,
      tokenDecimal
    );

    return { success: true };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }

    if (err.error.data) {
      if (err.error.data.code == 3) {
        var msg = err.error.data.message;
        msg = msg.split(":");
        return { success: false, msg: msg[1] };
      }
    }
  }
};

const LiquidityBlockChainFun = async (
  owner,
  tokenAddress,
  isLpToken,
  TotalAmmount,
  unlockDate,
  description
) => {
  try {
    var signer = await currentSigner();
    var totalAmountWithoutDecimal = TotalAmmount;

    var walletAddress = signer._address;
    var chainID = signer.provider._network.chainId;
    var walletAddress2 = signer._address;
    var network = signer.provider._network.name;

    // unlockDate = new Date(unlockDate).toUTCString();
    unlockDate = new Date(unlockDate);

    const dt = Date.parse(unlockDate);

    var unlockDate = dt;

    var otherOwnser = "";
    if (owner == "") {
      owner = signer._address;
    }

    // contract  of token lock
    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    isLpToken = await pinkLockContract.checkValidLPToken(tokenAddress);

    // tokenContract
    var tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

    var decimals = (await tokenContract.decimals()).toString();

    //
    var feeforTokenLock = (await pinkLockContract.lockFee()).toString();

    // var TotalAmmount = (ethers.utils.parseUnits((TotalAmmount).toString(), "ether")).toString();
    var TotalAmmount = ethers.utils
      .parseUnits(TotalAmmount.toString(), decimals)
      .toString();
    // var amount = ethers.utils.parseEther(amount).toString()

    //  TotalAmmount = BigNumber(TotalAmmount);
    //  sumAmount = sumAmount.plus(TotalAmmount)
    //  TotalAmmount = sumAmount.valueOf();

    var approvedAmount = (
      await tokenContract.allowance(walletAddress, contractAddress)
    ).toString();

    var { authorizedusers } = await MultiSenderContractFunctions(owner);

    if (authorizedusers == true) {
      feeforTokenLock = 0;
    }

    //  lock token blockchain function
    var lockToken = await pinkLockContract.lock(
      owner,
      tokenAddress,
      isLpToken,
      TotalAmmount,
      unlockDate,
      description,
      {
        value: feeforTokenLock,
      }
    );

    //

    // getting TokenData
    var tokenName = await tokenContract.name();
    var tokenSymbol = await tokenContract.symbol();
    var tokenDecimal = await tokenContract.decimals();

    var TGE_Date = "";
    var tGE_Percentage = "";
    var cycle_Days = "";
    var cycle_ReleasePercentage = "";

    var lockID = "";

    await liquidityBackendFun(
      lockID,
      cycle_ReleasePercentage,
      cycle_Days,
      tGE_Percentage,
      TGE_Date,
      isLpToken,
      walletAddress2,
      tokenAddress,
      description,
      totalAmountWithoutDecimal,
      owner,
      unlockDate,
      network,
      chainID,
      tokenName,
      tokenSymbol,
      tokenDecimal
    );

    return { success: true };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }

    if (err.error.data) {
      if (err.error.data.code == 3) {
        var msg = err.error.data.message;
        msg = msg.split(":");
        return { success: false, msg: msg[1] };
      }
    }
  }
};

const LockTokenVestingFun = async (
  owner,
  tokenAddress,
  TotalAmmount,
  tgeDate,
  tgePercent,
  CycleDays,
  CyclePercentage,
  title,
  isLpToken
) => {
  try {
    var signer = await currentSigner();
    var totalAmountWithoutDecimal = TotalAmmount;
    var walletAddress = signer._address;
    var chainID = signer.provider._network.chainId;
    var walletAddress2 = signer._address;
    var network = signer.provider._network.name;

    if (owner == "") {
      owner = signer._address;
    }

    const dt = Date.parse(tgeDate);
    tgeDate = dt;

    // fetchToken
    var tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

    var decimals = await tokenContract.decimals();

    TotalAmmount = ethers.utils
      .parseUnits(TotalAmmount.toString(), decimals)
      .toString();

    // fetch Contract
    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    isLpToken = await pinkLockContract.checkValidLPToken(tokenAddress);
    // isLpToken = true;

    var feeforTokenLock = (await pinkLockContract.vestFee()).toString();

    var { authorizedusers } = await MultiSenderContractFunctions(owner);

    if (authorizedusers == true) {
      feeforTokenLock = 0;
    }

    console.log("FeeForLock", feeforTokenLock);

    var data = await pinkLockContract.vestingLock(
      owner,
      tokenAddress,
      isLpToken,
      TotalAmmount,
      tgeDate,
      tgePercent,
      CycleDays,
      CyclePercentage,
      title,
      { value: feeforTokenLock }
    );

    // console.log(data, "hamza");
    var TGE_Date = tgeDate;
    var tGE_Percentage = tgePercent;
    var cycle_Days = CycleDays;
    var cycle_ReleasePercentage = CyclePercentage;
    var description = title;

    // getting TokenData
    var tokenName = await tokenContract.name();
    var tokenSymbol = await tokenContract.symbol();
    var tokenDecimal = await tokenContract.decimals();

    // lock token backend function

    var lockID = "";
    await lockTokenBackendFun(
      lockID,
      cycle_ReleasePercentage,
      cycle_Days,
      tGE_Percentage,
      TGE_Date,
      isLpToken,
      walletAddress2,
      tokenAddress,
      description,
      totalAmountWithoutDecimal,
      owner,
      tgeDate,
      network,
      chainID,
      tokenName,
      tokenSymbol,
      tokenDecimal
    );

    return { success: true };
  } catch (err) {
    return { success: false, transactionHash: "" };
  }
};

const LiquidityVestingFun = async (
  owner,
  tokenAddress,
  TotalAmmount,
  tgeDate,
  tgePercent,
  CycleDays,
  CyclePercentage,
  title,
  isLpToken
) => {
  try {
    var signer = await currentSigner();
    var totalAmountWithoutDecimal = TotalAmmount;
    var walletAddress = signer._address;
    var chainID = signer.provider._network.chainId;
    var walletAddress2 = signer._address;
    var network = signer.provider._network.name;

    if (owner == "") {
      owner = signer._address;
    }

    const dt = Date.parse(tgeDate);
    var tgeDate = dt;

    // fetchToken
    var tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);

    var decimals = await tokenContract.decimals();

    var TotalAmmount = ethers.utils
      .parseUnits(TotalAmmount.toString(), decimals)
      .toString();

    // fetch Contract
    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    isLpToken = await pinkLockContract.checkValidLPToken(tokenAddress);

    var feeforTokenLock = (await pinkLockContract.vestFee()).toString();

    var { authorizedusers } = await MultiSenderContractFunctions(owner);

    if (authorizedusers == true) {
      feeforTokenLock = 0;
    }

    var data = await pinkLockContract.vestingLock(
      owner,
      tokenAddress,
      isLpToken,
      TotalAmmount,
      tgeDate,
      tgePercent,
      CycleDays,
      CyclePercentage,
      title,
      { value: feeforTokenLock }
    );

    var TGE_Date = tgeDate;
    var tGE_Percentage = tgePercent;
    var cycle_Days = CycleDays;
    var cycle_ReleasePercentage = CyclePercentage;
    var description = title;

    // getting TokenData
    var tokenName = await tokenContract.name();
    var tokenSymbol = await tokenContract.symbol();
    var tokenDecimal = await tokenContract.decimals();

    // lock token backend function

    var lockID = "";
    await liquidityBackendFun(
      lockID,
      cycle_ReleasePercentage,
      cycle_Days,
      tGE_Percentage,
      TGE_Date,
      isLpToken,
      walletAddress2,
      tokenAddress,
      description,
      totalAmountWithoutDecimal,
      owner,
      tgeDate,
      network,
      chainID,
      tokenName,
      tokenSymbol,
      tokenDecimal
    );

    return { success: true };
  } catch (err) {
    return { success: false, transactionHash: "" };
  }
};

// unlock Tokne
const unLockToken = async (currentTokenID, tokenAddress) => {
  try {
    var signer = await currentSigner();

    var walletAddress = signer._address;

    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    var isLpToken = await pinkLockContract.checkValidLPToken(tokenAddress);

    var allLocksAry = [];

    if (isLpToken == true) {
      allLocksAry = await pinkLockContract.lpLocksForUser(walletAddress);
    } else {
      allLocksAry = await pinkLockContract.normalLocksForUser(walletAddress);
    }

    var result = await getSpecificLockIDToken(allLocksAry, currentTokenID);

    var lockID = result.id;

    // LockRemoved

    await pinkLockContract.unlock(lockID);

    await deletTokenFromBackend(currentTokenID);

    return {
      success: true,
    };
  } catch (err) {
    return { success: false };
  }
};

// extent token lock
const transferLockOwnerShip = async (
  currentTokenID,
  unLockID,
  newOwner,
  tokenAddress
) => {
  try {
    var signer = await currentSigner();

    var walletAddress = signer._address;

    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    var isLpToken = await pinkLockContract.checkValidLPToken(tokenAddress);

    var allLocksAry;

    if (isLpToken == true) {
      allLocksAry = await pinkLockContract.lpLocksForUser(walletAddress);
    } else {
      allLocksAry = await pinkLockContract.normalLocksForUser(walletAddress);
    }

    var result = await getSpecificLockIDToken(allLocksAry, currentTokenID);

    var lockID = result.id;

    await pinkLockContract.transferLockOwnership(lockID, newOwner);

    var currentTokenID = currentTokenID;

    var lockId = "";
    await updateLockedToken(lockId, newOwner, currentTokenID);

    return { success: true, msg: "new Owner Added Successfully" };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }

    if (err.error.data) {
      if (err.error.data.code == 3) {
        var msg = err.error.data.message;
        msg = msg.split(":");
        return { success: false, msg: msg[1] };
      }
    }

    return { success: false, msg: "" };
  }
};

// extend token Lock

const ExtendTokenLock = async (
  LockID,
  tokenID,
  amount,
  newLockDate,
  tokenDecimal,
  tokenAddress
) => {
  try {
    var currentTokenID = tokenID;

    var signer = await currentSigner();
    var walletAddress = signer._address;

    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    var unlockDate = new Date(newLockDate).toUTCString();

    const dt = Date.parse(unlockDate);
    var unlockDate = dt;

    var newAmount = amount;

    // var amount = ethers.utils.parseEther(amount,tokenDecimal).toString()
    var amount = ethers.utils
      .parseUnits(amount.toString(), tokenDecimal)
      .toString();

    var isLpToken = await pinkLockContract.checkValidLPToken(tokenAddress);

    var allLocksAry;

    if (isLpToken == true) {
      allLocksAry = await pinkLockContract.lpLocksForUser(walletAddress);
    } else {
      allLocksAry = await pinkLockContract.normalLocksForUser(walletAddress);
    }

    var result = await getSpecificLockIDToken(allLocksAry, currentTokenID);

    var lockID = result.id;

    var owner = walletAddress;

    var feeforTokenLock = (await pinkLockContract.lockFee()).toString();

    var { authorizedusers } = await MultiSenderContractFunctions(owner);

    if (authorizedusers == true) {
      feeforTokenLock = 0;
    }

    // extend Lock Blockhain functino
    await pinkLockContract.editLock(lockID, amount, unlockDate, {
      value: feeforTokenLock,
    });

    // API function
    await extendTokenLockAPI(owner, currentTokenID, unlockDate, newAmount);

    return { success: true, msg: "Lock Updated Successfully" };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }

    if (err.error.data.code == 3) {
      var msg = err.error.data.message;

      var msg = msg.split(":");

      return { success: false, msg: msg[1] };
    }
  }
};

// *************************************
//          bnb Lock functions
// ************************************

// BNb Lock function
const BNBLockFun = async (title, amount, unlockDate) => {
  try {
    var signer = await currentSigner();
    var owner = "";
    var walletAddress = signer._address;

    var chainID = signer.provider._network.chainId;
    // var network = signer.provider._network.name;
    var { network } = signer.getNetwork();

    console.log("ThisIsSigner", signer);
    console.log("Network1", network);

    if (owner == "") {
      owner = signer._address;
    }

    var unlockDate = Date.parse(unlockDate);
    var unlockDate = unlockDate;
    // unlockDate = unlockDate / 1000;

    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    // check if authorized
    var { authorizedusers } = await MultiSenderContractFunctions(owner);

    var LockfeeValue = (await pinkLockContract.lockFee()).toString();

    if (authorizedusers == true) {
      LockfeeValue = 0;
    }

    var amount = ethers.utils.parseUnits(amount).toString();
    // var amount = (ethers.utils.formatEther(amount)).toString();
    // var amount = ethers.utils.parseEther(amount).toString();
    // var amount = LockfeeValue;

    var totalAmount = (Number(LockfeeValue) + Number(amount)).toString();
    // var totalAmount = amount;

    var signerBalance = (await signer.getBalance()).toString();

    if (Number(signerBalance) < Number(totalAmount)) {
      return { success: false, msg: "not enough balance to lock" };
    }

    //

    //
    await pinkLockContract.LockBNB(owner, amount, unlockDate, title, {
      value: totalAmount,
    });

    //

    var totalAmount = amount;

    var tgeDate = "";
    var tgePercentage = "";
    var cycleDays = "";
    var cycleRelease = "";
    var unLockDateStr = unlockDate;

    var lockID = "";
    var owner = walletAddress;
    addBNBLock(
      walletAddress,
      title,
      totalAmount,
      unLockDateStr,
      lockID,
      owner,
      chainID,
      network,
      tgeDate,
      tgePercentage,
      cycleDays,
      cycleRelease
    );

    return {
      success: true,
      msg: "bnb locked successfully",
      walletAddress: walletAddress,
    };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }

    if (err.error.data) {
      if (err.error.data.code == 3) {
        var msg = err.error.data.message;
        msg = msg.split(":");
        return { success: false, msg: msg[1] };
      }
    }
  }
};

//  bnb Vestin function

const BnbLockVesting = async (
  titleBNB,
  Amount2BNB,
  bnbTgeDate,
  BNBtgePercent,
  BNBCycleDays1,
  BNBcyclePercentage
) => {
  try {
    var signer = await currentSigner();

    var chainID = signer.provider._network.chainId;
    var network = signer.provider._network.name;

    console.log("NetWork", network);

    var owner = "";
    var walletAddress = signer._address;
    if (owner == "") {
      owner = signer._address;
    }

    var bnbTgeDate = Date.parse(bnbTgeDate);
    bnbTgeDate = bnbTgeDate;

    var signer = await currentSigner();
    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    var { authorizedusers } = await MultiSenderContractFunctions(owner);

    var LockfeeValue = (await pinkLockContract.vestFee()).toString();

    if (authorizedusers == true) {
      LockfeeValue = 0;
    }

    var Amount2BNB = ethers.utils.parseEther(Amount2BNB).toString();

    var totalAmount = (Number(LockfeeValue) + Number(Amount2BNB)).toString();

    var signerBalance = (await signer.getBalance()).toString();

    if (Number(signerBalance) < Number(totalAmount)) {
      return { success: false, msg: "not enough balance to lock" };
    }

    var lockData = await pinkLockContract.VestingLockBNB(
      owner,
      Amount2BNB,
      bnbTgeDate,
      BNBtgePercent,
      BNBCycleDays1,
      BNBcyclePercentage,
      titleBNB,
      { value: totalAmount }
    );

    var title = titleBNB;

    var lockID = "";
    var unlockDate = bnbTgeDate;
    await addBNBLock(
      walletAddress,
      title,
      Amount2BNB,
      unlockDate,
      lockID,
      owner,
      chainID,
      network,
      bnbTgeDate,
      BNBtgePercent,
      BNBCycleDays1,
      BNBcyclePercentage
    );

    return {
      success: true,
      msg: "bnb Vested Successfully",
      walletAddress: walletAddress,
    };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }

    if (err.error.data) {
      if (err.error.data.code == 3) {
        var msg = err.error.data.message;
        msg = msg.split(":");
        return { success: false, msg: msg[1] };
      }
    }
  }
};

// unlockSimple BNB

const unLockSimpleBNB = async (currentTokenID) => {
  try {
    var signer = await currentSigner();

    var walletAddress = signer._address;

    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    // unlock the Locked BNB

    var lockAry = await pinkLockContract.BNBLocksForUser(walletAddress);
    // get specificied LockedDetial of BNB from Contract

    var result = await getSpecifiedLockedBNBDetials(lockAry, currentTokenID);

    var lockID = result.id;

    await pinkLockContract.unlockBNB(lockID);

    // delete Api from baceknd
    await deleteBNb(currentTokenID);

    return { success: true, msg: "bnb unlocked Successfully" };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }
  }
};

const unLockSimpleBNBVesting = async (unLockID, currentTokenID) => {
  try {
    var signer = await currentSigner();

    var walletAddress = signer._address;

    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    // unlock the Locked BNB

    var lockAry = await pinkLockContract.BNBLocksForUser(walletAddress);

    // get specificied LockedDetial of BNB from Contract

    var result = await getSpecifiedLockedBNBDetials(lockAry, currentTokenID);

    var lockID = result.id;

    await pinkLockContract.unlockBNB(lockID);

    // delete Api from baceknd
    await deleteBNb(currentTokenID);

    return { success: true, msg: "bnb unlocked Successfully" };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }
  }
};

// transferLockOwnerShip BNB
const transferLockOwnerShipBNBFun = async (currentBNBID, newOwner) => {
  try {
    var signer = await currentSigner();

    var walletAddress = signer._address;

    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    var lockAry = await pinkLockContract.BNBLocksForUser(walletAddress);
    // get specificied LockedDetial of BNB from Contract

    var result = await getSpecifiedLockedBNBDetials(lockAry, currentBNBID);

    var lockID = result.id;

    await pinkLockContract.transferLockOwnershipBNB(lockID, newOwner);

    await transferLockOwnerShipBNBAPI(currentBNBID, newOwner);

    return { success: true };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }
  }
};

// edit lock BNB
const ExtendLockBNB = async (amount, newLockDate, wltAddr, id) => {
  try {
    var signer = await currentSigner();

    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    var lockAry = await pinkLockContract.BNBLocksForUser(wltAddr);
    // get specificied LockedDetial of BNB from Contract

    var result = await getSpecifiedLockedBNBDetials(lockAry, id);

    var lockID = result.id;
    var amount = ethers.utils.parseEther(amount).toString();

    var unlockDate = Date.parse(newLockDate);
    unlockDate = unlockDate;

    var feeforTokenLock = (await pinkLockContract.lockFee()).toString();

    var { authorizedusers } = await MultiSenderContractFunctions(wltAddr);

    if (authorizedusers == true) {
      feeforTokenLock = 0;
    }

    feeforTokenLock = Number(amount) + Number(feeforTokenLock);

    await pinkLockContract.editLockBNB(lockID, amount, unlockDate, {
      value: feeforTokenLock,
    });

    await extendLockBNBAPI(id, unlockDate, amount);

    return { success: true };
  } catch (err) {
    if (err.code == "ACTION_REJECTED") {
      return { success: false, msg: "user rejected transaction" };
    }

    if (err.error.data.code == 3) {
      var msg = err.error.data.message;

      var msg = msg.split(":");

      return { success: false, msg: msg[1] };
    }
  }
};

// get Lock Fees Detials

const getLockFeeDetails = async (getLockFeeDetails) => {
  try {
    var signer = await currentSigner();
    var pinkLockContract = new ethers.Contract(
      contractAddress,
      batchTransferTokenLockABI,
      signer
    );

    var LockFee = 0;
    var vestFee = 0;

    LockFee = Number(await pinkLockContract.lockFee());
    LockFee = ethers.utils.formatEther(LockFee.toString());
    vestFee = Number(await pinkLockContract.vestFee());
    vestFee = ethers.utils.formatEther(vestFee.toString());

    return { success: true, LockFee: LockFee, vestFee: vestFee };
  } catch (err) {
    return { success: false, LockFee: "", vestFee: "" };
  }
};

export {
  approveToken,
  LockTOkenBlockChainFun,
  LiquidityBlockChainFun,
  LiquidityVestingFun,
  LockTokenVestingFun,
  unLockToken,
  BNBLockFun,
  BnbLockVesting,
  unLockSimpleBNB,
  transferLockOwnerShip,
  unLockSimpleBNBVesting,
  ExtendTokenLock,
  transferLockOwnerShipBNBFun,
  ExtendLockBNB,
  getLockFeeDetails,
};
