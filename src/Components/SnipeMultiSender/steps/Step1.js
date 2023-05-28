import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import AppCtx from "../../Context/MyContext";
import { currentTokenData } from "../../../utils/hooks/instances";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import useCookie from "react-use-cookie";
import { getLockFeeDetails } from "../../../utils/hooks/pinkLock";

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

const Step1 = (props) => {
  const {
    setDispayNext,
    setApprovalGiven,
    setdisPlayApprove,
    setIsApproved,
    updateCSV,
    updateBtnDesciderValue,
    setError,
    setBtnBol,
    setFields,
    handleTextArea,
  } = props;
  const isWalletConnectedContext = useContext(AppCtx);
  const [selectValue, setSelectValue] = useState("");
  var [dispayField, setDispayField] = useState("block");
  const [feeDetials, setFeeDetials] = useState(
    "connect Wallet to Check Fee Details"
  );

  // const [isApproved, setIsApproved]= useState<boolean>(false)
  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
  const [copyData, setcopyData] = useState("copy");
  const [displayCopySlug, setdisplayCopySlug] = useState("none");
  const [tokenDataAry, setTokenDataAry] = useState([]);
  const [addressToCopy, setAddressToCopy] = useState(
    "0x000000000000000000000000000000000000000"
  );
  // "0x5E5b9bE5fd939c578ABE5800a90C566eeEbA44a5"
  const [IsBasicCsvModalVisible, setIsBasicCsvModalVisible] = useState(false);
  const [csvText, setCsvText] = useState("");
  const normFile = (e = { fileList: [] }) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleAllocationField = () => {
    setIsApproved(false);
    setdisPlayApprove("block");
    setApprovalGiven(false);
    setDispayNext("none");

    // setCsvText(e.target.value);
    // setFields(
    //   { name: "Token address", value: "" },
    //   { name: "Allocations", value: e.target.value }
    // );

    updateCSV(csvText);

    setBtnBol(true);
    setAllocationsEr(false);
  };

  // console.log("CheckTextFormate", csvText);
  // handleTextArea(handleAllocationField);
  // return handleAllocationField;
  // handleAllocationField();

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

  const handleSelectChange = (e) => {
    var selectedValue = e.target.value;
    localStorage.removeItem("keepAddress");
    localStorage.removeItem("deleteAddress");
    setSelectValue(selectedValue);
    updateBtnDesciderValue(selectedValue);

    var boolValue = true;
    localStorage.setItem("anyValueSelected", boolValue);
    if (selectedValue == "BNB Transfers") {
      setDispayField("none");
      setTokenDataAry([]);
    } else {
      setDispayField("block");
    }
  };

  console.log("CheckContetx2", isWalletConnectedContext);

  const copyBtnFun = () => {
    navigator.clipboard.writeText(
      isWalletConnectedContext?.multiSenderContractContext
        ? isWalletConnectedContext?.multiSenderContractContext
        : "Please Connect Wallet"
    );
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

    //  array.map((item:any)=>{
    //    Object.values(item).map((val:any) => (
    //     tmpArray.push(val)
    //     ))
    //   });
    //   tmpArray.join(",")
    //

    console.log("ThisIsCSVArray", csvRows.join("\n"));

    updateCSV(csvRows.join("\n"));
    // updateCSV(csvText);
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
    let value = e.target.value;

    setTokenDataAry([]);
    var isWalletConnected = isWalletConnectedContext?.isWalletConnected;

    if (value) {
      var currentTokenContract = await currentTokenData(value);
      localStorage.setItem("tokenAddress", value);

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
        setAddressToCopy("0x00...000");
      } else {
        setAddressToCopy("0x000000000000000000000000000000000000000");
      }
    }

    setInterval(() => {
      detechInnerWidth();
    }, 2000);
  });

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const theme = useTheme();

  const backdropStyle = {
    backgroundColor: "rgba(1, 1, 1, 0.7)",
  };
  const paperStyle = {
    backgroundColor: `${theme.palette.background.mainBg}`,
    color: "white",
    width: "40%",
    height: "auto",
    padding: "20px",
  };

  const [allocationsEr, setAllocationsEr] = useState(false);

  const handleErrorAllocations = () => {
    setAllocationsEr(true);
  };

  return (
    <Box
      sx={{
        padding: "10px",
        color: theme.palette.background.default,
      }}
    >
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
              value={
                isWalletConnectedContext.CurrencyNameContext
                  ? `${isWalletConnectedContext.CurrencyNameContext} Transfers`
                  : "BNB Transfers"
              }
              sx={{
                color: `${theme.palette.background.default}`,
                backgroundColor: `${theme.palette.primary.main}`,
              }}
            >
              {isWalletConnectedContext.CurrencyNameContext ? (
                <>{isWalletConnectedContext.CurrencyNameContext} Transfers</>
              ) : (
                "BNB Transfers"
              )}
            </MenuItem>
          </Select>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#DEE2EE",
            }}
          >
            Snipe Sender easily allows you to send ERC20 Token in batch. Select
            an option to send tokens or bnb.
          </Typography>
          <Box sx={{ mt: "10px", fontSize: "12px ", fontWeight: "500" }}>
            <span style={{ color: "#AFACAC" }}>{feeDetials}</span>
          </Box>
        </CustomFormControl>
      </Box>
      <Box
        sx={{
          display: dispayField,
        }}
      >
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
              width: "100%",
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
            // onClick={handleAllocationField}
            onChange={(e) => setCsvText(e.target.value)}
            // onChange={handleSearchValue}
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
              fontSize: "14px",
              fontWeight: 450,
              color: "#DEE2EE",
              paddingTop: "20px",
              paddingBottom: "10px",
            }}
          >
            Click here to Confirm allocations{" "}
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Button
            variant="contained"
            // disabled={csvText ? false : true}
            sx={{
              color: "white",
              border: "1px solid white",
              background: "transparent",
              // border: `1px solid ${theme.palette.background.hoverColor}`,
              // background: theme.palette.background.hoverColor,
              mt: "10px",
              textTransform: "capitalize",
              "&:hover": {
                borderColor: theme.palette.background.hoverColor,
                background: "transparent",
              },
            }}
            onClick={csvText ? handleAllocationField : handleErrorAllocations}
          >
            Confirm Allocations
          </Button>
          {allocationsEr ? (
            <Box>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 450,
                  color: "#DEE2EE",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                  color: "red",
                  textAlign: "center",
                }}
              >
                Must Confirm Allocations
              </Typography>
            </Box>
          ) : (
            ""
          )}

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
            padding: "5px",

            borderRadius: "5px",
            // paddingLeft: "10px",
            // paddingTop: "5px",
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
            <Button
              sx={{ margin: "0px", padding: "0px", width: "1px" }}
              onClick={copyBtnFun}
              onMouseOver={copyBtnMouseOver}
            >
              <ContentCopyIcon />
            </Button>{" "}
            from fees, rewards, max tx amount to start sending tokens
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default Step1;
