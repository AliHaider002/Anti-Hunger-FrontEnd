import React, { useContext, useEffect } from "react";
import CustomCard from "../../Components/CustomCard/CustomCard";
import SnipeMultiSender from "../../Components/SnipeMultiSender/SnipeMultiSender";
import SnipeMultiSender2 from "../../Components/SnipeMultiSender/SnipeMultiSender2";
import AppCtx from "../../Components/Context/MyContext";
import { checkIfUserAuthorizedToUse } from "../../utils/hooks/use-MultiSenderContract";
import { Box, Grid } from "@mui/material";

const SnipeMultiSenderScreen = () => {
  const useContextAPI = useContext(AppCtx);
  useEffect(() => {
    // check if User is Authorized to use This Service
    var isUserAuthorized = async () => {
      useContextAPI?.setIsTimeToShowAuth(true);
      var result = await checkIfUserAuthorizedToUse();

      if (result.success) {
        useContextAPI?.setAuthorizedUser(result.isAuth);
      } else {
        useContextAPI?.setAuthorizedUser(result.isAuth);
      }
    };
    setTimeout(() => {
      isUserAuthorized();
    }, 2000);
  }, [useContextAPI?.isWalletConnected]);

  return (
    <Grid
      // xs={24} sm={24}
      sx={{
        width: "100%",
      }}
    >
      <CustomCard>
        {/* <SnipeMultiSender /> */}
        <SnipeMultiSender2 />
      </CustomCard>
    </Grid>
  );
};

export default SnipeMultiSenderScreen;
