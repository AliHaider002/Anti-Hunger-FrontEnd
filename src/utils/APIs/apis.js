import axios from "axios";
import moment from "moment";
import { ethers } from "ethers";
// moment(timestamp).utc().toString()
import batchTransferTokenLockABI from "../../ABIs/pinkLock.json";

const { currentSigner } = require("../hooks/instances");

// test
const contractAddress = "0x53818777dDDD1e295f75CB18417F98425403CF1B";

var originuUrl = "https://pleasant-gray-woodpecker.cyclic.app/api";
// get all tokens by chain iD
const getAllTokensByChainID = async (pageNum) => {
  try {
    const signer = await currentSigner();
    var chainID;
    if (signer.provider == undefined) {
      chainID = 97;
    } else {
      chainID = signer.provider._network.chainId;
    }

    var data = {
      chainID: chainID,
      pageNum: pageNum,
      itemPerPage: "10",
    };

    let responseData = [];
    let totalPages;
    let itemLength;
    await axios({
      method: "POST",
      url: `${originuUrl}/getTokensForListingPage`,
      data: data,
    })
      .then(function (response) {
        responseData = response.data.Data;

        totalPages = response.data.totalPages;
        itemLength = response.data.length;
      })
      .catch(function (error) {});

    return {
      success: true,
      data: responseData,
      totalPages: totalPages,
      itemLength: itemLength,
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      msg: "something went wrong",
      totalPages: 0,
      itemLength: 0,
    };
    //
  }
};

// get tokens locked by specific Address and chain
const getMyLockedTokens = async (pageNum) => {
  try {
    const signer = await currentSigner();

    var chainID = signer.provider._network.chainId;
    var walletAddress = signer._address;

    var data = {
      walletAddress: walletAddress,
      chainID: chainID,
      pageNum: pageNum,
      itemPerPage: "10",
    };
    let responseData;
    let itemLength;
    let totalPages;

    await axios({
      method: "POST",
      url: `${originuUrl}/getLockedSingleTokenDataByAddress`,
      data: data,
    })
      .then(function (response) {
        responseData = response.data.data;

        itemLength = response.data.itemLength;
        totalPages = response.data.totalPages;
      })
      .catch(function (error) {});

    // get data that has same token Address
    return {
      success: true,
      data: responseData,
      itemLength: itemLength,
      totalPages: totalPages,
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      msg: "something went wrong while Fetching data",
    };
  }
};

// get tokens locked by specific Address and chain
const getMyLockedLiquidity = async (pageNum) => {
  try {
    const signer = await currentSigner();

    var chainID = signer.provider._network.chainId;
    var walletAddress = signer._address;

    var data = {
      walletAddress: walletAddress,
      chainID: chainID,
      pageNum: pageNum,
      itemPerPage: "10",
    };
    let responseData;
    let itemLength;
    let totalPages;

    await axios({
      method: "POST",
      url: `${originuUrl}/getLockedLiquidtyByAddressAndChainID`,
      data: data,
    })
      .then(function (response) {
        responseData = response.data.data;

        itemLength = response.data.itemLength;
        totalPages = response.data.totalPages;
      })
      .catch(function (error) {});

    // get data that has same token Address
    return {
      success: true,
      data: responseData,
      itemLength: itemLength,
      totalPages: totalPages,
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      msg: "something went wrong while Fetching data",
    };
  }
};

// get all tokens by chain iD
const getAllLiquidityTokensByChainID = async (pageNum) => {
  try {
    const signer = await currentSigner();
    var chainID;
    if (signer.provider == undefined) {
      chainID = 97;
    } else {
      chainID = signer.provider._network.chainId;
    }

    var data = {
      chainID: chainID,
      pageNum: pageNum,
      itemPerPage: "10",
    };

    let responseData = [];
    let totalPages;
    let itemLength;
    await axios({
      method: "POST",
      url: `${originuUrl}/getLiquidtyForListingPage`,
      data: data,
    })
      .then(function (response) {
        responseData = response.data.Data;

        totalPages = response.data.totalPages;
        itemLength = response.data.length;
      })
      .catch(function (error) {});

    return {
      success: true,
      data: responseData,
      totalPages: totalPages,
      itemLength: itemLength,
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      msg: "something went wrong",
      totalPages: 0,
      itemLength: 0,
    };
    //
  }
};

