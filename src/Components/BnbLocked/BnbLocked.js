import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { getTokenByID } from "../../utils/APIs/apis";
import {
  approveToken,
  LockTOkenBlockChainFun,
  LockTokenVestingFun,
  BNBLockFun,
  BnbLockVesting,
} from "../../utils/hooks/pinkLock";
import { unLockToken, transferLockOwnerShip } from "../../utils/hooks/pinkLock";
import AppCtx from "../Context/MyContext";
import { Link, useParams } from "react-router-dom";
import {
  getAllTokensByChainID,
  getMyLockedTokens,
} from "../../utils/APIs/apis";
import { filterTokenByTokenAddress } from "../../utils/APIs/apis";
import Step1 from "./Step1";
import { filterLockedBNB } from "../../utils/APIs/apis";

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
      top: "-20px",
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
  },
}));

const BnbLocked = () => {
  const _id = useParams();
  const isWalletConnectedContext = useContext(AppCtx);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
  const [returnedTokensData, setReturnedTokensData] = useState([]);
  // const [form] = useForm()
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
  const [isTokenUnLocked, setIsTokenUnLocked] = useState(false);
  const [currentTokenAddress, setCurrentTOkenAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTokenState, setCurrentTokenState] = useState("");
  const [currentdataDBID, setCurrentDataDBID] = useState("");
  const [getunLockUnixTimeStamp, setUnlockUnixTimeStamp] = useState();
  const [unLockID, setUnLockID] = useState();
  const [page, setPage] = useState(1);
  const [itemLength, setitemLength] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [noData, setnoData] = useState("");
  const [tokenThatILocked, setTokensThatIlocked] = useState([]);
  const [allLockedToken, setAllLockedToken] = useState(false);
  const [boldBtn1, setBoldBtn1] = useState(true);
  const [boldBtn2, setBoldBtn2] = useState(false);
  const [isMyLockTokens, setIsMyLockTokens] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [searchFieldLength, setsearchFieldLength] = useState(0);

  const { t } = useTranslation();

  const formLabels = {
    TokenAddress: t("TokenAddress"),
    LockTitle: t("Title"),
    Amount: t("Amount"),
    LockTime: t("LockTime"),
    Owner1: t("Owner1"),
    tgeDate: t("tgeDate"),
    tgePercent: t("tgePercent"),
    cyclePercentage: t("cyclePercentage"),
    CycleDays1: t("CycleDays1"),
    titleBNB: t("titleBNB"),
    Amount2BNB: t("Amount2BNB"),
    UnlockDateBNB: t("UnlockDateBNB"),
    bnbTgeDate: t("bnbTgeDate"),
    BNBtgePercent: t("BNBtgePercent"),
    BNBCycleDays1: t("BNBCycleDays1"),
    BNBcyclePercentage: t("BNBcyclePercentage"),
  };

  var tokenAddress = "";
  var TotalAmmount = "";
  var owner = "";
  var title = "";
  var lockTime = "";
  var tgeDate = "";
  var tgePercent = "";
  var CycleDays = "";
  var cyclePercentage = "";
  var titleBNB = "";
  var Amount2BNB = "";
  var UnlockDateBNB = "";

  var bnbTgeDate = "";
  var BNBtgePercent = "";
  var BNBCycleDays1 = "";
  var BNBcyclePercentage = "";

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

  const handleChange = async (event, value) => {
    setReturnedTokensData([]);
    setPage(value);
    setLoading(true);
    var pageNum = value;
    var tokensData = await getAllTokensByChainID(pageNum);

    if (tokensData.success == true) {
      setReturnedTokensData(tokensData.data);
      setTotalPages(tokensData.totalPages);
      setitemLength(tokensData.itemLength);

      setLoading(false);
    }
  };

  // handle my lock pagination
  const handleChange2 = async (event, value) => {
    setTokensThatIlocked([]);
    setPage(value);
    setLoading(true);
    var pageNum = value;
    const myLockedTokens = await getMyLockedTokens(pageNum);

    if (myLockedTokens.success == true) {
      setTokensThatIlocked(myLockedTokens.data);
      setitemLength(myLockedTokens.itemLength);
      setTotalPages(myLockedTokens.totalPages);
      setLoading(false);
    }
  };

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

  const unLockBTN = async () => {
    try {
      setIsLoading(true);
      var currentTokenID = _id._id;

      var tokenAddress = _id.tokenobj;

      //
      //
      var unLockData = await unLockToken(currentTokenID, tokenAddress);

      if (unLockData.success == true) {
        // setTimeout(() => {
        //   navigate(`/token/detail/${tokenAddress}/${currentTokenID}`);
        // }, 5000);
        setIsLoading(false);
        setIsTokenUnLocked(true);
        getCurrentTokenData();
      } else {
        setIsTokenUnLocked(false);
        setIsLoading(false);
      }
    } catch (err) {}
  };

  const myLockFun = async () => {
    // setTokensThatIlocked([])
    setTokensThatIlocked([]);
    setReturnedTokensData([]);
    setLoading(true);
    setAllLockedToken(true);
    setBoldBtn1(false);
    setBoldBtn2(true);
    setIsMyLockTokens(false);
    setPage(1);

    var pageNum = 1;
    const myLockedTokens = await getMyLockedTokens(pageNum);

    if (myLockedTokens.success == true) {
      if (myLockedTokens.data.length > 0) {
        setTokensThatIlocked(myLockedTokens.data);
        setitemLength(myLockedTokens.itemLength);
        setTotalPages(myLockedTokens.totalPages);
        setLoading(false);
      } else {
        setnoData("no data found");
        setLoading(false);
      }
    } else {
      setLoading(false);
      setnoData("no data found");
      setitemLength(0);
    }
  };

  const searchDataByAddress = async (e) => {
    try {
      var value = e.target.value;
      setsearchFieldLength(value.length);

      var result = await filterTokenByTokenAddress(value);

      if (result.success == true) {
        setFilteredData(result.data);
      } else {
        setFilteredData([]);
      }
    } catch (err) {}
  };

  const getCurrentTokenData = async () => {
    setCurrentTOkenAddress("");
    var currentTokenID = _id._id;

    setLoading(true);
    var currentTokenData = await getTokenByID(currentTokenID);
    if (currentTokenData.success == true) {
      setCurrentTokenState(currentTokenData.data);
      setLoading(false);
      setCurrentTOkenAddress(currentTokenData.currentTokenAddress);
      setCurrentDataDBID(currentTokenData.currentTokenID);
      setUnlockUnixTimeStamp(Number(currentTokenData.unLockDateUnix));
      setUnLockID(currentTokenData.data.lockID);
      sessionStorage.setItem("unLockDate", currentTokenData.unLockDateUnix);
      // if wallet address match with owner Address so show unlock btn
    } else {
      setLoading(false);
    }
  };

  // fetch All Tokens
  const allTokens = async () => {
    setReturnedTokensData([]);
    setTokensThatIlocked([]);
    setnoData("");
    setLoading(true);
    setAllLockedToken(false);
    setBoldBtn1(true);
    setBoldBtn2(false);
    setIsMyLockTokens(true);
    setPage(1);
    var pageNum = 1;
    var tokensData = await getAllTokensByChainID(pageNum);

    if (tokensData.success == true) {
      if (tokensData.data.length > 0) {
        setReturnedTokensData(tokensData.data);
        setTotalPages(tokensData?.totalPages);
        setitemLength(tokensData?.itemLength);
        setLoading(false);
      } else {
        setLoading(false);
        setnoData("no data found");
      }
    } else {
      setLoading(false);
      setnoData("no data found");
    }
  };

  // use Effect used to fetch locked Token Data
  useEffect(() => {
    getCurrentTokenData();
  }, []);

  useEffect(() => {
    // function to get token by chainID
    async function getTokensByChainID() {
      setLoading(true);
      var pageNum = 1;
      var tokensData = await getAllTokensByChainID(pageNum);

      if (tokensData.data.length > 0) {
        setReturnedTokensData(tokensData.data);
        setTotalPages(tokensData.totalPages);
        setitemLength(tokensData.itemLength);
        setLoading(false);
      } else {
        setLoading(false);
        setnoData("no data found");
      }
    }
    getTokensByChainID();
  }, []);

  useEffect(() => {
    // this function wil run when I will search for data
    async function filterData() {
      setLoading(true);

      if (filteredData.length > 0) {
        setnoData("");
        setReturnedTokensData(filteredData);
        setTokensThatIlocked(filteredData);
        setTotalPages(1);
        setitemLength(1);
        setLoading(false);
      } else {
        if (searchFieldLength < 5) {
          setnoData("");
          setReturnedTokensData([]);
          var pageNum = 1;
          var tokensData = await getAllTokensByChainID(pageNum);
          const myLockedTokens = await getMyLockedTokens(pageNum);

          if (tokensData.data.length > 0) {
            setReturnedTokensData(tokensData.data);
            setTokensThatIlocked(myLockedTokens.data);
            setTotalPages(tokensData.totalPages);
            setitemLength(tokensData.itemLength);
            setLoading(false);
          } else {
            setLoading(false);
            setnoData("no data found");
          }
        } else {
          setReturnedTokensData([]);
          setTokensThatIlocked([]);
          setTotalPages(0);
          setitemLength(0);
          setLoading(false);
          setnoData("no data found");
        }
      }
    }
    filterData();
  }, [filteredData, searchFieldLength]);

  let theme = useTheme();

  const columns = [
    { field: "token", headerName: "Token", width: 500 },
    { field: "amount", headerName: "Amount", width: 130 },
  ];
  const rows = [];
  const [filteredBNbData, setFilteredBNbData] = useState([]);
  const [inputValueLength, setInputValueLength] = useState(0);

  const searchBNBInput = async (e) => {
    try {
      var value = e.target.value;
      setInputValueLength(value.length);

      var result = await filterLockedBNB(value);
      if (result.success == true) {
        setFilteredBNbData(result.data);
      } else {
        setFilteredBNbData([]);
      }
    } catch (err) {}
  };

  const formFieldsUi = [
    // <Step1 addMaxAmmountFunc={addMaxAmmount} key="1" />,
    <Step1
      key="1"
      searchBNBInput={searchBNBInput}
      filteredBNbData={filteredBNbData}
      inputValueLength={inputValueLength}
      chainId={isWalletConnectedContext.CurrencyNameContext}
    />,
    // <Step2 key="2" />,
    // <Step3 key="3" />,
    // <Step4 key="4" formValues={formValues} />,
  ];

  return (
    <Box
      sx={{
        color: `${theme.palette.background.default}`,
        padding: "0px",
      }}
    >
      <div>{formFieldsUi[current]}</div>
    </Box>
  );
};

export default BnbLocked;
