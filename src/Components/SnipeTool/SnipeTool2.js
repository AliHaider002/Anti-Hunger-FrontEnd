import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import AppCtx from "../Context/MyContext";
import { useMounted } from "../../Hooks/useMounted";
import { getBasicTableData } from "../../api/serviceFee.api";
import { useTranslation } from "react-i18next";
import logo from "./bnb2.png";
import DropdownMenu from "./DropDown/Dropdown";
import Chart from "./Chart/Chart";
import {
  checkPlan,
  approveWallets,
  checkIfUserBoughtPlan,
  getExpiry,
  extendPlan,
} from "../../Controller/controller";
// import "./custom.css";
import { CustomFormControl } from "../../styles/StyledCom";
import SwapWithLimits from "./SwapWithLimits";
import PasteWallet from "./PasteWallet";
import SwapWithLimitSelect from "./SwapWithLimitSelect";
import { makeStyles } from "@material-ui/core";

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
      top: "-20px",
      // fontSize: { lg: "15px", md: "14px", sm: "auto", xs: "7px" },
      "&:placeholder": {
        color: "red !important",
      },
    },
  },
});

const useStyles = makeStyles({
  switch: {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "Wheat !important",
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#00f902 !important",
    },
  },
  radio: {
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color: "#4caf50 !important",
    },
    "& .css-135p9kp-MuiButtonBase-root-MuiRadio-root.Mui-checked": {
      color: "#4caf50 !important",
    },
    "& .css-hyxlzm": {
      color: "#00f902 !important",
    },
  },
});