// lock token

const lockTokenBackendFun = async (
  lockID,
  cycle_ReleasePercentage,
  cycle_Days,
  tGE_Percentage,
  TGE_Date,
  isLpToken,
  walletAddress2,
  tokenAddress,
  description,
  TotalAmmount,
  owner,
  unlockDate,
  network,
  chainID,
  tokenName,
  tokenSymbol,
  tokenDecimal
) => {
  try {
    var now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time)
    var isoDate = new Date();
    var currentData = isoDate;

    //

    // var lockID = await sessionStorage.getItem("lockID");
    //

    var data = {
      walletAddress: owner,
      tokenAddress: tokenAddress,
      title: description,
      total_Locked_Amount: TotalAmmount,
      total_Locked_Value: "",
      owner: owner,
      Lock_Date: currentData,
      unLock_Date: unlockDate,
      TGE_Date: TGE_Date,
      tGE_Percentage: tGE_Percentage,
      cycle_Days: cycle_Days,
      cycle_ReleasePercentage: cycle_ReleasePercentage,
      network: network,
      chainID: chainID,
      tokenName: tokenName,
      tokenSymbol: tokenSymbol,
      tokenDecimal: tokenDecimal,
      isLpToken: isLpToken,
      lockID: lockID,
    };

    var dataResponse = "";
    await axios({
      method: "POST",
      url: `${originuUrl}/LockedToken`,
      data: data,
    })
      .then(function (response) {
        console.log(response, "hamza");

        dataResponse = "token added successfully";
      })
      .catch(function (error) {
        console.log(error.message, "hamza");
      });

    return { success: true, msg: dataResponse };
  } catch (error) {
    return { success: false };
  }
};

const liquidityBackendFun = async (
  lockID,
  cycle_ReleasePercentage,
  cycle_Days,
  tGE_Percentage,
  TGE_Date,
  isLpToken,
  walletAddress2,
  tokenAddress,
  description,
  TotalAmmount,
  owner,
  unlockDate,
  network,
  chainID,
  tokenName,
  tokenSymbol,
  tokenDecimal
) => {
  try {
    var now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time)
    var isoDate = new Date();
    var currentData = isoDate;

    //

    // var lockID = await sessionStorage.getItem("lockID");
    //

    var data = {
      walletAddress: owner,
      liquidityAddress: tokenAddress,
      title: description,
      total_Liquidity_Amount: TotalAmmount,
      total_LiquidityValue: "",
      owner: owner,
      // Lock_Date: currentData,
      unLockDate: unlockDate,
      TGE_Date: TGE_Date,
      tGE_Percentage: tGE_Percentage,
      cycle_Days: cycle_Days,
      cycle_ReleasePercentage: cycle_ReleasePercentage,
      network: network,
      chainID: chainID,
      liquidityName: tokenName,
      liquiditySymbol: tokenSymbol,
      liquidityDecimal: tokenDecimal,
      isLpLiquidity: isLpToken,
      liquidityID: lockID,
    };

    // var data = {
    //   walletAddress: owner,
    //   liquidityAddress: tokenAddress,
    //   liquidityTitle: description,
    //   total_Liquidity_Amount: TotalAmmount,
    //   total_Liquidity_Value: '',
    //   owner: owner,
    //   Lock_Date: currentData,
    //   unLock_Date: unlockDate,
    //   TGE_Date: TGE_Date,
    //   tGE_Percentage: tGE_Percentage,
    //   cycle_Days: cycle_Days,
    //   cycle_ReleasePercentage: cycle_ReleasePercentage,
    //   network: network,
    //   chainID: chainID,
    //   liquidityName: tokenName,
    //   liquiditySymbol: tokenSymbol,
    //   liquidityDecimal: tokenDecimal,
    //   isLiquidityLocked: isLpToken,
    //   liquidityID: lockID,
    // };

    var dataResponse = "";
    await axios({
      method: "POST",
      url: `${originuUrl}/LockedLiquidty`,
      data: data,
    })
      .then(function (response) {
        dataResponse = "token added successfully";
      })
      .catch(function (error) {});

    return { success: true, msg: dataResponse };
  } catch (error) {
    return { success: false };
  }
};

