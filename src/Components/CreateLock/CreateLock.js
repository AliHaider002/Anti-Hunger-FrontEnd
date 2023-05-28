import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import "./custom.css";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import { TextalignJustifycenter } from "iconsax-react";
import AppCtx from "../Context/MyContext";
import { currentTokenData } from "../../utils/hooks/instances";
import { getLockFeeDetails } from "../../utils/hooks/pinkLock";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  approveToken,
  LockTOkenBlockChainFun,
  LockTokenVestingFun,
  BNBLockFun,
  BnbLockVesting,
  LiquidityBlockChainFun,
  LiquidityVestingFun,
} from "../../utils/hooks/pinkLock";
import { Link } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
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
//   binancechainwallet: {
//     package: true,
//   },
// };

// provider
// const web3Modal = new Web3Modal({
//   theme: "dark",
//   network: 'mainnet', // optional
//   cacheProvider: true, // optional
//   providerOptions, // required
// });

const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      color: "White", // Change text color to blue
    },
    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
      borderColor: "#00f902",
    },
    "& .css-t97rg3-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
      {
        borderColor: "#00f902",
      },
    "& .css-t97rg3-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      {
        borderColor: "#00f902",
      },
    "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {
      color: "white !important",
    },
    "& .css-igs3ac": {
      borderColor: "#00f902 !important",
    },
    "& .css-1j67u5f.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00f902 !important",
    },
    "& .css-1j67u5f:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#00f902 !important",
    },
  },
  checkbox: {
    color: "#00f902 !important",
    "&$checked": {
      color: "#00f902 !important",
    },
  },
});

const CssTextField = styled(TextField)({
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
  // marginTop: '10px',
  height: "200px",
  "& label.Mui-focused": {
    color: "white",
    height: "50px",
  },
  "& .MuiOutlinedInput-root": {
    height: "50px",
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
      top: "-20px",
      "&:placeholder": {
        color: "red !important",
      },
    },
  },
});
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

