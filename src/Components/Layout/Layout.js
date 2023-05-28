import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { BinanceCoin, Category2, Lock1, Send2 } from "iconsax-react";
import { Button } from "@mui/material";
import Img from "./connectBtn.png";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Logo from "./logo.png";
import "./Layout.css";
import DrawerFile from "./DrawerFile";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import AppCtx from "../Context/MyContext";
import WalletConnect from "@walletconnect/web3-provider";
import getSigner from "../../utils/hooks/instances";
import useMultiSenderContract from "../../utils/hooks/use-MultiSenderContract";
import CoinbasewalletSDK from "@coinbase/wallet-sdk";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
// import { useAppSelector } from "../../Hooks/useReduxHooks";
// import ConnectWallet from "../../web3/walletConnect"
const panCakeSwapCaddressABI = require("../../ABIs/panCakeAbi.json");

const batchTransferABI = require("../../ABIs/batchTransfer.json");

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#151617 !important",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "#151617 !important",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const providerOptions = {
  theme: "dark",
  coinbasewallet: {
    package: CoinbasewalletSDK,
    options: {
      appName: "buenotech",
      // infuraId: process.env.REACT_APP_INFURA_KEY,
      infuraId: "17e323aeeaf048e585041fa2cacb1e2c",
      rpc: { 97: "https://data-seed-prebsc-1-s1.binance.org:8545/" },
      // rpc: "https://mainnet.infura.io/v3/ab9630f1994d402794f3288ff330ef9c",
    },
  },

  walletconnect: {
    package: WalletConnect,
    options: {
      // infuraId: process.env.REACT_APP_INFURA_KEY,
      infuraId: "17e323aeeaf048e585041fa2cacb1e2c",
      rpc: { 97: "https://data-seed-prebsc-1-s1.binance.org:8545/" },
      // rpc: "https://mainnet.infura.io/v3/ab9630f1994d402794f3288ff330ef9c",
    },
  },
  binancechainwallet: {
    package: true,
    options: {
      infuraId: "17e323aeeaf048e585041fa2cacb1e2c",
      rpc: { 97: "https://bsc-dataseed1.binance.org/" },
    },
  },
};