// get token by token ID
const getTokenByTokenID = async (tokenAddress) => {
  try {
    var data = {
      tokenAddress: tokenAddress,
    };

    var currentTokenData;
    await axios({
      method: "POST",
      url: `${originuUrl}/getAllTokenAddressUsingAddress`,
      data: data,
    })
      .then(function (response) {
        currentTokenData = response.data.Data;
      })
      .catch(function (error) {});

    var totalAmount = 0;
    var totalLockedValue = 0;
    var newItemAry = [];
    currentTokenData.forEach((item, index) => {
      totalAmount += Number(item.total_Locked_Amount);

      // item.unLock_Date = formateDateAndTime(item.unLock_Date, true);

      var wltAddrress = item.walletAddress.split("");
      item.walletAddress = `${wltAddrress[0]}${wltAddrress[1]}${
        wltAddrress[2]
      }${wltAddrress[3]}...${wltAddrress[wltAddrress.length - 3]}${
        wltAddrress[wltAddrress.length - 2]
      }${wltAddrress[wltAddrress.length - 1]}`;

      newItemAry.push(item);
    });

    currentTokenData = newItemAry;

    var TokenSummary = [
      { name: "totalAmount", value: totalAmount },
      { name: "totalLockedValue", value: totalLockedValue },
      { name: "tokenAddress", value: currentTokenData[0].tokenAddress },
      { name: "tokenName", value: currentTokenData[0].tokenName },
      { name: "tokenSymbol", value: currentTokenData[0].tokenSymbol },
      { name: "tokenDecimal", value: currentTokenData[0].tokenDecimal },
    ];

    return {
      success: true,
      tokenData: currentTokenData,
      tokenSummary: TokenSummary,
    };
  } catch (err) {
    return { success: false, tokenData: "" };
  }
};

const getLiqudityByLiquityID = async (tokenAddress) => {
  try {
    var data = {
      tokenAddress: tokenAddress,
    };

    var currentTokenData;
    await axios({
      method: "POST",
      url: `${originuUrl}/getAllLiquidtyAddressUsingAddress`,
      data: data,
    })
      .then(function (response) {
        currentTokenData = response.data.Data;
      })
      .catch(function (error) {});

    var totalAmount = 0;
    var totalLockedValue = 0;
    var newItemAry = [];
    currentTokenData.forEach((item, index) => {
      totalAmount += Number(item.total_Liquidity_Amount);

      // item.unLock_Date = formateDateAndTime(item.unLock_Date, true);

      var wltAddrress = item.walletAddress.split("");
      item.walletAddress = `${wltAddrress[0]}${wltAddrress[1]}${
        wltAddrress[2]
      }${wltAddrress[3]}...${wltAddrress[wltAddrress.length - 3]}${
        wltAddrress[wltAddrress.length - 2]
      }${wltAddrress[wltAddrress.length - 1]}`;

      newItemAry.push(item);
    });

    currentTokenData = newItemAry;

    var TokenSummary = [
      { name: "totalAmount", value: totalAmount },
      { name: "totalLockedValue", value: totalLockedValue },
      { name: "tokenAddress", value: currentTokenData[0].liquidityAddress },
      { name: "tokenName", value: currentTokenData[0].liquidityName },
      { name: "tokenSymbol", value: currentTokenData[0].liquiditySymbol },
      { name: "tokenDecimal", value: currentTokenData[0].liquidityDecimal },
    ];

    return {
      success: true,
      tokenData: currentTokenData,
      tokenSummary: TokenSummary,
    };
  } catch (err) {
    return { success: false, tokenData: "" };
  }
};

// get tokenn by ID

