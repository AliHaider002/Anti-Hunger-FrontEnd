import React, { useContext, useEffect, useState } from "react";
import Step1 from "./Step1";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppCtx from "../Context/MyContext";
import { currentTokenData } from "../../utils/hooks/instances";
import { ExtendTokenLock, ExtendLockBNB } from "../../utils/hooks/pinkLock";
import { getTokenByID, getLockedBNbById } from "../../utils/APIs/apis";

const ExtendLock = () => {
  let navigate = useNavigate();

  const isWalletConnectedContext = useContext(AppCtx);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
  // const [form] = BaseForm.useForm()
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
  const [LockID, setLockID] = useState(0);
  const [tokenDecimal, setTokenDecimal] = useState(0);
  const paramData = useParams();

  const [fields, setFields] = useState([]);

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

  formValues.forEach((item, index) => {
    if (item.name == "titleBNB") {
      titleBNB = item.value;
    } else if (item.name == "Amount2BNB") {
      Amount2BNB = item.value;
    } else if (item.name == "UnlockDateBNB") {
      UnlockDateBNB = item.value;
    } else if (item.name == "TokenAddress") {
      tokenAddress = item.value;
    } else if (item.name == "Amount") {
      TotalAmmount = item.value;
    } else if (item.name == "Owner1") {
      owner = item.value;
    } else if (item.name == "Title") {
      title = item.value;
    } else if (item.name == "LockTime") {
      lockTime = item.value;
    } else if (item.name == "tgeDate") {
      tgeDate = item.value;
    } else if (item.name == "tgePercent") {
      tgePercent = item.value;
    } else if (item.name == "CycleDays1") {
      CycleDays = item.value;
    } else if (item.name == "cyclePercentage") {
      cyclePercentage = item.value;
    } else if (item.name == "bnbTgeDate") {
      bnbTgeDate = item.value;
    } else if (item.name == "BNBtgePercent") {
      BNBtgePercent = item.value;
    } else if (item.name == "BNBCycleDays1") {
      BNBCycleDays1 = item.value;
    } else if (item.name == "BNBcyclePercentage") {
      BNBcyclePercentage = item.value;
    }
  });

  const addMaxAmmount = async () => {
    try {
      if (isWalletConnectedContext?.isWalletConnected == true) {
        var tokenAddress = paramData.Addr;
        const currentTokenContract = await currentTokenData(tokenAddress);

        if (currentTokenContract.success != false) {
          var tokenBalance = currentTokenContract.tokenData[1].value;

          let newArr = [];

          if (fields.length == 0) {
            setFields([{ name: "Amount", value: tokenBalance }]);
          }

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

  // getting locked data date nad AMound
  useEffect(() => {
    if (isWalletConnectedContext?.isWalletConnected == false) {
      navigate(`/`);
    }

    if (paramData.name == "token") {
      const getLockedTokenDate = async () => {
        try {
          var id = paramData.id;

          var currentDate;
          currentDate = await getTokenByID(id);

          if (currentDate.success == true) {
            var currentResPondData = currentDate.data;
            setLockID(currentResPondData.lockID);
            setTokenDecimal(currentResPondData.tokenDecimal);

            var unLockDate = currentDate.unLockDateUnix;

            var newDate = new Date(Number(unLockDate) * 1000);

            var getYear = newDate.getFullYear();
            var date = newDate.getDate();
            var getMonth = newDate.getMonth();
            var hours = newDate.getHours();
            var getMinutes = newDate.getMinutes();

            if (getMonth < 10) {
              getMonth = `${getMonth}`;
            }
            if (getMinutes < 10) {
              getMinutes = `0${getMinutes}`;
            }

            unLockDate = `${getYear}-${
              getMonth + 1
            }-${date}T${hours}:${getMinutes}`;

            var obj = [
              { name: "Amount", value: currentResPondData.total_Locked_Amount },
              { name: "LockTime", value: unLockDate },
            ];
            setFields(obj);
          } else {
          }
        } catch (err) {}
      };

      getLockedTokenDate();
    }

    if (paramData.name == "bnb") {
      const getLockedBNBData = async () => {
        try {
          var id = paramData.id;
          var currentDate = await getLockedBNbById(id);

          if (currentDate.success == true) {
            var unLockDate = currentDate.unLockUnix;
            //

            var newDate = new Date(Number(unLockDate) * 1000);

            var getYear = newDate.getFullYear();
            var date = newDate.getDate();
            var getMonth = newDate.getMonth();
            var hours = newDate.getHours();

            var getMinutes = newDate.getMinutes();

            if (hours < 10) {
              hours = `0${hours}`;
            }

            if (getMonth < 10) {
              getMonth = `${getMonth}`;
            }
            if (getMinutes < 10) {
              getMinutes = `0${getMinutes}`;
            }

            unLockDate = `${getYear}-${
              getMonth + 1
            }-${date}T${hours}:${getMinutes}`;

            var amount = currentDate.lockedAmountETH;

            var obj = [
              { name: "Amount", value: amount },
              { name: "LockTime", value: unLockDate },
            ];
            setFields(obj);
          } else {
          }
        } catch (err) {}
      };
      getLockedBNBData();
    }
  }, []);

  const UpdateYourLock = async () => {
    var tokenAddress = paramData.Addr;
    var id = paramData.id;

    setIsLoading(true);
    setError("");
    setSuccess("");

    var amount = formValues[0].value;
    var newLockDate = formValues[1].value;

    var result = await ExtendTokenLock(
      LockID,
      id,
      amount,
      newLockDate,
      tokenDecimal,
      tokenAddress
    );

    if (result.success == true) {
      setTimeout(() => {
        setIsLoading(false);

        setSuccess(result.msg);
        navigate(`/token/detail/${tokenAddress}/${id}`);
      }, 10000);
    } else {
      setIsLoading(false);
      setError(result.msg);
    }

    // setIsLoading(false)
  };

  // const update Lock BNB
  const UpdateYourLockBNB = async () => {
    try {
      setIsLoading(true);

      setError("");
      setSuccess("");

      var wltAddr = paramData.Addr;
      var id = paramData.id;
      var amount = formValues[0].value;
      var newLockDate = formValues[1].value;

      var result = await ExtendLockBNB(amount, newLockDate, wltAddr, id);

      if (result?.success == true) {
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/bnb/detail/${wltAddr}`);
        }, 10000);
      } else {
        setError(result.msg);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const formFieldsUi = [
    <Step1 addMaxAmmount={addMaxAmmount} key="1" useVesting={useVesting} />,
    // <Step2 key="2" />,
    // <Step3 key="3" />,
    // <Step4 key="4" formValues={formValues} />,
  ];
  const theme = useTheme();
  return (
    <Box
      sx={{
        color: `${theme.palette.background.default}`,
        padding: "10px",
      }}
    >
      <Box>{formFieldsUi[current]}</Box>

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
          color: "white",
          textAlign: "center",
          fontSize: "12px",
          textTransform: "uppercase",
        }}
      >
        {/* LinkTo current Locked Token */}
        <Link to={`/token/detail/${tokenAddress}`} style={{ color: "white" }}>
          {isLockedSuccessfully ? (
            <>{useVesting ? "Vested successfully" : `locked Successfully`}</>
          ) : (
            ""
          )}
        </Link>

        {/* bnb lcoked Message */}
        <Link
          to={`/bnb/detail/${walletAddressForLink}`}
          style={{ color: "white" }}
        >
          {isBNBLockedSuccessfully ? (
            <>{isBNBVesting ? "Vested successfully" : `locked Successfully`}</>
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
      <p
        style={{
          color: "white",
          fontSize: "14px",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {showSuccess ? showSuccess : ""}
      </p>
      {isWalletConnectedContext?.isWalletConnected ? (
        <>
          {paramData.name == "token" ? (
            <Button
              sx={{ margin: "auto" }}
              // loading={isLoading}
              onClick={UpdateYourLock}
            >
              {isLoading ? "Updating Your Lock" : "Update Your Lock"}
            </Button>
          ) : (
            <Button
              sx={{ margin: "auto" }}
              // loading={isLoading}
              onClick={UpdateYourLockBNB}
            >
              {isLoading ? "Updating Your Lock" : "Update Your Lock"}
            </Button>
          )}
        </>
      ) : (
        <>
          <Button
            sx={{ margin: "auto" }}
            onClick={() => setIsBasicModalVisible(true)}
          >
            Update Your Lock
          </Button>
        </>
      )}
    </Box>
  );
};

export default ExtendLock;
