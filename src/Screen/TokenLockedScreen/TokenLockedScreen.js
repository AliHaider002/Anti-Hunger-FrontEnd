import React, { useContext, useEffect } from "react";
import TokenLocked from "../../Components/TokenLocked/TokenLocked";
import CustomCard from "../../Components/CustomCard/CustomCard";
import AppCtx from "../../Components/Context/MyContext";
import { checkIfUserAuthorizedToUse } from "../../utils/hooks/use-MultiSenderContract";

const TokenLockedScreen = () => {
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
      <TokenLocked />
    </CustomCard>
  );
};

export default TokenLockedScreen;