const getTokenByID = async (currentTokenID) => {
  try {
    var data = {
      id: currentTokenID,
    };

    var currentTokenData;
    var unLockDateUnix;
    var currentTokenAddress;
    await axios({
      method: "POST",
      url: `${originuUrl}/getTokenByID`,
      data: data,
    })
      .then(function (response) {
        currentTokenData = response.data.Data[0];
        currentTokenAddress = currentTokenData.tokenAddress;
        unLockDateUnix = currentTokenData.unLock_Date;

        //    working Here
        var date = new Date(Number(currentTokenData.unLock_Date) * 1000);

        //    Lock Date  convert to readAble
        // currentTokenData.unLock_Date = formateDateAndTime(currentTokenData.unLock_Date, true);

        // currentTokenData.Lock_Date = formateDateAndTime(currentTokenData.Lock_Date, false);
      })
      .catch(function (error) {});

    var now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time)
    var isoDate = new Date();

    return {
      success: true,
      data: currentTokenData,
      unLockDateUnix: unLockDateUnix,
      currentTokenID: currentTokenID,
      currentTokenAddress: currentTokenAddress,
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      unLockDateUnix: "",
      currentTokenID: "",
      currentTokenAddress: "",
    };
  }
};

const getLiqudityByID = async (currentTokenID) => {
  try {
    var data = {
      id: currentTokenID,
    };

    var currentTokenData;
    var unLockDateUnix;
    var currentTokenAddress;
    await axios({
      method: "POST",
      url: `${originuUrl}/getLiquidtyByID`,
      data: data,
    })
      .then(function (response) {
        currentTokenData = response.data.Data[0];
        currentTokenAddress = currentTokenData.tokenAddress;
        unLockDateUnix = currentTokenData.unLock_Date;

        //    working Here
        var date = new Date(Number(currentTokenData.unLock_Date) * 1000);

        //    Lock Date  convert to readAble
        // currentTokenData.unLock_Date = formateDateAndTime(currentTokenData.unLock_Date, true);

        // currentTokenData.Lock_Date = formateDateAndTime(currentTokenData.Lock_Date, false);
      })
      .catch(function (error) {});

    var now = new Date(); // Fri Feb 20 2015 19:29:31 GMT+0530 (India Standard Time)
    var isoDate = new Date();

    return {
      success: true,
      data: currentTokenData,
      unLockDateUnix: unLockDateUnix,
      currentTokenID: currentTokenID,
      currentTokenAddress: currentTokenAddress,
    };
  } catch (err) {
    return {
      success: false,
      data: [],
      unLockDateUnix: "",
      currentTokenID: "",
      currentTokenAddress: "",
    };
  }
};

// delete token from backend after lockout

// this function not used for delete token from backend
// now it will only upldate token from baceknd
// that token is Unlocked == true

const deletTokenFromBackend = async (id) => {
  try {
    var newDate = new Date();
    var unLockedAtTimeStamp = Date.parse(newDate);
    unLockedAtTimeStamp = unLockedAtTimeStamp / 1000;

    var data = {
      id: id,
      isTokenUnlocked: true,
      unLock_Date: unLockedAtTimeStamp,
    };

    var isTokenUnLocked = false;
    await axios({
      method: "PATCH",
      url: `${originuUrl}/updateLockeToken`,
      data: data,
    })
      .then(function (response) {})
      .catch(function (error) {});

    return { success: true };
  } catch (err) {}
};

// updated version

const updateLockedToken = async (lockId, newOwner, currentTokenID) => {
  try {
    var data = {
      id: currentTokenID,
      lockID: lockId,
      Owner: newOwner,
      walletAddress: newOwner,
    };
    // updateLockeToken
    await axios({
      method: "PATCH",
      url: `${originuUrl}/updateLockeToken`,
      data: data,
    })
      .then(function (response) {})
      .catch(function (error) {});
  } catch (err) {}
};