const SnipeTool2 = () => {
  const classes = useStyles();
  let navigate = useNavigate();
  const ref = useRef(null);
  const isWalletConnectedContext = useContext(AppCtx);
  const [current, setCurrent] = useState(0);
  // const [form] = BaseForm.useForm()
  const [numberOfWallet, setNumbofWallet] = useState(0);
  const [valueRadio, setValueRadio] = useState("");
  const [switchStatus, setswitchStatus] = useState(false);
  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
  const [showEror, setErr] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [isPlanBouhgt, setPlanBought] = useState(false);
  const [WalletConnected, setWalltedConected] = useState(false);
  const [remainPlanTime, setRemainPlanTime] = useState(0);
  const [currentDateStatic, setcurrentDateStatic] = useState("");
  const [expirePlan, setRemainExpiryPlan] = useState("");
  const [FullExpirayDate, setFullExpirayDate] = useState("");
  const [remianTimeObj, setRemainTimeObj] = useState("");
  const [isUserAuthorized, setUserAuthorized] = useState(false);
  const [showWalletSec, setShowWalletSec] = useState(false);
  const [showWalletSec1, setShowWalletSec1] = useState(false);
  const [showWalletSec2, setShowWalletSec2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [MultipleWallets, setMultipleWallets] = useState("");
  const [selectedItems, setSelectedItems] = useState("");
  const [checkRadio1, setCheckRadio1] = useState(false);
  const [checkRadio2, setCheckRadio2] = useState(false);
  const [checkRadio3, setCheckRadio3] = useState(false);
  const [selectVal, setselectVal] = useState("");
  const [value, setValue] = useState("");
  const [valueB, setValueB] = useState("");

  // Commentable Items
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onChangeB = (e) => {
    setValueB(e.target.value);
  };

  // setInterval(function () {
  //   if (localStorage.getItem('A1') === 'A1' || localStorage.getItem('A1') === 'A2') {
  //     setShowWalletSec(true);
  //   } else {
  //     setShowWalletSec(false);
  //   }
  // }, 1000);

  setInterval(function () {
    if (
      localStorage.getItem("A1") === "A1" ||
      localStorage.getItem("A1") === "A2"
    ) {
      setShowWalletSec(true);
    } else {
      setShowWalletSec(false);
    }
  }, 1000);

  // useEffect(() => {
  //   if (localStorage.getItem('A1') === 'A1') {
  //     setShowWalletSec(true);
  //   } else if (localStorage.getItem('A1') === 'A2') {
  //     setShowWalletSec1(true);
  //   } else if (localStorage.getItem('B1') === 'B1') {
  //
  //     setShowWalletSec2(true)
  //   } else {
  //     setShowWalletSec(false)
  //     setShowWalletSec1(false)
  //     setShowWalletSec2(false)
  //   }
  // }, [localStorage.getItem('A1') , localStorage.getItem('B1')])

  const items = [
    { value: "A1", label: "A1" },
    { value: "A2", label: "A2" },
    { value: "A3", label: "A3" },
  ];

  const initialPagination = {
    current: 1,
    pageSize: 5,
  };
  const [tableData, setTableData] = useState({
    data: [],
    pagination: initialPagination,
    loading: false,
  });

  const { t } = useTranslation();

  const handleSwitch = () => {
    setswitchStatus(!switchStatus);
  };
  const handleTableChange = (pagination) => {
    fetch(pagination);
  };
  // const handleSelectChange = (event) => {
  //
  //   setSelectedItems(event.target.value);
  // };

  const handleA1SetValue = () => {
    if (selectVal === "") {
      setselectVal("Generate wallets with Private Keys");
    } else if (checkRadio1 == true) {
      localStorage.removeItem("A1");
      setselectVal("");
      setValue("");
      // localStorage.removeItem('B1');
    } else if (selectVal === "Swap with limits orders and recurring periods") {
      setselectVal(selectVal + " , " + "Generate wallets with Private Keys");
    } else if (selectVal === "Paste wallets address" && value === "2") {
      setselectVal("Generate wallets with Private Keys");
    } else {
      setselectVal(selectVal);
    }
  };

  const handleA2SetValue = () => {
    if (selectVal === "") {
      setselectVal(
        "Paste wallets address , Swap with limits orders and recurring periods"
      );
      setCheckRadio2(true);
      localStorage.setItem("B1", "B");
    } else if (selectVal === "Swap with limits orders and recurring periods") {
      setselectVal(selectVal + " , " + "Paste wallets address");
    } else if (
      selectVal === "Generate wallets with Private Keys" &&
      value === "1"
    ) {
      setselectVal("Paste wallets address");
    } else if (checkRadio3 == true) {
      setselectVal("");
      setValue("");
      setCheckRadio2(false);
      localStorage.removeItem("B1");
      localStorage.removeItem("A1");
    } else {
      setselectVal(selectVal);
    }
  };

  useEffect(() => {}, [selectVal]);

  const handleClickB = () => {
    if (selectVal === "") {
      setselectVal("Swap with limits orders and recurring periods");
    } else if (
      selectVal === "Generate wallets with Private Keys" ||
      selectVal === "Paste wallets address"
    ) {
      setselectVal(
        selectVal + " , " + "Swap with limits orders and recurring periods"
      );
    } else if (checkRadio2 == true) {
      setselectVal("");
      setValue("");
      setCheckRadio1(false);
      setCheckRadio3(false);
      localStorage.removeItem("B1");
      localStorage.removeItem("A1");
    } else {
      setselectVal(selectVal);
    }
  };

  const onChangeRadioFunc = (e) => {
    setIsApproved(false);
    setValueRadio(e.target.value);
  };

  const inputWalletNumber = (e) => {
    var value = e.target.value;
    setNumbofWallet(value);

    if (Number(value) <= 1000) {
      if (isPlanBouhgt != true) {
        setIsApproved(false);
        setValueRadio("");
      }
      setErr("");
    } else {
      setErr("max 1000 wallets at once");
    }
  };

  const approveBTN = async () => {
    try {
      setIsLoading(true);
      setErr("");

      var result = await approveWallets(valueRadio, numberOfWallet);
      if (result.success == true) {
        setTimeout(() => {
          setIsLoading(false);
          setIsApproved(true);
          payAngGenerateBtn();
        }, 10000);
      } else {
        setIsLoading(false);
        setIsApproved(false);
        setErr(result.msg);
      }
    } catch (err) {
      setIsApproved(false);
      setErr(result?.msg);
    }
  };

  // pay and Generate Button
  const payAngGenerateBtn = async () => {
    try {
      if (numberOfWallet <= 1000) {
        setIsLoading(true);
        setErr("");

        // var fee = value;

        var result = await checkPlan(valueRadio, numberOfWallet);

        if (result.success == true) {
          setIsLoading(false);
          setMultipleWallets(result.data);
          if (valueRadio == "2" || valueRadio == "3") {
            // setPlanBought(true);
            setValueRadio("007");
            setPlanBought(false);
            setTimeout(() => {
              //
              checkIfUserboutPlan();
            }, 2000);
          }
          var mainElm = document.getElementById("main-content");
          mainElm.scrollTop = mainElm.scrollHeight;
        } else {
          if (valueRadio == "007") {
            setIsApproved(true);
          } else {
            setIsApproved(false);
          }
          setIsLoading(false);
          setErr(result.msg);
        }
      } else {
        setErr("MAX 1000 WALLETS AT ONCE");
      }
    } catch (err) {
      // setIsApproved(false);
      if (valueRadio == "007") {
        setIsApproved(true);
      } else {
        setIsApproved(false);
      }
      setIsLoading(false);
    }
  };

  // plan Timer remain Plan Timer
  const checkIfUserboutPlan = async () => {
    try {
      var result = await checkIfUserBoughtPlan(
        isWalletConnectedContext?.isWalletConnected
      );

      if (result.isBoughtPlan == true) {
        setValueRadio("007");
        setIsApproved(true);
        //
        setRemainPlanTime(result.checkExpiray);

        var newDate = new Date();
        const dt = Date.parse(newDate);
        newDate = dt / 1000;
        newDate = Number(newDate) + Number(result.checkExpiray);

        setPlanBought(result.isBoughtPlan);
        setFullExpirayDate(newDate);
      } else {
        setPlanBought(result.isBoughtPlan);
        setValueRadio("");
        setIsApproved(false);
      }
    } catch (err) {
      //
    }
  };

  //  this useEffect will run when user will connect Wallet
  useEffect(() => {
    setTimeout(() => {
      checkIfUserboutPlan();
    }, 2000);
  }, [isWalletConnectedContext?.isWalletConnected]);

  useEffect(() => {
    if (checkRadio2 == false) {
      setselectVal("");
      setValue("");
      setCheckRadio1(false);
      setCheckRadio3(false);
      localStorage.removeItem("B1");
      localStorage.removeItem("A1");
    }
  }, [checkRadio2]);

  useEffect(() => {
    localStorage.removeItem("A1");
    localStorage.removeItem("B1");
  }, []);

  //
  //
  //

  //
  //
  //
  //
  // check if use has bought Plan

  //
  //
  //

  // extend Plan
  const extendPlanFun = async () => {
    try {
      setErr("");
      setRemainPlanTime("000000");
      setIsLoading(true);
      var result = await extendPlan(valueRadio);
      if (result.success == true) {
        setErr("");
        setIsLoading(false);
        setPlanBought(false);
        setTimeout(() => {
          //
          checkIfUserboutPlan();
        }, 2000);
      } else {
        setErr(result.msg);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: t("Services Fees"),
      dataIndex: "seviceFee",
      render: (text) => <span>{text}</span>,
    },
    {
      title: t("Pay Per Use"),
      dataIndex: "pay",
      render: (text) => <span>{text}</span>,
    },
    {
      title: t("1 Month"),
      dataIndex: "month",
      render: (text) => <span>{text}</span>,
    },
    {
      title: t("1 Year"),
      dataIndex: "year",
      render: (text) => {
        return (
          <>
            <span>{text}</span>
            {/* <Row gutter={[10, 10]}>
                  <Col>
                    <span>{text}</span>
                  </Col>
                </Row>
                <Row gutter={[10, 10]}>
                  <Col>
                    <span style={{ color: "#faac4d" }}>Save 33% now!</span>
                  </Col>
                </Row> */}
          </>
        );
      },
    },
  ];

  const { isMounted } = useMounted();

  const fetch = useCallback(
    (pagination) => {
      setTableData((tableData) => ({ ...tableData, loading: true }));
      getBasicTableData(pagination).then((res) => {
        if (isMounted.current) {
          setTableData({
            data: res.data,
            pagination: res.pagination,
            loading: false,
          });
        }
      });
    },
    [isMounted]
  );

  function createData(name, payPerUse, oneMonth, oneYear) {
    return { name, payPerUse, oneMonth, oneYear };
  }

  const rows = [
    createData(
      "A1. GNabienerate wallets with Private Key",
      "002 BUSD for each wallet",
      "002 BUSD one time fee, unlimited wallets generation",
      "002 BUSD one time fee, unlimited wallets generation Save 33% now!"
    ),
    createData(
      "A2. Paste wallets + B.Swap with limits orders, recurring periods and price triggering",
      "002 BUSD for each wallet",
      "002 BUSD one time fee, unlimited wallets generation",
      "002 BUSD one time fee, unlimited wallets generation Save 33% now!"
    ),
    createData(
      "B. Swap with limits orders, recuring periods and price triggering",
      "002 BUSD for each wallet",
      "002 BUSD one time fee, unlimited wallets generation",
      "002 BUSD one time fee, unlimited wallets generation Save 33% now!"
    ),
  ];

  let theme = useTheme();

  const paperStyle = {
    backgroundColor: `${theme.palette.background.mainBg}`,
    color: "white",
    width: { lg: "40%", md: "40%", sm: "auto", xs: "auto" },
    height: "55%",
    padding: "20px",
  };

  const backdropStyle = {
    backgroundColor: "rgba(1, 1, 1, 0.7)",
  };

  const [selectedValue, setSelectValue] = useState("");
  const handleSelectChange = (e) => {
    var selectedValue = e.target.value;
    setSelectValue(selectedValue);
  };

  return (
    <>
      <Box
        sx={{
          padding: "10px",
          color: `${theme.palette.background.default}`,
          // color: "text.primary"
        }}
      >
        <Box>
          <CustomFormControl
            error
            sx={{
              width: "100%",
            }}
          >
            <Select
              defaultValue="Select"
              value={selectVal === "" ? "Select" : selectVal}
              // value={selectedValue}
              fullWidth
              variant="outlined"
              inputProps={{ "aria-label": "Without label" }}
              // onChange={handleSelectChange}
            >
              <MenuItem
                selected
                sx={{
                  color: `${theme.palette.background.default}`,
                  backgroundColor: `${theme.palette.primary.main}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <Box
                  sx={{
                    width: "100% !important",
                    display: "flex !important",
                    flexDirection: {
                      lg: "row !important",
                      md: "row !important",
                      sm: "column !important",
                      xs: "column !important",
                    },
                    alignItems: "center !important",
                    justiyContent: "space-between !important",
                  }}
                >
                  <Box
                    sx={{
                      width: "100% !important",
                      display: "flex !important",
                      flexDirection: "row !important",
                      alignItems: "center !important",
                      justifyContent: "space-between !important",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "15px",
                            md: "14px",
                            sm: "auto",
                            xs: "9px",
                          },
                        }}
                      >
                        A1. Generate wallets with Private Keys
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex !important",
                        flexDirection: "column !important",
                        justifyContent: "center !important",
                        alignItems: "center !important",
                      }}
                    >
                      <RadioGroup onChange={onChange} value={value}>
                        <Radio
                          value="1"
                          onClick={() => {
                            setCheckRadio1(!checkRadio1);
                            setTimeout(() => {
                              handleA1SetValue();
                            }, 500);
                            localStorage.setItem("A1", "A1");
                          }}
                          checked={checkRadio1}
                          // size={{lg: 'medium', md:'medium', sm: "small", xs: "small"}}
                          size="small"
                          classes={{ root: classes.radio }}
                        />
                      </RadioGroup>

                      <Tooltip disableFocusListener title="Info">
                        <IconButton
                          sx={{
                            border: "1px solid white",
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                          }}
                          size="small"
                        >
                          <QuestionMarkIcon
                            sx={{ fontSize: "9px", color: "white" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      ml: "20px",
                      mr: "20px",
                      display: {
                        lg: "block",
                        md: "block",
                        sm: "none",
                        xs: "none",
                      },
                    }}
                  >
                    <Typography> | </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color:
                            checkRadio1 && checkRadio2
                              ? `${theme.palette.background.hoverColor}`
                              : "white",
                          fontSize: {
                            lg: "15px",
                            md: "14px",
                            sm: "auto",
                            xs: "9px",
                          },
                        }}
                      >
                        A2. Paste wallets address
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <RadioGroup onChange={onChange} value={value}>
                        <Radio
                          disabled={checkRadio1 && checkRadio2}
                          value="2"
                          onClick={() => {
                            setCheckRadio3(!checkRadio3);
                            setTimeout(() => {
                              handleA2SetValue();
                            }, 500);
                            localStorage.setItem("A1", "A2");
                          }}
                          checked={checkRadio3}
                          size="small"
                          classes={{ root: classes.radio }}
                        />
                      </RadioGroup>

                      <Tooltip
                        disableFocusListener
                        title={checkRadio1 && checkRadio2 ? "Disabled" : "Info"}
                      >
                        <IconButton
                          sx={{
                            border: "1px solid white",
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                          }}
                          size="small"
                        >
                          <QuestionMarkIcon
                            sx={{ fontSize: "9px", color: "white" }}
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: { lg: "48.5%", md: "47.5%", sm: "100%", xs: "100%" },
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&hover": {
                      backgroundColor: "red",
                    },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: {
                          lg: "15px",
                          md: "14px",
                          sm: "auto",
                          xs: "8px",
                        },
                      }}
                    >
                      B. Swap with limits orders and recurring periods
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Radio
                      onClick={() => {
                        setCheckRadio2(!checkRadio2);
                        setTimeout(() => {
                          handleClickB();
                        }, 500);
                        localStorage.setItem("B1", "B");
                      }}
                      checked={checkRadio2}
                      size="small"
                      classes={{ root: classes.radio }}
                    />

                    <Tooltip disableFocusListener title="Info">
                      <IconButton
                        sx={{
                          border: "1px solid white",
                          borderRadius: "50%",
                          width: "10px",
                          height: "10px",
                        }}
                        size="small"
                      >
                        <QuestionMarkIcon
                          sx={{ fontSize: "9px", color: "white" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </MenuItem>
              {/* <MenuItem
              sx={{
                color: `${theme.palette.background.default}` ,
                backgroundColor: `${theme.palette.primary.main}`
              }}
              selected
              >
                <Box
                  sx={{
                    width: { lg: "48%", md: "48%", sm: "100%", xs: "100%" },
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    "&hover": {
                      backgroundColor: "red"
                    }
                  }}
                >
                  <Box>
                    <Typography
                    sx={{ fontSize: { lg: "15px", md: "14px", sm: "auto", xs: "8px" } }}
                    >
                      B. Swap with limits orders and recurring periods
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Radio
                      onClick={() => {
                        setCheckRadio2(!checkRadio2)
                        setTimeout(() => {
                          handleClickB();
                        }, 500);
                        localStorage.setItem("B1", "B")
                      }}
                      checked={checkRadio2}
                      size='small'
                      classes={{ root: classes.radio }}
                    />

                    <Tooltip disableFocusListener title="Info">
                      <IconButton
                        sx={{
                          border: "1px solid white",
                          borderRadius: "50%",
                          width: "10px",
                          height: "10px"
                        }}
                        size='small'
                      >
                        <QuestionMarkIcon sx={{ fontSize: "9px", color: "white" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </MenuItem> */}
            </Select>
          </CustomFormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "10px",
            mb: "30px",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      color: `${theme.palette.background.hoverColor}`,
                    }}
                  >
                    Services Fees Table
                  </Typography>
                </Box>
                <Box sx={{ ml: "20px" }}>
                  <Switch
                    onClick={handleSwitch}
                    checked={switchStatus}
                    classes={{ root: classes.switch }}
                  />
                </Box>
              </Box>
            </Grid>
            {/* Remain Timer COmponent */}
            <Grid item lg={6} md={6} sm={12} xs={12} className="TimerBox">
              {/* <Box>{isPlanBouhgt ? <Timer expiryTime={remainPlanTime} /> : ''}</Box> */}
            </Grid>
          </Grid>
        </Box>
        {switchStatus ? (
          <Box
            sx={{
              padding: "10px",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                overflowX: {
                  lg: "auto",
                  md: "auto",
                  sm: "scroll",
                  xs: "scroll",
                },
                backgroundColor: "#2b2b2b",
              }}
            >
              <Table
                sx={{
                  minWidth: 650,
                  backgroundColor: `${theme.palette.background.mainBg}`,
                }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow
                    sx={{ " td,  th": { border: 1, borderColor: "white" } }}
                  >
                    <TableCell
                      sx={{
                        color: `${theme.palette.background.default}`,
                        fontWeight: "bold",
                      }}
                    >
                      Services Fees
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: `${theme.palette.background.default}`,
                        fontWeight: "bold",
                      }}
                    >
                      Pay Per Use
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: `${theme.palette.background.default}`,
                        fontWeight: "bold",
                      }}
                    >
                      1 Month&nbsp;(g)
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: `${theme.palette.background.default}`,
                        fontWeight: "bold",
                      }}
                    >
                      1 Year&nbsp;(g)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ " td,  th": { border: 1, borderColor: "white" } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        {row.payPerUse}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        {row.oneMonth}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        {row.oneYear}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          ""
        )}
        {showWalletSec ? (
          <Box>
            <Box>
              <Box sx={{ mb: "10px", padding: "10px" }}>
                <Typography
                  sx={{
                    color: `${theme.palette.background.hoverColor}`,
                  }}
                >
                  Wallet
                </Typography>
              </Box>
              <Box>
                <CssTextField
                  type="text"
                  variant="outlined"
                  placeholder="Input the number of wallet to generate max 1000 wallets at time"
                  onChange={inputWalletNumber}
                  fullWidth
                  id="customID"
                  // autoComplete={false}
                  // onFocus={handleClick}
                  // autoHighlight={false}
                  //onChange={handleSearchValue}
                />
              </Box>

              <>
                {isWalletConnectedContext?.isAuthorizedUser ? (
                  <></>
                ) : (
                  <>
                    <Box sx={{ mt: "20px", mb: "10px" }}>
                      {isPlanBouhgt ? (
                        <>
                          <Typography
                            sx={{
                              color: `${theme.palette.background.hoverColor}`,
                            }}
                          >
                            Extend Plan
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography
                            sx={{
                              color: `${theme.palette.background.hoverColor}`,
                            }}
                          >
                            Pay and Generate
                          </Typography>
                        </>
                      )}
                    </Box>

                    {isPlanBouhgt ? (
                      <>
                        <Box
                          sx={{
                            // width: { lg: '48%', md: '60%', sm: '100%', xs: '100%' },
                            display: "flex",
                            flexDirection: {
                              lg: "row",
                              md: "row",
                              sm: "row",
                              xs: "column",
                            },
                            justifyContent: "space-around",
                            mt: "30px",
                            width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              width: {
                                lg: "20%",
                                md: "40%",
                                sm: "40%",
                                xs: "100%",
                              },
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  color: `${theme.palette.background.hoverColor}`,
                                }}
                              >
                                Extend For 1 Month
                              </Typography>
                            </Box>
                            <Box>
                              <RadioGroup
                                onChange={onChangeRadioFunc}
                                value={valueRadio}
                              >
                                <Radio
                                  value="2"
                                  classes={{ root: classes.radio }}
                                />
                              </RadioGroup>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: {
                                lg: "40%",
                                md: "50%",
                                sm: "50%",
                                xs: "100%",
                              },
                              margin: "auto",
                              // width: '100%',
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  color: `${theme.palette.background.hoverColor}`,
                                }}
                              >
                                Extend For 1 year
                              </Typography>
                            </Box>
                            <Box>
                              <RadioGroup
                                onChange={onChangeRadioFunc}
                                value={valueRadio}
                              >
                                <Radio
                                  value="3"
                                  classes={{ root: classes.radio }}
                                />
                              </RadioGroup>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box
                          sx={{
                            width: {
                              lg: "48%",
                              md: "60%",
                              sm: "100%",
                              xs: "100%",
                            },
                            display: "flex",
                            flexDirection: {
                              lg: "row",
                              md: "row",
                              sm: "row",
                              xs: "column",
                            },
                            justifyContent: "space-around",
                            mt: "30px",
                            // width: '100%',
                          }}
                        >
                          <Box
                            sx={{
                              width: {
                                lg: "25%",
                                md: "30%",
                                sm: "25%",
                                xs: "100%",
                              },
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  color: `${theme.palette.background.hoverColor}`,
                                }}
                              >
                                Pay per use
                              </Typography>
                            </Box>

                            <Box>
                              <RadioGroup
                                onChange={onChangeRadioFunc}
                                value={valueRadio}
                              >
                                <Radio
                                  value="1"
                                  // sx={{
                                  //   color: "white"
                                  // }}
                                  classes={{ root: classes.radio }}
                                />
                              </RadioGroup>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              width: {
                                lg: "25%",
                                md: "25%",
                                sm: "20%",
                                xs: "100%",
                              },
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  color: `${theme.palette.background.hoverColor}`,
                                }}
                              >
                                1 Month
                              </Typography>
                            </Box>
                            <Box>
                              <RadioGroup
                                onChange={onChangeRadioFunc}
                                value={valueRadio}
                                classes={{ root: classes.radio }}
                              >
                                <Radio value="2" />
                              </RadioGroup>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              width: {
                                lg: "25%",
                                md: "25%",
                                sm: "20%",
                                xs: "100%",
                              },
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  color: `${theme.palette.background.hoverColor}`,
                                }}
                              >
                                1 Year
                              </Typography>
                            </Box>
                            <Box>
                              <RadioGroup
                                onChange={onChangeRadioFunc}
                                value={valueRadio}
                                classes={{ root: classes.radio }}
                              >
                                <Radio value="3" />
                              </RadioGroup>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    )}
                  </>
                )}
              </>
            </Box>
            <Box sx={{ marginTop: "50px" }}>
              {/* show Erro */}
              <Typography
                sx={{
                  textTransform: "uppercase",
                  fontSize: "14px",
                  color: "red",
                  textAlign: "center",
                }}
              >
                {showEror}
                {/* How are you */}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  // mt: '0px',
                  mt: "20px",
                }}
              >
                {isWalletConnectedContext?.isWalletConnected ? (
                  <>
                    {isApproved ? (
                      <>
                        {isPlanBouhgt ? (
                          <>
                            <Grid
                              container
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Grid
                                item
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  disabled={
                                    numberOfWallet === 0 ||
                                    numberOfWallet === ""
                                      ? true
                                      : false
                                  }
                                  onClick={payAngGenerateBtn}
                                  // loading={isLoading}
                                  sx={{
                                    border: `1px solid ${theme.palette.background.hoverColor}`,
                                    color: `${theme.palette.background.default}`,
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
                                  {isLoading ? <>GENERATING</> : "GENERATE"}
                                </Button>
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          <>
                            {isLoading ? (
                              <>
                                <Grid
                                  container
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      disabled={
                                        numberOfWallet === 0 &&
                                        valueRadio == "007"
                                          ? true
                                          : false
                                      }
                                      onClick={payAngGenerateBtn}
                                      // loading={isLoading}
                                      sx={{
                                        border: `1px solid ${theme.palette.background.hoverColor}`,
                                        color: `${theme.palette.background.default}`,
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
                                      PLEASE WAIT, WALLETS ARE BEING GENERATED
                                    </Button>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              <>
                                <Grid
                                  container
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      disabled={
                                        numberOfWallet === 0 &&
                                        valueRadio == "007"
                                          ? true
                                          : false
                                      }
                                      onClick={payAngGenerateBtn}
                                      // loading={isLoading}
                                      sx={{
                                        border: `1px solid ${theme.palette.background.hoverColor}`,
                                        color: `${theme.palette.background.default}`,
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
                                      PAY AND GENERATE
                                    </Button>
                                  </Grid>
                                </Grid>
                              </>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {isPlanBouhgt ? (
                          <>
                            <Grid
                              container
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <Grid
                                item
                                lg={4}
                                md={4}
                                sm={12}
                                xs={12}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Button
                                  disabled={valueRadio === "" ? true : false}
                                  onClick={extendPlanFun}
                                  // loading={isLoading}
                                  sx={{
                                    border: `1px solid ${theme.palette.background.hoverColor}`,
                                    color: `${theme.palette.background.default}`,
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
                                  {isLoading ? "UPDATING PLAN" : "EXTEND PLAN"}
                                </Button>
                              </Grid>
                            </Grid>
                          </>
                        ) : (
                          <>
                            {isWalletConnectedContext?.isAuthorizedUser ? (
                              <>
                                <Grid
                                  container
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      disabled={
                                        numberOfWallet === 0 ||
                                        numberOfWallet === ""
                                          ? true
                                          : false
                                      }
                                      onClick={payAngGenerateBtn}
                                      // loading={isLoading}
                                      sx={{
                                        border: `1px solid ${theme.palette.background.hoverColor}`,
                                        color: `${theme.palette.background.default}`,
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
                                      {isLoading ? <>GENERATING</> : "GENERATE"}
                                    </Button>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              <>
                                <Grid
                                  container
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Grid
                                    item
                                    lg={4}
                                    md={4}
                                    sm={12}
                                    xs={12}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      disabled={
                                        numberOfWallet === 0 ||
                                        valueRadio === ""
                                          ? true
                                          : false
                                      }
                                      onClick={approveBTN}
                                      // loading={isLoading}
                                      block
                                      sx={{
                                        border: `1px solid ${theme.palette.background.hoverColor}`,
                                        color: `${theme.palette.background.default}`,
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
                                      {isLoading
                                        ? "APPROVING"
                                        : "APPROVE TO PAY AND GENERATE"}
                                    </Button>
                                  </Grid>
                                </Grid>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Grid
                      container
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Grid
                        item
                        lg={4}
                        md={4}
                        sm={12}
                        xs={12}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          // disabled={numberOfWallet === 0 || valueRadio === '' ? true : false}
                          onClick={() => {
                            setIsBasicModalVisible(true);
                          }}
                          // loading={isLoading}
                          // style={{ whiteSpace: "normal", height: "auto" }}

                          sx={{
                            border: `1px solid ${theme.palette.background.hoverColor}`,
                            color: `${theme.palette.background.default}`,
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
                          {t("APPROVE TO PAY AND GENERATE")}
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
                      </Grid>
                    </Grid>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default SnipeTool2;
