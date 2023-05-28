import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme, styled } from "@mui/material/styles";
import { useTransition } from "react";
import logo from "./bnb2.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import DropdownMenu from "./DropDown/Dropdown";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const SwapWithLimits = (props) => {
  const { MultipleWallets } = props;
  const theme = useTheme();
  // const t = useTransition();
  const [fields, setFields] = useState([
    { name: "login", value: "Jerri" },
    { name: "password", value: "123456" },
    { name: "confirmPassword", value: "123456" },
    { name: "salutation", value: "mr" },
    { name: "gender", value: "male" },
    { name: "firstName", value: "John" },
    { name: "lastName", value: "Black" },
    // { name: 'birthday', value: Dates.getDate(1576789200000) },
    { name: "phone", value: "298573124" },
    { name: "email", value: "" },
    { name: "address1", value: "Slobodskay street" },
    { name: "address2", value: "Nevski street" },
    { name: "zipCode", value: "435123" },
    { name: "city", value: "Minsk" },
    { name: "country", value: "Belarus" },
    { name: "prefix", value: "+7" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  // const formLabels = {
  //   login: t("forms.stepFormLabels.login"),
  //   password: t("common.password"),
  //   confirmPassword: t("common.confirmPassword"),
  //   salutation: t("forms.stepFormLabels.salutation"),
  //   gender: t("forms.stepFormLabels.gender"),
  //   firstName: t("common.firstName"),
  //   lastName: t("common.lastName"),
  //   birthday: t("forms.stepFormLabels.birthday"),
  //   phone: t("common.phone"),
  //   email: t("common.email"),
  //   address1: `${t("common.address")} 1`,
  //   address2: `${t("common.address")} 2`,
  //   zipCode: t("common.zipcode"),
  //   city: t("common.city"),
  //   country: t("common.country")
  // }

  // const formValues = fields
  //   .filter(item => item.name !== "prefix")
  //   .map(item => ({
  //     name: formLabels[item.name],
  //     value: String(
  //       item.name === "birthday" && item.value
  //         ? item.value.format("YYYY-MM-DD")
  //         : item.value
  //     )
  //   }))

  // const next = () => {
  //   form.validateFields().then(() => {
  //     setCurrent(current + 1)
  //   })
  // }

  const prev = () => {
    setCurrent(current - 1);
  };

  // const onFinish = () => {
  //   setIsLoading(true)
  //   setTimeout(() => {
  //     notificationController.success({ message: t("common.success") })
  //     setIsLoading(false)
  //     setCurrent(0)
  //   }, 1500)
  // }

  const steps = [
    {
      title: "Choice Service",
    },
    {
      title: "Pay and obtain service",
    },
    {
      title: "Confirmation",
    },
  ];

  // const formFieldsUi = [
  //   <Step1 key="1" />,
  //   <Step2 key="2" />,
  //   <Step3 key="3" />
  //   // <Step4 key="4" formValues={formValues} />,
  // ]

  const swapData = [
    {
      id: "1",
      address: "0xfBKiiytBKiisjaoJJIksaiIji54V",
      private: "Private key 1 : animal free easy",
      bnbDrop: "sa",
      cakeDropdown: "cake",
      prefrence: "prefence",
    },
    {
      id: "2",
      address: "0xfBKiiytBKiisjaoJJIksaiIji54V",
      private: "Private key 1 : animal free easy",
      bnbDrop: "sa",
      cakeDropdown: "cake",
      prefrence: "prefence",
    },
    {
      id: "3",
      address: "0xfBKiiytBKiisjaoJJIksaiIji54V",
      private: "Private key 1 : animal free easy",
      bnbDrop: "sa",
      cakeDropdown: "cake",
      prefrence: "prefence",
    },
    {
      id: "4",
      address: "0xfBKiiytBKiisjaoJJIksaiIji54V",
      private: "Private key 1 : animal free easy",
      bnbDrop: "sa",
      cakeDropdown: "cake",
      prefrence: "prefence",
    },
  ];
  const [value, setValue] = useState();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const positionMenu = (
    <MenuItem style={{ padding: "10px", width: "200px" }}>
      <Box sx={{ mb: "10px" }}>
        <TextField placeholder="Paste address" />
      </Box>
      <Box>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Token Name
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Symbol
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Decimals
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Liquidity
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Fee on transfer-sell-buy,
        </Typography>
      </Box>
    </MenuItem>
  );

  const prefrenceMenu = (
    <MenuItem
      style={{
        padding: "10px",
        position: "relative",
        zIndex: "1",
        width: "250px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: "20px",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: "12px" }}>SET PREFERENCES</Typography>
        </Box>
        <Box sx={{ ml: "10px" }}>
          <Tooltip
            disableFocusListener
            title="Set Preferences"
            sx={{
              width: "10px",
            }}
          >
            <IconButton
              sx={{
                border: "1px solid white",
                borderRadius: "50%",
                width: "10px",
                height: "10px",
              }}
            >
              <QuestionMarkIcon sx={{ fontSize: "9px", color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ mb: "10px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mr: "10px", fontSize: "10px" }}>Set Date</Box>
          <Box>
            <RadioGroup onChange={onChange} value={value}>
              <Radio value="1" />
            </RadioGroup>
          </Box>
        </Box>
        {/* <DayjsDatePicker style={{ width: '100%', height: '26px' }} /> */}
        <input
          type="date"
          style={{
            width: "100%",
            height: "26px",
            backgroundColor: "#25284B",
            color: "#9292a0",
            border: "1px solid #a9a9a9",
            borderRadius: "25px",
            fontSize: "16px",
            padding: "11.4px 11px",
          }}
        ></input>
      </Box>
      <Box sx={{ mb: "10px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mr: "10px", fontSize: "10px" }}>Set Price Limit</Box>
          <Box>
            <RadioGroup onChange={onChange} value={value}>
              <Radio value="2" />
            </RadioGroup>
          </Box>
        </Box>
        <TextField
          style={{ width: "80px", height: "26px", borderRadius: "25px" }}
        />
      </Box>
      <Box sx={{ mb: "30px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mr: "10px", fontSize: "10px" }}>Recurring</Box>
          <Box>
            <RadioGroup onChange={onChange} value={value}>
              <Radio value="3" />
            </RadioGroup>
          </Box>
        </Box>
        <TextField
          placeholder="Days"
          style={{ width: "60px", height: "26px", borderRadius: "25px" }}
        />
      </Box>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: 'space-between',
          }}
        >
          <Box sx={{ mr: "10px", fontSize: "10px" }}>All wallets</Box>
          <Box>
            <RadioGroup onChange={onChange} value={value}>
              <Radio value="4" />
            </RadioGroup>
          </Box>
        </Box>
      </Box>
    </MenuItem>
  );

  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
  const [IsBasicModalVisible1, setIsBasicModalVisible1] = useState(false);
  const [switchStatus, setswitchStatus] = useState(false);
  const [switchStatus1, setswitchStatus1] = useState(false);

  const handleSwitch = () => {
    setswitchStatus(!switchStatus);
  };
  const handleSwitch1 = () => {
    setswitchStatus1(!switchStatus1);
  };

  return (
    <>
      <Box>
        <Box sx={{ mb: "10px" }}>
          <Typography
            sx={{
              color: `${theme.palette.background.hoverColor}`,
            }}
          >
            B. Swap with limits orders and recuring periods
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: "20px" }}>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Grid container spacing={1}>
            <Grid item lg={1} md={1} sm={1} xs={1}>
              <Typography
                sx={{
                  fontSize: { lg: "auto", md: "13px", sm: "10px", xs: "8px" },
                  color: `${theme.palette.background.default}`,
                }}
              >
                ID
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Typography
                sx={{
                  fontSize: { lg: "auto", md: "13px", sm: "10px", xs: "8px" },
                  color: `${theme.palette.background.default}`,
                }}
              >
                ADDRESS
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Typography
                sx={{
                  fontSize: { lg: "auto", md: "13px", sm: "10px", xs: "8px" },
                  color: `${theme.palette.background.default}`,
                }}
              >
                Private Keys
              </Typography>
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={2}>
              <Typography
                sx={{
                  fontSize: { lg: "auto", md: "13px", sm: "10px", xs: "8px" },
                  color: `${theme.palette.background.default}`,
                }}
              >
                Swap From
              </Typography>
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={2}>
              <Typography
                sx={{
                  fontSize: { lg: "auto", md: "13px", sm: "10px", xs: "8px" },
                  color: `${theme.palette.background.default}`,
                }}
              >
                Swap For
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{
              border: "1px solid white",
              mt: "20px",
              borderRadius: "10px",
              height: "250px",
              overflow: "scroll",
              // position: 'relative',
              // zIndex: '1',
            }}
          >
            {MultipleWallets &&
              MultipleWallets.publickeys?.map((v, i) => {
                return (
                  <>
                    <Grid item lg={1} md={1} sm={1} xs={1}>
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "auto",
                            md: "13px",
                            sm: "10px",
                            xs: "8px",
                          },
                          textAlign: "justify",
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        {i}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={2}>
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "auto",
                            md: "13px",
                            sm: "10px",
                            xs: "8px",
                          },
                          overflowWrap: "anywhere",
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        {v}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={2}>
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "auto",
                            md: "13px",
                            sm: "10px",
                            xs: "8px",
                          },
                          overflowWrap: "anywhere",
                          color: `${theme.palette.background.default}`,
                        }}
                      >
                        {MultipleWallets.privateKeys[i]}
                      </Typography>
                    </Grid>
                    <Grid item lg={1.5} md={1.5} sm={1.5} xs={2}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <img src={logo} width="15px" />
                        </Box>
                        <Box
                          sx={{
                            mr: { lg: "10px", md: "0px", sm: "0px", xs: "0px" },
                          }}
                        >
                          {/* <DropdownMenu overlay={positionMenu} trigger={["click"]}>
                            <Button
                              sx={{
                                padding: "0px",
                                margin: "0px",
                                fontSize: {
                                  lg: "auto",
                                  md: "auto",
                                  sm: "auto",
                                  xs: "8px"
                                },
                                color: "white"
                              }}
                              variant="text"
                              // onClick={(e) => e.preventDefault()}
                              endIcon={
                                <ExpandMoreIcon
                                  sx={{
                                    fontSize: {
                                      lg: "auto",
                                      md: "auto",
                                      sm: "auto",
                                      xs: "8px"
                                    }
                                  }}
                                />
                              }
                            >
                              BNB
                            </Button>
                          </DropdownMenu> */}
                        </Box>
                        <Box
                          sx={{
                            display: {
                              lg: "block",
                              md: "block",
                              sm: "none",
                              xs: "none",
                            },
                            width: "60px",
                            height: "27px",
                            backgroundColor: "#3e517e",
                            border: "1px solid #3e517e",
                            borderRadius: "20px",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: {
                                lg: "auto",
                                md: "13px",
                                sm: "10px",
                                xs: "8px",
                              },
                              color: `${theme.palette.background.default}`,
                            }}
                          >
                            0.0
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={1.5} md={1.5} sm={1.5} xs={2}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <img src={logo} width="15px" />
                        </Box>
                        <Box
                          sx={{
                            mr: { lg: "10px", md: "0px", sm: "0px", xs: "0px" },
                          }}
                        >
                          {/* <DropdownMenu overlay={positionMenu} trigger={["click"]}>
                            <Button
                              sx={{
                                padding: "0px",
                                margin: "0px",
                                fontSize: {
                                  lg: "auto",
                                  md: "auto",
                                  sm: "auto",
                                  xs: "8px"
                                },
                                color: "white"
                              }}
                              variant="text"
                              // onClick={(e) => e.preventDefault()}
                              endIcon={
                                <ExpandMoreIcon
                                  sx={{
                                    fontSize: {
                                      lg: "auto",
                                      md: "auto",
                                      sm: "auto",
                                      xs: "8px"
                                    }
                                  }}
                                />
                              }
                            >
                              CAKE
                            </Button>
                          </DropdownMenu> */}
                        </Box>
                        <Box
                          sx={{
                            display: {
                              lg: "block",
                              md: "block",
                              sm: "none",
                              xs: "none",
                            },
                            width: "60px",
                            height: "27px",
                            backgroundColor: "#3e517e",
                            border: "1px solid #3e517e",
                            borderRadius: "20px",
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: {
                                lg: "auto",
                                md: "13px",
                                sm: "10px",
                                xs: "8px",
                              },
                              color: `${theme.palette.background.default}`,
                            }}
                          >
                            0.0
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={3}>
                      {/* <Dropdown overlay={prefrenceMenu} trigger={['click']}> */}
                      <Button
                        sx={{
                          padding: "0px",
                          margin: "0px",
                          fontSize: {
                            lg: "auto",
                            md: "auto",
                            sm: "auto",
                            xs: "8px",
                          },
                          color: "white",
                        }}
                        variant="text"
                        endIcon={
                          <ExpandMoreIcon
                            sx={{
                              fontSize: {
                                lg: "auto",
                                md: "auto",
                                sm: "auto",
                                xs: "8px",
                              },
                            }}
                          />
                        }
                        onClick={() => setIsBasicModalVisible1(true)}
                      >
                        SET PREFERENCES
                      </Button>
                      {/* </Dropdown> */}
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Box>
      </Box>
      {/* <Modal
        centered
        visible={IsBasicModalVisible1}
        onOk={() => setIsBasicModalVisible1(false)}
        onCancel={() => setIsBasicModalVisible1(false)}
        size="medium"
        className="warningModel"
      // style={{
      //   height: '500px',
      //   overflowY: 'scroll',
      // }}
      >
        <BaseForm.Item
          name="Oops"
          // rules={[{ message: t('forms.stepFormLabels.loginError') }]}
          style={{ fontSize: '20px', margin: '0px' }}
        > */}
      <Dialog
        open={IsBasicModalVisible1}
        onClose={() => setIsBasicModalVisible1(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box sx={{ mb: "10px" }}>
            <Typography>SET PREFERNCES</Typography>
            {/* {t('SET PREFERNCES')} */}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box>
              <Typography variant="body2">Selected Pair :</Typography>
              <Typography variant="body2">BNB - CAKE</Typography>
            </Box>
            <Box
              sx={{
                // width: '50%',
                mt: "10px",
                display: "flex",
                flexDirection: "row",
                // justifyContent: 'space-between',
              }}
            >
              <Box>
                <Box>
                  <Typography variant="body2">BNB Balance:</Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #339cfd",
                    borderRadius: "12px",
                    width: "100px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2">0.00</Typography>
                </Box>
              </Box>
              <Box sx={{ ml: "20px" }}>
                <Box>
                  <Typography variant="body2">CAKE Balance:</Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #339cfd",
                    borderRadius: "12px",
                    width: "100px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2">0.00</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: "10px", mb: "5px" }}>
              <Typography variant="body2">Current Price:</Typography>
            </Box>
            <Box
              sx={{
                // width: '50%',
                display: "flex",
                flexDirection: {
                  lg: "row",
                  md: "row",
                  sm: "row",
                  xs: "column",
                },
                // justifyContent: 'space-between',
                mt: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body2">BNB</Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #339cfd",
                    borderRadius: "12px",
                    width: "100px",
                    textAlign: "center",
                    ml: "5px",
                  }}
                >
                  <Typography variant="body2">0.00</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  ml: { lg: "20px", md: "20px", sm: "20px", xs: "0px" },
                  mt: { lg: "0px", md: "0px", sm: "0px", xs: "10px" },
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body2">CAKE</Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #339cfd",
                    borderRadius: "12px",
                    width: "100px",
                    textAlign: "center",
                    ml: "5px",
                  }}
                >
                  <Typography variant="body2">0.00</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Box>
                <Typography variant="body2">Gas in Gwei</Typography>
              </Box>
              <Box>
                <TextField
                  placeholder="0.00"
                  style={{
                    width: "100px",
                    height: "26px",
                    borderRadius: "20px",
                  }}
                />
              </Box>
              {/* <Box
                  sx={{
                    border: '1px solid darkgray',
                    borderRadius: '12px',
                    width: '100px',
                    textAlign: 'center',
                    backgroundColor: 'gray',
                  }}
                >
                  <Typography variant="body2">0.00</Typography>
                </Box> */}
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Box>
                <Typography variant="body2">SLIPPAGE</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <Box
                    sx={{
                      border: '1px solid darkgray',
                      borderRadius: '12px',
                      width: '100px',
                      textAlign: 'center',
                      backgroundColor: 'gray',
                    }}
                  >
                    <Typography variant="body2">0.00</Typography>
                  </Box> */}
                <Box>
                  <TextField
                    placeholder="0.00"
                    style={{
                      width: "100px",
                      height: "26px",
                      borderRadius: "20px",
                    }}
                  />
                </Box>
                <Box>
                  <Typography>%</Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Typography variant="body2">Set Dex router</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: 'space-around',
              }}
            >
              <Box>
                <Typography variant="body2">Pancakeswap</Typography>
              </Box>
              <Box sx={{ ml: "10px" }}>
                <Typography variant="body2" sx={{ color: "#339cfd" }}>
                  Uniswap
                </Typography>
              </Box>
              <Box sx={{ ml: "10px" }}>
                <Typography variant="body2">1inch</Typography>
              </Box>
              <Box sx={{ ml: "10px" }}>
                <Typography variant="body2">SushiSwap</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="body2">Anti-bot (MEV Bot)</Typography>
              </Box>
              <Box>
                <Switch onClick={handleSwitch} checked={switchStatus} />
              </Box>
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Box>
                <Typography variant="body2">Set Execution</Typography>
              </Box>
              <Box>
                <Typography variant="body2">Time and Triggering</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: "10px" }}>
              <input
                type="date"
                style={{
                  width: "100%",
                  height: "26px",
                  backgroundColor: "#25284B",
                  color: "#9292a0",
                  border: "1px solid #a9a9a9",
                  borderRadius: "25px",
                  fontSize: "16px",
                  padding: "11.4px 11px",
                }}
              ></input>
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Button
                variant="text"
                sx={{
                  textTransform: "capitalize",
                  color: "white",
                }}
                onClick={() => setIsBasicModalVisible(true)}
              >
                Recurring
              </Button>
            </Box>
            <Box
              sx={{
                mt: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="body2">Set for all wallets</Typography>
              </Box>
              <Box>
                <Switch onClick={handleSwitch1} checked={switchStatus1} />
              </Box>
            </Box>
            <Box
              sx={{
                mt: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button variant="contained">Confirm & Swap</Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              mt: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setIsBasicModalVisible1(false)}
            >
              Confirm & Swap
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Box>
        {/* <Modal
              centered
              visible={IsBasicModalVisible}
              onOk={() => setIsBasicModalVisible(false)}
              onCancel={() => setIsBasicModalVisible(false)}
              size="medium"
              className="warningModel"
            // style={{
            //   height: '500px',
            //   width:'100px',
            //   overflowY: 'scroll',
            // }}
            >
              <BaseForm.Item
                name="Oops"
                // rules={[{ message: t('forms.stepFormLabels.loginError') }]}
                style={{ fontSize: '20px', margin: '0px' }}
              > */}
        {/* <Dialog
          open={IsBasicModalVisible}
          onClose={() => setIsBasicModalVisible(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Recurring
          </DialogTitle>
          <DialogContent>
            <Box>
              <Box>
                <Box>
                  <Box sx={{ mt: '10px' }}>
                    <Button variant="text" sx={{ textTransform: 'capitalize', color: 'white' }}>
                      Daily
                    </Button>
                  </Box>
                  <Box sx={{ mt: '10px' }}>
                    <Button variant="text" sx={{ textTransform: 'capitalize', color: 'white' }}>
                      Weekly
                    </Button>
                  </Box>
                  <Box sx={{ mt: '10px' }}>
                    <Button variant="text" sx={{ textTransform: 'capitalize', color: 'white' }}>
                      Monthly
                    </Button>
                  </Box>
                </Box>
                <Box sx={{ mt: '30px' }}>
                  <Box>
                    <Typography variant="body2">Custom</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="body2">Every</Typography>
                    </Box>
                    <Box sx={{ ml: '30px' }}>
                      <TextField placeholder="Hours" style={{ width: '130px', height: '26px', borderRadius: '20px' }} />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsBasicModalVisible(false)}>Disagree</Button>
            <Button onClick={() => setIsBasicModalVisible(false)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog> */}

        {/* </BaseForm.Item>
            </Modal> */}
      </Box>
      {/* </BaseForm.Item>
      </Modal> */}
    </>
  );
};

export default SwapWithLimits;
