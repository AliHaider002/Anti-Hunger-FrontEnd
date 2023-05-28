import {
  walletGeneratorInstance,
  tokenContractInstance,
  provider,
  signeraddr,
} from "./web3Instance";
import { generateWallets } from "./API";
import { ethers } from "ethers";

// check if  user bought a lplan
const checkIfUserBoughtPlan = async (isWltConnected) => {
  try {
    if (isWltConnected == true) {
      const signer_ = await signeraddr();

      const walletGeneratorInstance_ = await walletGeneratorInstance();
      var isBoughtPlan = await walletGeneratorInstance_.checkPlan(signer_);

      if (isBoughtPlan == true) {
        const checkExpiray = (
          await walletGeneratorInstance_.getPlanExpiry(signer_)
        ).toString();
        // return { success: true, isBoughtPlan: isBoughtPlan, checkExpiray: checkExpiray };
        return {
          success: true,
          isBoughtPlan: isBoughtPlan,
          checkExpiray: checkExpiray,
        };
      } else {
        return { success: true, isBoughtPlan: isBoughtPlan, checkExpiray: "" };
      }
    } else {
      return { success: false, isBoughtPlan: false, checkExpiray: "" };
    }
  } catch (err) {
    //
    return { success: false, isBoughtPlan: false, checkExpiray: "" };
  }
};

// check Selected Plan from frontEND;
async function CheckSelectedPlan(valueRadio, numberOfWallet) {
  const signer_ = await signeraddr();

  var plan = "";
  switch (valueRadio) {
    case "1":
      plan = "payperuse";
      break;
    case "2":
      plan = "1month";
      break;
    case "3":
      plan = "year";
      break;
    default:
      plan = "";
  }

  // const signer_ = await signeraddr();
  var tokenContract = await tokenContractInstance();
  const tokeBalance = (await tokenContract.balanceOf(signer_)).toString();

  const walletGeneratorInstance_ = await walletGeneratorInstance();

  // if value of Radio Button is 1

  if (valueRadio == "1") {
    //

    var variableFee = await walletGeneratorInstance_.variableFee();

    const fee = Number(variableFee) * Number(numberOfWallet);

    //
    if (Number(tokeBalance) < fee) {
      return { success: false, msg: "not enought balance" };
    }
    await approveTokens(fee, signer_);
    return { success: true, msg: "" };
  } else {
    const planPrice = await getPlanPrice(plan);

    if (Number(tokeBalance) < Number(planPrice.price)) {
      return { success: false, msg: "not enought balance" };
    }
    await approveTokens(Number(planPrice.price), signer_);
    return { success: true, msg: "" };
  }
}

// approve Wallets
const approveWallets = async (valueRadio, numberOfWallet) => {
  try {
    if (Number(numberOfWallet) > 1000) {
      return { success: false, msg: "MAX 1000 WALLETS AT ONCE" };
    }

    var result = await CheckSelectedPlan(valueRadio, numberOfWallet);

    if (result.success == false) {
      return { success: false, msg: result.msg };
    } else {
      return { success: true };
    }
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

    return { success: false, msg: "not enought balance" };
  }
};

// check plain of user
const checkPlan = async (valueRadio, numberOfWallet) => {
  try {
    if (numberOfWallet > 1000) {
      return { success: false, msg: "MAX 1000 WALLETS AT ONCE" };
    }

    const signer_ = await signeraddr();

    const walletGeneratorInstance_ = await walletGeneratorInstance();

    var isUserAthorized = await walletGeneratorInstance_.readAuthorizedUsers(
      signer_
    );

    if (isUserAthorized == true) {
      valueRadio = "007";
    }

    var userBoughtPlan = (
      await walletGeneratorInstance_.userPlan(signer_)
    ).toString();

    var plan = "";
    switch (valueRadio) {
      case "1":
        plan = "payperuse";
        break;
      case "2":
        plan = "1month";
        break;
      case "3":
        plan = "year";
        break;
      default:
        plan = "";
    }

    // if value of Radio Button is 1
    if (valueRadio == "1") {
      const walletGeneratorInstance_ = await walletGeneratorInstance();

      var variableFee = (
        await walletGeneratorInstance_.variableFee()
      ).toString();

      const fee = Number(variableFee) * Number(numberOfWallet);

      // await approveTokens(fee, signer_);
      // await new Promise((resolve) => {
      //   return setTimeout(resolve, 10000);
      // });

      await payForUse(numberOfWallet);
      await new Promise((resolve) => {
        return setTimeout(resolve, 15000);
      });

      return await generateWallets(valueRadio, signer_, Number(numberOfWallet));
    } else if (valueRadio == "") {
      return { success: false, msg: "select Plan First" };
    } else if (valueRadio == "007") {
      return await generateWallets(valueRadio, signer_, Number(numberOfWallet)); // call this if already have plan
    } else {
      const planPrice = await getPlanPrice(plan);

      // await approveTokens(Number(planPrice.price), signer_);

      await buyPlan(plan);
      await new Promise((resolve) => {
        return setTimeout(resolve, 15000);
      });
      return await generateWallets(valueRadio, signer_, Number(numberOfWallet)); // call this if already have plan
    }
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

    return { success: false };
  }
};

