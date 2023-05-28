import React, { useContext, useState, useEffect } from "react";
import AppCtx from "../Context/MyContext";
import {
  getAllLockedBNB,
  getAllTokensByChainID,
  getMyLockedTokens,
  getMyLockedBNB,
} from "../../utils/APIs/apis";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import binanceImg from "./bsc.png";
import { Link } from "react-router-dom";

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

const Step1 = (props) => {
  const { searchBNBInput, filteredBNbData, inputValueLength, chainId } = props;
  const isWalletConnectedContext = useContext(AppCtx);
  const [isMyLockTokens, setIsMyLockTokens] = useState(true);
  const [allLockedToken, setAllLockedToken] = useState(false);
  const [boldBtn1, setBoldBtn1] = useState(true);
  const [boldBtn2, setBoldBtn2] = useState(false);
  const [itemLength, setitemLength] = useState(0);
  const [returnedTokensData, setReturnedTokensData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [activeMyLoc, setActiveMyLoc] = useState({});
  const [tokenThatILocked, setTokensThatIlocked] = useState([]);
  const [page, setPage] = useState(1);
  const [noData, setnoData] = useState("");
  const [loading, setLoading] = useState(false);

  // pagination handler
  const handleChange = async (event, value) => {
    setReturnedTokensData([]);
    setPage(value);
    setLoading(true);
    var pageNum = value;
    var tokensData = await getAllLockedBNB(pageNum, chainId);

    if (tokensData.success == true) {
      setReturnedTokensData(tokensData.data);
      setTotalPages(tokensData.totalPages);
      setitemLength(tokensData.itemLength);

      setLoading(false);
    }
  };

  // my lock function
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
    const myLockedTokens = await getMyLockedBNB(pageNum);

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
    var tokensData = await getAllLockedBNB(pageNum);

    if (tokensData.success == true) {
      if (tokensData.data.length > 0) {
        setReturnedTokensData(tokensData.data);
        setTotalPages(tokensData.totalPages);
        setitemLength(tokensData.itemLength);
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

  // handle my lock pagination
  const handleChange2 = async (event, value) => {
    setTokensThatIlocked([]);
    setPage(value);
    setLoading(true);
    var pageNum = value;
    const myLockedTokens = await getMyLockedBNB(pageNum);

    if (myLockedTokens.success == true) {
      setTokensThatIlocked(myLockedTokens.data);
      setitemLength(myLockedTokens.itemLength);
      setTotalPages(myLockedTokens.totalPages);
      setLoading(false);
    }
  };

  // get data of locked BNB

  useEffect(() => {
    // function to get token by chainID
    async function getTokensByChainID() {
      try {
        setLoading(true);
        var pageNum = 1;
        var tokensData = await getAllLockedBNB(pageNum);

        if (tokensData.data.length > 0) {
          setReturnedTokensData(tokensData.data);
          setTotalPages(tokensData.totalPages);
          setitemLength(tokensData.itemLength);
          setLoading(false);
        } else {
          setLoading(false);
          setnoData("no data found");
        }
      } catch (err) {}
    }
    getTokensByChainID();
  }, []);

  useEffect(() => {
    async function getFilteredBNB() {
      setnoData("");
      setLoading(true);

      if (inputValueLength > 0) {
        setReturnedTokensData(filteredBNbData);

        if (filteredBNbData.length == 0) {
          setnoData("no Data found");
        }

        setLoading(false);
      } else {
        if (filteredBNbData.length == 0) {
          var tokensData = await getAllLockedBNB(1);

          if (tokensData.data.length > 0) {
            setReturnedTokensData(tokensData.data);
            setTotalPages(tokensData.totalPages);
            setitemLength(tokensData.itemLength);
            setLoading(false);
          } else {
            setLoading(false);
            setnoData("no data found");
          }
        } else {
          setReturnedTokensData([]);
          setTotalPages(0);
          setitemLength(0);
          setLoading(false);
          setnoData("no data found");
        }
      }
    }

    getFilteredBNB();
  }, [filteredBNbData, inputValueLength]);

  const theme = useTheme();
  return (
    <Box
      sx={{
        color: `${theme.palette.background.default}`,
        padding: "0px",
      }}
    >
      <CustomFormControl
        sx={{
          m: 1,
          width: "98%",
          paddingTop: "20px",
          paddingRight: { lg: "0px", md: "10px", sm: "10px", xs: "10px" },
          paddingLeft: { lg: "10px", md: "10px", sm: "0px", xs: "0px" },
        }}
      >
        <CssTextField
          type="text"
          variant="outlined"
          placeholder="Search by BNB by address..."
          onChange={searchBNBInput}
          fullWidth
          id="customID"
          // autoComplete={false}
          // onFocus={handleClick}
          // autoHighlight={false}
          //onChange={handleSearchValue}
        />
      </CustomFormControl>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
          paddingRight: { lg: "20px", md: "10px", sm: "5px", xs: "5px" },
        }}
      >
        {boldBtn1 ? (
          <>
            <Button
              sx={{
                borderBottom: "1px dotted white",
                borderRadius: "0px",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={allTokens}
            >
              All
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{
                borderBottom: "1px dotted white",
                borderRadius: "0px",
                color: `${theme.palette.background.hoverColor}`,
              }}
              onClick={allTokens}
            >
              All
            </Button>
          </>
        )}

        {boldBtn2 ? (
          <>
            <Button
              sx={{
                marginLeft: "10px",
                borderBottom: "1px dotted white",
                color: "white",
                borderRadius: "0px",
                fontWeight: "bold",
              }}
              onClick={myLockFun}
            >
              My Lock
            </Button>
          </>
        ) : (
          <>
            <Button
              sx={{
                marginLeft: "10px",
                borderBottom: "1px dotted white",
                borderRadius: "0px",
                color: `${theme.palette.background.hoverColor}`,
              }}
              onClick={myLockFun}
            >
              My Lock
            </Button>
          </>
        )}
      </Box>
      <Box
        sx={{
          paddingRight: { lg: "20px", md: "10px", sm: "0px", xs: "0px" },
          paddingLeft: { lg: "10px", md: "10px", sm: "0px", xs: "0px" },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          {/* section heading */}

          {/* this is spinner */}

          <Grid
            container
            spacing={2}
            sx={{ justifyContent: "center", paddingLeft: "10px" }}
          >
            <Grid item xs={4} sm={4} md={4}>
              <Typography>BNB</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography>Amount</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>

          {/* section Body */}
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
            ""
          )}
        </Box>
        {returnedTokensData &&
          isMyLockTokens &&
          returnedTokensData.map((item, index) => {
            return (
              <Grid
                container
                spacing={2}
                sx={{
                  justifyContent: "center",
                  marginTop: "20px",
                  paddingX: "10px",
                }}
                key={index}
              >
                <Grid item xs={4} sm={4} md={4} key={index + 1}>
                  <Box sx={{ display: "flex" }} key={index + 2}>
                    <Box
                      sx={{
                        width: "50px",
                        height: "50px",
                        overflow: "hidden",
                        display: {
                          lg: "block",
                          md: "block",
                          sm: "none",
                          xs: "none",
                        },
                        borderRadius: "50px",
                        marginRight: "10px",
                      }}
                      key={index + 3}
                    >
                      <img
                        style={{ width: "100%" }}
                        src={binanceImg}
                        key={index + 4}
                      />
                    </Box>
                    <Box
                      sx={{ display: "flex", flexDirection: "column" }}
                      key={index + 5}
                    >
                      <Typography key={index + 6}>
                        {item.walletAddress}{" "}
                      </Typography>
                      <span
                        style={{ fontWeight: "500", color: "rgb(213 213 213)" }}
                        key={index}
                      >
                        {item.network}
                      </span>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={4} sm={4} md={4} key={index + 7}>
                  <Typography
                    key={index + 8}
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.total_Locked_Amount}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  md={4}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                  key={index + 9}
                >
                  <Link
                    to={`/bnb/detail/${item.fullAddress}`}
                    key={index + 10}
                    style={{
                      color: `${theme.palette.background.hoverColor}`,
                      textDecoration: "none",
                    }}
                  >
                    View
                  </Link>
                </Grid>
              </Grid>
            );
          })}

        {isMyLockTokens && itemLength && totalPages > 1 ? (
          <Stack spacing={2} sx={{ marginTop: "10px" }} id="pagination">
            <Pagination
              count={totalPages}
              variant="outlined"
              shape="rounded"
              sx={{ margin: "auto" }}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        ) : (
          ""
        )}
        {
          // tokens that I locked
          tokenThatILocked &&
            allLockedToken &&
            tokenThatILocked.map((item, index) => {
              return (
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: "center", marginTop: "20px" }}
                  key={index + 9}
                >
                  <Grid item xs={4} sm={4} md={4} key={index + 8}>
                    <Box
                      sx={{ display: "flex", marginRight: "10px" }}
                      key={index + 7}
                    >
                      <Box
                        sx={{
                          width: "50px",
                          height: "50px",
                          overflow: "hidden",
                          borderRadius: "50px",
                          marginRight: "10px",
                        }}
                        key={index + 6}
                      >
                        <img
                          style={{ width: "100%" }}
                          src={binanceImg}
                          key={index + 10}
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", flexDirection: "column" }}
                        key={index}
                      >
                        <Typography key={index}>
                          {item.walletAddress}{" "}
                        </Typography>
                        <span
                          style={{
                            fontWeight: "500",
                            color: "rgb(213 213 213)",
                          }}
                          key={index + 5}
                        >
                          {" "}
                          {item.network}{" "}
                        </span>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} key={index + 4}>
                    <Typography key={index + 3}>
                      {" "}
                      {item.total_Locked_Amount}{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={4}
                    md={4}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                    key={index + 1}
                  >
                    <Link
                      to={`/bnb/detail/${item.fullAddress}`}
                      key={index + 1}
                      style={{
                        color: `${theme.palette.background.hoverColor}`,
                        textDecoration: "none",
                      }}
                    >
                      View
                    </Link>
                  </Grid>
                </Grid>
              );
            })
        }

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <span>{noData}</span>
        </Box>

        {
          //  Pagination of my locked Tokens

          isMyLockTokens == false && itemLength && totalPages > 1 ? (
            <Stack spacing={2} sx={{ marginTop: "10px" }} id="pagination">
              <Pagination
                count={totalPages}
                variant="outlined"
                shape="rounded"
                sx={{ margin: "auto" }}
                page={page}
                onChange={handleChange2}
              />
            </Stack>
          ) : (
            ""
          )
        }
      </Box>
    </Box>
  );
};

export default Step1;
