import axios from "axios";
const Url = "https://good-red-mackerel-shoe.cyclic.app/api";

const generateWallets = async (valueRadio, userAddr, noOfWallets) => {
  if (Number(noOfWallets) > 1000) {
    var wallets = [];
    return wallets;
  }
  // I am checking here if ValueOfRadio Button is equals to 1

  if (valueRadio === "1" && Number(noOfWallets) <= 1000) {
    var data = {
      address: userAddr,
      amountOfWallets: noOfWallets,
    };

    var wallets = "";
    await axios({
      method: "post",
      url: `${Url}/generateWallets`,
      data: data,
    })
      .then(function (response) {
        wallets = response.data;
      })
      .catch(function (error) {
        wallets = "";
      });

    return wallets;
  }

  if (Number(noOfWallets) <= 1000 && valueRadio != "1") {
    try {
      var data = {
        address: userAddr,
        amountOfWallets: noOfWallets,
      };

      if (Number(noOfWallets) > 500) {
        var wallets = {
          privateKeys: [],
          publickeys: [],
        };

        var dividedAmount = noOfWallets / 2;
        dividedAmount = parseInt(dividedAmount);
        var reminder = noOfWallets % 2;

        var data = {
          address: userAddr,
          amountOfWallets: dividedAmount,
        };
        var wallets = {
          publickeys: [],
          privateKeys: [],
        };
        await axios({
          method: "post",
          url: `${Url}/generateWallets`,
          data: data,
        })
          .then(function (response) {
            var respondData = response.data.data.publickeys;
            //
            respondData.forEach((item, index) => {
              wallets.publickeys.push(item);
              wallets.privateKeys.push(response.data.data.privateKeys[index]);
            });
          })
          .catch(function (error) {
            wallets = "";
          });

        // calling same API second Time
        //
        var data = {
          address: userAddr,
          amountOfWallets: dividedAmount + reminder,
        };

        await axios({
          method: "post",
          url: `${Url}/generateWallets`,
          data: data,
        })
          .then(function (response) {
            var respondData = response.data.data.publickeys;

            respondData.forEach((item, index) => {
              wallets.publickeys.push(item);
              wallets.privateKeys.push(response.data.data.privateKeys[index]);
            });

            var data = { success: true, data: wallets };
            wallets = data;
          })
          .catch(function (error) {
            wallets = "";
          });

        return wallets;
      } else {
        // if wallet's are under 500

        var wallets = "";
        await axios({
          method: "post",
          url: `${Url}/generateWallets`,
          data: data,
        })
          .then(function (response) {
            wallets = response.data;
          })
          .catch(function (error) {
            wallets = "";
          });

        return wallets;
      }
    } catch (err) {}
  }
};

export { generateWallets };