const extendTokenLockAPI = async (
  newOwner,
  currentTokenID,
  NewunlockDate,
  newAmount
) => {
  try {
    var data = {
      id: currentTokenID,
      Owner: newOwner,
      walletAddress: newOwner,
      unLock_Date: NewunlockDate,
      total_Locked_Amount: newAmount,
    };
    // updateLockeToken
    await axios({
      method: "PATCH",
      url: `${originuUrl}/updateLockeToken`,
      data: data,
    })
      .then(function (response) {})
      .catch(function (error) {});
  } catch (err) {}
};

const filterTokenByTokenAddress = async (tokenAddress) => {
  try {
    const signer = await currentSigner();

    var chainID;
    if (signer.provider == undefined) {
      chainID = 97;
    } else {
      chainID = signer.provider._network.chainId;
    }

    var data = {
      tokenAddress: tokenAddress,
      chainID: chainID,
    };

    var responseData;
    await axios({
      method: "POST",
      url: `${originuUrl}/filterTokenByTokenAddress`,
      data: data,
    })
      .then(function (response) {
        responseData = response.data.data;
      })
      .catch(function (error) {});

    return { success: true, data: responseData };
  } catch (err) {
    return { success: false };
  }
};

// -----------------------------
//  GET BNB LOCKED DATA
// ------------------------------

const addBNBLock = async (
  walletAddress,
  title,
  totalAmount,
  unlockDate,
  lockID,
  owner,
  chainID,
  network,
  tgeDate,
  tgePercentage,
  cycleDays,
  cycleRelease
) => {
  try {
    console.log("CHainIDFromAPI", typeof chainID);
    const dateNow = new Date().toISOString();
    var currentData = dateNow;

    var data = {
      walletAddress: walletAddress,
      title: title,
      totalLockedAmount: totalAmount,
      owner: owner,
      lockDate: currentData,
      unLockDate: unlockDate,
      TgeDate: tgeDate,
      tgePercentage: tgePercentage,
      cycleDays: cycleDays,
      cycleRelease: cycleRelease,
      newtork: network,
      chainID: chainID,
      lockID: lockID,
    };

    //
    await axios({
      method: "POST",
      url: chainID === 97 ? `${originuUrl}/lockBNB` : `${originuUrl}/lockCIC`,
      data: data,
    })
      .then(function (response) {})
      .catch(function (error) {});

    return { success: true, msg: "BNB Locked added to backend" };
  } catch (err) {
    console.lo("this si serro ", err);
  }
};

const getAllLockedBNB = async (pageNum) => {
  try {
    const signer = await currentSigner();
    var chainId = signer.provider._network.chainId;

    var data = {
      chainID: chainId,
      itemPerPage: "10",
      pageNum: pageNum,
    };

    console.log("ThisIsChainIdTest32", chainId);

    var responseData;
    var totalPages;
    var itemLength;
    var isSuccess = false;
    await axios({
      method: "POST",
      url:
        chainId === 97
          ? `${originuUrl}/getlockedBNBforListing`
          : `${originuUrl}/getlockedCICforListing`,
      data: data,
    })
      .then(function (response) {
        responseData = response.data.Data;
        totalPages = response.data.totalPages;
        itemLength = response.data.length;
        isSuccess = true;

        if (responseData.length > 0) {
          var dataAry = [];
          responseData.forEach(async (item, index) => {
            var walletAddress = item.walletAddress;
            var wlt = walletAddress.split("");
            var firstChar = `${wlt[0]}${wlt[1]}${wlt[2]}${wlt[3]}`;
            var secondChar = `${wlt[wlt.length - 3]}${wlt[wlt.length - 2]}${
              wlt[wlt.length - 1]
            }`;
            //
            item.walletAddress = `${firstChar}...${secondChar}`;
            item.fullAddress = walletAddress;
            item.total_Locked_Amount = (
              await ethers.utils.formatEther(
                item.total_Locked_Amount.toString()
              )
            ).toString();
            dataAry.push(item);
          });

          responseData = dataAry;
        }
      })
      .catch(function (error) {
        isSuccess = false;
      });

    if (isSuccess == false) {
      return { success: false, data: [], totalPages: 0, itemLength: 0 };
    } else {
      return {
        success: true,
        data: responseData,
        totalPages: totalPages,
        itemLength: itemLength,
      };
    }
  } catch (err) {
    return { success: false, data: [], totalPages: 0, itemLength: 0 };
  }
};

