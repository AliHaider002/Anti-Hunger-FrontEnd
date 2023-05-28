import React, { useContext, useEffect, useState } from "react";
import CustomCard from "../../Components/CustomCard/CustomCard";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppCtx from "../../Components/Context/MyContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { transferLockOwnerShipBNBFun } from "../../utils/hooks/pinkLock";
import {
  unLockSimpleBNB,
  unLockSimpleBNBVesting,
} from "../../utils/hooks/pinkLock";
import { getLockedBNbById } from "../../utils/APIs/apis";
import Countdown from "react-countdown";

const LockBNBPageDetail2 = () => {
  let navigate = useNavigate();

  const isWalletConnectedContext = useContext(AppCtx);
  const _id = useParams();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBNBState, setCurrentBNBState] = useState([]);
  const [isTimeTounLock, setisTimeTounLock] = useState(false);
  const [getCurrentDate, setCurrentDate] = useState();
  const [unLockDate, setUnlockDate] = useState();
  // const [isTokenAbleToUnlock, setIsTokenAbleToUnlock] = useState(false);
  const [isTokenAbleToUnlock, setIsTokenAbleToUnlock] = useState(true); // for testing
  const [getunLockUnixTimeStamp, setUnlockUnixTimeStamp] = useState();
  const [remainDate, setRemainDate] = useState({
    hours: "0",
    minutes: "0",
    seconds: "0",
  });
  const [unLockID, setUnLockID] = useState();
  const [timeToShowLockBtn, isTimeToShowLockBtn] = useState(false);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState(false);
  const [ownerToUnlockToken, setOwnerToUnlockToken] = useState("");
  const [erorMessage, setErrMsg] = useState("");
  const [testTGEDate, setTGEDate] = useState("");
  const [IsBasicAddressMatch, setIsBasicAddressMatch] = useState(false);
  const [showError, setError] = useState("");
  const [isLoading2, setIsLoading2] = useState(false);
  const [transFerLockInput, setTransferLockInput] = useState("");
  const [lockOwner, setLockOwner] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [BNBID, setBNBID] = useState("");
  const [isBNBUnLocked, setBnbUnLocked] = useState(false);
  var [CwalletAddress, setCwalletAddress] = useState("0x");
  var [CwalletAddressLast, setCwalletAddressLast] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const lastCharAddress = () => {
    currentBNBState &&
      currentBNBState?.map((val, i) => {
        if (val?.name === "owner") {
          var oldAddress = val.value.split("");
          var newAdd = [];
          for (var x = 0; x <= 4; x++) {
            newAdd.push(oldAddress[x]);
          }

          var lastItems = oldAddress.slice(-3);
          var lastAryItme = lastItems.join("");
          lastAryItme = lastAryItme.toLocaleLowerCase();
          //

          var withoutCommas = newAdd.join("");
          withoutCommas = withoutCommas.toLocaleLowerCase();
          setCwalletAddress(withoutCommas);
          setCwalletAddressLast(lastAryItme);
        }
      });
  };

  useEffect(() => {
    lastCharAddress();
  }, [currentBNBState]);

  const inputTransferValue = (e) => {
    var value = e.target.value;

    setLockOwner(value);
    setTransferLockInput(value);
  };

  // transfer Lock OwnerShip function

  const transferLockBlockChainFun = async () => {
    try {
      var currentBNBID = _id.id;

      // setOwnerTransfered(false);
      setIsLoading2(true);
      setError("");

      var newOwner = transFerLockInput;
      var result = await transferLockOwnerShipBNBFun(currentBNBID, newOwner);

      if (result.success == true) {
        setTimeout(() => {
          // setOwnerTransfered(true);
          navigate("/bnb");
        }, 15000);
        setIsLoading2(false);
      } else {
        setIsLoading2(false);
        setError(result.msg);
      }
    } catch (err) {}
  };

  // function to call Locked BNB while Loaindg Page
  const getCurrentBNBData = async () => {
    var currentTokenID = _id.id;
    var walletAddressPrm = _id.walletAddress;
    setWalletAddress(walletAddressPrm);
    setBNBID(currentTokenID);

    setLoading(true);
    var currentTokenData = await getLockedBNbById(
      currentTokenID,
      isWalletConnectedContext.CurrencyNameContext
    );

    console.log("ThisIsData", currentTokenData);
    if (currentTokenData.success == true) {
      sessionStorage.setItem("unLockDate", currentTokenData.unLockUnix);
      setCurrentBNBState(currentTokenData.data);
      setLockOwner(currentTokenData.lockOwner);
      setTGEDate(currentTokenData.tgeDate);
      setOwnerToUnlockToken(currentTokenData.data[1].value);
      setLoading(false);
      setBnbUnLocked(currentTokenData.isBnbUnLocked);
      setUnlockUnixTimeStamp(Date.parse(currentTokenData.unLockUnix));
      setUnLockID(currentTokenData.lockID);
    } else {
      setLoading(false);
    }
  };

  const unLockBTN = async () => {
    try {
      setIsLoading(true);
      setErrMsg("");
      var currentTokenID = _id.id;
      var lockID = unLockID;
      //
      var unLockData = "";
      if (testTGEDate != "") {
        unLockData = await unLockSimpleBNBVesting(lockID, currentTokenID);
      } else {
        unLockData = await unLockSimpleBNB(currentTokenID);
      }

      if (unLockData.success == true) {
        setIsLoading(false);
        setBnbUnLocked(true);
        getCurrentBNBData();
      } else {
        setBnbUnLocked(false);
        setErrMsg(unLockData.msg);
        setIsLoading(false);
      }
    } catch (err) {}
  };

  var nowDate;
  const currentDate = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;

    const dt = Date.parse(dateTime);
    dateTime = dt / 1000;

    nowDate = dateTime;

    setCurrentDate(dateTime);
  };

  setInterval(() => {
    currentDate();
  }, 1000);

  // use Effect used to run global function that call Locked BNB
  useEffect(() => {
    getCurrentBNBData();
  }, []);

  useEffect(() => {
    const countDownFun = () => {
      var unLockDate = sessionStorage.getItem("unLockDate");
      //

      if (getCurrentDate > getunLockUnixTimeStamp) {
        setIsTokenAbleToUnlock(true);

        var dateObj = { hours: "00", minutes: "00", seconds: "00" };
        setRemainDate(dateObj);
      } else {
        var newDate = unLockDate;

        // console.log("unLockDate007786bisal", newDate);

        newDate = getunLockUnixTimeStamp - getCurrentDate;
        // console.log("unLockDate007786bisal1", newDate);

        var date = new Date(Number(newDate) * 1000);

        // console.log("CheckingDate", date);

        var getHours = date.getUTCHours();
        var getMinutes = date.getUTCMinutes();
        var getSeconds = date.getUTCSeconds();

        var hours = getHours;
        if (getHours < 10) {
          hours = `0${getHours}`;
        }
        var minutes = getMinutes;
        if (minutes < 10) {
          minutes = `0${getMinutes}`;
        }
        var seconds = getSeconds;
        if (seconds < 10) {
          seconds = `0${getSeconds}`;
        }

        // console.log(
        //   `hours ${getHours}, Minutes ${minutes} seconds ${getSeconds}`
        // );

        var dateObj = {
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        };
        setRemainDate(dateObj);
        sessionStorage.setItem("unLockDate", newDate);
      }
    };

    countDownFun();

    const detectIfTokenRelatedToUse = () => {
      // detect the correct token of owner to unlock
      //

      //
      if (isWalletConnectedContext?.isWalletAddress == ownerToUnlockToken) {
        isTimeToShowLockBtn(true);
      } else {
        isTimeToShowLockBtn(false);
      }
    };

    if (isWalletConnectedContext?.isWalletConnected == true) {
      detectIfTokenRelatedToUse();
    }

    //
  }, [getCurrentDate, getunLockUnixTimeStamp, ownerToUnlockToken]);

  const theme = useTheme();
  return (
    <CustomCard>
      <Box
        sx={{
          color: `${theme.palette.background.default}`,
          padding: "10px",
        }}
      >
        <Box>
          {loading ? (
            <Box
              sx={{
                display: "flex !important",
                justifyContent: "center",
                alignItems: "scenter",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <CircularProgress size="large" />
            </Box>
          ) : (
            <>
              {/* un lock timing */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  padding: "20px",
                  marginBottom: "20px",
                  maring: "20px",
                  backgroundColor: `${theme.palette.background.mainBg}`,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography>UnLock in</Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <Box
                    sx={{
                      margin: "5px",
                      backgroundColor: "white",
                      color: "black",
                      padding: "10px",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {remainDate && remainDate.hours ? remainDate.hours : "0"}
                  </Box>

                  <Box
                    sx={{
                      margin: "5px",
                      backgroundColor: "white",
                      color: "black",
                      padding: "10px",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {remainDate && remainDate.minutes
                      ? remainDate.minutes
                      : "0"}
                  </Box>
                  <Box
                    sx={{
                      margin: "5px",
                      backgroundColor: "white",
                      color: "black",
                      padding: "10px",
                      borderRadius: "2px",
                      fontWeight: "bold",
                    }}
                  >
                    {remainDate && remainDate?.seconds
                      ? remainDate?.seconds
                      : "0"}
                  </Box>
                  {/* <Box>
                    <Countdown date={Date.now() + 10000} autoStart />
                  </Box> */}
                  {/* <Box sx={{margin : "5px", backgroundColor : 'white', color : "black", padding : "10px", borderRadius : "2px", fontWeight : "bold"}}>{remainDate.getHours}</Box> */}
                </Box>
              </Box>

              {/* lock Infro  */}
              <Box
                sx={{
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "20px",
                  maring: "20px",
                  backgroundColor: `${theme.palette.background.mainBg}`,
                }}
              >
                <Box
                  sx={{
                    borderBottom: "1px solid gray",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  <Typography>Lock Info</Typography>
                </Box>

                {isSmallScreen ? (
                  <>
                    {currentBNBState.map((item, index) => {
                      return (
                        <Box
                          key={index + 1}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "300",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            borderBottom: "1px solid gray",
                          }}
                        >
                          <Typography key={index + 2}>{item.name}</Typography>
                          <Typography key={index + 3}>
                            {item?.name === "owner" ? (
                              <Typography key={index + 3}>
                                {" "}
                                {`${CwalletAddress}..${CwalletAddressLast}`}{" "}
                              </Typography>
                            ) : (
                              <Typography
                                key={index + 3}
                                sx={{
                                  maxWidth: "70px",
                                  wordWrap: "break-word",
                                }}
                              >
                                {" "}
                                {item.value}{" "}
                              </Typography>
                            )}

                            {/* {
                                                                item?.name === "owner" ? `${CwalletAddress}..${CwalletAddressLast}` :
                                                                    item.value} */}
                          </Typography>
                        </Box>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {currentBNBState.map((item, index) => {
                      return (
                        <Box
                          key={index + 1}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "300",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            borderBottom: "1px solid gray",
                          }}
                        >
                          <Typography key={index + 2}>{item.name}</Typography>
                          <Typography key={index + 3}>
                            {item.name === "unLocked at"
                              ? (item.value = new Date(
                                  `${item.value}`
                                ).toDateString())
                              : item.name === "Lock Date"
                              ? (item.value = new Date(
                                  `${item.value}`
                                ).toDateString())
                              : item.name === "unLock Date"
                              ? (item.value = new Date(
                                  `${item.value}`
                                ).toDateString())
                              : item.name === "TGE Date"
                              ? (item.value = new Date(
                                  `${item.value}`
                                ).toDateString())
                              : item.value}
                            {/* {
                                                item?.name === "tokenAddress" ? `${CwalletAddress}..${CwalletAddressLast}` :
                                                item.value} */}
                          </Typography>
                        </Box>
                      );
                    })}
                  </>
                )}

                {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          {currentBNBState.map((item, index) => {
            
            // 
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "300",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid gray"
                }}
              >
                <Typography key={index + 1}>
                  <span> {item?.name}</span>
                </Typography>
                <Typography key={index + 2}>
                  {item.value ? item.value : "-"}
                </Typography>
              </Box>
            )
          })}
        </Box> */}

                <p
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    color: "red",
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  {erorMessage}
                </p>

                {isWalletConnectedContext?.isWalletConnected ? (
                  <>
                    {isBNBUnLocked ? (
                      <></>
                    ) : (
                      <>
                        {timeToShowLockBtn ? (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              borderBottom: "1px solid gray",
                              paddingTop: "20px",
                              paddingBottom: "20px",
                            }}
                          >
                            <Link
                              to={`/extend-lock/bnb/${walletAddress}/${BNBID}`}
                            >
                              <Button>Extend Lock</Button>
                            </Link>

                            <Link to="/" style={{ margin: "0px 10px" }}>
                              <Button>Home</Button>
                            </Link>

                            <Button
                              onClick={() => setIsBasicAddressMatch(true)}
                            >
                              Transfer Lock Ownership
                            </Button>
                            {/* <Button type="primary" style={{margin : "0px 10px"}}>
                                  Upate
                                </Button> */}
                            {isTokenAbleToUnlock ? (
                              <>
                                <Button
                                  onClick={unLockBTN}
                                  sx={{ margin: "0px 10px" }}
                                  // loading={isLoading}
                                >
                                  {isLoading ? `UnLocking` : "UnLock"}
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  sx={{
                                    border: "1px solid gray",
                                    color: "gray",
                                    margin: "0px 10px",
                                  }}
                                >
                                  Unlock
                                </Button>
                              </>
                            )}
                          </Box>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </>
                ) : (
                  ""
                )}
              </Box>
            </>
          )}

          {/* model to transfer Lock OwnerShip */}

          {/* <Modal
    centered
    open={IsBasicAddressMatch}
    onOk={() => setIsBasicAddressMatch(false)}
    onCancel={() => setIsBasicAddressMatch(false)}
    size="medium"
    className="warningModel"
    title="Transfer Lock Ownership"
  >
    <BaseForm.Item
      name="transferLockInput"
      // rules={[{ message: t('forms.stepFormLabels.loginError') }]}
      style={{ fontSize: "20px", textAlign: "center", margin: "0px" }}
    >
      <Input
        type="text"
        defaultValue={lockOwner}
        onChange={inputTransferValue}
      />
    </BaseForm.Item>

    {showError ? (
      <p style={{ textAlign: "center", fontSize: "14px", color: "red" }}>
        {showError}
      </p>
    ) : (
      ""
    )}

    <Box className="addressMatchBoxButtonBox">
      <Button
        style={{ margin: "auto" }}
        onClick={transferLockBlockChainFun}
        // loading={isLoading2}
      >
        Transfer Ownership
      </Button>
    </Box>
  </Modal> */}
        </Box>
      </Box>
    </CustomCard>
  );
};

export default LockBNBPageDetail2;
