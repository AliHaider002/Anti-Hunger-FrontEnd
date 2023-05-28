import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Layout.css";
import React, { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { BinanceCoin, Category2, Lock1, Send2 } from "iconsax-react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import AppCtx from "../Context/MyContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  selected: {
    color: "#00f902",
  },
}));

function DrawerFile({ handleDrawerToggle, openDrawer }) {
  let theme = useTheme();

  const [openListMenu1, setOpenListMenu1] = React.useState(false);
  const classes = useStyles();
  const [selectedColor, setSelectedColor] = useState(null);

  const handleListMenu = () => {
    setOpenListMenu1(!openListMenu1);
  };

  const useContextAPI = useContext(AppCtx);

  var [tokenPrice, setTokenPrice] = useState('1920');
  var [tokenBalace, setTokenBalance] = useState('0');

  const handleListItemClick = (index) => {
    setSelectedColor(index);
  };

  useEffect(() => {
    async function getTokenPrice() {
      fetch('https://api.binance.com/api/v3/ticker/price?symbol=CAKEUSDT')
        .then((response) => response.json())
        .then((data) => {
          setTokenPrice(data.price);
        });
    }
    getTokenPrice();

    function getTokenBlance() {
      var tokenBalance = localStorage.getItem('tokenBalance');
      if (tokenBalance != null) {
        tokenBalance = tokenBalance.replace(/"/g, '');
        // var intTOkBlc = parseInt(tokenBalance)
        setTokenBalance(tokenBalance);
      } else {
        setTokenBalance('0');
      }
    }
    getTokenBlance();
  });
  return (
    <Drawer
      open={openDrawer}
      onClose={handleDrawerToggle}
      anchor="left"
      PaperProps={{
        sx: {
          width: "250px",
          background: theme.palette.background.mainBg,
          mt: "47px",
        },
      }}
    >
      <Box>
      <>
            <div>
              <Box justify="space-between" align="middle" className="headerRow2" sx={{ textAlign: "center", paddingTop: "10px" }}>
                {useContextAPI?.isWalletConnected ? (
                  <>
                    {useContextAPI?.isTimeToShowAuth ? (
                      <>
                        {useContextAPI?.isAuthorizedUser ? (
                          <>
                            <Box>
                              <Typography
                              sx={{
                                color: `${theme.palette.background.default}`,
                                border: `1px solid ${theme.palette.background.HoverColor}`
                              }}
                              >
                              Authorized
                              </Typography>
                              </Box>
                          </>
                        ) : (
                          <>
                            <Box
                            sx={{
                              
                              border: '1px soild white',
                              borderColor: `${theme.palette.background.HoverColor}`
                            }}
                            >
                              <Typography
                              sx={{
                                color: `${theme.palette.background.default}`,
                                
                              }}
                              >
                              UnAuthorized
                              </Typography>
                              </Box>
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
                
              </Box>
              <Box
                sx={{
                  alignItems: "left",
                  padding: "10px"
                }}
                >
                <Box
                sx={{
                  paddingY: '7px',
                }}
                >
                  <Button 
                  sx={{
                    color: 'white',
                    backgroundColor: `${theme.palette.primary.main}`,
                    // paddingY: '7px',
                    borderRadius: '12px',
                    fontFamily: 'Montserrat,sans-serif',
                    fontSize: '12px',
                    "&:hover": {
                      backgroundColor: `${theme.palette.background.hoverColor} !important`,
                    },
                  }}
                   >
                    ${tokenPrice} CAKE
                  </Button>
                </Box>

                <Box
                sx={{
                  paddingY: '7px',
                }}
                >
                  <Button sx={{
                    color: 'white',
                    backgroundColor: `${theme.palette.primary.main}`,
                    // padding: '7px 20px',
                    borderRadius: '12px',
                    fontFamily: 'Montserrat,sans-serif',
                    fontSize: '12px',
                    "&:hover": {
                      backgroundColor: `${theme.palette.background.hoverColor} !important`,
                    },
                  }} className="buyHeaderTokenBtn2">
                    ${tokenBalace} CAKE
                  </Button>
                </Box>
                </Box>
            </div>
          </>
      </Box>
      <Box>
        <List>
          <Link to={"/"} style={{ textDecoration: 'none' }} activeClassName={theme.palette.background.hoverColor}>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                color: theme.palette.background.default,
                "&:hover": {
                  color: theme.palette.background.hoverColor,
                },
              }}
              selected={selectedColor === 0}
              onClick={() => handleListItemClick(0)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2.5,
                }}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                    color: theme.palette.background.default,
                    "&:hover": {
                      color: theme.palette.background.hoverColor,
                    },
                  }}
                >
                  <Category2 size="20" variant="Bulk" className={selectedColor === 0 ? classes.selected : null} />
                </ListItemIcon>
                <ListItemText primary="Audits" sx={{ opacity: 1 }} className={selectedColor === 0 ? classes.selected : null} />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to={"/snipe-bulk-transfers"} style={{ textDecoration: 'none' }} activeStyle={theme.palette.background.hoverColor}>
            <ListItem
              disablePadding
              sx={{
                display: "block",
                color: theme.palette.background.default,
                "&:hover": {
                  color: theme.palette.background.hoverColor,
                },
              }}
              selected={selectedColor === 1}
              onClick={() => handleListItemClick(1)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2.5,
                }}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                    color: theme.palette.background.default,
                    "&:hover": {
                      color: theme.palette.background.hoverColor,
                    },
                  }}
                >
                  <Send2 size="20" variant="Bulk" className={selectedColor === 1 ? classes.selected : null} />
                </ListItemIcon>
                <ListItemText primary="SNIPE Bulk Transfer" sx={{ opacity: 1 }} className={selectedColor === 1 ? classes.selected : null} />
              </ListItemButton>
            </ListItem>
          </Link>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              color: theme.palette.background.default,
              "&:hover": {
                color: theme.palette.background.hoverColor,
              },
            }}
            selected={selectedColor === 2}
            onClick={() => handleListItemClick(2)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "initial",
                px: 2.5,
              }}
              onClick={handleListMenu}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: "center",
                  color: theme.palette.background.default,
                  "&:hover": {
                    color: theme.palette.background.hoverColor,
                  },
                }}
              >
                <Lock1 size="20" variant="Bulk" className={selectedColor === 2 ? classes.selected : null} />
              </ListItemIcon>
              <ListItemText primary="Snipe Lock" sx={{ opacity: 1 }} className={selectedColor === 2 ? classes.selected : null} />

              <Box>{openListMenu1 ? <ExpandLess /> : <ExpandMore />}</Box>
            </ListItemButton>
            <Collapse in={openListMenu1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link to={"/create-lock"}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  <ListItemButton
                    sx={{
                      pl: 4,
                      color: theme.palette.background.default,
                      "&:hover": {
                        color: theme.palette.background.hoverColor,
                      },
                    }}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Create Lock" />
                  </ListItemButton>
                </Link>
                <Link to={"/token-locked"}
                  style={{
                    textDecoration: "none"
                  }}>
                  <ListItemButton
                    sx={{
                      pl: 4,
                      color: theme.palette.background.default,
                      "&:hover": {
                        color: theme.palette.background.hoverColor,
                      },
                    }}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Token Locked" />
                  </ListItemButton>
                </Link>
                <Link to={"/bnb-locked"}
                style={{
                  textDecoration: "none"
                }}
                >
                  <ListItemButton
                    sx={{
                      pl: 4,
                      color: theme.palette.background.default,
                      "&:hover": {
                        color: theme.palette.background.hoverColor,
                      },
                    }}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="BNB Locked" />
                  </ListItemButton>
                </Link>
                <Link to={"/liquidity-locked"}
                style={{
                  textDecoration: "none"
                }}
                >
                  <ListItemButton
                    sx={{
                      pl: 4,
                      color: theme.palette.background.default,
                      "&:hover": {
                        color: theme.palette.background.hoverColor,
                      },
                    }}
                    onClick={handleDrawerToggle}
                  >
                    <ListItemText primary="Liquidity Locked" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
          </ListItem>

          <ListItem
            disablePadding
            sx={{
              display: "block",
              color: theme.palette.background.default,
              "&:hover": {
                color: theme.palette.background.hoverColor,
              },
            }}
            selected={selectedColor === 7}
              onClick={() => handleListItemClick(7)}
          >
            <Link to={"/snipe-tool"}
            style={{
              textDecoration: "none",
              color: `${theme.palette.background.default}`
            }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: "initial",
                  px: 2.5,
                }}
                onClick={handleDrawerToggle}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: "center",
                    color: theme.palette.background.default,
                    "&:hover": {
                      color: theme.palette.background.hoverColor,
                    },
                  }}
                >
                  <BinanceCoin size="20" variant="Bulk" className={selectedColor === 7 ? classes.selected : null} />
                </ListItemIcon>
                <ListItemText primary="Snipe Tool" sx={{ opacity: 1 }} className={selectedColor === 7 ? classes.selected : null} />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default DrawerFile;
