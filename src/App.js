import React, { useState } from "react";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Screen/Dashboard/Dashboard";
import theme from "./styles/style";
import { ThemeProvider } from "@mui/material/styles";
import SliderCustom from "./Screen/Audits/SliderCustom";
import Audits from "./Screen/Audits/Audits";
import SnipeMultiSenderScreen from "./Screen/SnipeMultiSenderScreen/SnipeMultiSenderScreen";
import { Route, Routes } from "react-router-dom";
import CreateLockScreen from "./Screen/CreateLock/CreateLockScreen";
import TokenLockedScreen from "./Screen/TokenLockedScreen/TokenLockedScreen";
import BnblockedScreen from "./Screen/BnbLockedScreen/BnblockedScreen";
import LiquidityLockedScreen from "./Screen/LiquidityLockedScreen/LiquidityLockedScreen";
import SnipeToolScreen from "./Screen/SnipeToolScreen/SnipeToolScreen";
import { Form } from "./Components/SnipeMultiSender/StepForm";
import AppCtx from "./Components/Context/MyContext";
import ExtendLockScreen from "./Screen/ExtendLock/ExtendLockScreen";
// import TokenDetialsPage from "./Screen/TokenDetailsPage/TokenDetialsPage";
import TokenDetialsPage2 from "./Screen/TokenDetailsPage2/TokenDetialsPage2";
import TokenDetailsPage from "./Screen/TokenDetailsPage/TokenDetailsPage";
import LockedBNBPageDetail from "./Screen/LockedBNBPageDetail/LockedBNBPageDetail";
import LockBNBPageDetail2 from "./Screen/LockedBNBPageDetail2/LockBNBPageDetail2";
import LiqudityDetailsPage from "./Screen/TokenDetailsPage/LiqudityDetailsPage";
import LiqudityDetialsPage2 from "./Screen/TokenDetailsPage2/LiqudityDetialsPage2";
import SignUpScreen from "./Screen/SignUpScreen/SignUpScreen";

function App() {
  const [isWalletConnectedVal, setIsWalletConnectedVal] = useState(false);
  const [isTokenLockVal, setIsTokenLockVal] = useState(true);
  const [isSelectBoxSelected, setIsSelectBoxSelected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false);
  const [isTimeToShowAuth, setIsTimeToShowAuth] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [multiSenderContract, setMultiSenderContract] = useState("");
  const [ChainId, setChainId] = useState("");
  const [CurrencyName, setCurrencyName] = useState("");

  const sampleAppContext = {
    isWalletConnected: isWalletConnectedVal,
    setIsWalletConnected: (newValue) => setIsWalletConnectedVal(newValue),
    isTokenLocked: isTokenLockVal,
    setTokenLocked: (newValue) => setIsTokenLockVal(newValue),
    isSelectBoxSelected: isSelectBoxSelected,
    setSelected: (newValue) => setIsSelectBoxSelected(newValue),
    isWalletAddress: walletAddress,
    setAddress: (newValue) => setWalletAddress(newValue),
    isAuthorizedUser: isAuthorizedUser,
    setAuthorizedUser: (newValue) => setIsAuthorizedUser(newValue),
    isTimeToShowAuth: isTimeToShowAuth,
    setIsTimeToShowAuth: (newValue) => setIsTimeToShowAuth(newValue),
    setTokenAddressContext: (newValue) => setTokenAddress(newValue),
    setChainIdContext: (newValue) => setChainId(newValue),
    setCurrencyNameContext: (newValue) => setCurrencyName(newValue),
    CurrencyNameContext: CurrencyName,
    ChainIdContext: ChainId,
    tokenAddressContext: tokenAddress,
    setMultiSenderContractContext: (newValue) =>
      setMultiSenderContract(newValue),
    multiSenderContractContext: multiSenderContract,
  };

  return (
    <ThemeProvider theme={theme}>
      <AppCtx.Provider value={sampleAppContext}>
        <Routes>
        <Route path="/register" element={
          <>
            <SignUpScreen />
          </>
        } />
          <Route
            path="/"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />

          <Route
            path="/snipe-bulk-transfers"
            element={
              <Layout>
                <SnipeMultiSenderScreen />
              </Layout>
            }
          />
          {/* <Route
          path="/snipe-bulk-transfers"
          element={
            <Layout>
              <Form />
            </Layout>
          }
        /> */}
          <Route
            path="/create-lock"
            element={
              <Layout>
                <CreateLockScreen />
              </Layout>
            }
          />
          <Route
            path="/token-locked"
            element={
              <Layout>
                <TokenLockedScreen />
              </Layout>
            }
          />
          <Route
            path="/bnb-locked"
            element={
              <Layout>
                <BnblockedScreen />
              </Layout>
            }
          />
          <Route
            path="/liquidity-locked"
            element={
              <Layout>
                <LiquidityLockedScreen />
              </Layout>
            }
          />
          <Route
            path="/snipe-tool"
            element={
              <Layout>
                <SnipeToolScreen />
              </Layout>
            }
          />
          <Route
            path="/extend-lock/:name/:Addr/:id"
            element={
              <Layout>
                <ExtendLockScreen />
              </Layout>
            }
          />
          <Route
            path="/token/detail/:tokenobj"
            element={
              <Layout>
                <TokenDetailsPage />
              </Layout>
            }
          />
          <Route
            path="/liqudity/detail/:tokenobj"
            element={
              <Layout>
                <LiqudityDetailsPage />
              </Layout>
            }
          />
          <Route
            path="/token/detail/:tokenobj/:_id"
            element={
              <Layout>
                <TokenDetialsPage2 />
              </Layout>
            }
          />
          <Route
            path="/liqudity/detail/:tokenobj/:_id"
            element={
              <Layout>
                <LiqudityDetialsPage2 />
              </Layout>
            }
          />
          <Route
            path="/bnb/detail/:walletAddress"
            element={
              <Layout>
                <LockedBNBPageDetail />
              </Layout>
            }
          />
          <Route
            path="/bnb/detail/:walletAddress/:id"
            element={
              <Layout>
                <LockBNBPageDetail2 />
              </Layout>
            }
          />
        </Routes>
      </AppCtx.Provider>
    </ThemeProvider>
  );
}

export default App;