// get my locked BNB
const getMyLockedBNB = async (pageNum) => {
  try {
    const signer = await currentSigner();

    var chainID = signer.provider._network.chainId;
    var walletAddress = signer._address;

    console.log("ThisIsChainId22", typeof chainID);

    var data = {
      chainID: chainID,
      walletAddress: walletAddress,
      itemPerPage: "10",
      pageNum: pageNum,
    };

    var responseData;
    var totalPages;
    var itemLength;
    await axios({
      method: "POST",
      url:
        chainID === 97
          ? `${originuUrl}/getLockedBNBByWalletAddressAndChainID`
          : `${originuUrl}/getLockedCICByWalletAddressAndChainID`,
      data: data,
    })
      .then(function (response) {
        responseData = response.data.Data;

        var dataAry = [];
        responseData.forEach(async (item, index) => {
          var walletAddress = item.walletAddress;

          var wlt = walletAddress.split("");
          var firstChar = `${wlt[0]}${wlt[1]}${wlt[2]}${wlt[3]}`;
          var secondChar = `${wlt[wlt.length - 3]}${wlt[wlt.length - 2]}${
            wlt[wlt.length - 1]
          }`;
          //
          item.walletAddress = `${firstChar}...${secondChar}`;
          item.fullAddress = walletAddress;
          item.total_Locked_Amount = (
            await ethers.utils.formatEther(item.total_Locked_Amount.toString())
          ).toString();
          dataAry.push(item);
        });

        responseData = dataAry;

        totalPages = response.data.totalPages;
        itemLength = response.data.itemLength;
      })
      .catch(function (error) {});

    return {
      success: true,
      data: responseData,
      totalPages: totalPages,
      itemLength: itemLength,
    };
  } catch (err) {
    return { success: false, data: [], totalPages: [], itemLength: [] };
  }
};

// get all Locked BNB for BNB Detials

const getLockdBNBForBNBDetialPage = async (walletAddress) => {
  try {
    const signer = await currentSigner();
    var chainId = signer.provider._network.chainId;

    var data = {
      walletAddress: walletAddress,
    };

    var responseData;
    var totalLockedAmount = 0;
    var fullWalletAddress = "";

    await axios({
      method: "POST",
      url:
        chainId === 97
          ? `${originuUrl}/getAllLockedBNBBYWalletAddres`
          : `${originuUrl}/getAllLockedCICBYWalletAddres`,
      data: data,
    })
      .then(function async(response) {
        responseData = response.data.data;
        var newAry = [];
        fullWalletAddress = responseData[0].walletAddress;
        responseData.forEach(async (item, index) => {
          totalLockedAmount += Number(item.total_Locked_Amount);

          item.total_Locked_Amount = (
            await ethers.utils.formatEther(item.total_Locked_Amount.toString())
          ).toString();

          var wltAdr = item.walletAddress.split("");
          var firstLtr = `${wltAdr[0]}${wltAdr[1]}${wltAdr[2]}${wltAdr[3]}`;
          var lastLtr = `${wltAdr[wltAdr.length - 3]}${
            wltAdr[wltAdr.length - 2]
          }${wltAdr[wltAdr.length - 1]}`;
          item.walletAddress = `${firstLtr}...${lastLtr}`;

          var unLockDateUnderstandABle = item.unLock_Date
            ? item.unLock_Date
            : "N/A";

          item.unLock_Date = unLockDateUnderstandABle;
          newAry.push(item);
        });

        responseData = newAry;
      })
      .catch(function (error) {});

    var ethAmount = (
      await ethers.utils.formatEther(totalLockedAmount.toString())
    ).toString();

    var owner = responseData[0].Owner;

    var tokenSummary = [
      { name: "WalletAddress", value: fullWalletAddress },
      { name: "Locked Amount", value: ethAmount },
      // {name : "Owner", value : owner}
    ];

    return { success: true, data: responseData, tokenSummary: tokenSummary };
  } catch (err) {
    return { success: false, data: [], tokenSummary: [] };
  }
};