// Pay PerUse function
const payForUse = async (numberOfWallet) => {
  const walletGeneratorInstance_ = await walletGeneratorInstance();
  //

  await walletGeneratorInstance_.payFee(numberOfWallet);
};

// Approve Token
const approveTokens = async (amount, signer_) => {
  const tokenContractInstance_ = await tokenContractInstance();
  const walletGeneratorInstance_ = await walletGeneratorInstance();

  var allowance = (
    await tokenContractInstance_.allowance(
      signer_,
      walletGeneratorInstance_.address
    )
  ).toString();

  // amount = ethers.utils.formatEther(amount.toString(), 18);
  //

  if (Number(amount) > Number(allowance)) {
    await tokenContractInstance_.approve(
      walletGeneratorInstance_.address,
      amount.toString()
    );
  }

  //
};

// Buy Other Plan
const buyPlan = async (plan) => {
  //
  const walletGeneratorInstance_ = await walletGeneratorInstance();
  //
  await walletGeneratorInstance_.buyPlan(plan);
  //
  //
};

// Get Plan Price
const getPlanPrice = async (plan) => {
  //
  const walletGeneratorInstance_ = await walletGeneratorInstance();
  //
  return await walletGeneratorInstance_.planDetails(plan);
  //
};

// this function is used to get Expire
// const getExpiry = async (expiray) => {
//   try {
//
//     if (expiray != '') {
//       // var expiry = '1675446360';
//       // var expiry = expiray;

//       return { success: true, remainTime: dateObj };
//     } else {
//       return { success: false, remainTime: '' };
//     }
//   } catch (err) {
//
//     return { success: false, remainTime: '' };
//   }
// };
//
//
//
//
//
//
// ===================================

//  Extend Plan of user

// ===================================
//   This function i used for Extend Plan of User
const extendPlan = async (valueRadio) => {
  try {
    const signer_ = await signeraddr();

    var tokenContract = await tokenContractInstance();
    const tokeBalance = (await tokenContract.balanceOf(signer_)).toString();

    var plan = "";
    switch (valueRadio) {
      case "2":
        plan = "1month";
        break;
      case "3":
        plan = "year";
        break;
      default:
        plan = "";
    }

    const planPrice = await getPlanPrice(plan);

    //

    if (Number(tokeBalance) < Number(planPrice.price)) {
      return { success: false, msg: "not enought balance" };
    }
    await approveTokens(Number(planPrice.price), signer_);
    await new Promise((resolve) => {
      return setTimeout(resolve, 15000);
    });

    await buyPlan(plan);
    await new Promise((resolve) => {
      return setTimeout(resolve, 15000);
    });

    return { success: true, msg: "Plan Extend Successfully" };
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

    return { success: false };
  }
};

// check if User is Authorized to Use
const checkIfUserAuthorizedToUse = async () => {
  try {
    const walletGeneratorInstance_ = await walletGeneratorInstance();
    var signerAddr = await signeraddr();

    var isAUthorized = await walletGeneratorInstance_.readAuthorizedUsers(
      signerAddr
    );

    return { success: true, isAuth: isAUthorized };
  } catch (err) {
    return { success: false, isAuth: false };
  }
};

// Export Module
export {
  checkPlan,
  approveWallets,
  checkIfUserBoughtPlan,
  extendPlan,
  checkIfUserAuthorizedToUse,
};
