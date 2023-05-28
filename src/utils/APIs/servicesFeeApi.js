import axios from "axios";
import { ethers } from "ethers";
var originuUrl = "https://pleasant-gray-woodpecker.cyclic.app/api";

const getGeneratedFees = async () => {
  try {
    var responseDate = "";
    await axios({
      method: "GET",
      url: `${originuUrl}/getGeneratedWalletFee`,
    })
      .then(function (response) {
        responseDate = response.data;
      })
      .catch(function (error) {});

    responseDate = responseDate.generatedFee;

    return { responseDate: responseDate, success: true };
  } catch (err) {
    return { responseDate: "", success: false };
  }
};

// export API

export { getGeneratedFees };
