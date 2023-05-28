import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AppCtx from "../Context/MyContext";
import { useParams } from "react-router-dom";
import { currentTokenData } from "../../utils/hooks/instances";
import { getLockedBNbById } from "../../utils/APIs/apis";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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
  const { addMaxAmmount, useVesting } = props;
  const isWalletConnectedContext = useContext(AppCtx);
  const [copyData, setcopyData] = useState("copy");
  const [displayCopySlug, setdisplayCopySlug] = useState("none");
  const [displayOwnerField, setdisplayOwnerField] = useState("none");
  // const [isOwnerField, setownerField]= useState<boolean>(false)
  const [invalidTokenErr, setinvalidTokenErr] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBNBLock, setIsBNBLock] = useState(false);
  const [getCurrentTokenData, setCurrentTokenData] = useState([]);
  const [addressToCopy, setAddressToCopy] = useState(
    "0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5"
  );
  const [apiLoader, setapiLoader] = useState(false);

  const paramData = useParams();

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

  useEffect(() => {
    if (paramData.name == "token") {
      const changeTokenAddress = async () => {
        setinvalidTokenErr("");
        setapiLoader(true);
        var value = paramData.Addr;
        // setTokenAddress(value)

        if (isWalletConnectedContext?.isWalletConnected == true) {
          var currentTokenContract = await currentTokenData(value);

          if (currentTokenContract.success == false) {
            setinvalidTokenErr("invalid Token");
            setCurrentTokenData([]);
            // setapiLoader(false)
          } else {
            setCurrentTokenData(currentTokenContract.tokenData);
            setinvalidTokenErr("");
            setapiLoader(false);
          }
        } else {
          setCurrentTokenData([]);
        }
      };
      changeTokenAddress();
    }

    if (paramData.name == "bnb") {
      const getBNBData = async () => {
        var bnbID = paramData.id;
        setapiLoader(true);

        var currentBNBData = await getLockedBNbById(bnbID);
        if (currentBNBData.success == true) {
          setapiLoader(false);
          setCurrentTokenData(currentBNBData.data);
        } else {
          setinvalidTokenErr(false);
        }
      };
      getBNBData();
    }
  }, []);

  useEffect(() => {
    function detechInnerWidth() {
      if (window.innerWidth < 600) {
        setAddressToCopy("0x5E....4a5");
      } else {
        setAddressToCopy("0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5");
      }
    }

    // fetch token Token Data

    setInterval(() => {
      detechInnerWidth();
    }, 2000);
  }, []);

  const theme = useTheme();
  return (
    <Box
      sx={{
        color: `${theme.palette.background.default}`,
        padding: "10px",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          fontSize: "16px",
          marginBottom: "30px",
          borderBottom: "1px solid #5c5c5c",
          padding: "20px 10px",
          paddingTop: "0px",
        }}
      >
        <Typography>Edit Your Lock</Typography>
      </Box>
      <Box sx={{ marginBottom: "20px" }}>
        {getCurrentTokenData.map((item, index) => {
          return (
            <Box
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                fontSize: "14px",
                margin: "5px,0px",
                borderBottom: "1px solid #5c5c5c",
                padding: "10px 10px",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography key={index + 1}>{item.name}</Typography>
              </Box>

              <Box sx={{ width: "50%", textAlign: "right", fontWeight: "300" }}>
                <Typography key={index + 2}>
                  {item.value ? item.value : "0"}
                </Typography>
              </Box>
            </Box>
          );
        })}

        {apiLoader ? (
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
      <Box sx={{ position: "relative" }}>
        <TextField placeholder="Enter Amount" />
        {/* <Button sx={{fontWeight : "bold",position : "absolute", top:"50%", right:"-20px", transform:"translate(-50%,-50%)"}} >MAX</Button> */}

        {paramData.name == "bnb" ? (
          ""
        ) : (
          <Button
            sx={{
              fontWeight: "bold",
              position: "absolute",
              top: "59px",
              right: "-20px",
              transform: "translate(-50%,-50%)",
            }}
            onClick={addMaxAmmount}
          >
            MAX
          </Button>
        )}
      </Box>
      {useVesting ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Box sx={{ position: "relative" }}>
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
                  <input
                    type="datetime-local"
                    className="dateTimePicker"
                    placeholder="Select Date"
                  />
                  {/* <CssTextField placeholder="EX:10" id="customID"/> */}
                  <QuestionMarkIcon
                    title="on which date youw an to release tokens"
                    style={{
                      position: "absolute",
                      top: "59px",
                      right: "0px",
                      transform: "translate(-50%,-50%)",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box sx={{ position: "relative" }}>
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
                  <CssTextField placeholder="EX:10" id="customID" />
                  <QuestionMarkIcon
                    style={{
                      position: "absolute",
                      top: "59px",
                      right: "0px",
                      transform: "translate(-50%,-50%)",
                      cursor: "pointer",
                    }}
                    title="Percentage tokens that you want to release"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box sx={{ position: "relative" }}>
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
                  <CssTextField placeholder="EX:10" id="customID" />

                  <QuestionMarkIcon
                    title="cycle days"
                    style={{
                      position: "absolute",
                      top: "59px",
                      right: "0px",
                      transform: "translate(-50%,-50%)",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Box sx={{ position: "relative" }}>
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
                  <CssTextField placeholder="EX:10" id="customID" />
                  <QuestionMarkIcon
                    title="how much percentage you want to release on every cycle day"
                    style={{
                      position: "absolute",
                      top: "59px",
                      right: "0px",
                      transform: "translate(-50%,-50%)",
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 550,
              color: "#00f902",
              paddingBottom: "10px",
            }}
          >
            Lock until (UTC time)
          </Typography>
          <input
            type="datetime-local"
            className="dateTimePicker"
            placeholder="Select date"
          />
        </>
      )}

      <Box
        sx={{
          padding: "20px 5px",
        }}
      >
        <div
          style={{
            padding: "5px",
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
            }}
          >
            Please exclude 0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5{" "}
            <ContentCopyIcon onClick={copyBtnFun} /> from fees, rewards, max tx
            amount to start sending tokens
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default Step1;