// get single Locked BNB by id
const getLockedBNbById = async (id) => {
  try {
    const signer = await currentSigner();
    var chainId = signer.provider._network.chainId;

    var data = { id: id };

    var responseData = "";
    var tgeDate = "";
    var currentID = id;
    await axios({
      method: "POST",
      url:
        chainId === 97
          ? `${originuUrl}/getLockedBNbById`
          : `${originuUrl}/getLockedCICById`,
      data: data,
    })
      .then(function async(response) {
        console.log("DataResponseIsHere", response);
        responseData = response.data.data[0];
        tgeDate = response.data.data[0].TGE_Date;
      })
      .catch(function (error) {});

    var total_Locked_Amount = (
      await ethers.utils.formatEther(
        responseData.total_Locked_Amount.toString()
      )
    ).toString();

    var isUnix = true;
    var tegeDate = responseData.TGE_Date ? responseData.TGE_Date : "N/A";

    var unLockDateTime = responseData.unLock_Date
      ? responseData.unLock_Date
      : "N/A";
    isUnix = false;
    // var lockTime = responseData.Lock_Date ? responseData.Lock_Date : "N/A";
    var lockTime = responseData?.Lock_Date;
    console.log("APIResponseData", responseData);
    var isBnbUnLocked = responseData.isBNBUnLocked;
    var lockedBNBData = [];
    if (isBnbUnLocked == false) {
      lockedBNBData = [
        { name: "Title", value: responseData.lockTitle },
        // {name : "WalletAddress", value : responseData.walletAddress},
        { name: "owner", value: responseData.Owner },
        { name: "Locked Amount", value: total_Locked_Amount },
        { name: "Lock Date", value: lockTime },
        { name: "unLock Date", value: unLockDateTime },
        { name: "Cycle Days", value: responseData.cycle_Days },
        {
          name: "Cycle Percentage",
          value: responseData.cycle_ReleasePercentage,
        },
        { name: "TGE Date", value: tegeDate },
        { name: "TGE Percentage", value: responseData.tGE_Percentage },
      ];
    } else {
      lockedBNBData = [
        { name: "Title", value: responseData.lockTitle },
        // {name : "WalletAddress", value : responseData.walletAddress},
        { name: "owner", value: responseData.Owner },
        { name: "Locked Amount", value: total_Locked_Amount },
        { name: "Lock Date", value: lockTime },
        { name: "unLocked at", value: unLockDateTime },
      ];
    }

    var lockOwner = responseData.Owner;

    var unLockUnix = responseData.unLock_Date;
    var lockDate = responseData.Date;
    var lockID = responseData.lockID;
    var lockedAmount = responseData.total_Locked_Amount;
    var lockedAmountETH = lockedBNBData[2].value;

    return {
      success: true,
      lockedAmountETH: lockedAmountETH,
      lockedAmount: lockedAmount,
      lockDate: lockDate,
      currentID: currentID,
      data: lockedBNBData,
      lockOwner: lockOwner,
      unLockUnix: unLockUnix,
      lockID: lockID,
      tgeDate: tgeDate,
      isBnbUnLocked: isBnbUnLocked,
    };
  } catch (err) {
    return { success: false, data: [], tgeDate: "", lockOwner: "" };
  }
};

// convert Date to CorrectFromate
const formateDateAndTime = (dateStr, isUnix) => {
  if (dateStr == "") {
    return "";
  }
  var date = "";
  if (isUnix == true) {
    date = new Date(Number(dateStr) * 1000);
  } else {
    date = new Date(dateStr);
  }

  var FullYear = date.getFullYear();
  var month = date.getMonth();
  month = month + 1;
  var date007 = date.getDate();
  var time = date.getHours();
  var Minutes = date.getMinutes();

  var AmOrPm = "am";
  if (time > 11) {
    AmOrPm = "pm";
  }

  if (month < 10) {
    month = `0${month}`;
  }

  if (time < 10) {
    time = `0${time}`;
  }
  if (Minutes < 10) {
    Minutes = `0${Minutes}`;
  }

  var unLockDateTime = `${month}/${date007}/${FullYear} ${time}.${Minutes} ${AmOrPm}`;

  return unLockDateTime;
};

