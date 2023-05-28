import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import SnipeMultiSenderSteps from "./SnipeMultiSenderSteps";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import "./custom.css";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import AppCtx from "../Context/MyContext";
import { useTranslation } from "react-i18next";
import { currentTokenData } from "../../utils/hooks/instances";
import {
  getContractMultitSender,
  approveTokenWithContract,
  sendBNBFunction,
  getFeesDetailsForTransactions,
} from "../../utils/hooks/use-MultiSenderContract";

import { tokenContractInstance } from "../../utils/hooks/instances";

// import allocations
import AllocationsFieldsForToken from "./Allocations/allocationsForToken";
import allocationsForBnb from "./Allocations/allocationsForBNB";
// getting data back from allocations

import { Link } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

const backdropStyle = {
  backgroundColor: "rgba(1, 1, 1, 0.7)",
};

//   const CustomSelect = styled(Select)(({ theme }) => ({
//     "& .MuiSelect-select.MuiSelect-outlined": {
//       paddingRight: "0px",
//       border: "1px solid #00f902",
//       backgroundColor: "transparent",
//       borderColor: "#00f902",
//       color: "white",
//       "&:focus": {
//         border: "2px solid #00f902 !important",
//         backgroundColor: "transparent",
//         borderColor: "#00f902",
//       },
//     },
//     "& .MuiFormControl-root": {
//       border: "1px solid #00f902",
//       borderColor: "#00f902",
//       color: "white",
//       "&:focus": {
//         border: "2px solid #00f902 !important",
//         backgroundColor: "transparent",
//         borderColor: "#00f902",
//       },
//     },
//     "& .MuiSelect-select.MuiSelect-outlined:hover": {
//       border: "2px solid #00f902 !important",
//       borderColor: "#00f902",
//       color: "white",
//     },
//     "& .MuiFormControl-root:hover": {
//       border: "2px solid #00f902 !important",
//       borderColor: "#00f902",
//       color: "white",
//     },
//     "& .css-1ljdefu-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root.Mui-focused.MuiOutlinedInput-notchedOutline":
//       {
//         border: "2px solid #00f902 !important",
//         borderColor: "#00f902 !important",
//         color: "white",
//         "&:focus": {
//           border: "2px solid #00f902 !important",
//           backgroundColor: "transparent",
//           borderColor: "#00f902",
//         },
//       },
//   }));
const CustomFormControl = styled(FormControl)(({ theme = useTheme() }) => ({
  "& 	.Mui-error": {
    border: `1px solid ${theme.palette.background.hoverColor}`,
    backgroundColor: "transparent",
    borderColor: theme.palette.background.hoverColor,
    color: theme.palette.background.default,
    "&:focus": {
      border: `1px solid ${theme.palette.background.hoverColor}`,
      backgroundColor: "transparent",
      borderColor: theme.palette.background.hoverColor,
    },
    fieldset: {
      border: `1px solid ${theme.palette.background.hoverColor} !important`,
      backgroundColor: "transparent",
      borderColor: `${theme.palette.background.hoverColor} !important`,
      color: theme.palette.background.default,
    },
  },
  "& .css-puxybu.Mui-error .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.background.hoverColor} !important`,
    backgroundColor: "transparent",
    borderColor: `${theme.palette.background.hoverColor} !important`,
    color: theme.palette.background.default,
  },
}));

