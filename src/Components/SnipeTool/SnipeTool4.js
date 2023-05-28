import {
  Box,
  Grid,
  Typography,
  useTheme,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import DropdownMenu from "./DropDown/Dropdown";
import logo from "./bnb2.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const SnipeTool4 = (props) => {
  const { MultipleWallets } = props;

  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);
  const [IsBasicModalVisible1, setIsBasicModalVisible1] = useState(false);
  const [switchStatus, setswitchStatus] = useState(false);
  const [switchStatus1, setswitchStatus1] = useState(false);
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

  const handleSwitch = () => {
    setswitchStatus(!switchStatus);
  };
  const handleSwitch1 = () => {
    setswitchStatus1(!switchStatus1);
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        color: `${theme.palette.background.default}`,
        padding: "10px",
      }}
    >
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
                            // onClick={(e) => e.preventDefault()}
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
                          >
                            <DropdownMenu cake="BNB" />
                          </Button>
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
                            // onClick={(e) => e.preventDefault()}
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
                          >
                            <DropdownMenu cake="CAKE" />
                          </Button>
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
    </Box>
  );
};

export default SnipeTool4;