// delete Locked BNB from Backend
const deleteBNb = async (id) => {
  try {
    var newDate = new Date();
    var unLockedAtTimeStamp = Date.parse(newDate);
    unLockedAtTimeStamp = unLockedAtTimeStamp / 1000;

    var data = {
      id: id,
      isBNBUnLocked: true,
      unLock_Date: unLockedAtTimeStamp,
    };

    await axios({
      method: "PATCH",
      url: `${originuUrl}/updatedLockedBNB`,
      data: data,
    })
      .then(function async(response) {})
      .catch(function (error) {});
  } catch (err) {}
};

// filtere locked BNB

const filterLockedBNB = async (inputValue) => {
  try {
    const signer = await currentSigner();

    var chainID;
    if (signer.provider == undefined) {
      chainID = 97;
    } else {
      chainID = signer.provider._network.chainId;
    }

    var data = {
      walletAddress: inputValue,
      chainID: chainID,
    };

    var responseData;
    await axios({
      method: "POST",
      url: `${originuUrl}/filtereLockedBNB`,
      data: data,
    })
      .then(function async(response) {
        responseData = response.data.data;

        var dataAry = [];
        responseData.forEach(async (item, index) => {
          var walletAddress = item.walletAddress;

          var wlt = walletAddress.split("");
          var firstChar = `${wlt[0]}${wlt[1]}${wlt[2]}${wlt[3]}`;
          var secondChar = `${wlt[wlt.length - 3]}${wlt[wlt.length - 2]}${
            wlt[wlt.length - 1]
          }`;
          //
          item.walletAddress = `${firstChar}...${secondChar}`;
          item.fullAddress = walletAddress;
          item.total_Locked_Amount = (
            await ethers.utils.formatEther(item.total_Locked_Amount.toString())
          ).toString();
          dataAry.push(item);
        });

        responseData = dataAry;
      })
      .catch(function (error) {});

    return { success: true, data: responseData };
  } catch (err) {
    return { success: false };
  }
};

// updated BNB transdfer lock ownerShip

const transferLockOwnerShipBNBAPI = async (bnbID, newOwner) => {
  try {
    var data = {
      id: bnbID,
      Owner: newOwner,
      walletAddress: newOwner,
    };

    // updateLockeToken
    await axios({
      method: "PATCH",
      url: `${originuUrl}/updatedLockedBNB`,
      data: data,
    })
      .then(function (response) {})
      .catch(function (error) {});
  } catch (err) {}
};

const extendLockBNBAPI = async (id, unlockDate, amount) => {
  try {
    var data = {
      id: id,
      unLock_Date: unlockDate,
      total_Locked_Amount: amount,
    };

    // updateLockeToken
    await axios({
      method: "PATCH",
      url: `${originuUrl}/updatedLockedBNB`,
      data: data,
    })
      .then(function (response) {})
      .catch(function (error) {});
  } catch (err) {}
};

// exporting data
export {
  getAllTokensByChainID,
  getMyLockedTokens,
  liquidityBackendFun,
  getMyLockedLiquidity,
  getAllLiquidityTokensByChainID,
  lockTokenBackendFun,
  getTokenByTokenID,
  getTokenByID,
  deletTokenFromBackend,
  getAllLockedBNB,
  getLiqudityByLiquityID,
  getLiqudityByID,
  addBNBLock,
  getMyLockedBNB,
  getLockdBNBForBNBDetialPage,
  getLockedBNbById,
  deleteBNb,
  updateLockedToken,
  extendTokenLockAPI,
  filterTokenByTokenAddress,
  filterLockedBNB,
  transferLockOwnerShipBNBAPI,
  extendLockBNBAPI,
};
