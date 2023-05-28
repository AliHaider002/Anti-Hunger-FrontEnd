import React, { useContext, useEffect } from "react";
import BnbLocked from "../../Components/BnbLocked/BnbLocked";
import CustomCard from "../../Components/CustomCard/CustomCard";
import AppCtx from "../../Components/Context/MyContext";
import { checkIfUserAuthorizedToUse } from "../../utils/hooks/use-MultiSenderContract";

const BnblockedScreen = () => {
  const useContextAPI = useContext(AppCtx);
  useEffect(() => {
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
  }, [useContextAPI?.isWalletConnected == true]);
  return (
    <CustomCard>
      <BnbLocked />
    </CustomCard>
  );
};

export default BnblockedScreen;