// provider
const web3Modal = new Web3Modal({
  theme: "dark",
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

const useStyles = makeStyles((theme) => ({
  selected: {
    color: "#00f902",
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const [selectedColor, setSelectedColor] = useState(null);
  const isWalletConnectedContext = React.useContext(AppCtx);

  // const user = useAppSelector(state => state.user.user)

  // style to display block and none button while connnect and disConnect
  var [styleDis1, setStyleDis1] = useState("block");
  var [styleDis2, setStyleDis2] = useState("none");
  var [CwalletAddress, setCwalletAddress] = useState("0x");
  var [CwalletAddressLast, setCwalletAddressLast] = useState("");
  const [multiSenderContract, setmultiSenderContract] = useState({});
  const [signer, setSigner] = React.useState({});
  var [provider, setProvider] = React.useState();
  var [library, setlibrary] = useState({});
  var [waltAddress, setWalletAddress] = useState();
  const [walletBalance, setWalletBalance] = useState(null);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openListMenu, setOpenListMenu] = React.useState(false);

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleListItemClick = (index) => {
    setSelectedColor(index);
  };

  console.log("ContextIsHere", isWalletConnectedContext);
  const connectWallet = async () => {
    try {
      provider = await web3Modal.connect();
      setProvider(provider);
      const instance = new ethers.providers.Web3Provider(provider);

      const _signer = instance.getSigner();
      const weiBalance = await _signer.getBalance();
      const ethBalance = ethers.utils.formatEther(weiBalance);
      setWalletBalance(ethBalance);

      let { chainId } = await instance.getNetwork();

      var accountsAddress = await instance.listAccounts();

      //
      isWalletConnectedContext?.setIsWalletConnected(true);

      if (accountsAddress.length) {
        setWalletAddress(accountsAddress[0]);
        //
        isWalletConnectedContext?.setAddress(accountsAddress[0]);

        localStorage.setItem("walleetAddress", accountsAddress[0]);

        if (chainId === 97) {
          isWalletConnectedContext.setChainIdContext("97");
          isWalletConnectedContext.setCurrencyNameContext("BNB");
          sessionStorage.setItem(
            "ContractAddress",
            "0x50947Ff069c276d335aEc63aA25F5976B9Fb2708"
          );
          sessionStorage.setItem(
            "SnipeMultisenderContract",
            "0xa6dbb0EA831eB8E86F7B704872c1CB44Bc379f1E"
          );
          isWalletConnectedContext.setMultiSenderContractContext(
            "0xa6dbb0EA831eB8E86F7B704872c1CB44Bc379f1E"
          );
        } else if (chainId === 1252) {
          isWalletConnectedContext.setChainIdContext("1252");
          isWalletConnectedContext.setCurrencyNameContext("CIC");
          sessionStorage.setItem(
            "ContractAddress",
            "0x546EB3C0A4997d1F5558f0eDd55eb40a3A8365BA"
          );
          sessionStorage.setItem(
            "SnipeMultisenderContract",
            "0x76332E90Bd4627F7e4457256ab83337bebA47457"
          );
          isWalletConnectedContext.setMultiSenderContractContext(
            "0x76332E90Bd4627F7e4457256ab83337bebA47457"
          );
        }

        // Signer
        const signer = instance.getSigner(accountsAddress[0]); // Contract
        setSigner(signer);

        const contract = new ethers.Contract(
          "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
          panCakeSwapCaddressABI,
          signer
        );

        // contract of multiSender
        var batchTransferContract = new ethers.Contract( // "0x6F61c68C767ED16BBc69F833c6b10007666b68f4",
          // "0xa6dbb0EA831eB8E86F7B704872c1CB44Bc379f1E",
          sessionStorage.getItem("SnipeMultisenderContract"),
          batchTransferABI,
          signer
        );

        setmultiSenderContract(batchTransferContract);

        var tokenBalance = await contract.balanceOf(accountsAddress[0]);
        tokenBalance = tokenBalance.toNumber();

        localStorage.setItem("tokenBalance", tokenBalance);
      }

      setStyleDis2("block");
      setStyleDis1("none");

      //
    } catch (err) {}
  };

  const disConnetWallet = async () => {
    isWalletConnectedContext?.setIsWalletConnected(false);
    isWalletConnectedContext?.setAddress("");
    isWalletConnectedContext?.setAuthorizedUser(false);
    if (provider.close) {
      provider.close();
    }

    localStorage.removeItem("walleetAddress");
    sessionStorage.removeItem("ContractAddress");
    sessionStorage.removeItem("SnipeMultisenderContract");

    setStyleDis2("none");
    setStyleDis1("block");

    await web3Modal.clearCachedProvider();
    setProvider({});
  };

  useMultiSenderContract(multiSenderContract, signer, waltAddress);
  getSigner(signer, waltAddress);

  useEffect(() => {
    window.onload = async function () {
      if (provider.close) {
        provider.close();
      }

      localStorage.removeItem("walleetAddress");
      sessionStorage.removeItem("ContractAddress");
      sessionStorage.removeItem("SnipeMultisenderContract");

      setStyleDis2("none");
      setStyleDis1("block");

      await web3Modal.clearCachedProvider();
      setProvider({});

      localStorage.removeItem("anyValueSelected");
    };

    async function checkIfWalletConnected() {
      var walletAddress = localStorage.getItem("walleetAddress");

      if (walletAddress) {
        var oldAddress = walletAddress.split("");
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

        setStyleDis2("block");
        setStyleDis1("none");
      } else {
        setStyleDis2("none");
        setStyleDis1("block");
      }
    }
    // setInterval(() => {
    checkIfWalletConnected();
    // }, 500);

    // detect if account changes
    window.ethereum.on("accountsChanged", function () {
      console.log("Hey Account Changed");
      connectWallet();
    });

    // detect if chain changed
    window.ethereum.on("chainChanged", async function () {
      try {
        const instance = new ethers.providers.Web3Provider(provider);

        const _signer = instance.getSigner();
        const weiBalance = await _signer.getBalance();
        const ethBalance = ethers.utils.formatEther(weiBalance);
        setWalletBalance(ethBalance);

        const { chainId } = await instance.getNetwork();
        console.log("chain Id", chainId);
        if (chainId === 97) {
          isWalletConnectedContext.setChainIdContext("97");
          isWalletConnectedContext.setCurrencyNameContext("BNB");
          sessionStorage.setItem(
            "ContractAddress",
            "0x50947Ff069c276d335aEc63aA25F5976B9Fb2708"
          );
          sessionStorage.setItem(
            "SnipeMultisenderContract",
            "0xa6dbb0EA831eB8E86F7B704872c1CB44Bc379f1E"
          );
          isWalletConnectedContext.setMultiSenderContractContext(
            "0xa6dbb0EA831eB8E86F7B704872c1CB44Bc379f1E"
          );
        } else if (chainId === 1252) {
          isWalletConnectedContext.setChainIdContext("1252");
          isWalletConnectedContext.setCurrencyNameContext("CIC");
          sessionStorage.setItem(
            "ContractAddress",
            "0x546EB3C0A4997d1F5558f0eDd55eb40a3A8365BA"
          );
          sessionStorage.setItem(
            "SnipeMultisenderContract",
            "0x76332E90Bd4627F7e4457256ab83337bebA47457"
          );
          isWalletConnectedContext.setMultiSenderContractContext(
            "0x76332E90Bd4627F7e4457256ab83337bebA47457"
          );
        }
        // const {chainId} = await waltAddress.getNetwork();
        console.log(
          "Hey Chain Changed at",
          sessionStorage.getItem("ContractAddress")
        );
      } catch (error) {
        console.log("Error in chainChanged:", error.message);
      }
    });
  });
  const [ChainPrice, setChainPrice] = useState("");

  const fetchBNBPrice = async () => {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${isWalletConnectedContext.CurrencyNameContext}&tsyms=${isWalletConnectedContext.CurrencyNameContext},USD`;
    await axios
      .get(url)
      .then((data) => {
        console.log("Data", data);
        const price = data.data.USD;
        setChainPrice(price);
        console.log("Data1", price);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchBNBPrice();
  }, [isWalletConnectedContext.CurrencyNameContext]);

  useEffect(() => {
    async function clearData() {
      // if(provider.close){
      //   provider.close()
      // }
      //

      localStorage.removeItem("walleetAddress");
      setStyleDis2("none");
      setStyleDis1("block");

      await web3Modal.clearCachedProvider();
      setProvider({});

      localStorage.removeItem("anyValueSelected");
    }

    clearData();
  }, []);

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  // const useStyles = makeStyles((theme) => ({
  //   listItemRoot: {
  //     "&.Mui-selected": {
  //       backgroundColor: "red",
  //     },
  //   },
  // }));

  // let classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenListMenu(false);
  };

  const handleListMenu = () => {
    setOpenListMenu(!openListMenu);
  };

  console.log("CheckChainPrice", ChainPrice);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: `${theme.palette.background.mainBg} !important`,
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ pl: "2px !important" }}>
          <Box
            sx={{
              display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
              flexDirection: "row",
              alignItems: "center",
              ...(open && { display: "none" }),
            }}
          >
            <Box>
              <img src={Logo} width="50px" height="50px" alt="not found" />
            </Box>
            <Box sx={{ ml: "20px" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={open ? handleDrawerClose : handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: `5px !important`,
                  padding: "5px !important",
                  color: `${theme.palette.background.default} !important`,
                  borderRadius: "50% !important",
                  ...(open && { display: "none" }),
                  border: "1px solid white !important",
                  backgroundColor: `${theme.palette.primary.main} !important`,
                  "&:hover": {
                    backgroundColor: `${theme.palette.background.hoverColor} !important`,
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: { lg: "none", md: "none", sm: "none", xs: "flex" },
              paddingLeft: 2,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{
                marginRight: `5px !important`,
                padding: "5px !important",
                color: `${theme.palette.background.default} !important`,
                borderRadius: "50% !important",
                // ...(open && { display: "none" }),
                border: "1px solid white !important",
                backgroundColor: `${theme.palette.primary.main} !important`,
                "&:hover": {
                  backgroundColor: `${theme.palette.background.hoverColor} !important`,
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box>
              <a
                href="https://pancakeswap.finance/swap?outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
                target="_blank"
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: `${theme.palette.primary.main} !important`,
                    borderRadius: "12px !important",
                    "&:hover": {
                      backgroundColor: `${theme.palette.background.hoverColor} !important`,
                    },
                  }}
                >
                  buy
                </Button>
              </a>
            </Box>
            <Box sx={{ ml: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: `${theme.palette.primary.main} !important`,
                  borderRadius: "12px !important",
                  "&:hover": {
                    backgroundColor: `${theme.palette.background.hoverColor} !important`,
                  },
                }}
              >
                {isWalletConnectedContext.isWalletConnected ? (
                  <>
                    {" "}
                    ${ChainPrice} {isWalletConnectedContext.CurrencyNameContext}
                  </>
                ) : (
                  "$0"
                )}
              </Button>
            </Box>
            <Box sx={{ ml: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: `${theme.palette.primary.main} !important`,
                  borderRadius: "12px !important",
                  "&:hover": {
                    backgroundColor: `${theme.palette.background.hoverColor} !important`,
                  },
                }}
              >
                {isWalletConnectedContext.isWalletConnected ? (
                  <>
                    {walletBalance}{" "}
                    {isWalletConnectedContext.CurrencyNameContext}
                  </>
                ) : (
                  "$0"
                )}
              </Button>
            </Box>
            <Box sx={{ ml: "20px", display: styleDis1, padding: "5px 15px" }}>
              <Button
                variant="contained"
                onClick={connectWallet}
                startIcon={
                  <img src={Img} width="20px" height="20px" alt="not found" />
                }
                // style={{ }}
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: `${theme.palette.primary.main} !important`,
                  borderRadius: "12px !important",
                  "&:hover": {
                    backgroundColor: `${theme.palette.background.hoverColor} !important`,
                  },
                }}
              >
                Connect
              </Button>
            </Box>
            <Box sx={{ ml: "20px", display: styleDis2, padding: "5px 15px" }}>
              <Button
                variant="contained"
                onClick={disConnetWallet}
                startIcon={
                  <img src={Img} width="20px" height="20px" alt="not found" />
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: `${theme.palette.primary.main} !important`,
                  borderRadius: "12px !important",
                  "&:hover": {
                    backgroundColor: `${theme.palette.background.hoverColor} !important`,
                  },
                }}
              >
                {CwalletAddress}...{CwalletAddressLast}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: { lg: "none", md: "none", sm: "none", xs: "flex" },
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {/* <Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: theme.palette.background.hoverColor,
                  },
                }}
              >
                buy
              </Button>
            </Box>
            <Box sx={{ ml: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: theme.palette.background.hoverColor,
                  },
                }}
              >
                $2.7020000000 cake
              </Button>
            </Box> */}
            <Box sx={{ ml: "20px" }}>
              <a
                href="https://pancakeswap.finance/swap?outputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
                target="_blank"
              >
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: `${theme.palette.primary.main}`,
                    padding: "7px 20px",
                    borderRadius: "12px",
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: "12px",
                    "&:hover": {
                      backgroundColor: `${theme.palette.background.hoverColor} !important`,
                    },
                  }}
                >
                  Buy
                </Button>
              </a>
            </Box>
            <Box
            //   sx={{ ml: "20px",
            //     backgroundColor: `${theme.palette.primary.main}`,
            //     display: "flex",
            //     alignItems: "center",
            //     textTransform: "capitalize",
            //     paddingLeft: "5px",
            //     boxShadow: "1px",
            //         borderRadius: "12px",
            //         "&:hover": {
            //           backgroundColor: theme.palette.background.hoverColor,
            //         },
            // }}
            >
              {/* <img src={Img} width="20px" height="20px" alt="not found" /> */}
              <Box sx={{ ml: "20px", display: styleDis1, padding: "5px 15px" }}>
                <Button
                  variant="contained"
                  onClick={connectWallet}
                  startIcon={
                    <img src={Img} width="20px" height="20px" alt="not found" />
                  }
                  // style={{ }}
                  sx={{
                    textTransform: "capitalize",
                    backgroundColor: `${theme.palette.primary.main} !important`,
                    borderRadius: "12px !important",
                    "&:hover": {
                      backgroundColor: `${theme.palette.background.hoverColor} !important`,
                    },
                  }}
                >
                  Connect
                </Button>
              </Box>
            </Box>
            <Box sx={{ ml: "20px", display: styleDis2, padding: "5px 15px" }}>
              <Button
                variant="contained"
                onClick={disConnetWallet}
                startIcon={
                  <img src={Img} width="20px" height="20px" alt="not found" />
                }
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: `${theme.palette.primary.main} !important`,
                  borderRadius: "12px !important",
                  "&:hover": {
                    backgroundColor: `${theme.palette.background.hoverColor} !important`,
                  },
                }}
              >
                {CwalletAddress}...{CwalletAddressLast}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        style={{ backgroundColor: "red" }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              pt: "10px",
              ...(!open && { display: "none" }),
            }}
          >
            <Box sx={{ pl: "10px" }}>
              <img src={Logo} width="50px" height="50px" alt="not found" />
            </Box>
            <Box>
              <IconButton
                onClick={handleDrawerClose}
                sx={{
                  marginRight: `5px !important`,
                  padding: "5px !important",
                  color: `${theme.palette.background.default} !important`,
                  borderRadius: "50% !important",
                  ...(!open && { display: "none" }),
                  border: "1px solid white !important",
                  backgroundColor: `${theme.palette.primary.main} !important`,
                  "&:hover": {
                    backgroundColor: `${theme.palette.background.hoverColor} !important`,
                  },
                }}
              >
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
        {open ? null : <DrawerHeader />}

        <List>
          <Link
            to={"/"}
            style={{ textDecoration: "none" }}
            // activeClassName={theme.palette.background.hoverColor}
          >
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
              // selected={true}
              // classes={{ root: classes.listItemRoot }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: theme.palette.background.default,
                    "&:hover": {
                      color: theme.palette.background.hoverColor,
                    },
                  }}
                >
                  <Category2
                    size="20"
                    variant="Bulk"
                    className={selectedColor === 0 ? classes.selected : null}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Audits"
                  sx={{ opacity: open ? 1 : 0 }}
                  className={selectedColor === 0 ? classes.selected : null}
                />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link
            to={"/snipe-bulk-transfers"}
            style={{ textDecoration: "none" }}
            // activeStyle={theme.palette.background.hoverColor}
          >
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
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: theme.palette.background.default,
                    "&:hover": {
                      color: theme.palette.background.hoverColor,
                    },
                  }}
                >
                  <Send2
                    size="20"
                    variant="Bulk"
                    className={selectedColor === 1 ? classes.selected : null}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Donation"
                  sx={{ opacity: open ? 1 : 0 }}
                  className={selectedColor === 1 ? classes.selected : null}
                />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link
            to={open ? null : "/create-lock"}
            style={{ textDecoration: "none" }}
            // activeStyle={theme.palette.background.hoverColor}
          >
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
                  justifyContent: open
                    ? "initial !important"
                    : "center !important",
                  px: 2.5,
                }}
                onClick={open ? handleListMenu : null}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto !important",
                    justifyContent: "center !important",
                    color: theme.palette.background.default,
                    "&:hover ": {
                      color: theme.palette.background.hoverColor,
                    },
                  }}
                >
                  <Lock1
                    size="20"
                    variant="Bulk"
                    className={selectedColor === 2 ? classes.selected : null}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Account"
                  sx={{ opacity: `${open ? 1 : 0}` }}
                  className={selectedColor === 2 ? classes.selected : null}
                />
                {open ? (
                  <Box>{openListMenu ? <ExpandLess /> : <ExpandMore />}</Box>
                ) : (
                  ""
                )}
              </ListItemButton>
              <Collapse
                in={openListMenu}
                timeout="auto"
                unmountOnExit
                sx={{
                  display: {
                    lg: "block",
                    md: "block",
                    sm: "block",
                    xs: "none",
                  },
                }}
              >
                <List component="div" disablePadding>
                  <Link
                    to={"/create-lock"}
                    style={{ textDecoration: "none " }}
                    // activeClassName={theme.palette.background.hoverColor}
                  >
                    <ListItemButton
                      sx={{
                        pl: 4,
                        color: `${theme.palette.background.default} !important`,
                        "&:hover": {
                          color: `${theme.palette.background.hoverColor} important`,
                        },
                      }}
                      selected={selectedColor === 3}
                      onClick={() => handleListItemClick(3)}
                    >
                      <ListItemText
                        primary="Create Lock"
                        className={
                          selectedColor === 3 ? classes.selected : null
                        }
                      />
                    </ListItemButton>
                  </Link>
                  <Link
                    to={"/token-locked"}
                    style={{ textDecoration: "none " }}
                    // activeClassName={theme.palette.background.hoverColor}
                  >
                    <ListItemButton
                      sx={{
                        pl: 4,
                        color: `${theme.palette.background.default} !important`,
                        "&:hover": {
                          color: `${theme.palette.background.hoverColor} important`,
                        },
                      }}
                      selected={selectedColor === 4}
                      onClick={() => handleListItemClick(4)}
                    >
                      <ListItemText
                        primary="Token Locked"
                        className={
                          selectedColor === 4 ? classes.selected : null
                        }
                      />
                    </ListItemButton>
                  </Link>
                  <Link
                    to={"/bnb-locked"}
                    style={{ textDecoration: "none " }}
                    // activeClassName={theme.palette.background.hoverColor}
                  >
                    <ListItemButton
                      sx={{
                        pl: 4,
                        color: `${theme.palette.background.default} !important`,
                        "&:hover": {
                          color: `${theme.palette.background.hoverColor} important`,
                        },
                      }}
                      selected={selectedColor === 5}
                      onClick={() => handleListItemClick(5)}
                    >
                      <ListItemText
                        primary={
                          isWalletConnectedContext.CurrencyNameContext
                            ? `${isWalletConnectedContext.CurrencyNameContext} Locked`
                            : "BNB Locked"
                        }
                        className={
                          selectedColor === 5 ? classes.selected : null
                        }
                      />
                    </ListItemButton>
                  </Link>
                  <Link
                    to={"/liquidity-locked"}
                    style={{ textDecoration: "none" }}
                    // activeClassName={theme.palette.background.hoverColor}
                  >
                    <ListItemButton
                      sx={{
                        pl: 4,
                        color: `${theme.palette.background.default} !important`,
                        "&:hover": {
                          color: `${theme.palette.background.hoverColor} important`,
                        },
                      }}
                      selected={selectedColor === 6}
                      onClick={() => handleListItemClick(6)}
                    >
                      <ListItemText
                        primary="Liquidity Locked"
                        className={
                          selectedColor === 6 ? classes.selected : null
                        }
                      />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
            </ListItem>
          </Link>
          <Link
            to={"/snipe-tool"}
            style={{ textDecoration: "none" }}
            // activeClassName={theme.palette.background.hoverColor}
          >
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
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: theme.palette.background.default,
                    "&:hover": {
                      color: theme.palette.background.hoverColor,
                    },
                  }}
                >
                  <BinanceCoin
                    size="20"
                    variant="Bulk"
                    className={selectedColor === 7 ? classes.selected : null}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Snipe Tool"
                  sx={{ opacity: open ? 1 : 0 }}
                  className={selectedColor === 7 ? classes.selected : null}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: theme.palette.primary.main,
          minHeight: "100vh",
          width: { lg: "100%", md: "100%", sm: "100%", xs: "80%" },
          maxHeight: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <DrawerHeader />
        {children}
        <Box>
          <Footer />
        </Box>
      </Box>
      <DrawerFile
        handleDrawerToggle={handleDrawerToggle}
        openDrawer={openDrawer}
      />
    </Box>
  );
}
