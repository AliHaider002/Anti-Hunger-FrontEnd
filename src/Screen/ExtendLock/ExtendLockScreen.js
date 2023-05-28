import React, { useContext, useEffect } from "react";
import AppCtx from "../../Components/Context/MyContext";
import { checkIfUserAuthorizedToUse } from "../../utils/hooks/use-MultiSenderContract";
import ExtendLock from "../../Components/ExtendLock/ExtendLock";
import CustomCard from "../../Components/CustomCard/CustomCard";

const ExtendLockScreen = () => {
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
    <div>
      <CustomCard>
        <ExtendLock />
      </CustomCard>
    </div>
  );
};

export default ExtendLockScreen;
