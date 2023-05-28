import { Box } from "@mui/material";
import React, { useContext, useEffect } from "react";
import CustomCard from "../../Components/CustomCard/CustomCard";
import Audits from "../Audits/Audits";
import AppCtx from "../../Components/Context/MyContext";
import { checkIfUserAuthorizedToUse } from '../../utils/hooks/use-MultiSenderContract';

const Dashboard = () => {
  const useContextAPI = useContext(AppCtx);
  useEffect(() => {
    var isUserAuthorized = async () => {
      useContextAPI?.setIsTimeToShowAuth(false);
    };
    setTimeout(() => {
      isUserAuthorized();
    }, 1000);
  }, [useContextAPI?.isWalletConnected == true]);
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <CustomCard>
        <Audits />
      </CustomCard>
    </Box>
  );
};

export default Dashboard;