const CreateLock = () => {
  let theme = useTheme();

  var [provider, setProvider] = useState();
  var [waltAddress, setWalletAddress] = useState();
  const [signer, setSigner] = useState({});
  const [multiSenderContract, setmultiSenderContract] = useState({});
  const [selectVal, setSelectVal] = useState("");
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const isWalletConnectedContext = useContext(AppCtx);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showError, setError] = useState("");
  const [showSuccess, setSuccess] = useState("");
  const [tokenApproved, setTokenApproved] = useState(false);
  const [isTokenLocking, setisTokenLocking] = useState(false);
  const [inValidTokenErr, setinValidTokenErr] = useState("");
  const [approvalGiven, setApprovalGiven] = useState("");
  const [isLockedSuccessfully, setLockedSuccessfully] = useState(false);
  const [isBNBLockedSuccessfully, setBNBLockedSuccessfully] = useState(false);
  const [transactionURL, setTransactionUrl] = useState("");
  const [useVesting, setUseVesting] = useState(false);
  const [isOwnerField, setownerField] = useState(false);
  const [isBNBVesting, setIsBNbVesting] = useState(false);
  const [walletAddressForLink, setWalletAddressForLink] = useState("");
  const [fields, setFields] = useState([]);
  const [copyData, setcopyData] = useState("copy");
  const [displayCopySlug, setdisplayCopySlug] = useState("none");
  const [displayOwnerField, setdisplayOwnerField] = useState("none");
  // const [isOwnerField, setownerField]= useState<boolean>(false)
  const [invalidTokenErr, setinvalidTokenErr] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [isBNBLock, setIsBNBLock] = useState(false);
  const [isLiquidityLock, setIsLiquidityLock] = useState(false);
  const [getCurrentTokenData, setCurrentTokenData] = useState([]);
  const [addressToCopy, setAddressToCopy] = useState(
    "0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5"
  );
  const [startDate, setStartDate] = useState(new Date());
  const [feeDetials, setFeeDetials] = useState(
    "connect Wallet to Check Fee Details"
  );

  const formLabels = {
    TokenAddress: "TokenAddress",
    LockTitle: "Title",
    Amount: "Amount",
    LockTime: "LockTime",
    Owner1: "Owner1",
    tgeDate: "tgeDate",
    tgePercent: "tgePercent",
    cyclePercentage: "cyclePercentage",
    CycleDays1: "CycleDays1",
    titleBNB: "titleBNB",
    Amount2BNB: "Amount2BNB",
    UnlockDateBNB: "UnlockDateBNB",
    bnbTgeDate: "bnbTgeDate",
    BNBtgePercent: "BNBtgePercent",
    BNBCycleDays1: "BNBCycleDays1",
    BNBcyclePercentage: "BNBcyclePercentage",
  };

  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [TGEDate, setTGEdate] = useState(new Date());
  const [NewUnlockDate, setNewUnlockDate] = useState(new Date());
  const [newTgePercent, setnewTgePercent] = useState("");
  const [newCycleDays, setnewCycleDays] = useState("");
  const [newCyclePercent, setnewCyclePercent] = useState("");
  const [newAnotherOnwer, setnewAnotherOnwer] = useState("");

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

  var TotalAmmount = newAmount;
  var owner = newAnotherOnwer;
  var title = newTitle;
  var lockTime = NewUnlockDate;
  var tgeDate = TGEDate;
  var tgePercent = newTgePercent;
  var CycleDays = newCycleDays;
  var cyclePercentage = newCyclePercent;
  var titleBNB = newTitle;
  var Amount2BNB = newAmount;
  var UnlockDateBNB = NewUnlockDate;
  var bnbTgeDate = TGEDate;
  var BNBtgePercent = newTgePercent;
  var BNBCycleDays1 = newCycleDays;
  var BNBcyclePercentage = newCyclePercent;

  // formValues.forEach((item, index) => {
  //   if (item.name == "titleBNB") {
  //     titleBNB = item.value;
  //   } else if (item.name == "Amount2BNB") {
  //     Amount2BNB = item.value;
  //   } else if (item.name == "UnlockDateBNB") {
  //     UnlockDateBNB = item.value;
  //   } else if (item.name == "TokenAddress") {
  //     tokenAddress = item.value;
  //   } else if (item.name == "Amount") {
  //     TotalAmmount = item.value;
  //   } else if (item.name == "Owner1") {
  //     owner = item.value;
  //   } else if (item.name == "Title") {
  //     title = item.value;
  //   } else if (item.name == "LockTime") {
  //     lockTime = item.value;
  //   } else if (item.name == "tgeDate") {
  //     tgeDate = item.value;
  //   } else if (item.name == "tgePercent") {
  //     tgePercent = item.value;
  //   } else if (item.name == "CycleDays1") {
  //     CycleDays = item.value;
  //   } else if (item.name == "cyclePercentage") {
  //     cyclePercentage = item.value;
  //   } else if (item.name == "bnbTgeDate") {
  //     bnbTgeDate = item.value;
  //   } else if (item.name == "BNBtgePercent") {
  //     BNBtgePercent = item.value;
  //   } else if (item.name == "BNBCycleDays1") {
  //     BNBCycleDays1 = item.value;
  //   } else if (item.name == "BNBcyclePercentage") {
  //     BNBcyclePercentage = item.value;
  //   }
  // });
  //
  //
  //
  //
  //

  // const connectWallet = async () => {
  //   setIsBasicModalVisible(false)
  //   try {
  //     provider = await web3Modal.connect()
  //     setProvider(provider)
  //     const instance = new ethers.providers.Web3Provider(provider)
  //

  //     var accountsAddress = await instance.listAccounts()

  //     //
  //     isWalletConnectedContext?.setIsWalletConnected(true)

  //     if (accountsAddress.length) {
  //       setWalletAddress(accountsAddress[0])
  //       //
  //       isWalletConnectedContext?.setAddress(accountsAddress[0])

  //       localStorage.setItem("walleetAddress", accountsAddress[0])

  //       // Signer
  //       const signer = instance.getSigner(accountsAddress[0]) // Contract
  //       setSigner(signer)

  //       const contract = new ethers.Contract(
  //         "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  //         panCakeSwapCaddressABI,
  //         signer
  //       )

  //       // contract of multiSender
  //       var batchTransferContract = new ethers.Contract( // "0x6F61c68C767ED16BBc69F833c6b10007666b68f4",
  //         "0xa6dbb0EA831eB8E86F7B704872c1CB44Bc379f1E",
  //         batchTransferABI,
  //         signer
  //       )

  //       setmultiSenderContract(batchTransferContract)

  //

  //       var tokenBalance = await contract.balanceOf(accountsAddress[0])
  //       tokenBalance = tokenBalance.toNumber()
  //
  //       localStorage.setItem("tokenBalance", tokenBalance)
  //     }

  //     // setStyleDis2("block")
  //     // setStyleDis1("none")

  //     //
  //   } catch (err) {
  //
  //
  //   }
  // }

  const next = async () => {
    setIsLoading(true);

    // form.validateFields().then(() => {
    //   setCurrent(current + 1);
    // });
  };

  const copyBtnFun = () => {
    navigator.clipboard.writeText("0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5");
    setcopyData("copied");

    setInterval(() => {
      setcopyData("copy");
    }, 2000);
  };

  const copyBtnMouseOver = () => {
    setdisplayCopySlug("block");
  };

  const changeTokenAddress = async (e) => {
    setinvalidTokenErr("");
    var value = e.target.value;
    setTokenAddress(value);

    if (isWalletConnectedContext?.isWalletConnected == true) {
      var currentTokenContract = await currentTokenData(value);

      if (currentTokenContract.success == false) {
        setinvalidTokenErr("invalid Token");
        setCurrentTokenData([]);
      } else {
        setCurrentTokenData(currentTokenContract.tokenData);
        setinvalidTokenErr("");
      }
    } else {
      setCurrentTokenData([]);
    }
  };

  // select Snipe Lock
  const selectSnipeLock = async (e) => {
    var selectValue = e.target.value;
    setSelectVal(selectValue);
    if (selectValue == "Token Lock") {
      isWalletConnectedContext?.setTokenLocked(true);
      isWalletConnectedContext?.setSelected(true);

      setIsBNBLock(false);
      setIsLiquidityLock(false);

      // fetching data Feedetials while selecting Services of Lock
    } else if (selectValue == "BNB Lock") {
      isWalletConnectedContext?.setTokenLocked(false);
      isWalletConnectedContext?.setSelected(true);

      setIsBNBLock(true);
      setIsLiquidityLock(false);
    } else if (selectValue == "CIC Lock") {
      isWalletConnectedContext?.setTokenLocked(false);
      isWalletConnectedContext?.setSelected(true);

      setIsBNBLock(true);
      setIsLiquidityLock(false);
    } else if (selectValue == "Liquidity Lock") {
      isWalletConnectedContext?.setTokenLocked(false);
      isWalletConnectedContext?.setSelected(true);

      setIsBNBLock(false);
      setIsLiquidityLock(true);
    }
  };

  console.log("SelectedValueSlec", selectVal);

  useEffect(() => {
    function detechInnerWidth() {
      if (window.innerWidth < 600) {
        setAddressToCopy("0x5E....4a5");
      } else {
        setAddressToCopy("0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5");
      }
    }

    setInterval(() => {
      detechInnerWidth();
    }, 2000);
  });

  // this use effect use for get fee details of PinkLock Contract
  useEffect(() => {
    const fetchLockFeeDetials = async () => {
      if (isWalletConnectedContext?.isWalletConnected == true) {
        var result = await getLockFeeDetails();
        if (result.success == true) {
          setFeeDetials(
            `Sender Fee is ${result.LockFee}  & Vest Sender Fee is ${result.vestFee}`
          );
        }
      } else {
        setFeeDetials(`Connect Wallet to Check Fee Details`);
      }
    };

    setTimeout(() => {
      fetchLockFeeDetials();
    }, 2000);
  }, [isWalletConnectedContext?.isWalletConnected]);

  // approve button
  const approveButton = async () => {
    setError("");
    setLockedSuccessfully(false);
    if (isWalletConnectedContext?.isSelectBoxSelected) {
      setTransactionUrl("");

      setinValidTokenErr("");
      setIsLoading(true);
      setIsApproved(true);
      setApprovalGiven("");

      var approvalData = await approveToken(tokenAddress, TotalAmmount);

      if (approvalData.err != "not enough Balance") {
        if (approvalData) {
          if (approvalData.err == false) {
            setTokenApproved(true);
            setIsApproved(false);
            setinValidTokenErr("");
            setApprovalGiven("Approved, you can now Lock");
          } else {
            setTokenApproved(false);
            setIsApproved(false);
            setApprovalGiven("");
            setinValidTokenErr("");
            setIsLoading(false);
          }
        }
        setIsLoading(false);

        // if not enough balance
      } else {
        setTokenApproved(false);
        setIsApproved(false);
        setApprovalGiven("");
        setinValidTokenErr(approvalData.msg);
      }

      setIsLoading(false);
      setIsApproved(false);
    } else {
      setError("Select Snip Lock First");
    }
  };

  const useVestingFunction = async (e) => {
    if (e.target.checked == true) {
      setUseVesting(true);
    } else {
      setUseVesting(false);
    }
  };

  const useBnbVestingFun = async (e) => {
    if (e.target.checked == true) {
      setIsBNbVesting(true);
    } else {
      setIsBNbVesting(false);
    }
  };

  // checkbox owner field
  const ownerCheckBox = (e) => {
    if (e.target.checked == true) {
      setownerField(true);
    } else {
      setownerField(false);

      let newArr = [];
      fields.forEach((item, index) => {
        if (item?.name === "Owner1") {
          newArr.push({ name: "Owner1", value: "" });
        } else {
          newArr.push(item);
        }
      });

      setFields(newArr);
    }
  };

  const addMaxAmmount = async () => {
    try {
      if (isWalletConnectedContext?.isWalletConnected == true) {
        const currentTokenContract = await currentTokenData(tokenAddress);

        if (currentTokenContract.success != false) {
          var tokenBalance = currentTokenContract.tokenData[1].value;

          let newArr = [];
          fields.forEach((item, index) => {
            if (item?.name === "Amount") {
              newArr.push({ name: "Amount", value: tokenBalance });
            } else {
              newArr.push(item);
            }
          });

          setFields(newArr);
        }
      }
    } catch (err) {}
  };

  // const lock token function
  const LockToken = async () => {
    try {
      setError("");
      setIsLoading(true);
      setisTokenLocking(true);
      setBNBLockedSuccessfully(false);
      setApprovalGiven("");
      var unlockDate = lockTime;
      var description = title;
      var isLpToken = false;

      //
      if (useVesting == false) {
        // token lock without Vesting
        var data = await LockTOkenBlockChainFun(
          owner,
          tokenAddress,
          isLpToken,
          TotalAmmount,
          unlockDate,
          description
        );

        if (data.success == true) {
          setTimeout(() => {
            setTransactionUrl(`/token`);
            setLockedSuccessfully(true);
            setisTokenLocking(false);
            setIsLoading(false);
            setTokenApproved(false);
          }, 10000);

          // }else if(data.success == false && data.msgID === "007"){
        } else if (data.success == false) {
          setError(data.msg);
          setisTokenLocking(false);
          setIsLoading(false);
          setTokenApproved(false);
          setLockedSuccessfully(false);
        }
        // setIsLoading(false)
      } else {
        // Token Lock Using Vesting
        var data = await LockTokenVestingFun(
          owner,
          tokenAddress,
          TotalAmmount,
          tgeDate,
          tgePercent,
          CycleDays,
          cyclePercentage,
          title
        );

        if (data.success == true) {
          setTimeout(() => {
            setLockedSuccessfully(true);
            setTransactionUrl(`/token`);
            setisTokenLocking(false);
            setIsLoading(false);
            setTokenApproved(false);
          }, 10000);
        } else {
          setisTokenLocking(false);
          setIsLoading(false);
          setTokenApproved(false);
          setLockedSuccessfully(false);
        }
      }
    } catch (err) {
      setisTokenLocking(false);
      setTokenApproved(false);
      setIsLoading(false);
    }
  };

  const LiquidityLockToken = async () => {
    try {
      setError("");
      setIsLoading(true);
      setisTokenLocking(true);
      setBNBLockedSuccessfully(false);
      setApprovalGiven("");
      var unlockDate = lockTime;
      var description = title;
      var isLpToken = false;

      //
      if (useVesting == false) {
        // token lock without Vesting
        var data = await LiquidityBlockChainFun(
          owner,
          tokenAddress,
          isLpToken,
          TotalAmmount,
          unlockDate,
          description
        );

        if (data.success == true) {
          setTimeout(() => {
            setTransactionUrl(`/token`);
            setLockedSuccessfully(true);
            setisTokenLocking(false);
            setIsLoading(false);
            setTokenApproved(false);
          }, 10000);

          // }else if(data.success == false && data.msgID === "007"){
        } else if (data.success == false) {
          setError(data.msg);
          setisTokenLocking(false);
          setIsLoading(false);
          setTokenApproved(false);
          setLockedSuccessfully(false);
        }
        // setIsLoading(false)
      } else {
        // Token Lock Using Vesting
        var data = await LiquidityVestingFun(
          owner,
          tokenAddress,
          TotalAmmount,
          tgeDate,
          tgePercent,
          CycleDays,
          cyclePercentage,
          title
        );

        if (data.success == true) {
          setTimeout(() => {
            setLockedSuccessfully(true);
            setTransactionUrl(`/token`);
            setisTokenLocking(false);
            setIsLoading(false);
            setTokenApproved(false);
          }, 10000);
        } else {
          setisTokenLocking(false);
          setIsLoading(false);
          setTokenApproved(false);
          setLockedSuccessfully(false);
        }
      }
    } catch (err) {
      setisTokenLocking(false);
      setTokenApproved(false);
      setIsLoading(false);
    }
  };

  // Lock BNB BTN Click

  const LockBNBSubmitBTN = async () => {
    try {
      setError("");
      setSuccess("");
      setIsLoading(true);
      setBNBLockedSuccessfully(false);
      setLockedSuccessfully(false);

      // var bnbTgeDate : ""
      // var BNBtgePercent : ""
      // var BNBCycleDays1 : ""
      // var BNBcyclePercentage : ""

      //

      if (isWalletConnectedContext?.isSelectBoxSelected) {
        if (isBNBVesting == false) {
          var bnbLocked = await BNBLockFun(titleBNB, Amount2BNB, UnlockDateBNB);

          if (bnbLocked.success == true) {
            setTimeout(() => {
              setWalletAddressForLink(
                isWalletConnectedContext?.isWalletAddress
              );
              setSuccess("");
              setIsLoading(false);
              setBNBLockedSuccessfully(true);
            }, 15000);
            // if user reject the transaction
          } else if (bnbLocked.success == false) {
            setError(bnbLocked.msg);
            setIsLoading(false);
            setBNBLockedSuccessfully(false);
          }

          // BNB Vesting
        } else {
          //
          //
          //
          //

          var result = await BnbLockVesting(
            titleBNB,
            Amount2BNB,
            bnbTgeDate,
            BNBtgePercent,
            BNBCycleDays1,
            BNBcyclePercentage
          );

          if (result.success == true) {
            setTimeout(() => {
              setWalletAddressForLink(isWalletConnectedContext.isWalletAddress);

              setBNBLockedSuccessfully(true);
              setSuccess("");
              setIsLoading(false);
              setError("");
            }, 20000);
          } else {
            setIsLoading(false);
            setBNBLockedSuccessfully(false);
            setError(result.msg);
          }
        }
      } else {
        setError("select Snipe Lock first");
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setChecked(event.target.checked);
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

  const backdropStyle = {
    backgroundColor: "rgba(1, 1, 1, 0.7)",
  };
  const checkboxStyle = {
    borderColor: "red", // replace with the desired color
  };
  const paperStyle = {
    backgroundColor: `${theme.palette.background.mainBg}`,
    color: "white",
    width: "40%",
    height: "auto",
    padding: "20px",
  };
  const classes = useStyles();

  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value);
  };

  const handleChangeAmountBNB = (e) => {
    setNewAmount(e.target.value);
  };
  const handleChangeTgePercent = (e) => {
    setnewTgePercent(e.target.value);
  };
  const handleChangeCycleDays = (e) => {
    setnewCycleDays(e.target.value);
  };
  const handleChangeCyclePercent = (e) => {
    setnewCyclePercent(e.target.value);
  };
  const handleChangeAnotherOnwer = (e) => {
    setnewAnotherOnwer(e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          color: theme.palette.background.default,
          padding: "20px",
          width: "100%",
        }}
      >
        <CustomFormControl
          name="stepForm"
          sx={{ width: "100%", paddingTop: "10px" }}
        >
          <Box>
            <Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "28px",
                    fontWeight: 700,
                  }}
                >
                  Snipe Lock
                </Typography>
              </Box>
            </Box>

            <Box>
              <CustomFormControl
                //   className={classes.formControl}
                sx={{
                  width: "100%",
                }}
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
                  Snipe Lock
                </Typography>
                <Select
                  value={selectVal}
                  onChange={selectSnipeLock}
                  displayEmpty
                  fullWidth
                  variant="outlined"
                >
                  <MenuItem
                    value=""
                    disabled
                    sx={{
                      color: `${theme.palette.background.default}`,
                      backgroundColor: `${theme.palette.primary.main}`,
                    }}
                  >
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem
                    value="Token Lock"
                    selected
                    sx={{
                      color: `${theme.palette.background.default}`,
                      backgroundColor: `${theme.palette.primary.main}`,
                    }}
                  >
                    Token Lock
                  </MenuItem>
                  <MenuItem
                    value={
                      isWalletConnectedContext.CurrencyNameContext
                        ? `${isWalletConnectedContext.CurrencyNameContext} Lock`
                        : "BNB Lock"
                    }
                    sx={{
                      color: `${theme.palette.background.default}`,
                      backgroundColor: `${theme.palette.primary.main}`,
                    }}
                  >
                    {isWalletConnectedContext.CurrencyNameContext
                      ? `${isWalletConnectedContext.CurrencyNameContext} Lock`
                      : "BNB Lock"}
                  </MenuItem>
                  <MenuItem
                    value="Liquidity Lock"
                    sx={{
                      color: `${theme.palette.background.default}`,
                      backgroundColor: `${theme.palette.primary.main}`,
                    }}
                  >
                    Liquidity Lock
                  </MenuItem>
                </Select>
                <Box sx={{ mt: "10px", fontSize: "12px ", fontWeight: "500" }}>
                  <span style={{ color: "#AFACAC" }}>{feeDetials}</span>
                </Box>
                {/* <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#DEE2EE",
                  }}
                >
                  Connect Wallet to Check Fee Details
                </Typography> */}
              </CustomFormControl>
            </Box>
            {isBNBLock ? (
              <>
                <CustomFormControl
                  //   className={classes.formControl}
                  sx={{
                    width: "100%",
                  }}
                  // error
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 550,
                      color: "#00f902",
                      paddingBottom: "10px",
                    }}
                  >
                    Title
                  </Typography>
                  <CssTextField
                    type="text"
                    variant="outlined"
                    placeholder="Title"
                    fullWidth
                    id="customID"
                    value={newTitle}
                    // autoComplete={false}
                    // onFocus={handleClick}
                    // autoHighlight={false}
                    onChange={handleChangeTitle}
                  />
                </CustomFormControl>
                <CustomFormControl
                  //   className={classes.formControl}
                  sx={{
                    width: "100%",
                  }}
                  // error
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 550,
                      color: "#00f902",
                      paddingBottom: "10px",
                    }}
                  >
                    Amount
                  </Typography>
                  <CssTextField
                    type="text"
                    variant="outlined"
                    placeholder="Amount"
                    fullWidth
                    id="customID"
                    // autoComplete={false}
                    value={newAmount}
                    // onFocus={handleClick}
                    // autoHighlight={false}
                    onChange={handleChangeAmountBNB}
                  />
                </CustomFormControl>
                <CustomFormControl
                  //   className={classes.formControl}
                  // error
                  sx={{
                    alignItems: "start",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",
                    paddingY: "10px",
                  }}
                >
                  <Checkbox
                    onChange={useBnbVestingFun}
                    checked={isBNBVesting}
                    classes={{
                      root: classes.checkbox,
                      checked: classes.checked,
                    }}
                  ></Checkbox>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 550,
                      color: "#00f902",
                      paddingBottom: "10px",
                    }}
                  >
                    use Vesting?
                  </Typography>
                </CustomFormControl>
                {isBNBVesting ? (
                  <>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                          <Box sx={{ position: "relative" }}>
                            <CustomFormControl
                              sx={{
                                width: "100%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "start",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: 550,
                                      color: "#00f902",
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    TGE Date (UTC Time)
                                  </Typography>
                                </Box>
                                <Box>
                                  <Tooltip disableFocusListener title="Info">
                                    <IconButton
                                      sx={{
                                        border: "1px solid white",
                                        borderRadius: "50%",
                                        width: "10px",
                                        height: "10px",
                                      }}
                                    >
                                      <QuestionMarkIcon
                                        sx={{ fontSize: "9px", color: "white" }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>

                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                  disablePast
                                  className={classes.root}
                                  defaultValue={dayjs(startDate)}
                                  onChange={(date) => {
                                    setTGEdate(date);
                                  }}
                                />
                              </LocalizationProvider>
                              {/* <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                            </CustomFormControl>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Box sx={{ position: "relative" }}>
                            <CustomFormControl
                              sx={{
                                width: "100%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "start",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: 550,
                                      color: "#00f902",
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    TGE Percent
                                  </Typography>
                                </Box>
                                <Box>
                                  <Tooltip disableFocusListener title="Info">
                                    <IconButton
                                      sx={{
                                        border: "1px solid white",
                                        borderRadius: "50%",
                                        width: "10px",
                                        height: "10px",
                                      }}
                                    >
                                      <QuestionMarkIcon
                                        sx={{ fontSize: "9px", color: "white" }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>

                              <CssTextField
                                type="text"
                                variant="outlined"
                                placeholder="EX:10"
                                fullWidth
                                id="customID"
                                // autoComplete={false}
                                // onFocus={handleClick}
                                // autoHighlight={false}
                                value={newTgePercent}
                                //onChange={handleSearchValue}
                                onChange={handleChangeTgePercent}
                              />
                            </CustomFormControl>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Box sx={{ position: "relative" }}>
                            <CustomFormControl
                              sx={{
                                width: "100%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "start",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: 550,
                                      color: "#00f902",
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    Cycle Days
                                  </Typography>
                                </Box>
                                <Box>
                                  <Tooltip disableFocusListener title="Info">
                                    <IconButton
                                      sx={{
                                        border: "1px solid white",
                                        borderRadius: "50%",
                                        width: "10px",
                                        height: "10px",
                                      }}
                                    >
                                      <QuestionMarkIcon
                                        sx={{ fontSize: "9px", color: "white" }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>

                              <CssTextField
                                type="text"
                                variant="outlined"
                                placeholder="cycle Days"
                                fullWidth
                                id="customID"
                                // autoComplete={false}
                                // onFocus={handleClick}
                                // autoHighlight={false}
                                onChange={handleChangeCycleDays}
                                value={newCycleDays}
                                //onChange={handleSearchValue}
                              />
                            </CustomFormControl>
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <Box sx={{ position: "relative" }}>
                            <CustomFormControl
                              sx={{
                                width: "100%",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "start",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: 550,
                                      color: "#00f902",
                                      paddingBottom: "10px",
                                    }}
                                  >
                                    Cycle Release Percent
                                  </Typography>
                                </Box>
                                <Box>
                                  <Tooltip disableFocusListener title="Info">
                                    <IconButton
                                      sx={{
                                        border: "1px solid white",
                                        borderRadius: "50%",
                                        width: "10px",
                                        height: "10px",
                                      }}
                                    >
                                      <QuestionMarkIcon
                                        sx={{ fontSize: "9px", color: "white" }}
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>
                              <CssTextField
                                type="text"
                                variant="outlined"
                                placeholder="EX:10"
                                fullWidth
                                id="customID"
                                // autoComplete={false}
                                // onFocus={handleClick}
                                // autoHighlight={false}
                                onChange={handleChangeCyclePercent}
                                value={newCyclePercent}
                                //onChange={handleSearchValue}
                              />
                            </CustomFormControl>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                ) : (
                  <>
                    <CustomFormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 550,
                          color: "#00f902",
                          paddingBottom: "10px",
                        }}
                      >
                        Unlock Date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          disablePast
                          className={classes.root}
                          defaultValue={dayjs(startDate)}
                          onChange={(date) => {
                            setNewUnlockDate(date);
                          }}
                        />
                      </LocalizationProvider>
                      {/* <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                    </CustomFormControl>
                  </>
                )}
              </>
            ) : (
              <>
                {isLiquidityLock ? (
                  <>
                    <Box>
                      <CustomFormControl
                        //   className={classes.formControl}
                        sx={{
                          width: "100%",
                        }}
                        error
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 550,
                            color: "#00f902",
                            paddingBottom: "10px",
                            paddingTop: "10px",
                          }}
                        >
                          Token or LP Token address
                        </Typography>
                        <CssTextField
                          type="text"
                          variant="outlined"
                          placeholder="Token address"
                          onChange={changeTokenAddress}
                          fullWidth
                          id="customID"
                          // autoComplete={false}
                          // onFocus={handleClick}
                          // autoHighlight={false}
                          //onChange={handleSearchValue}
                        />
                      </CustomFormControl>
                    </Box>
                    <Box>
                      <Typography style={{ color: "red", fontSize: "14px" }}>
                        {invalidTokenErr}
                        {/* invalid Token */}
                      </Typography>
                    </Box>
                    <Box>
                      {getCurrentTokenData.map((item, index) => {
                        return (
                          <Box
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              fontSize: "12px",
                              margin: "5px,0px",
                              borderBottom: "1px solid #5c5c5c",
                              padding: "10px 10px",
                            }}
                          >
                            <Typography
                              key={index + 1}
                              sx={{
                                fontSize: "14px",
                                fontWeight: 550,
                                color: "#00f902",
                                paddingBottom: "10px",
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              key={index + 2}
                              sx={{
                                fontSize: "14px",
                                fontWeight: 550,
                                color: "#00f902",
                                paddingBottom: "10px",
                              }}
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                    <CustomFormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "end",
                        }}
                      >
                        <Checkbox
                          checked={isOwnerField}
                          onChange={ownerCheckBox}
                          inputProps={{ "aria-label": "controlled" }}
                          classes={{
                            root: classes.checkbox,
                            checked: classes.checked,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#00f902",
                            paddingBottom: "10px",
                            marginLeft: "5px",
                          }}
                        >
                          use another owner?
                        </Typography>
                      </Box>
                    </CustomFormControl>
                    {isOwnerField ? (
                      <>
                        <CustomFormControl
                          sx={{
                            display: "flex",
                            width: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#00f902",
                              paddingBottom: "10px",
                              marginLeft: "5px",
                            }}
                          >
                            owner
                          </Typography>
                          <CssTextField
                            type="text"
                            variant="outlined"
                            placeholder="Enter Owner Address"
                            onChange={changeTokenAddress}
                            fullWidth
                            id="customID"
                            // autoComplete={false}
                            // onFocus={handleClick}
                            // autoHighlight={false}
                            //onChange={handleSearchValue}
                          />
                        </CustomFormControl>
                        <span style={{ fontSize: "10px", color: "#00f902" }}>
                          the address you input here will be receive the tokens
                          once they are unlocked
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <Box>
                      <CustomFormControl
                        sx={{ paddingTop: "10px", width: "100%" }}
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
                          <span style={{ color: "red" }}>*</span> Title
                        </Typography>
                        <CssTextField
                          type="text"
                          variant="outlined"
                          placeholder="Ex My Lock"
                          fullWidth
                          id="customID"
                          // autoComplete={false}
                          // onFocus={handleClick}
                          // autoHighlight={false}
                          onChange={handleChangeTitle}
                          value={newTitle}
                        />
                      </CustomFormControl>
                    </Box>
                    <Box>
                      <CustomFormControl
                        sx={{ paddingTop: "10px", width: "100%" }}
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
                          <span style={{ color: "red" }}>*</span> Amount
                        </Typography>
                        <CssTextField
                          type="text"
                          variant="outlined"
                          placeholder="Enter Amount"
                          fullWidth
                          id="customID"
                          // autoComplete={false}
                          // onFocus={handleClick}
                          // autoHighlight={false}
                          onChange={handleChangeAmountBNB}
                          value={newAmount}
                        />
                      </CustomFormControl>
                      {/* <Button
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "59px",
                      right: "-20px",
                      transform: "translate(-50%,-50%)",
                      color: `${theme.palette.background.default}`,
                    }}
                    onClick={addMaxAmmount}
                  >
                    MAX
                  </Button> */}
                    </Box>
                    <CustomFormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "end",
                        }}
                      >
                        <Checkbox
                          checked={useVesting}
                          onChange={useVestingFunction}
                          inputProps={{ "aria-label": "controlled" }}
                          classes={{
                            root: classes.checkbox,
                            checked: classes.checked,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 550,
                            color: "#00f902",
                            paddingBottom: "10px",
                          }}
                        >
                          use Vesting?
                        </Typography>
                      </Box>
                    </CustomFormControl>
                    {useVesting ? (
                      <>
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                              <Box sx={{ position: "relative" }}>
                                <CustomFormControl
                                  sx={{
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "start",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: 550,
                                          color: "#00f902",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        TGE Date (UTC time)
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Tooltip
                                        disableFocusListener
                                        title="Info"
                                      >
                                        <IconButton
                                          sx={{
                                            border: "1px solid white",
                                            borderRadius: "50%",
                                            width: "10px",
                                            height: "10px",
                                          }}
                                        >
                                          <QuestionMarkIcon
                                            sx={{
                                              fontSize: "9px",
                                              color: "white",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>

                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DateTimePicker
                                      disablePast
                                      className={classes.root}
                                      defaultValue={dayjs(startDate)}
                                      onChange={(date) => {
                                        setTGEdate(date);
                                      }}
                                    />
                                  </LocalizationProvider>
                                  {/* <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                                </CustomFormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <Box sx={{ position: "relative" }}>
                                <CustomFormControl
                                  sx={{
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "start",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: 550,
                                          color: "#00f902",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        TGE Percent
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Tooltip
                                        disableFocusListener
                                        title="Info"
                                      >
                                        <IconButton
                                          sx={{
                                            border: "1px solid white",
                                            borderRadius: "50%",
                                            width: "10px",
                                            height: "10px",
                                          }}
                                        >
                                          <QuestionMarkIcon
                                            sx={{
                                              fontSize: "9px",
                                              color: "white",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>

                                  <CssTextField
                                    type="text"
                                    variant="outlined"
                                    placeholder="EX:10"
                                    fullWidth
                                    id="customID"
                                    // autoComplete={false}
                                    // onFocus={handleClick}
                                    // autoHighlight={false}
                                    onChange={handleChangeTgePercent}
                                    value={newTgePercent}
                                  />
                                </CustomFormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <Box sx={{ position: "relative" }}>
                                <CustomFormControl
                                  sx={{
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "start",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: 550,
                                          color: "#00f902",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        Cycle Days
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Tooltip
                                        disableFocusListener
                                        title="Info"
                                      >
                                        <IconButton
                                          sx={{
                                            border: "1px solid white",
                                            borderRadius: "50%",
                                            width: "10px",
                                            height: "10px",
                                          }}
                                        >
                                          <QuestionMarkIcon
                                            sx={{
                                              fontSize: "9px",
                                              color: "white",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>

                                  <CssTextField
                                    type="text"
                                    variant="outlined"
                                    placeholder="EX:10"
                                    fullWidth
                                    id="customID"
                                    // autoComplete={false}
                                    // onFocus={handleClick}
                                    // autoHighlight={false}
                                    onChange={handleChangeCycleDays}
                                    value={newCycleDays}
                                  />
                                </CustomFormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <Box sx={{ position: "relative" }}>
                                <CustomFormControl
                                  sx={{
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "start",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: 550,
                                          color: "#00f902",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        Cycle Release Percent
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Tooltip
                                        disableFocusListener
                                        title="Info"
                                      >
                                        <IconButton
                                          sx={{
                                            border: "1px solid white",
                                            borderRadius: "50%",
                                            width: "10px",
                                            height: "10px",
                                          }}
                                        >
                                          <QuestionMarkIcon
                                            sx={{
                                              fontSize: "9px",
                                              color: "white",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>

                                  <CssTextField
                                    type="text"
                                    variant="outlined"
                                    placeholder="EX:10"
                                    fullWidth
                                    id="customID"
                                    // autoComplete={false}
                                    // onFocus={handleClick}
                                    // autoHighlight={false}
                                    onChange={handleChangeCyclePercent}
                                    value={newCyclePercent}
                                  />
                                </CustomFormControl>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    ) : (
                      <>
                        <CustomFormControl>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 550,
                              color: "#00f902",
                              paddingBottom: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            Lock until (UTC Time)
                          </Typography>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              disablePast
                              className={classes.root}
                              defaultValue={dayjs(startDate)}
                              onChange={(date) => {
                                setNewUnlockDate(date);
                              }}
                            />
                          </LocalizationProvider>
                          {/* <input
                                    type="date"
                                    onChange={(date) => setStartDate(date)}
                                    defaultValue={startDate}
                                    style={{
                                        width: '30%',
                                        height: '26px',
                                        backgroundColor: '#25284B',
                                        color: '#9292a0',
                                        border: '1px solid #a9a9a9',
                                        borderRadius: '25px',
                                        fontSize: '16px',
                                        padding: '11.4px 11px',
                                    }}
                                ></input> */}
                          {/* <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                        </CustomFormControl>
                      </>
                    )}
                    {/* <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 550,
                      color: "#00f902",
                      paddingBottom: "10px"
                    }}
                  >
                    Lock until (UTC Time)
                  </Typography>



                </Box> */}
                    <Box
                      sx={
                        {
                          // padding: "20px 5px"
                        }
                      }
                    >
                      <Grid
                        sx={{
                          paddingTop: "10px",
                          // width: "20%",
                        }}
                      >
                        <Box
                          sx={{
                            padding: "5px",

                            borderRadius: "5px",
                            // paddingLeft: "10px",
                            // paddingTop: "5px",
                            textAlign: "left",
                            backgroundImage:
                              "linear-gradient(to right, #00F902, black)",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 500,
                              color: "#DEE2EE",
                              // whiteSpace: "nowrap",
                              // overflow: "hidden",
                              // textOverflow: "ellipsis"
                            }}
                          >
                            Please exclude {addressToCopy}{" "}
                            <Button
                              sx={{
                                margin: "0px",
                                padding: "0px",
                                width: "1px",
                                color: "white",
                              }}
                              onClick={copyBtnFun}
                              onMouseOver={copyBtnMouseOver}
                            >
                              <ContentCopyIcon />
                            </Button>{" "}
                            from fees, rewards, max tx amount to start sending
                            tokens
                          </Typography>
                        </Box>
                      </Grid>
                      {/* <div
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      paddingLeft: "10px",
                      paddingTop: "5px",
                      textAlign: "left",
                      backgroundImage: "linear-gradient(to right, #00F902, black)",
                    }}
                  >
                    {/* <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#DEE2EE",
                      }}
                    >
                      Please exclude 0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5 <ContentCopyIcon onClick={copyBtnFun} /> from fees, rewards, max tx amount to start sending tokens
                    </Typography> 
                  </div> */}
                    </Box>
                    {/* <Box
                  sx={{
                    textAlign: "center",
                    paddingBottom: "10px"
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      border: `1px solid ${theme.palette.background.hoverColor}`,
                      borderRadius: "5px",
                      height: "50px",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                        // color: "blue",
                        // borderColor: "blue",
                      },
                    }}
                  >
                    Lock
                  </Button>
                </Box> */}
                  </>
                ) : (
                  <>
                    <Box>
                      <CustomFormControl
                        //   className={classes.formControl}
                        sx={{
                          width: "100%",
                        }}
                        error
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 550,
                            color: "#00f902",
                            paddingBottom: "10px",
                            paddingTop: "10px",
                          }}
                        >
                          Token or LP Token address
                        </Typography>
                        <CssTextField
                          type="text"
                          variant="outlined"
                          placeholder="Token or LP Token address"
                          onChange={changeTokenAddress}
                          fullWidth
                          id="customID"
                          // autoComplete={false}
                          // onFocus={handleClick}
                          // autoHighlight={false}
                          //onChange={handleSearchValue}
                        />
                      </CustomFormControl>
                    </Box>
                    <Box>
                      <Typography style={{ color: "red", fontSize: "14px" }}>
                        {invalidTokenErr}
                        {/* invalid Token */}
                      </Typography>
                    </Box>
                    <Box>
                      {getCurrentTokenData.map((item, index) => {
                        return (
                          <Box
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              flexWrap: "wrap",
                              fontSize: "12px",
                              margin: "5px,0px",
                              borderBottom: "1px solid #5c5c5c",
                              padding: "10px 10px",
                            }}
                          >
                            <Typography
                              key={index + 1}
                              sx={{
                                fontSize: "14px",
                                fontWeight: 550,
                                color: "#00f902",
                                paddingBottom: "10px",
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              key={index + 2}
                              sx={{
                                fontSize: "14px",
                                fontWeight: 550,
                                color: "#00f902",
                                paddingBottom: "10px",
                              }}
                            >
                              {item.value}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                    <CustomFormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "end",
                        }}
                      >
                        <Checkbox
                          checked={isOwnerField}
                          onChange={ownerCheckBox}
                          inputProps={{ "aria-label": "controlled" }}
                          classes={{
                            root: classes.checkbox,
                            checked: classes.checked,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "#00f902",
                            paddingBottom: "10px",
                            marginLeft: "5px",
                          }}
                        >
                          use another owner?
                        </Typography>
                      </Box>
                    </CustomFormControl>
                    {isOwnerField ? (
                      <>
                        <CustomFormControl
                          sx={{
                            display: "flex",
                            width: "100%",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 500,
                              color: "#00f902",
                              paddingBottom: "10px",
                              marginLeft: "5px",
                            }}
                          >
                            owner
                          </Typography>
                          <CssTextField
                            type="text"
                            variant="outlined"
                            placeholder="Enter Owner Address"
                            onChange={changeTokenAddress}
                            fullWidth
                            id="customID"
                            // autoComplete={false}
                            // onFocus={handleClick}
                            // autoHighlight={false}
                            //onChange={handleSearchValue}
                          />
                        </CustomFormControl>
                        <span style={{ fontSize: "10px", color: "#00f902" }}>
                          the address you input here will be receive the tokens
                          once they are unlocked
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <Box>
                      <CustomFormControl
                        sx={{ paddingTop: "10px", width: "100%" }}
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
                          <span style={{ color: "red" }}>*</span> Title
                        </Typography>
                        <CssTextField
                          type="text"
                          variant="outlined"
                          placeholder="Ex My Lock"
                          fullWidth
                          id="customID"
                          // autoComplete={false}
                          // onFocus={handleClick}
                          // autoHighlight={false}
                          onChange={handleChangeTitle}
                          value={newTitle}
                        />
                      </CustomFormControl>
                    </Box>
                    <Box>
                      <CustomFormControl
                        sx={{ paddingTop: "10px", width: "100%" }}
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
                          <span style={{ color: "red" }}>*</span> Amount
                        </Typography>
                        <CssTextField
                          type="text"
                          variant="outlined"
                          placeholder="Enter Amount"
                          fullWidth
                          id="customID"
                          // autoComplete={false}
                          // onFocus={handleClick}
                          // autoHighlight={false}
                          onChange={handleChangeAmountBNB}
                          value={newAmount}
                        />
                      </CustomFormControl>
                      {/* <Button
                    sx={{
                      fontWeight: "bold",
                      position: "absolute",
                      top: "59px",
                      right: "-20px",
                      transform: "translate(-50%,-50%)",
                      color: `${theme.palette.background.default}`,
                    }}
                    onClick={addMaxAmmount}
                  >
                    MAX
                  </Button> */}
                    </Box>
                    <CustomFormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "end",
                        }}
                      >
                        <Checkbox
                          checked={useVesting}
                          onChange={useVestingFunction}
                          inputProps={{ "aria-label": "controlled" }}
                          classes={{
                            root: classes.checkbox,
                            checked: classes.checked,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: 550,
                            color: "#00f902",
                            paddingBottom: "10px",
                          }}
                        >
                          use Vesting?
                        </Typography>
                      </Box>
                    </CustomFormControl>
                    {useVesting ? (
                      <>
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6}>
                              <Box sx={{ position: "relative" }}>
                                <CustomFormControl
                                  sx={{
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "start",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: 550,
                                          color: "#00f902",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        TGE Date (UTC time)
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Tooltip
                                        disableFocusListener
                                        title="Info"
                                      >
                                        <IconButton
                                          sx={{
                                            border: "1px solid white",
                                            borderRadius: "50%",
                                            width: "10px",
                                            height: "10px",
                                          }}
                                        >
                                          <QuestionMarkIcon
                                            sx={{
                                              fontSize: "9px",
                                              color: "white",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DateTimePicker
                                      disablePast
                                      className={classes.root}
                                      defaultValue={dayjs(startDate)}
                                      onChange={(date) => {
                                        setTGEdate(date);
                                      }}
                                    />
                                  </LocalizationProvider>
                                  {/* <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                                </CustomFormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <Box sx={{ position: "relative" }}>
                                <CustomFormControl
                                  sx={{
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "start",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: 550,
                                          color: "#00f902",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        TGE Percent
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Tooltip
                                        disableFocusListener
                                        title="Info"
                                      >
                                        <IconButton
                                          sx={{
                                            border: "1px solid white",
                                            borderRadius: "50%",
                                            width: "10px",
                                            height: "10px",
                                          }}
                                        >
                                          <QuestionMarkIcon
                                            sx={{
                                              fontSize: "9px",
                                              color: "white",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>
                                  <CssTextField
                                    type="text"
                                    variant="outlined"
                                    placeholder="EX:10"
                                    fullWidth
                                    id="customID"
                                    // autoComplete={false}
                                    // onFocus={handleClick}
                                    // autoHighlight={false}
                                    onChange={handleChangeTgePercent}
                                    value={newTgePercent}
                                  />
                                </CustomFormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <Box sx={{ position: "relative" }}>
                                <CustomFormControl
                                  sx={{
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "start",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: 550,
                                          color: "#00f902",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        Cycle Days
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Tooltip
                                        disableFocusListener
                                        title="Info"
                                      >
                                        <IconButton
                                          sx={{
                                            border: "1px solid white",
                                            borderRadius: "50%",
                                            width: "10px",
                                            height: "10px",
                                          }}
                                        >
                                          <QuestionMarkIcon
                                            sx={{
                                              fontSize: "9px",
                                              color: "white",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>
                                  <CssTextField
                                    type="text"
                                    variant="outlined"
                                    placeholder="EX:10"
                                    fullWidth
                                    id="customID"
                                    // autoComplete={false}
                                    // onFocus={handleClick}
                                    // autoHighlight={false}
                                    onChange={handleChangeCycleDays}
                                    value={newCycleDays}
                                  />
                                </CustomFormControl>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                              <Box sx={{ position: "relative" }}>
                                <CustomFormControl
                                  sx={{
                                    width: "100%",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "start",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Box>
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: 550,
                                          color: "#00f902",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        Cycle Release Percent
                                      </Typography>
                                    </Box>
                                    <Box>
                                      <Tooltip
                                        disableFocusListener
                                        title="Info"
                                      >
                                        <IconButton
                                          sx={{
                                            border: "1px solid white",
                                            borderRadius: "50%",
                                            width: "10px",
                                            height: "10px",
                                          }}
                                        >
                                          <QuestionMarkIcon
                                            sx={{
                                              fontSize: "9px",
                                              color: "white",
                                            }}
                                          />
                                        </IconButton>
                                      </Tooltip>
                                    </Box>
                                  </Box>
                                  <CssTextField
                                    type="text"
                                    variant="outlined"
                                    placeholder="EX:10"
                                    fullWidth
                                    id="customID"
                                    // autoComplete={false}
                                    // onFocus={handleClick}
                                    // autoHighlight={false}
                                    onChange={handleChangeCyclePercent}
                                    value={newCyclePercent}
                                  />
                                </CustomFormControl>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </>
                    ) : (
                      <>
                        <CustomFormControl>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 550,
                              color: "#00f902",
                              paddingBottom: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            Lock until (UTC Time)
                          </Typography>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              disablePast
                              className={classes.root}
                              defaultValue={dayjs(startDate)}
                              onChange={(date) => {
                                setNewUnlockDate(date);
                              }}
                            />
                          </LocalizationProvider>
                          {/* <input
                                    type="date"
                                    onChange={(date) => setStartDate(date)}
                                    defaultValue={startDate}
                                    style={{
                                        width: '30%',
                                        height: '26px',
                                        backgroundColor: '#25284B',
                                        color: '#9292a0',
                                        border: '1px solid #a9a9a9',
                                        borderRadius: '25px',
                                        fontSize: '16px',
                                        padding: '11.4px 11px',
                                    }}
                                ></input> */}
                          {/* <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                        </CustomFormControl>
                      </>
                    )}
                    {/* <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 550,
                      color: "#00f902",
                      paddingBottom: "10px"
                    }}
                  >
                    Lock until (UTC Time)
                  </Typography>



                </Box> */}
                    <Box
                      sx={
                        {
                          // padding: "20px 5px"
                        }
                      }
                    >
                      <Grid
                        sx={{
                          paddingTop: "10px",
                          // width: "20%",
                        }}
                      >
                        <Box
                          sx={{
                            padding: "5px",

                            borderRadius: "5px",
                            // paddingLeft: "10px",
                            // paddingTop: "5px",
                            textAlign: "left",
                            backgroundImage:
                              "linear-gradient(to right, #00F902, black)",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 500,
                              color: "#DEE2EE",
                              // whiteSpace: "nowrap",
                              // overflow: "hidden",
                              // textOverflow: "ellipsis"
                            }}
                          >
                            Please exclude {addressToCopy}{" "}
                            <Button
                              sx={{
                                margin: "0px",
                                padding: "0px",
                                width: "1px",
                                color: "white",
                              }}
                              onClick={copyBtnFun}
                              onMouseOver={copyBtnMouseOver}
                            >
                              <ContentCopyIcon />
                            </Button>{" "}
                            from fees, rewards, max tx amount to start sending
                            tokens
                          </Typography>
                        </Box>
                      </Grid>
                      {/* <div
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      paddingLeft: "10px",
                      paddingTop: "5px",
                      textAlign: "left",
                      backgroundImage: "linear-gradient(to right, #00F902, black)",
                    }}
                  >
                    {/* <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#DEE2EE",
                      }}
                    >
                      Please exclude 0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5 <ContentCopyIcon onClick={copyBtnFun} /> from fees, rewards, max tx amount to start sending tokens
                    </Typography> 
                  </div> */}
                    </Box>
                    {/* <Box
                  sx={{
                    textAlign: "center",
                    paddingBottom: "10px"
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      border: `1px solid ${theme.palette.background.hoverColor}`,
                      borderRadius: "5px",
                      height: "50px",
                      backgroundColor: "transparent",
                      "&:hover": {
                        backgroundColor: "transparent",
                        // color: "blue",
                        // borderColor: "blue",
                      },
                    }}
                  >
                    Lock
                  </Button>
                </Box> */}
                  </>
                )}
              </>
            )}
          </Box>

          <Typography
            style={{
              color: "red",
              textAlign: "center",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            {" "}
            {inValidTokenErr}{" "}
          </Typography>
          <Typography
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            {" "}
            {approvalGiven}{" "}
          </Typography>

          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            {/* LinkTo current Locked Token */}

            <Link
              to={
                selectVal === "Token Lock"
                  ? `/token/detail/${tokenAddress}`
                  : selectVal === "Liquidity Lock"
                  ? `/liqudity/detail/${tokenAddress}`
                  : ""
              }
              style={{ color: "rgb(0, 249, 2)" }}
            >
              {isLockedSuccessfully ? (
                <>
                  {useVesting
                    ? "Vested successfully, Check Here"
                    : `locked Successfully, Check Here`}
                </>
              ) : (
                ""
              )}
            </Link>

            {/* bnb lcoked Message */}
            <Link
              to={`/bnb/detail/${walletAddressForLink}`}
              style={{ color: "rgb(0, 249, 2)" }}
            >
              {isBNBLockedSuccessfully ? (
                <>
                  {isBNBVesting
                    ? "Vested successfully, Check Here"
                    : `locked Successfully, Check Here`}
                </>
              ) : (
                ""
              )}
            </Link>
          </p>

          <p
            style={{
              color: "red",
              fontSize: "14px",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {showError ? showError : ""}
          </p>

          {isWalletConnectedContext?.isWalletConnected ? (
            <>
              {isWalletConnectedContext?.isTokenLocked ? (
                <>
                  {tokenApproved ? (
                    <>
                      <Button
                        onClick={LockToken}
                        sx={{
                          margin: "auto",
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
                        // loading={isLoading}
                      >
                        {isTokenLocking ? (
                          <>
                            <CircularProgress
                              size={25}
                              sx={{
                                color: `${theme.palette.background.hoverColor}`,
                              }}
                            />{" "}
                            <span style={{ marginLeft: "10px" }}>Locking</span>{" "}
                          </>
                        ) : (
                          "Lock"
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      {isLockedSuccessfully ? (
                        <>
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Link
                              to={`/`}
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              <Button type="primary" style={{ margin: "auto" }}>
                                HOME
                              </Button>
                            </Link>

                            <Button
                              sx={{
                                marginLeft: "5px",
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
                              onClick={() => {
                                setLockedSuccessfully(false);
                              }}
                            >
                              ANOTHER LOCK
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            onClick={approveButton}
                            variant="outlined"
                            // loading={isLoading}
                            sx={{
                              border: `1px solid ${theme.palette.background.hoverColor}`,
                              borderRadius: "5px",
                              height: "50px",
                              backgroundColor: "transparent",
                              color: `${theme.palette.background.default}`,
                              "&:hover": {
                                backgroundColor: "transparent",
                                border: `1px solid ${theme.palette.background.hoverColor}`,
                                // color: "blue",
                                // borderColor: "blue",
                              },
                            }}
                          >
                            {isApproved ? (
                              <>
                                <CircularProgress
                                  size={25}
                                  sx={{
                                    color: `${theme.palette.background.hoverColor}`,
                                  }}
                                />{" "}
                                <span style={{ marginLeft: "10px" }}>
                                  Approving
                                </span>{" "}
                              </>
                            ) : (
                              `Approve`
                            )}
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {isWalletConnectedContext.isWalletConnected ? (
                    <>
                      {/* lock BNB Button */}

                      {isBNBLockedSuccessfully ? (
                        <>
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                          >
                            <Link
                              to={`/`}
                              style={{ color: "white", textDecoration: "none" }}
                            >
                              <Button type="primary" style={{ margin: "auto" }}>
                                HOME
                              </Button>
                            </Link>
                            <Button
                              type="primary"
                              sx={{
                                marginLeft: "5px",
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
                              onClick={() => {
                                setBNBLockedSuccessfully(false);
                              }}
                            >
                              ANOTHER LOCK
                            </Button>
                          </Box>
                        </>
                      ) : (
                        <>
                          {isLiquidityLock ? (
                            <>
                              <Button
                                onClick={LiquidityLockToken}
                                sx={{
                                  margin: "auto",
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
                                // loading={isLoading}
                              >
                                {isTokenLocking ? (
                                  <>
                                    <CircularProgress
                                      size={25}
                                      sx={{
                                        color: `${theme.palette.background.hoverColor}`,
                                      }}
                                    />{" "}
                                    <span style={{ marginLeft: "10px" }}>
                                      Locking
                                    </span>{" "}
                                  </>
                                ) : (
                                  "Lock"
                                )}
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                onClick={LockBNBSubmitBTN}
                                sx={{
                                  margin: "auto",
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
                                // loading={isLoading}
                              >
                                {isLoading ? (
                                  <>
                                    {
                                      <CircularProgress
                                        size={25}
                                        sx={{
                                          color:
                                            theme.palette.background.hoverColor,
                                        }}
                                      />
                                    }{" "}
                                    <span style={{ marginLeft: "10px" }}>
                                      Locking BNB
                                    </span>
                                  </>
                                ) : (
                                  "Lock BNB"
                                )}
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {/* lock BNB Button */}

                      <Button
                        sx={{
                          margin: "auto",
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
                        // loading={isLoading}
                      >
                        Lock BNB
                      </Button>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {isWalletConnectedContext?.isTokenLocked ? (
                <>
                  <Button
                    sx={{
                      margin: "auto",
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
                    onClick={() => setIsBasicModalVisible(true)}
                  >
                    Lock
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      margin: "auto",
                      border: `1px solid ${theme.palette.background.hoverColor}`,
                      borderRadius: "5px",
                      height: "50px",
                      backgroundColor: "transparent",
                      color: `${theme.palette.background.default}`,
                      marginBottom: "10px",
                      "&:hover": {
                        backgroundColor: "transparent",
                        // color: "blue",
                        // borderColor: "blue",
                      },
                    }}
                    onClick={() => setIsBasicModalVisible(true)}
                  >
                    Lock BNB
                  </Button>
                  <Dialog
                    open={IsBasicModalVisible}
                    onClose={() => setIsBasicModalVisible(false)}
                    BackdropProps={{ style: backdropStyle }}
                    PaperProps={{ style: paperStyle }}
                  >
                    <DialogTitle></DialogTitle>
                    <DialogContent>
                      <Typography>
                        Oopss Wallet is not Connected......
                      </Typography>
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
                </>
              )}
            </>
          )}

          {/* <Modal
        centered
        visible={IsBasicModalVisible}
        onOk={() => setIsBasicModalVisible(false)}
        onCancel={() => setIsBasicModalVisible(false)}
        size="medium"
        className="warningModel"
      >
        {/* <BaseForm.Item
          name="Oops"
          // rules={[{ message: t('forms.stepFormLabels.loginError') }]}
          style={{ fontSize: '20px', textAlign: 'center', margin: '0px' }}
        >
          {/* {t('Oops Wallet Not Connected')} 
        </BaseForm.Item>
      </Modal> */}
        </CustomFormControl>
      </Box>
    </>
  );
};

export default CreateLock;
