import React, { useContext, useEffect, useState } from "react";
import AppCtx from "../Context/MyContext";
import {
  getContractMultitSender,
  approveTokenWithContract,
  sendBNBFunction,
  getFeesDetailsForTransactions,
} from "../../utils/hooks/use-MultiSenderContract";
import AllocationsFieldsForToken from "./Allocations/allocationsForToken";
import allocationsForBnb from "./Allocations/allocationsForBNB";
import "./custom.css";
import { tokenContractInstance } from "../../utils/hooks/instances";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import SnipeMultiSenderSteps from "./SnipeMultiSenderSteps";
import { Link } from "react-router-dom";
import CoinbasewalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import Img from "./connectBtn.png";
const panCakeSwapCaddressABI = require("../../ABIs/panCakeAbi.json");
const batchTransferABI = require("../../ABIs/batchTransfer.json");

// const providerOptions = {
//   theme: "dark",
//   coinbasewallet: {
//     package: CoinbasewalletSDK,
//     options: {
//       appName: "buenotech",
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
//   binancechainwallet: {
//     package: true,
//   },
// };

// // provider
// const web3Modal = new Web3Modal({
//   theme: "dark",
//   network: "mainnet", // optional
//   cacheProvider: true, // optional
//   providerOptions, // required
// });

const CssTextField = styled(TextField)({
  width: "100%",
  // marginTop: '10px',
  height: "50px",
  "& label.Mui-focused": {
    color: "white",
    height: "50px",
  },
  "& .MuiOutlinedInput-root": {
    height: "50px",
    "& fieldset": {
      borderColor: "white",
      color: "white",
      height: "50px",
    },
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:before": {
      color: "white",
      height: "50px",
      // background: "#414141",
    },

    "&:hover fieldset": {
      borderColor: "#00f902",
      transition: "border-color 0.5s ease",
      height: "50px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00f902",
      height: "50px",
    },
    "&  #customID": {
      color: "white",
      height: "50px",
      // top: "-20px",
    },
  },
});
const CssTextarea = styled(TextField)({
  height: "150px !important",
  overflowY: "auto !important",
  "& label.Mui-focused": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      color: "white",
    },
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:before": {
      color: "white",

      // background: "#414141",
    },
    "&:hover fieldset": {
      borderColor: "#00f902",
      transition: "border-color 0.5s ease",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00f902",
    },
    "&  #customID": {
      color: "white",

      // top: "20px",
    },
  },
  "& .css-15iu9r2-MuiFormControl-root-MuiTextField-root .MuiOutlinedInput-root #customID":
    {
      height: "180px !important",
      overflowY: "scroll !important",
    },
});
const CssDiaLogTextarea = styled(TextField)({
  // marginTop: '10px',
  height: "200px",
  "& label.Mui-focused": {
    color: "white",
    height: "50px",
  },
  "& .MuiOutlinedInput-root": {
    height: "100px",
    "& fieldset": {
      borderColor: "white",
      color: "white",
      height: "200px",
    },
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:before": {
      color: "white",
      height: "50px",
      // background: "#414141",
    },
    "&:hover fieldset": {
      borderColor: "#00f902",
      transition: "border-color 0.5s ease",
      height: "200px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#00f902",
      height: "200px",
    },
    "&  #customID": {
      color: "white",
      height: "50px",
      // top: "-20px",
      "&:placeholder": {
        color: "red !important",
      },
    },
  },
});

