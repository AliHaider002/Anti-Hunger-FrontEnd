import { getGeneratedFees } from "../utils/APIs/servicesFeeApi";

var generatedFees = "";
async function serViceFeeAPI() {
  var getGeneratedWalletFee = await getGeneratedFees();

  generatedFees = getGeneratedWalletFee.responseDate;
}

serViceFeeAPI();

export const getBasicTableData = (pagination) => {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        data: [
          {
            key: 1,
            seviceFee: "A1. GNabienerate wallets with Private Key",
            pay: `002 BUSD for each wallet`,
            month: `002 BUSD one time fee, unlimited wallets generation`,
            year: `002 BUSD one time fee, unlimited wallets generation`,
          },
          {
            key: 2,
            seviceFee:
              "A2. Paste wallets + B.Swap with limits orders, recurring periods and price triggering",
            pay: `002 BUSD for each wallet`,
            month: `002 BUSD one time fee, unlimited wallets generation`,
            year: `002 BUSD one time fee, unlimited wallets generation`,
          },
          {
            key: 3,
            seviceFee:
              "B. Swap with limits orders, recuring periods and price triggering",
            pay: `002 BUSD for each wallet`,
            month: `002 BUSD one time fee, unlimited wallets generation`,
            year: `002 BUSD one time fee, unlimited wallets generation`,
          },
        ],
        pagination: { ...pagination, total: 0 },
      });
    }, 1000);
  });
};
