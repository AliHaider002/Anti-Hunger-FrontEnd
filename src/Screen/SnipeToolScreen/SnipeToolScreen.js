import React, { useContext, useEffect, useState } from "react";
import CustomCard from "../../Components/CustomCard/CustomCard";
import SnipeTool from "../../Components/SnipeTool/SnipeTool";
import SnipeTool2 from "../../Components/SnipeTool/SnipeTool2";
import { checkIfUserAuthorizedToUse } from "../../Controller/controller";
import useExitPrompt from "./useExitPrompt";
import AppCtx from "../../Components/Context/MyContext";
import { Box, Grid } from "@mui/material";
import SnipeTool3 from "../../Components/SnipeTool/SnipeTool3";
import SnipeTool5 from "../../Components/SnipeTool/SnipeTool5";
import SnipeTool4 from "../../Components/SnipeTool/SnipeTool4";
import SnipeTool6 from "../../Components/SnipeTool/SnipeTool6";

const SnipeToolScreen = () => {
  const useContextAPI = useContext(AppCtx);
  const [stepForm3Page, setstepForm3Page] = useState("");
  const [stepForm3Page1, setstepForm3Page1] = useState("");
  const [stepForm3Page2, setstepForm3Page2] = useState(false);
  const [stepForm3Page3, setstepForm3Page3] = useState(false);
  const [stepForm3Page4, setstepForm3Page4] = useState("");
  const [MultipleWallets, setMultipleWallets] = useState("");
  const [IsBasicModalVisible, setIsBasicModalVisible] = useState(false);

  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

  // check if User is Authorized to use This Service
  useEffect(() => {
    var isUserAuthorized = async () => {
      useContextAPI?.setIsTimeToShowAuth(true);
      var result = await checkIfUserAuthorizedToUse();
      if (result.success) {
        if (useContextAPI?.isWalletConnected == true) {
          useContextAPI?.setAuthorizedUser(result.isAuth);
        }
      } else {
        if (useContextAPI?.isWalletConnected == true) {
          useContextAPI?.setAuthorizedUser(result.isAuth);
        }
      }
    };
    setTimeout(() => {
      isUserAuthorized();
    }, 2000);
  }, [useContextAPI?.isWalletConnected == true]);

  setInterval(function () {
    if (localStorage.getItem("A1") === "A1") {
      setstepForm3Page("A1");
      setstepForm3Page4("");
    }
    if (localStorage.getItem("A1") === "A2") {
      setstepForm3Page4("A2");
      setstepForm3Page("");
    }
    if (localStorage.getItem("B1") === "B") {
      setstepForm3Page1("B");
    }
    if (!localStorage.getItem("B1")) {
      setstepForm3Page1("");
    }
    if (!localStorage.getItem("A1")) {
      setstepForm3Page("");
      setstepForm3Page4("");
    }
    if (
      localStorage.getItem("A1") === "A1" &&
      localStorage.getItem("B1") === "B"
    ) {
      setstepForm3Page2(true);
    }
    if (
      localStorage.getItem("A1") === "A2" &&
      localStorage.getItem("B1") === "B"
    ) {
      setstepForm3Page3(true);
    }
  }, 1000);

  useEffect(() => {
    if (MultipleWallets === "") {
      setShowExitPrompt(false);
    } else {
      setShowExitPrompt(true);
    }
  }, [MultipleWallets]);

  useEffect(() => {
    // setIsBasicModalVisible(true);
    localStorage.removeItem("A1");
    localStorage.removeItem("B1");
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setShowExitPrompt(!showExitPrompt);
  };

  return (
    <Box>
      <Box>
        <Grid xs={24} sm={24}>
          <CustomCard>
            <SnipeTool2 />
          </CustomCard>
        </Grid>
      </Box>
      {stepForm3Page === "A1" &&
      stepForm3Page1 === "" &&
      stepForm3Page4 === "" ? (
        <Box>
          <Grid xs={24} sm={24}>
            <CustomCard>
              <SnipeTool3 MultipleWallets={MultipleWallets} />
            </CustomCard>
          </Grid>
        </Box>
      ) : stepForm3Page1 === "B" &&
        stepForm3Page === "" &&
        stepForm3Page4 === "" ? (
        <>
          <Box>
            <Grid xs={24} sm={24}>
              <CustomCard>
                <SnipeTool5 />
              </CustomCard>
            </Grid>
          </Box>
        </>
      ) : stepForm3Page2 && stepForm3Page === "A1" && stepForm3Page1 === "B" ? (
        <>
          <Box>
            <Grid xs={24} sm={24}>
              <CustomCard>
                <SnipeTool4 MultipleWallets={MultipleWallets} />
              </CustomCard>
            </Grid>
          </Box>
        </>
      ) : stepForm3Page3 &&
        stepForm3Page4 === "A2" &&
        stepForm3Page1 === "B" ? (
        <Box>
          <Grid xs={24} sm={24}>
            <CustomCard>
              <SnipeTool6 />
            </CustomCard>
          </Grid>
        </Box>
      ) : (
        " "
      )}
    </Box>
  );
};

export default SnipeToolScreen;
