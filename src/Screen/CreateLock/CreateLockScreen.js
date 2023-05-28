import React, { useContext, useEffect } from "react";
import CustomCard from "../../Components/CustomCard/CustomCard";
import SnipeMultiSender from "../../Components/SnipeMultiSender/SnipeMultiSender";
import CreateLock from "../../Components/CreateLock/CreateLock";
import AppCtx from "../../Components/Context/MyContext";
import { checkIfUserAuthorizedToUse } from "../../utils/hooks/use-MultiSenderContract";

const CreateLockScreen = () => {
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
        <CreateLock />
      </CustomCard>
    </div>
  );
};

export default CreateLockScreen;
