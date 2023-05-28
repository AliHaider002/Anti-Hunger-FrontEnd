import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLiqudityByLiquityID } from "../../utils/APIs/apis";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CustomCard from "../../Components/CustomCard/CustomCard";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    fontSize: "20px !important",
    border: "none",
    "& th": {
      border: "none",
    },
    "& td": {
      border: "none",
    },
  },
});

const LiqudityDetailsPage = () => {
  const classes = useStyles();
  const tokenobj = useParams();
  const _id = useParams();
  const [loading, setLoading] = useState(false);
  const [currentTokenState, setCurrentTokenState] = useState([]);
  useEffect(() => {}, [currentTokenState]);

  const [tokenSummary, setTokenSummary] = useState([]);
  const [text, setText] = useState([]);

  var [CwalletAddress, setCwalletAddress] = useState("0x");
  var [CwalletAddressLast, setCwalletAddressLast] = useState("");
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  // const lastCharAddress = () => {
  //   tokenSummary &&
  //     tokenSummary?.map((val, i) => {
  //
  //       if (val?.name === "tokenAddress") {
  //
  //         var oldAddress = val.value.split("");
  //         var newAdd = [];
  //         for (var x = 0; x <= 4; x++) {
  //           newAdd.push(oldAddress[x]);
  //         }

  //         var lastItems = oldAddress.slice(-3);
  //         var lastAryItme = lastItems.join("");
  //         lastAryItme = lastAryItme.toLocaleLowerCase();
  //         //

  //         var withoutCommas = newAdd.join("");
  //         withoutCommas = withoutCommas.toLocaleLowerCase();
  //         setCwalletAddress(withoutCommas);
  //         setCwalletAddressLast(lastAryItme);
  //       }
  //     });
  // };

  useEffect(() => {
    const getCurrentTokenData = async () => {
      var tokenAddress = tokenobj.tokenobj;
      setCurrentTokenState([]);
      setLoading(true);
      var CurrentTokenData = await getLiqudityByLiquityID(tokenAddress);

      if (CurrentTokenData.success == true) {
        // var unLock_Date = parseInt(CurrentTokenData.tokenData.unLock_Date * 1000)
        setCurrentTokenState(CurrentTokenData.tokenData);
        setTokenSummary(CurrentTokenData.tokenSummary);
        setLoading(false);
      } else {
        setLoading(false);
        setCurrentTokenState([]);
      }
    };
    getCurrentTokenData();
  }, []);

  useEffect(() => {
    // lastCharAddress();
  }, [tokenSummary]);

  // function shorterAddress (){
  //     var walletAddress = tokenSummary
  //     var oldAddress = walletAddress.split('');
  //     var newAdd = [];
  //     for (var x = 0; x <= 4; x++) {
  //       newAdd.push(oldAddress[x]);
  //     }

  //     var lastItems = oldAddress.slice(-3);
  //     var lastAryItme = lastItems.join('');
  //     lastAryItme = lastAryItme.toLocaleLowerCase();
  //     //

  //     var withoutCommas = newAdd.join('');
  //     withoutCommas = withoutCommas.toLocaleLowerCase();
  //     setCwalletAddress(withoutCommas);
  //     setCwalletAddressLast(lastAryItme);
  // }

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
              {/* <Box sx={{display : "flex", flexDirection : "column", justifyContent : "center", alignItems : "center",borderRadius : "10px", padding: "20px",marginBottom : "20px", maring : "20px", backgroundColor : "#25284b"}}>
                        
                        <Box sx={{display : 'flex', justifyContent : "center"}}>
                          <Typography>UnLock in</Typography>
                        </Box>
                        <Box sx={{display : 'flex', marginTop : "10px"}}>
                           <Box sx={{margin : "5px", backgroundColor : 'white', color : "black", padding : "10px", borderRadius : "2px", fontWeight : "bold"}}>12</Box>
                           <Box sx={{margin : "5px", backgroundColor : 'white', color : "black", padding : "10px", borderRadius : "2px", fontWeight : "bold"}}>22</Box>
                           <Box sx={{margin : "5px", backgroundColor : 'white', color : "black", padding : "10px", borderRadius : "2px", fontWeight : "bold"}}>20</Box>
                           <Box sx={{margin : "5px", backgroundColor : 'white', color : "black", padding : "10px", borderRadius : "2px", fontWeight : "bold"}}>35</Box>
                        </Box>
                          
                    </Box> */}

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
                  <Typography>Lock Info</Typography>
                </Box>

                {isSmallScreen ? (
                  <>
                    {tokenSummary.map((item, index) => {
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
                            {item?.name === "tokenAddress"
                              ? `${CwalletAddress}..${CwalletAddressLast}`
                              : item.value}
                          </Typography>
                        </Box>
                      );
                    })}
                  </>
                ) : (
                  <>
                    {tokenSummary.map((item, index) => {
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
                            {item.value}
                            {/* {
                                                item?.name === "tokenAddress" ? `${CwalletAddress}..${CwalletAddressLast}` :
                                                item.value} */}
                          </Typography>
                        </Box>
                      );
                    })}
                  </>
                )}

                {/* {tokenSummary.map((item, index) => {
                                    
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
                                                
                                                {
                                                item?.name === "tokenAddress" ? `${CwalletAddress}..${CwalletAddressLast}` :
                                                item.value}
                                            </Typography>
                                        </Box>
                                    )
                                })} */}
              </Box>

              {/* lock Infro  */}

              <Box
                sx={{
                  borderRadius: "10px",
                  padding: "20px",
                  marginTop: "20px",
                  maring: "20px",
                  backgroundColor: `${theme.palette.background.mainBg}`,
                  overflowX: "scroll",
                }}
              >
                <Box
                  sx={{
                    borderBottom: "1px solid gray",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                  }}
                >
                  <Typography>Lock Record</Typography>
                </Box>

                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: "17px",
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        Wallet
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "17px",
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        Amount
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "17px",
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        Cycle Release(%)
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "17px",
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        TGE(%)
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "17px",
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        Unlock time (UTC)
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "17px",
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        View
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentTokenState.map((item, index) => {
                      let newDate = new Date(`${item.unLock_Date}`);

                      return (
                        <>
                          <TableRow>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                color: `${theme.palette.background.default}`,
                              }}
                            >
                              {item.walletAddress}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                color: `${theme.palette.background.default}`,
                              }}
                            >
                              {item.total_Liquidity_Amount}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                color: `${theme.palette.background.default}`,
                              }}
                            >
                              {item.cycle_ReleasePercentage
                                ? item.cycle_ReleasePercentage
                                : "-"}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                color: `${theme.palette.background.default}`,
                              }}
                            >
                              {item.tGE_Percentage ? item.tGE_Percentage : "-"}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                color: `${theme.palette.background.default}`,
                              }}
                            >
                              {item.unLock_Date ? (
                                newDate.toDateString()
                              ) : (
                                <>N/A</>
                              )}
                              {/* {item.unLock_Date} */}
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "15px",
                                // color: `${theme.palette.background.default}`
                              }}
                            >
                              <Link
                                to={`/liqudity/detail/${tokenobj.tokenobj}/${item._id}`}
                                key={index + 1}
                                style={{
                                  color: `${theme.palette.background.hoverColor}`,
                                  textDecoration: "none",
                                }}
                              >
                                View
                              </Link>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </CustomCard>
  );
};

export default LiqudityDetailsPage;