const SnipeMultiSender = () => {
  let theme = useTheme();
  // const {
  //     setDispayNext,
  //     setApprovalGiven,
  //     setdisPlayApprove,
  //     setIsApproved,
  //     updateCSV,
  //     updateBtnDesciderValue,
  //     setError,
  //     BasicModalVisible,
  //     deleteAddresses,
  //     keepAddresses,
  //     IsBasicAddressMatch,
  //     setIsBasicAddressMatch
  // } = props;
  const isWalletConnectedContext = useContext(AppCtx);
  const { t } = useTranslation();
  const [selectValue, setSelectValue] = useState("");
  var [dispayField, setDispayField] = useState("block");

  // const [isApproved, setIsApproved]= useState<boolean>(false)
  const [copyData, setcopyData] = useState("copy");
  const [displayCopySlug, setdisplayCopySlug] = useState("none");
  const [tokenDataAry, setTokenDataAry] = useState([]);
  const [addressToCopy, setAddressToCopy] = useState(
    "0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5"
  );

  const [selectVal, setSelectVal] = useState("");
  const [open, setOpen] = useState(false);
  const [IsBasicCsvModalVisible, setIsBasicCsvModalVisible] = useState(false);
  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
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
    tokenAddress: t("Token address"),
    allocations: t("Allocations"),
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
    let newAry007 = [];

    if (fields.length == 0) {
      newAry007 = [
        { name: "", value: "" },
        { name: "Token address", value: "" },
        { name: "Allocations", value: e },
        { name: "undefined", value: "" },
      ];
      setFields(newAry007);
    }

    fields.forEach((item, index) => {
      if (item.name === "allocations" || item.name === "Allocations") {
        tmpArray.push({ name: "allocations", value: e });
      } else {
        tmpArray.push(item);
      }
    });

    setFields(tmpArray);
  };

  // confirm and send bnb
  const bnbsendAndConfirmBtn = async () => {
    setIsLoading(true);
    try {
      setisConfirmAndSending(true);
      setError("");

      var anyValueSelected = localStorage.getItem("anyValueSelected");

      if (anyValueSelected === "true") {
        setSendingToken(false);

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
          outOfLimit,
        } = await allocationsForBnb(allocatiosn);

        if (outOfLimit == "") {
          if (isAllocations === true) {
            var isBNB = true;
            setIsBNBValue(isBNB);
            var { ServiceFees, ChainFees, totalFees, error, msg } =
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
              ServiceFees = { name: "Service Fees", value: ServiceFees };
            }

            if (!error) {
              if (isAddreseseMatch != true) {
                if (isSpaceError != true) {
                  setAddressary(addressAry);
                  setTotalAmmount(totalAmmount);
                  setValueAry(valueAry);

                  if (addressAry.length > 9) {
                    var object = [
                      { name: "Total Address", value: addressAry.length },
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
                    //     setCurrent(current + 1)
                    // })

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
          setError(outOfLimit);
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
      setIsLoading(false);
      setisConfirmAndSending(false);
    }
  };

  // SEND   BNB function
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

  // approve token
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
          outOfLimit,
        } = await AllocationsFieldsForToken(allocatiosn, contractToken);

        if (outOfLimit == "") {
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
                            {
                              name: "Total Addresses",
                              value: addressAry.length,
                            },
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
          setError(outOfLimit);
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

  const next = async () => {
    setIsLoading(true);
    settransactionSentSuccessfully(false);
    setApprovalGiven(false);
    setsendBNBBtnDispay(false);
    // validateFields().then(() => {
    //     setCurrent(current + 1)
    // })

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

  const normFile = (e = { fileList: [] }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const [csvText, setCsvText] = useState("");
  const handleAllocationField = (e) => {
    setIsApproved(false);
    setdisPlayApprove("block");
    setApprovalGiven(false);
    setDispayNext("none");
    setCsvText(e.target.value);
  };

  const handleSelectChange = (e) => {
    var selectedValue = e.target.value;
    localStorage.removeItem("keepAddress");
    localStorage.removeItem("deleteAddress");
    setSelectValue(selectedValue);
    setBtnDescider(selectedValue);

    var boolValue = true;
    localStorage.setItem("anyValueSelected", boolValue);
    if (selectedValue == "BNB Transfers") {
      setDispayField("none");
      setTokenDataAry([]);
    } else {
      setDispayField("block");
    }
  };

  const copyBtnFun = () => {
    navigator.clipboard.writeText("0xB803b0E5E7457B135085E896FD7A3398b266cd43");
    setcopyData("copied");
    setInterval(() => {
      setcopyData("copy");
    }, 2000);
  };
  const copyBtnMouseOver = () => {
    setdisplayCopySlug("block");
  };
  const csvFileToArray = (string) => {
    const tmpArray = [];
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    handleUpdateCSV(csvRows.join("\n"));
  };

  const handleOnSubmit = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);

    fileReader.onload = function (event) {
      const text = event.target.result;

      csvFileToArray(text);
      setCsvText(text);
    };
  };

  const handleTokenAddressChange = async (e) => {
    var value = e.target.value;
    setTokenDataAry([]);
    var isWalletConnected = isWalletConnectedContext?.isWalletConnected;

    if (isWalletConnected == true) {
      var currentTokenContract = await currentTokenData(value);

      if (currentTokenContract.success == true) {
        setTokenDataAry(currentTokenContract.tokenData);
        setError("");
      } else {
        setTokenDataAry([]);
        setError("INSERT VALID TOKEN ADDRESS");
      }
    } else {
      setTokenDataAry([]);
    }

    setIsApproved(false);
    setdisPlayApprove("block");
    setApprovalGiven(false);
    setDispayNext("none");
  };

  useEffect(() => {
    function detechInnerWidth() {
      if (window.innerWidth < 600) {
        setAddressToCopy("0x5E...4a5");
      } else {
        setAddressToCopy("0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5");
      }
    }

    setInterval(() => {
      detechInnerWidth();
    }, 2000);
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSelect = (event) => {
    setSelectVal(event.target.value);
  };
  // const handleClick = (event) => {
  //
  //   setAnchorEl(event.currentTarget);
  // };

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle file change
  };

  const paperStyle = {
    backgroundColor: `${theme.palette.background.mainBg}`,
    color: "white",
    width: "40%",
    height: "55%",
    padding: "20px",
  };

  return (
    <>
      <Box
        sx={{
          color: theme.palette.background.default,
          padding: "10px",
          paddingLeft: "0px",
          width: "100%",
        }}
      >
        <Box>
          <Box>
            <Typography
              sx={{
                fontSize: "28px",
                fontWeight: 700,
                paddingLeft: "5px",
              }}
            >
              Snipe Multi Sender
            </Typography>
          </Box>
        </Box>
        <Box>
          <SnipeMultiSenderSteps />
        </Box>
        <Box>
          <CustomFormControl
            sx={{ m: 1, width: "98%", paddingTop: "20px" }}
            //   className={classes.formControl}
            error
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 550,
                color: "#00f902",
                paddingBottom: "10px",
              }}
            >
              Bulk Sender
            </Typography>
            <Select
              value={selectValue}
              onChange={handleSelectChange}
              displayEmpty
              variant="outlined"
              // sx={{ background: "red" }}
            >
              <MenuItem
                value=""
                sx={{
                  color: `${theme.palette.background.default}`,
                  backgroundColor: `${theme.palette.primary.main}`,
                }}
              >
                <em>Select</em>
              </MenuItem>
              <MenuItem
                value="Token Transfers"
                selected
                sx={{
                  color: `${theme.palette.background.default}`,
                  backgroundColor: `${theme.palette.primary.main}`,
                }}
              >
                Token Transfers
              </MenuItem>
              <MenuItem
                value="BNB Transfers"
                sx={{
                  color: `${theme.palette.background.default}`,
                  backgroundColor: `${theme.palette.primary.main}`,
                }}
              >
                BNB Transfers
              </MenuItem>
            </Select>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#DEE2EE",
              }}
            >
              Snipe Multi Sender easily allows you to send ERC20 Token in batch.
              Select an option to send tokens or bnb.
            </Typography>
          </CustomFormControl>
        </Box>
        <Box>
          <CustomFormControl
            sx={{ m: 1, width: "98%", paddingTop: "20px" }}
            //   className={classes.formControl}
            error
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 550,
                color: "#00f902",
                paddingBottom: "10px",
              }}
            >
              Token Address
            </Typography>
            <CssTextField
              type="text"
              variant="outlined"
              placeholder="Ex: 0x..."
              // fullWidth
              id="customID"
              // autoComplete={false}
              // onFocus={handleClick}
              // autoHighlight={false}
              onChange={handleTokenAddressChange}
              //onChange={handleSearchValue}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <IconButton onClick={handleSearch}>
              //         <SearchIcon sx={{ color: "white" }} />
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
            />
          </CustomFormControl>
        </Box>
        {tokenDataAry.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                flexWrap: "wrap",
                borderBottom: "1px solid #5c5c5c",
                padding: "10px 10px",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography key={index + 1} sx={{ fontSize: "14px" }}>
                  {item.name}
                </Typography>
              </Box>
              <Box sx={{ width: "50%", textAlign: "right" }}>
                <Typography key={index + 2} sx={{ fontSize: "14px" }}>
                  {item.value}
                </Typography>
              </Box>
            </Box>
          );
        })}

        <Box>
          <CustomFormControl
            sx={{ m: 1, width: "98%", paddingTop: "10px" }}
            //   className={classes.formControl}
            error
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 550,
                color: "#00f902",
                paddingBottom: "10px",
              }}
            >
              Allocations
            </Typography>
            <CssTextarea
              type="text"
              variant="outlined"
              value={csvText}
              placeholder="
            insert allocation separate with breaks link. By format: address, amount &#10; Ex: 0x0000000000000000000000000,13.45 0x0000000000000000000000000,1.049
            0x0000000000000000000000000,1"
              id="customID"
              // autoComplete={false}
              // onFocus={handleClick}
              // autoHighlight={false}
              multiline
              onChange={handleAllocationField}
              //onChange={handleSearchValue}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       <IconButton onClick={handleSearch}>
              //         <SearchIcon sx={{ color: "white" }} />
              //       </IconButton>
              //     </InputAdornment>
              //   ),
              // }}
            />
            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 450,
                color: "#DEE2EE",
                paddingTop: "20px",
                paddingBottom: "10px",
              }}
            >
              MAXIMUM 2000 WALLETS PER BATCH
            </Typography>
          </CustomFormControl>
        </Box>
        <Box
          sx={{
            paddingLeft: "5px",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            onChange={handleOnSubmit}
            style={{ display: "none" }}
          />
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              border: "1px solid white ",
              borderRadius: "5px",
              height: "50px",
              color: "#00f902",
              fontSize: "13px",
              fontWeight: "300px",
              backgroundColor: "transparent",

              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            Or Choose from CSV File &nbsp;{" "}
            <BackupOutlinedIcon
              sx={{
                color: "white",
              }}
            />{" "}
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsBasicCsvModalVisible(true)}
            sx={{
              borderRadius: "5px",
              height: "50px",
              color: "white",
              fontSize: "13px",
              fontWeight: "300px",
              backgroundColor: "transparent",
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: "none",
              },
            }}
          >
            Sample CSV File{" "}
          </Button>
          <Dialog
            open={IsBasicCsvModalVisible}
            onClose={() => setIsBasicCsvModalVisible(false)}
            BackdropProps={{ style: backdropStyle }}
            PaperProps={{ style: paperStyle }}
          >
            <DialogTitle>Sample CSV File</DialogTitle>
            <DialogContent>
              <CssDiaLogTextarea
                type="text"
                variant="outlined"
                fullWidth
                placeholder="
            insert allocation separate with breaks link. By format: address, amount &#10; Ex: 0x0000000000000000000000000,13.45 0x0000000000000000000000000,1.049
            0x0000000000000000000000000,1"
                id="customID"
                // autoComplete={false}
                // onFocus={handleClick}
                // autoHighlight={false}
                multiline
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "100px",
                  },
                }}
                //onChange={handleSearchValue}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <IconButton onClick={handleSearch}>
                //         <SearchIcon sx={{ color: "white" }} />
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsBasicCsvModalVisible(false)}
                sx={{
                  color: `${theme.palette.background.default}`,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => setIsBasicCsvModalVisible(false)}
                sx={{
                  color: `${theme.palette.background.default}`,
                }}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Grid
          sx={{
            padding: "20px 5px",
            // width: "20%",
          }}
        >
          <Box
            sx={{
              // padding: "5px",

              borderRadius: "5px",
              paddingLeft: "10px",
              paddingTop: "5px",
              textAlign: "left",
              backgroundImage: "linear-gradient(to right, #00F902, black)",
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#DEE2EE",
                // whiteSpace: "nowrap",
                // overflow: "hidden",
                // textOverflow: "ellipsis"
              }}
            >
              Please exclude {addressToCopy}{" "}
              <ContentCopyIcon onClick={copyBtnFun} /> from fees, rewards, max
              tx amount to start sending tokens
            </Typography>
          </Box>
        </Grid>
      </Box>

      {/* <div>{formFieldsUi[current]}</div> */}
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
                <a href={approvalHashlink} target="_blank">
                  {approvalHash}
                </a>
              </p>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* {current < steps.length - 1 && (
                        // <Button type="primary" onClick={() => next()}>
                        <Button
                            type="primary"
                            onClick={() => next()}
                            // loading={isLoading}
                            style={{ display: disPlayNext, margin: "auto" }}
                        >
                            {t("forms.stepFormLabels.next")}
                        </Button>
                    )} */}

        {btnDescider === "BNB Transfers" ? (
          <>
            {isWalletConnectedContext?.isWalletConnected ? (
              <>
                <Button
                  style={{
                    margin: "auto",
                    display: disPlayConfirmAndSendBtn,
                  }}
                  // loading={isLoading}
                  onClick={bnbsendAndConfirmBtn}
                  sx={{
                    border: `1px solid ${theme.palette.background.hoverColor}`,
                    borderRadius: "5px",
                    height: "50px",
                    backgroundColor: "transparent",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "transparent",
                      // color: "blue",
                      // borderColor: "blue",
                    },
                  }}
                >
                  {isConfirmAndSending
                    ? `Generating SNIPE multi-sender transaction, please wait`
                    : `Confirm and Send`}
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="ghost"
                  style={{ margin: "auto" }}
                  onClick={() => setIsBasicModalVisible(true)}
                  sx={{
                    border: `1px solid ${theme.palette.background.hoverColor}`,
                    borderRadius: "5px",
                    height: "50px",
                    backgroundColor: "transparent",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "transparent",
                      // color: "blue",
                      // borderColor: "blue",
                    },
                  }}
                >
                  Confirm and Send
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            {isWalletConnectedContext?.isWalletConnected ? (
              <>
                <Button
                  type="primary"
                  onClick={approveButton}
                  style={{ margin: "auto" }}
                  // loading={isLoading}
                  sx={{
                    border: `1px solid ${theme.palette.background.hoverColor}`,
                    borderRadius: "5px",
                    height: "50px",
                    backgroundColor: "transparent",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "transparent",
                      // color: "blue",
                      // borderColor: "blue",
                    },
                  }}
                >
                  {isApproved ? `Approving` : `Approve`}
                </Button>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    padding: "10px",
                    justifySelf: "center",
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  <Button
                    type="ghost"
                    style={{ margin: "auto" }}
                    onClick={() => {
                      setIsBasicModalVisible(true);
                    }}
                    sx={{
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
                    Approve
                  </Button>
                </Box>
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
                    <Button
                      onClick={() => setIsBasicModalVisible(false)}
                      sx={{
                        color: `${theme.palette.background.default}`,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setIsBasicModalVisible(false)}
                      sx={{
                        color: `${theme.palette.background.default}`,
                      }}
                    >
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          </>
        )}

        {/* {current === steps.length - 1 && (
                        <>
                            {sendBNBBtnDisplay ? (
                                <>
                                    {transactionSentSuccessfully ? (
                                        <>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    flexWrap: "wrap"
                                                }}
                                            >
                                                <Button
                                                    type="primary"
                                                    style={{ marginRight: "10px" }}
                                                    onClick={() => prev()}
                                                >
                                                    Another Bulk Send
                                                </Button>
                                                <Button type="primary">
                                                    <Link to="/" className="backToHome">
                                                        Home
                                                    </Link>
                                                </Button>
                                            </Box>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                type="primary"
                                                onClick={sendBnbBtn}
                                                // loading={isLoading}
                                                style={{ margin: "auto" }}
                                            >
                                                {sendingTransaction
                                                    ? "Generating Transaction, please wait"
                                                    : `send`}
                                            </Button>
                                        </>
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
                                                    flexWrap: "wrap"
                                                }}
                                            >
                                                <Button
                                                    type="primary"
                                                    style={{ marginRight: "10px" }}
                                                    onClick={() => prev()}
                                                >
                                                    Another Bulk Send
                                                </Button>
    
                                                <Button type="primary">
                                                    <Link to="/" className="backToHome">
                                                        Home
                                                    </Link>
                                                </Button>
                                            </Box>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                type="primary"
                                                onClick={onFinishSendToken}
                                                // loading={isLoading}
                                                style={{ margin: "auto" }}
                                            >
                                                {sendingTransaction
                                                    ? "Generating Transaction, please wait"
                                                    : `send`}
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )} */}

        {/* {current > 0 && (
                        <S.PrevButton type="default" onClick={() => prev()}>
                            {t("forms.stepFormLabels.previous")}
                        </S.PrevButton>
                    )} */}
      </div>

      {/* wallet Connected */}
    </>
  );
};

export default SnipeMultiSender;
