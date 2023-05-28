import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppCtx from "../../Components/Context/MyContext";
import { unLockToken, transferLockOwnerShip } from "../../utils/hooks/pinkLock";
import { getLiqudityByID } from "../../utils/APIs/apis";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomCard from "../../Components/CustomCard/CustomCard";

const LiqudityDetialsPage2 = () => {
  let navigate = useNavigate();

  const isWalletConnectedContext = useContext(AppCtx);
  // const { t } = useTranslation()
  const tokenobj = useParams();
  const _id = useParams();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [currentTokenState, setCurrentTokenState] = useState("");
  // const [unlockDate , setUnlockDate] = useState("")
  const [tokenSummary, setTokenSummary] = useState([]);
  const [isTimeTounLock, setisTimeTounLock] = useState(false);
  const [getCurrentDate, setCurrentDate] = useState();
  const [unLockDate, setUnlockDate] = useState();
  const [isTokenAbleToUnlock, setIsTokenAbleToUnlock] = useState(false);
  const [isTokenUnLocked, setIsTokenUnLocked] = useState(false);
  const [getunLockUnixTimeStamp, setUnlockUnixTimeStamp] = useState();
  const [remainDate, setRemainDate] = useState({
    remainDays: "0",
    hours: "0",
    minutes: "0",
    seconds: "0",
  });
  const [unLockID, setUnLockID] = useState();
  const [timeToShowLockBtn, isTimeToShowLockBtn] = useState(false);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState(false);
  const [isExtended, setExtended] = useState(false);
  const [extenLockModel, setExtentLockModel] = useState(false);
  const [timToCloseMDL, setTimToCloseMDL] = useState(true);
  const [transFerLockInput, setTransferLockInput] = useState("");
  const [showError, setError] = useState("");
  const [isOwnerTransfered, setOwnerTransfered] = useState(false);

  const [IsBasicAddressMatch, setIsBasicAddressMatch] = useState(false);
  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
  const [currentdataDBID, setCurrentDataDBID] = useState("");
  const [currentTokenAddress, setCurrentTOkenAddress] = useState("");
  var [CwalletAddress, setCwalletAddress] = useState("0x");
  var [CwalletAddressLast, setCwalletAddressLast] = useState("");
  var [CwalletAddress1, setCwalletAddress1] = useState("0x");
  var [CwalletAddressLast1, setCwalletAddressLast1] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const lastCharAddress = () => {
    // currentBNBState && currentBNBState?.map((val, i) => {
    //
    //     if (val?.name === 'owner') {

    var tokenAddress = currentTokenState?.data?.liquidityAddress;
    var owner = currentTokenState.owner;
    if (tokenAddress) {
      var oldAddress = tokenAddress.split("");
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
  };
  const lastCharAddressTwo = () => {
    // currentBNBState && currentBNBState?.map((val, i) => {
    //
    //     if (val?.name === 'owner') {
    // var liquidityAddress = currentTokenState.liquidityAddress;
    var owner = currentTokenState.Owner;
    if (owner) {
      var oldAddress = owner.split("");
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
      setCwalletAddress1(withoutCommas);
      setCwalletAddressLast1(lastAryItme);
    }
  };

  useEffect(() => {
    lastCharAddress();
    lastCharAddressTwo();
  }, [currentTokenState]);

  const inputTransferValue = (e) => {
    var value = e.target.value;

    setTransferLockInput(value);
  };

  const transferLockBlockChainFun = async () => {
    try {
      var currentTokenID = _id._id;
      var tokenAddress = _id.tokenobj;
      //
      setOwnerTransfered(false);
      setIsLoading2(true);
      setError("");

      var newOwner = transFerLockInput;
      var result = await transferLockOwnerShip(
        currentTokenID,
        unLockID,
        newOwner,
        tokenAddress
      );

      if (result.success == true) {
        setTimeout(() => {
          setIsLoading2(false);
          setOwnerTransfered(true);
          navigate("/token");
        }, 20000);
      } else {
        setIsLoading2(false);
        setError(result.msg);
      }
    } catch (err) {}
  };

  // unlock token
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

  // this function used to fetch current Token Data
  const getCurrentTokenData = async () => {
    setCurrentTOkenAddress("");
    var currentTokenID = _id._id;

    setLoading(true);
    var currentTokenData = await getLiqudityByID(currentTokenID);

    if (currentTokenData.success == true) {
      // let parsedDate = Date.parse(currentTokenData.unLockDateUnix);
      //
      // unLock_Date
      sessionStorage.setItem("unLockDate", currentTokenData.unLockDateUnix);

      setCurrentTokenState(currentTokenData.data);
      setLoading(false);
      setCurrentTOkenAddress(currentTokenData.currentTokenAddress);
      setCurrentDataDBID(currentTokenData.currentTokenID);
      setUnlockUnixTimeStamp(Date.parse(currentTokenData.unLockDateUnix));
      // setUnlockUnixTimeStamp(Number(parsedDate));
      setUnLockID(currentTokenData.data.lockID);

      // if wallet address match with owner Address so show unlock btn
    } else {
      setLoading(false);
    }
  };

  const [newFormateDate, setNewFormateDate] = useState("");

  useEffect(() => {
    getCurrentTokenData();
  }, []);
  // let newFormatedDate = "";
  useEffect(() => {
    if (currentTokenState) {
      let newFormatedDate = new Date(`${currentTokenState.unLock_Date}`);
      // newFormatedDate = newDate.toDateString();

      setNewFormateDate(newFormatedDate.toDateString());
    }
  }, [currentTokenState]);

  // useEffect when state udapte
  useEffect(() => {
    const countDownFun = () => {
      var unLockDate = sessionStorage.getItem("unLockDate");

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

      if (
        isWalletConnectedContext?.isWalletAddress ==
        currentTokenState.walletAddress
      ) {
        isTimeToShowLockBtn(true);
      } else {
        isTimeToShowLockBtn(false);
      }
    };

    if (isWalletConnectedContext?.isWalletConnected == true) {
      detectIfTokenRelatedToUse();
    }
  }, [getCurrentDate, getunLockUnixTimeStamp, currentTokenState]);

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
                alignItems: "center",
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
                    {remainDate.hours ? remainDate.hours : "00"}
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
                    {remainDate.minutes ? remainDate.minutes : "00"}
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
                    {remainDate.seconds ? remainDate.seconds : "00"}
                  </Box>
                </Box>
              </Box>

              {/* lock info */}
              <Box
                sx={{
                  borderRadius: "10px",
                  padding: "20px",
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
                  <Typography>Token Info</Typography>
                </Box>

                {currentTokenState ? (
                  <>
                    {isSmallScreen ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "300",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            borderBottom: "1px solid gray",
                          }}
                        >
                          <Typography>Token Address</Typography>
                          <Typography>
                            {CwalletAddress}...{CwalletAddressLast}
                          </Typography>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "300",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            borderBottom: "1px solid gray",
                          }}
                        >
                          <Typography>Token Address</Typography>
                          <Typography>
                            {currentTokenState.liquidityAddress}
                          </Typography>
                        </Box>
                      </>
                    )}
                    {/* <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: '300',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid gray',
                  }}
                >
                  <Typography>Token Address</Typography>
                  <Typography>{currentTokenState.tokenAddress}</Typography>
                </Box> */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "300",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      <Typography> Token Name </Typography>
                      <Typography>{currentTokenState.liquidityName}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "300",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      <Typography> Token Symbol </Typography>
                      <Typography>
                        {currentTokenState.liquiditySymbol}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "300",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderBottom: "1px solid gray",
                      }}
                    >
                      <Typography>Token Decimal</Typography>
                      <Typography>
                        {currentTokenState.liquidityDecimal}
                      </Typography>
                    </Box>
                  </>
                ) : (
                  ""
                )}
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
                {/* {isTokenUnLocked ? <></>} */}

                {currentTokenState.isTokenUnlocked == true ||
                isTokenUnLocked == true ? (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "300",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          borderBottom: "1px solid gray",
                        }}
                      >
                        <Typography>UnLocked at</Typography>
                        <Typography>
                          {currentTokenState.unLock_Date
                            ? currentTokenState.unLock_Date
                            : "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "300",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          borderBottom: "1px solid gray",
                        }}
                      >
                        <Typography>Title</Typography>
                        <Typography>
                          {currentTokenState.liquidityTitle}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "300",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          borderBottom: "1px solid gray",
                        }}
                      >
                        <Typography>Total Amount Locked</Typography>
                        <Typography>
                          {currentTokenState.total_Liquidity_Amount}
                          {/* {currentTokenState.total_Liquidity_Amount} */}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "300",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          borderBottom: "1px solid gray",
                        }}
                      >
                        <Typography>Total Locked Value</Typography>
                        <Typography>
                          {currentTokenState.total_Locked_Value
                            ? currentTokenState.total_Locked_Value
                            : "0"}
                        </Typography>
                      </Box>
                      {isSmallScreen ? (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontWeight: "300",
                              paddingTop: "20px",
                              paddingBottom: "20px",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <Typography>Owner</Typography>
                            <Typography>
                              {CwalletAddress1}...{CwalletAddressLast1}
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontWeight: "300",
                              paddingTop: "20px",
                              paddingBottom: "20px",
                              borderBottom: "1px solid gray",
                            }}
                          >
                            <Typography>Owner</Typography>
                            <Typography>{currentTokenState.Owner}</Typography>
                          </Box>
                        </>
                      )}
                      {/* <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: '300',
                      paddingTop: '20px',
                      paddingBottom: '20px',
                      borderBottom: '1px solid gray',
                    }}
                  >
                    <Typography>Owner</Typography>
                    <Typography>{currentTokenState.Owner}</Typography>
                  </Box> */}

                      {currentTokenState.tGE_Percentage ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "300",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            borderBottom: "1px solid gray",
                          }}
                        >
                          <Typography>TGE Percentage</Typography>
                          <Typography>
                            {currentTokenState.tGE_Percentage}
                          </Typography>
                        </Box>
                      ) : (
                        ""
                      )}
                      {currentTokenState.cycle_Days ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "300",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            borderBottom: "1px solid gray",
                          }}
                        >
                          <Typography>Cycle Days</Typography>
                          <Typography>
                            {currentTokenState.cycle_Days}
                          </Typography>
                        </Box>
                      ) : (
                        ""
                      )}

                      {currentTokenState.cycle_ReleasePercentage ? (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontWeight: "300",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            borderBottom: "1px solid gray",
                          }}
                        >
                          <Typography>Cycle Percentage</Typography>
                          <Typography>
                            {currentTokenState.cycle_ReleasePercentage}
                          </Typography>
                        </Box>
                      ) : (
                        ""
                      )}

                      {/* <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "300",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          borderBottom: "1px solid gray",
                        }}
                      >
                        <Typography>Lock Date</Typography>
                        <Typography>
                          {currentTokenState.Lock_Date
                            ? currentTokenState.Lock_Date
                            : "N/A"}
                        </Typography>
                      </Box> */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: "300",
                          paddingTop: "20px",
                          paddingBottom: "20px",
                          borderBottom: "1px solid gray",
                        }}
                      >
                        <Typography>UnLock Date</Typography>
                        <Typography>
                          {currentTokenState.unLock_Date
                            ? newFormateDate
                            : "N/A"}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}

                {/* message to show */}

                {isExtended ? (
                  <>
                    <p
                      style={{
                        color: "white",
                        textAlign: "center",
                        marginTop: "20px",
                      }}
                    >
                      {" "}
                      Lock Updated Successfully{" "}
                    </p>
                  </>
                ) : (
                  ""
                )}
                {isOwnerTransfered ? (
                  <>
                    <p
                      style={{
                        color: "white",
                        textAlign: "center",
                        marginTop: "20px",
                      }}
                    >
                      {" "}
                      Owner Transfered Successfully{" "}
                    </p>
                  </>
                ) : (
                  ""
                )}

                {isWalletConnectedContext?.isWalletConnected ? (
                  <>
                    {timeToShowLockBtn ? (
                      <>
                        {currentTokenState.isTokenUnlocked == false ? (
                          <>
                            {isTokenUnLocked == true ? (
                              <></>
                            ) : (
                              <>
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
                                    to={`/extend-lock/token/${currentTokenAddress}/${currentdataDBID}`}
                                  >
                                    <Button type="primary">Extend Lock</Button>
                                  </Link>
                                  <Link to="/" style={{ margin: "0px 10px" }}>
                                    <Button type="primary">Home</Button>
                                  </Link>

                                  <Button
                                    type="primary"
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
                                        type="primary"
                                        onClick={unLockBTN}
                                        style={{ margin: "0px 10px" }}
                                        // loading={isLoading}
                                      >
                                        {isLoading ? "UnLocking" : "UnLock"}
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        type="ghost"
                                        style={{
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
                              </>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </Box>
            </>
          )}

          {/* model */}
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
          style={{ fontSize: '20px', textAlign: 'center', margin: '0px' }}
        >
          <Input type="text" defaultValue={currentTokenState.Owner} onChange={inputTransferValue} />
        </BaseForm.Item>

        {showError ? <p style={{ textAlign: 'center', fontSize: '14px', color: 'red' }}>{showError}</p> : ''}

        <Box className="addressMatchBoxButtonBox">
          <Button style={{ margin: 'auto' }} onClick={transferLockBlockChainFun} loading={isLoading2}>
            Transfer Ownership
          </Button>
        </Box>
      </Modal> */}
        </Box>
      </Box>
    </CustomCard>
  );
};

export default LiqudityDetialsPage2;