const SnipeMultiSender2 = () => {
  const theme = useTheme();
  const isWalletConnectedContext = useContext(AppCtx);
  var [provider, setProvider] = useState();
  var [waltAddress, setWalletAddress] = useState();
  const [signer, setSigner] = React.useState({});
  const [multiSenderContract, setmultiSenderContract] = useState({});
  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
  const [IsBasicKeepModalVisible, setIsBasicKeepModalVisible] = useState(false);
  const [IsBasicAddressMatch, setIsBasicAddressMatch] = useState(false);
  const [approvalHash, setApprovalHash] = useState("");
  const [isBNBValue, setIsBNBValue] = useState();
  const [successTransaction, setSuccessTransation] = useState("");
  const [successTransactionLink, setSuccessTransationLink] = useState("");
  const [approvalHashlink, setApprovalHashLink] = useState("");
  const [sendingToken, setSendingToken] = useState(false);
  const [error, setError] = useState("");
  const [isConfirmAndSending, setisConfirmAndSending] = useState(false);
  const [sendingTransaction, setSendingTransaction] = useState(false);
  const [errorStep4, setErrorStep4] = useState({});
  const [confirmData, setConfirmData] = useState({});
  const [transactionSentSuccessfully, settransactionSentSuccessfully] =
    useState(false);
  const [isApprovalGiven, setApprovalGiven] = useState(false);
  const [sendBNBandTokenConfirmData, setSendBNBandTokenConfirmData] = useState(
    {}
  );
  const [sendBNBBtnDisplay, setsendBNBBtnDispay] = useState(false);
  const [btnDescider, setBtnDescider] = useState("");
  const [disPlayNext, setDispayNext] = useState("none");
  const [disPlayConfirmAndSendBtn, setDisPlayConfirmAndSendBtn] =
    useState("block");
  const [disPlayApprove, setdisPlayApprove] = useState("block");
  const [isApproved, setIsApproved] = useState(false);
  const [addressAry, setAddressary] = useState();
  const [valueAry, setValueAry] = useState();
  const [totalAmmount, setTotalAmmount] = useState();
  const [feesData, setFeesData] = useState({});
  const [setTToenAddress, getTTokenAddress] = useState("");
  const [current, setCurrent] = useState(0);
  // const [form] = BaseForm.useForm()
  const [fields, setFields] = useState([
    // { name: 'login', value: 'Jerri' },
    { name: "Token address", value: "" },
    { name: "Allocations", value: "" },
    // { name: 'password', value: '123456' },
    // { name: 'confirmPassword', value: '123456' },
    // { name: 'salutation', value: 'mr' },
    // { name: 'gender', value: 'male' },
    // { name: 'firstName', value: 'John' },
    // { name: 'lastName', value: 'Black' },
    // { name: 'phone', value: '298573124' },
    // { name: 'email', value: '' },
    // { name: 'address1', value: 'Slobodskay street' },
    // { name: 'address2', value: 'Nevski street' },
    // { name: 'zipCode', value: '435123' },
    // { name: 'city', value: 'Minsk' },
    // { name: 'country', value: 'Belarus' },
    // { name: 'prefix', value: '+7' },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const formLabels = {
    // login: t('forms.stepFormLabels.login'),
    tokenAddress: "Token address",
    allocations: "Allocations",
    // password: t('common.password'),
    // confirmPassword: t('common.confirmPassword'),
    // salutation: t('forms.stepFormLabels.salutation'),
    // gender: t('forms.stepFormLabels.gender'),
    // firstName: t('common.firstName'),
    // lastName: t('common.lastName'),
    // birthday: t('forms.stepFormLabels.birthday'),
    // phone: t('common.phone'),
    // email: t('common.email'),
    // address1: `${t('common.address')} 1`,
    // address2: `${t('common.address')} 2`,
    // zipCode: t('common.zipcode'),
    // city: t('common.city'),
    // country: t('common.country'),
  };

  const formValues = fields
    .filter((item) => item.name !== "prefix")
    .map((item) => ({
      name: formLabels[item.name],
      value: String(
        item.name === "birthday" && item.value
          ? item.value.format("YYYY-MM-DD")
          : item.value
      ),
    }));

  let tmpArray = [];
  const handleUpdateCSV = (e) => {
    let newTokenAdres = localStorage.getItem("tokenAddress");

    let newAry007 = [];

    if (fields.length == 0) {
      newAry007 = [
        { name: "Token address", value: newTokenAdres },
        { name: "Allocations", value: e },
      ];
      setFields(newAry007);
    }

    fields.forEach((item, index) => {
      if (item.name === "allocations" || item.name === "Allocations") {
        tmpArray.push({ name: "allocations", value: e });
      }
      if (item.name === "Token address" || item.name === "token address") {
        tmpArray.push({ name: "tokenAddress", value: newTokenAdres });
      } else {
        tmpArray.push(item);
      }
    });

    setFields(tmpArray);
  };

  const bnbsendAndConfirmBtn = async () => {
    try {
      setIsLoading(true);
      setisConfirmAndSending(true);

      var anyValueSelected = localStorage.getItem("anyValueSelected");
      console.log("ThisIsValue", anyValueSelected);
      console.log("ThisIsValue1", typeof anyValueSelected);
      if (anyValueSelected === "true") {
        setSendingToken(false);
        setError("");

        console.log("this is try block1");
        setSuccessTransation("");
        // var allocatiosn = formValues[2].value;
        // var tokenAddress = formValues[1].value;
        var allocatiosn = "";
        var tokenAddress = "";

        formValues.forEach((item, index) => {
          if (item.name === "Token address") {
            tokenAddress = item.value;
          }
          if (item.name === "Allocations") {
            allocatiosn = item.value;
          }
        });
        var {
          isSpaceError,
          valueAry,
          addressAry,
          totalAmmount,
          isAddreseseMatch,
          isAllocations,
        } = await allocationsForBnb(allocatiosn);
        console.log("this is try block3");

        if (isAllocations === true) {
          var isBNB = true;
          setIsBNBValue(isBNB);
          console.log("ThisIsSpaceError1");
          console.log("TotalAmount", totalAmmount);
          var { ServiceFees, ChainFees, totalFees, error, msg } =
            await getFeesDetailsForTransactions(
              tokenAddress,
              addressAry,
              valueAry,
              totalAmmount,
              isBNB
            );
          console.log("ThisIsSpaceError2");
          if (ServiceFees == 0) {
            ServiceFees = {
              name: "Service Fees",
              value: "Authorized by holding SNIPE",
            };
          } else {
            ServiceFees = { name: "Service Fees", value: ServiceFees };
          }
          console.log("ThisIsSpaceError3");
          if (!error) {
            if (isAddreseseMatch != true) {
              console.log("checkingAllocationStep1")
              if (isSpaceError != true) {
                console.log("ThisIsSpaceError");
                setAddressary(addressAry);
                setTotalAmmount(totalAmmount);
                setValueAry(valueAry);

                if (addressAry.length > 9) {
                  var object = [
                    { name: "Total Addresses", value: addressAry.length },
                    { name: "Total Value", value: totalAmmount },
                  ];
                  setSendBNBandTokenConfirmData(object);

                  var feesOBject = [
                    ServiceFees,
                    { name: "Chain Fees", value: ChainFees },
                    { name: "Total Fees", value: totalFees },
                  ];

                  setFeesData(feesOBject);
                  setsendBNBBtnDispay(true);
                  setDisPlayConfirmAndSendBtn("none");
                  setisConfirmAndSending(false);
                  // form.validateFields().then(() => {
                  setCurrent(current + 1);
                  // });

                  setError("");

                  setIsLoading(false);
                } else {
                  setError("Minimum of 10  addresses required");
                  setIsLoading(false);
                  setisConfirmAndSending(false);
                }
              } else {
                setError("Wrong format, check the sample format");

                setIsLoading(false);
                setisConfirmAndSending(false);
              }
            } else {
              setIsBasicAddressMatch(true);
              setIsLoading(false);
              setisConfirmAndSending(false);
            }
          } else {
            setError(msg);
            setIsLoading(false);
            setisConfirmAndSending(false);
          }
        } else {
          setError("MUST FILL ALLOCATION");
          setIsLoading(false);
          setisConfirmAndSending(false);
        }
      } else {
        setError("Please Select Bulk Sender Option");
        setIsLoading(false);
        setisConfirmAndSending(false);
      }
    } catch (err) {
      setError("Wrong format, check the sample format");
      console.log("This Is Stucked here");
      setIsLoading(false);
      setisConfirmAndSending(false);
    }
  };

  const sendBnbBtn = async () => {
    setIsLoading(true);
    settransactionSentSuccessfully(false);
    setSendingTransaction(true);
    setErrorStep4("");

    const sendBNB = await sendBNBFunction(addressAry, valueAry, totalAmmount);

    if (sendBNB.success == false) {
      setErrorStep4(sendBNB);
      setIsLoading(false);
      setSuccessTransation("");
      settransactionSentSuccessfully(false);
      setSendingTransaction(false);
    } else {
      // working here NB
      if (sendBNB.response != false) {
        setSuccessTransation(sendBNB.response);

        setSuccessTransationLink(
          `https://testnet.bscscan.com/tx/${sendBNB.response.hash}`
        );
        settransactionSentSuccessfully(true);
        setSendingTransaction(false);
      }
      setErrorStep4("");
      setIsLoading(false);

      // setCurrent(current - 1);
      // setTimeout(() => {
      //   notificationController.success({ message: t('common.success') });
      //   setIsLoading(false);
      //   setCurrent(0);

      // }, 1500);
      // setDisPlayConfirmAndSendBtn('block')
    }
  };

  const approveButton = async () => {
    try {
      setIsLoading(true);
      var anyValueSelected = localStorage.getItem("anyValueSelected");

      if (anyValueSelected === "true") {
        setSendingToken(true);
        setSuccessTransation("");
        setIsApproved(true);
        setError("");

        // var tokenAddress = formValues[1].value;
        var tokenAddress = "";
        // var allocatiosn = formValues[2].value;
        var allocatiosn = "";
        formValues.forEach((item, index) => {
          if (item.name === "Token address") {
            tokenAddress = item.value;
          }
          if (item.name === "Allocations") {
            allocatiosn = item.value;
          }
        });

        // token contract
        const contractToken = await tokenContractInstance(tokenAddress);

        var {
          addressAry,
          valueAry,
          totalAmmount,
          isSpaceError,
          isInvalidTokenAddress,
          isAddreseseMatch,
          isAllocations,
        } = await AllocationsFieldsForToken(allocatiosn, contractToken);

        if (isInvalidTokenAddress != true) {
          if (isAllocations === true) {
            if (isSpaceError != true) {
              if (isAddreseseMatch != true) {
                if (addressAry.length > 9) {
                  setAddressary(addressAry);
                  setValueAry(valueAry);

                  setTotalAmmount(totalAmmount);

                  var tokenContract = await approveTokenWithContract(
                    tokenAddress,
                    totalAmmount
                  );

                  //
                  if (tokenContract.err != true) {
                    var isBNB = false;
                    setIsBNBValue(isBNB);
                    // working Here

                    var { ServiceFees, ChainFees, totalFees, error } =
                      await getFeesDetailsForTransactions(
                        tokenAddress,
                        addressAry,
                        valueAry,
                        totalAmmount,
                        isBNB
                      );

                    if (ServiceFees == 0) {
                      ServiceFees = {
                        name: "Service Fees",
                        value: "Authorized by holding SNIPE",
                      };
                    } else {
                      ServiceFees = {
                        name: "Service Fees",
                        value: ServiceFees,
                      };
                    }

                    if (!error) {
                      if (tokenContract.err == true) {
                        setError(tokenContract.msg);
                        setIsApproved(false);
                        setApprovalGiven(false);
                        setIsLoading(false);
                      } else {
                        var feesOBject = [
                          ServiceFees,
                          { name: "Chain Fees", value: ChainFees },
                          { name: "Total Fees", value: totalFees },
                        ];

                        setFeesData(feesOBject);

                        if (tokenContract.approval != false) {
                          setApprovalHash(tokenContract.approval.hash);
                          setApprovalHashLink(
                            `https://testnet.bscscan.com/tx/${tokenContract.approval.hash}`
                          );

                          setIsLoading(false);
                        }
                        setApprovalGiven(true);

                        var object = [
                          { name: "Token Address", value: tokenAddress },
                          {
                            name: "Token Name",
                            value: tokenContract.tokenData.tokenName,
                          },
                          {
                            name: "Token Symbol",
                            value: tokenContract.tokenData.tokenSymbol,
                          },
                          {
                            name: "Token Balance",
                            value: tokenContract.tokenData.tokenBalance,
                          },
                          { name: "Total Amount", value: totalAmmount },
                          { name: "Total Addresses", value: addressAry.length },
                        ];
                        setSendBNBandTokenConfirmData(object);

                        setDispayNext("block");
                        setdisPlayApprove("none");
                        setError("");
                        setIsLoading(false);
                      }
                    } else {
                      setError(error);
                      setIsApproved(false);
                      setApprovalGiven(false);
                      setIsLoading(false);
                    }
                  } else {
                    // this Error when approval erro
                    setError(tokenContract.msg);
                    setIsApproved(false);
                    setIsLoading(false);
                  }
                } else {
                  setError("Minimum of 10  addresses required");
                  setIsApproved(false);
                  setIsLoading(false);
                }
              } else {
                setIsBasicAddressMatch(true);
                setIsLoading(false);
                setIsApproved(false);
                setIsLoading(false);
              }
            } else {
              setError("Wrong format, check the sample format");
              setIsApproved(false);
              setApprovalGiven(false);
              setIsLoading(false);
            }
          } else {
            setError("MUST FILL ALLOCATION");
            setIsApproved(false);
            setApprovalGiven(false);
            setIsLoading(false);
          }
        } else {
          setError("insert valid token address");
          setIsApproved(false);
          setApprovalGiven(false);
          setIsLoading(false);
        }
      } else {
        setError("SeLECT SNIPE SENDER OPTIONS");
        setIsApproved(false);
        setApprovalGiven(false);
        setIsLoading(false);
      }
    } catch (err) {
      setError("Wrong format, check the sample format");
      setIsLoading(false);
      setIsApproved(false);
      setApprovalGiven(false);
    }
  };

  // const next = async () => {
  //   setIsLoading(true);
  //   settransactionSentSuccessfully(false);
  //   setApprovalGiven(false);
  //   setsendBNBBtnDispay(false);
  //   // form.validateFields().then(() => {
  //   //   setCurrent(current + 1)
  //   // })

  //   setIsLoading(false);
  // };

  // const prev = () => {
  //   setErrorStep4("");
  //   setCurrent(current - 1);
  //   setDispayNext("none");
  //   setdisPlayApprove("block");
  //   setIsApproved(false);
  //   setDisPlayConfirmAndSendBtn("block");
  //   setSuccessTransation("");

  //   localStorage.removeItem("anyValueSelected");
  //   settransactionSentSuccessfully(false);
  // };

  // const onFinishSendToken = async () => {
  //   setIsLoading(true);
  //   setSendingTransaction(true);
  //   setErrorStep4("");

  //   var tokenAddress = formValues[1].value;
  //   // var tokenAddress = "";
  //   var allocatiosn = formValues[2].value;
  //   // var allocatiosn = "";
  //   formValues.forEach((item, index) => {
  //     if (item.name === "Token address") {
  //       tokenAddress = item.value;
  //     }
  //     if (item.name === "Allocations") {
  //       allocatiosn = item.value;
  //     }
  //   });

  //   const contractToken = await tokenContractInstance(tokenAddress);

  //   // var {addressAry, valueAry, totalAmmount} = await AllocationsFieldsForToken(allocatiosn,contractToken)

  //   var multiSenderContract_Data = await getContractMultitSender(
  //     tokenAddress,
  //     addressAry,
  //     valueAry,
  //     totalAmmount
  //   );

  //

  //   if (multiSenderContract_Data.success == false) {
  //     setErrorStep4(multiSenderContract_Data);

  //     setIsLoading(false);
  //     setSuccessTransation("");
  //     setSuccessTransationLink("");
  //     setSendingTransaction(false);
  //     settransactionSentSuccessfully(false);
  //   } else {
  //     if (multiSenderContract_Data.transactionData != false) {
  //       setSuccessTransation(multiSenderContract_Data.transactionData);
  //       setSuccessTransationLink(
  //         `https://testnet.bscscan.com/tx/${multiSenderContract_Data.transactionData.hash}`
  //       );
  //       settransactionSentSuccessfully(true);
  //     }
  //
  //     // setCurrent(current - 1);

  //     // setTimeout(() => {
  //     //   notificationController.success({ message: t('common.success') });
  //     //   setIsLoading(false);
  //     //   setCurrent(0);
  //     // }, 1500);

  //     setIsLoading(false);
  //     setDispayNext("none");
  //     setIsApproved(false);
  //     setSendingTransaction(false);
  //   }
  // };

  // const keepAddresses = () => {
  //
  //   localStorage.setItem("keepAddress", "true");
  //   localStorage.setItem("deleteAddress", "false");
  //   setIsBasicAddressMatch(false);

  //   if (sendingToken == true) {
  //     approveButton();
  //   } else {
  //     bnbsendAndConfirmBtn();
  //   }
  // };

  // const deleteAddresses = () => {
  //
  //   localStorage.setItem("deleteAddress", "true");
  //   localStorage.setItem("keepAddress", "false");
  //   setIsBasicAddressMatch(false);

  //   if (sendingToken == true) {
  //     approveButton();
  //   } else {
  //     bnbsendAndConfirmBtn();
  //   }
  // };

  const next = async () => {
    setIsLoading(true);
    settransactionSentSuccessfully(false);
    setApprovalGiven(false);
    setsendBNBBtnDispay(false);
    // form.validateFields().then(() => {
    setCurrent(current + 1);
    // });

    setIsLoading(false);
  };

  const prev = () => {
    setErrorStep4("");
    setCurrent(current - 1);
    setDispayNext("none");
    setdisPlayApprove("block");
    setIsApproved(false);
    setDisPlayConfirmAndSendBtn("block");
    setSuccessTransation("");

    localStorage.removeItem("anyValueSelected");
    settransactionSentSuccessfully(false);
  };

  const onFinishSendToken = async () => {
    setIsLoading(true);
    setSendingTransaction(true);
    setErrorStep4("");

    // var tokenAddress = formValues[1].value;
    var tokenAddress = "";
    // var allocatiosn = formValues[2].value;
    var allocatiosn = "";
    formValues.forEach((item, index) => {
      if (item.name === "Token address") {
        tokenAddress = item.value;
      }
      if (item.name === "Allocations") {
        allocatiosn = item.value;
      }
    });

    const contractToken = await tokenContractInstance(tokenAddress);

    // var {addressAry, valueAry, totalAmmount} = await AllocationsFieldsForToken(allocatiosn,contractToken)

    var multiSenderContract_Data = await getContractMultitSender(
      tokenAddress,
      addressAry,
      valueAry,
      totalAmmount
    );

    if (multiSenderContract_Data.success == false) {
      setErrorStep4(multiSenderContract_Data);

      setIsLoading(false);
      setSuccessTransation("");
      setSuccessTransationLink("");
      setSendingTransaction(false);
      settransactionSentSuccessfully(false);
    } else {
      if (multiSenderContract_Data.transactionData != false) {
        setSuccessTransation(multiSenderContract_Data.transactionData);
        setSuccessTransationLink(
          `https://testnet.bscscan.com/tx/${multiSenderContract_Data.transactionData.hash}`
        );
        settransactionSentSuccessfully(true);
      }

      // setCurrent(current - 1);

      // setTimeout(() => {
      //   notificationController.success({ message: t('common.success') });
      //   setIsLoading(false);
      //   setCurrent(0);
      // }, 1500);

      setIsLoading(false);
      setDispayNext("none");
      setIsApproved(false);
      setSendingTransaction(false);
    }
  };

  const keepAddresses = () => {
    localStorage.setItem("keepAddress", "true");
    localStorage.setItem("deleteAddress", "false");
    setIsBasicAddressMatch(false);

    if (sendingToken == true) {
      approveButton();
    } else {
      bnbsendAndConfirmBtn();
    }
  };

  const deleteAddresses = () => {
    localStorage.setItem("deleteAddress", "true");
    localStorage.setItem("keepAddress", "false");
    setIsBasicAddressMatch(false);

    if (sendingToken == true) {
      approveButton();
    } else {
      bnbsendAndConfirmBtn();
    }
  };

  const steps = [
    {
      title: "Add Your Allocation",
    },
    // {
    //   title: t('forms.stepFormLabels.info'),
    // },
    // {
    //   title: t('forms.stepFormLabels.location'),
    // },
    {
      title: "Confirmation",
    },
  ];
  // useEffect(()=>{
  //
  // })
  // const handleChildData = (data) => {
  //   setChildData(data);
  // };

  // const handleTextArea = (fun) => {
  //   // fun();
  //   // console.log("hamza");
  //   return fun;
  // };

  const [btnBol, setBtnBol] = useState(false);

  const formFieldsUi = [
    <Step1
      key="1"
      updateCSV={handleUpdateCSV}
      setFields={setFields}
      updateBtnDesciderValue={setBtnDescider}
      setError={setError}
      setIsApproved={setIsApproved}
      setdisPlayApprove={setdisPlayApprove}
      setApprovalGiven={setApprovalGiven}
      setDispayNext={setDispayNext}
      setBtnBol={setBtnBol}
      // handleTextArea={handleTextArea}
    />,
    <Step2
      key="4"
      formValues={formValues}
      sendBNBandTokenConfirmData={sendBNBandTokenConfirmData}
      errors={errorStep4}
      successTransaction={successTransaction}
      successTransactionLink={successTransactionLink}
      feesData={feesData}
    />,
  ];

  const backdropStyle = {
    backgroundColor: "rgba(1, 1, 1, 0.7)",
  };
  const paperStyle = {
    backgroundColor: `${theme.palette.background.mainBg}`,
    color: "white",
    width: { lg: "40%" },
    md: "40%",
    sm: "auto",
    xs: "auto",
    height: "auto",
    padding: "20px",
  };

  return (
    <Box
      sx={{
        color: theme.palette.background.default,
        padding: "10px",
        paddingLeft: "0px",
        width: "100%",
      }}
    >
      {/* <Steps labelPlacement="vertical" size="small" current={current}>
        {steps.map((item) => (
          <Steps.Step key={item.title} title={item.title} description="" />
        ))}
      </Steps> */}
      <Box>
        <Typography
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            padding: "10px",
            paddingLeft: "5px",
          }}
        >
          Snipe Multi Sender
        </Typography>
      </Box>
      <Box>
        <SnipeMultiSenderSteps />
      </Box>
      <div>{formFieldsUi[current]}</div>
      <div>
        <div>
          <p
            style={{
              fontSize: "14px",
              textAlign: "center",
              textTransform: "uppercase",
              color: "red",
            }}
          >
            {error}
          </p>
        </div>

        {isApprovalGiven ? (
          <>
            <div>
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "white",
                }}
              >
                Approval Given, press next to progress.
                <br />
                <a href={approvalHashlink} target="_blank" class="my-link">
                  {approvalHash}
                </a>
              </p>
            </div>
          </>
        ) : (
          <></>
        )}

        {current < steps.length - 1 && (
          // <Button type="primary" onClick={() => next()}>
          <Button
            variant="outlined"
            onClick={() => next()}
            // loading={isLoading}
            sx={{
              margin: "auto",
              display: disPlayNext,
              border: `1px solid ${theme.palette.background.hoverColor}`,
              borderRadius: "5px",
              height: "50px",
              backgroundColor: "transparent",
              color: `${theme.palette.background.default}`,

              "&:hover": {
                backgroundColor: "transparent",
                // color: "blue",
                // borderColor: "blue",
              },
            }}
            // style={{ display: disPlayNext, margin: 'auto' }}
          >
            Next
          </Button>
        )}

        {btnDescider === "BNB Transfers" ? (
          <>
            {isWalletConnectedContext?.isWalletConnected ? (
              <>
                {/* <S.ButtonWrapper style={{ display: disPlayApprove }}> */}
                <Box
                  sx={{
                    display: disPlayApprove,
                    textAlign: "center",
                  }}
                >
                  <Button
                    // style={{   }}
                    // loading={isLoading}
                    variant="outlined"
                    disabled={btnBol ? false : true}
                    onClick={bnbsendAndConfirmBtn}
                    sx={{
                      margin: "auto",
                      display: disPlayConfirmAndSendBtn,
                      border: `1px solid ${theme.palette.background.hoverColor}`,
                      borderRadius: "5px",
                      height: "50px",
                      backgroundColor: "transparent",
                      color: `${theme.palette.background.default}`,

                      "&:hover": {
                        backgroundColor: "transparent",
                        // color: "blue",
                        // borderColor: "blue",
                      },
                    }}
                  >
                    {isConfirmAndSending ? (
                      <>
                        <CircularProgress
                          size={25}
                          sx={{
                            color: theme.palette.background.hoverColor,
                          }}
                        />{" "}
                        <span style={{ marginRight: "10px" }}>
                          Generating SNIPE multi-sender transaction, please wait
                        </span>
                      </>
                    ) : (
                      `Confirm and Send`
                    )}
                  </Button>
                </Box>
                {/* </S.ButtonWrapper> */}
              </>
            ) : (
              <>
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Button
                    //   style={{  }}
                    sx={{
                      border: `1px solid ${theme.palette.background.hoverColor}`,
                      borderRadius: "5px",
                      margin: "auto",
                      height: "50px",
                      backgroundColor: "transparent",
                      color: `${theme.palette.background.default}`,

                      "&:hover": {
                        backgroundColor: "transparent",
                        // color: "blue",
                        // borderColor: "blue",
                      },
                    }}
                    variant="outlined"
                    onClick={() => setIsBasicModalVisible(true)}
                  >
                    Confirm and Send
                  </Button>
                </Box>
              </>
            )}
          </>
        ) : (
          <>
            {isWalletConnectedContext?.isWalletConnected ? (
              <>
                <Box sx={{ display: disPlayApprove, textAlign: "center" }}>
                  <Button
                    // onClick={approveButton}
                    onClick={() => {
                      approveButton();
                    }}
                    variant="outlined"
                    disabled={btnBol ? false : true}
                    sx={{
                      border: `1px solid ${theme.palette.background.hoverColor}`,
                      borderRadius: "5px",
                      margin: "auto",
                      height: "50px",
                      backgroundColor: "transparent",
                      color: `${theme.palette.background.default}`,

                      "&:hover": {
                        backgroundColor: "transparent",
                        // color: "blue",
                        // borderColor: "blue",
                      },
                    }}
                    // style={{ margin: 'auto' }}
                    // loading={isLoading}
                  >
                    {isApproved ? (
                      <>
                        <CircularProgress
                          size={25}
                          sx={{
                            color: theme.palette.background.hoverColor,
                          }}
                        />{" "}
                        <span style={{ marginRight: "10px" }}> Approving</span>
                      </>
                    ) : (
                      `Approve`
                    )}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Button
                    //   style={{ margin: 'auto' }}
                    variant="outlined"
                    sx={{
                      border: `1px solid ${theme.palette.background.hoverColor}`,
                      borderRadius: "5px",
                      margin: "auto",
                      height: "50px",
                      backgroundColor: "transparent",
                      color: `${theme.palette.background.default}`,

                      "&:hover": {
                        backgroundColor: "transparent",
                        // color: "blue",
                        // borderColor: "blue",
                      },
                    }}
                    onClick={() => {
                      setIsBasicModalVisible(true);
                      // const fun = handleTextArea();
                      // fun();
                    }}
                  >
                    Approve
                  </Button>
                </Box>
              </>
            )}
          </>
        )}

        {current === steps.length - 1 && (
          <>
            {sendBNBBtnDisplay ? (
              <>
                {transactionSentSuccessfully ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        variant="outlined"
                        sx={{
                          border: `1px solid ${theme.palette.background.hoverColor}`,
                          borderRadius: "5px",
                          marginRight: "10px",
                          height: "50px",
                          backgroundColor: "transparent",
                          color: `${theme.palette.background.default}`,

                          "&:hover": {
                            backgroundColor: "transparent",
                            // color: "blue",
                            // borderColor: "blue",
                          },
                        }}
                        onClick={() => prev()}
                      >
                        Another Bulk Send
                      </Button>
                      <Button
                        type="primary"
                        sx={{
                          color: theme.palette.background.default,
                          textDecoration: "none",
                        }}
                      >
                        <Link
                          to="/"
                          style={{
                            color: theme.palette.background.default,
                            textDecoration: "none",
                          }}

                          // className="backToHome"
                        >
                          Home
                        </Link>
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      mt: "20px",
                      mb: "10px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => prev()}
                      loading={isLoading}
                      variant="outlined"
                      sx={{
                        border: `1px solid ${theme.palette.background.hoverColor}`,
                        borderRadius: "5px",
                        ml: "10px",
                        height: "50px",
                        backgroundColor: "transparent",
                        color: `${theme.palette.background.default}`,

                        "&:hover": {
                          backgroundColor: "transparent",
                          // color: "blue",
                          // borderColor: "blue",
                        },
                      }}
                      // style={{ margin: 'auto' }}
                    >
                      previous
                    </Button>
                    <Button
                      onClick={sendBnbBtn}
                      // loading={isLoading}
                      variant="outlined"
                      sx={{
                        border: `1px solid ${theme.palette.background.hoverColor}`,
                        borderRadius: "5px",
                        margin: "auto",
                        height: "50px",
                        backgroundColor: "transparent",
                        color: `${theme.palette.background.default}`,

                        "&:hover": {
                          backgroundColor: "transparent",
                          // color: "blue",
                          // borderColor: "blue",
                        },
                      }}
                      // style={{ margin: 'auto' }}
                    >
                      {sendingTransaction ? (
                        <>
                          <CircularProgress
                            size={25}
                            sx={{
                              color: theme.palette.background.hoverColor,
                            }}
                          />{" "}
                          <span style={{ marginRight: "10px" }}>
                            {" "}
                            Generating Transaction, please wait
                          </span>
                        </>
                      ) : (
                        `send`
                      )}
                    </Button>
                  </Box>
                )}
              </>
            ) : (
              <>
                {transactionSentSuccessfully ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        sx={{
                          border: `1px solid ${theme.palette.background.hoverColor}`,
                          borderRadius: "5px",
                          marginRight: "10px",
                          height: "50px",
                          backgroundColor: "transparent",
                          color: `${theme.palette.background.default}`,

                          "&:hover": {
                            backgroundColor: "transparent",
                            // color: "blue",
                            // borderColor: "blue",
                          },
                        }}
                        //   style={{  }}
                        onClick={() => prev()}
                        variant="outlined"
                      >
                        Another Bulk Send
                      </Button>

                      <Button
                        sx={{
                          color: `${theme.palette.background.default}`,
                          textDecoration: "none",
                        }}
                      >
                        <Link
                          to="/"
                          style={{
                            color: `${theme.palette.background.default}`,
                            textDecoration: "none",
                          }}
                        >
                          Home
                        </Link>
                      </Button>
                    </Box>
                  </>
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      mt: "20px",
                      mb: "10px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => prev()}
                      loading={isLoading}
                      variant="outlined"
                      sx={{
                        border: `1px solid ${theme.palette.background.hoverColor}`,
                        borderRadius: "5px",
                        ml: "10px",
                        height: "50px",
                        backgroundColor: "transparent",
                        color: `${theme.palette.background.default}`,

                        "&:hover": {
                          backgroundColor: "transparent",
                          // color: "blue",
                          // borderColor: "blue",
                        },
                      }}
                      // style={{ margin: 'auto' }}
                    >
                      previous
                    </Button>
                    <Button
                      onClick={onFinishSendToken}
                      // loading={isLoading}
                      variant="outlined"
                      sx={{
                        border: `1px solid ${theme.palette.background.hoverColor}`,
                        borderRadius: "5px",
                        margin: "auto",
                        height: "50px",
                        backgroundColor: "transparent",
                        color: `${theme.palette.background.default}`,

                        "&:hover": {
                          backgroundColor: "transparent",
                          // color: "blue",
                          // borderColor: "blue",
                        },
                      }}
                      // style={{ margin: 'auto' }}
                    >
                      {sendingTransaction ? (
                        <>
                          <CircularProgress
                            size={25}
                            sx={{
                              color: `${theme.palette.background.hoverColor}`,
                            }}
                          />{" "}
                          <span style={{ marginLeft: "10px" }}>
                            Generating Transaction, please wait
                          </span>{" "}
                        </>
                      ) : (
                        `send`
                      )}
                    </Button>
                  </Box>
                )}
              </>
            )}
          </>
        )}
        <Dialog
          open={IsBasicModalVisible}
          onClose={() => setIsBasicModalVisible(false)}
          BackdropProps={{ style: backdropStyle }}
          PaperProps={{ style: paperStyle }}
        >
          <DialogTitle></DialogTitle>
          <DialogContent>
            <Typography>Oopss Wallet is not Connected......</Typography>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                width: "100%",
                mt: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => setIsBasicModalVisible(false)}
                sx={{
                  color: `${theme.palette.background.default}`,
                }}
                variant="outlined"
              >
                Cancel
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
        <Dialog
          open={IsBasicAddressMatch}
          onClose={() => setIsBasicAddressMatch(false)}
          BackdropProps={{ style: backdropStyle }}
          PaperProps={{ style: paperStyle }}
        >
          <DialogTitle></DialogTitle>
          <DialogContent>
            <Typography>Duplicate Addresses Found</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={keepAddresses}
              sx={{
                color: `${theme.palette.background.default}`,
              }}
              variant="outlined"
            >
              Keep
            </Button>
            <Button
              onClick={deleteAddresses}
              sx={{
                color: `${theme.palette.background.default}`,
              }}
              variant="outlined"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* {current > 0 && (
          <S.PrevButton type="default" onClick={() => prev()}>
            {t('forms.stepFormLabels.previous')}
          </S.PrevButton>
        )} */}
      </div>
    </Box>
  );
};

export default SnipeMultiSender2;
