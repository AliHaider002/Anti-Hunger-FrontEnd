import BigNumber from "bignumber.js";
import { ethers } from "ethers";

BigNumber.config({ EXPONENTIAL_AT: [-300, 300] });

var addressAry;
var valueAry;
var totalAmmount;

const AllocationsFields = async (allocatiosn) => {
  // delete matching addresses;
  
  var deleteAddresses = localStorage.getItem("deleteAddress");
  var keepAddress = localStorage.getItem("keepAddress");
  try {
    
    var spaceToCheck = [];
    var isSpaceError = false;
    var addressAry = [];
    var PriceesAry = [];
    var valueAry = [];
    var totalAmmount = 0.0;
    var sumAmount = new BigNumber("0.0");

    var decimalError = false;
    var isAddreseseMatch = false;
    var addressesMatchedMsg = "";
    var allocatiosn = allocatiosn.trim();
    var AllocationAddressAry = allocatiosn.split("\n");

    if (
      AllocationAddressAry[0] === "" ||
      AllocationAddressAry[0] === "undefined"
    ) {
      // converting value to BIG NUmbers
      console.log("triggered functions in try");
      return {
        isSpaceError: false,
        addressAry: "",
        valueAry: "",
        totalAmmount: "",
        isAddreseseMatch,
        isAllocations: true,
        outOfLimit: "",
      };
    } else {
      if (AllocationAddressAry.length > 2000) {
        return {
          isSpaceError: false,
          addressAry: "",
          valueAry: "",
          totalAmmount: "",
          isAddreseseMatch,
          isAllocations: false,
          outOfLimit: "MAXIMUM 2000 WALLETS PER BATCH",
        };
      } else {
        console.log("ThisIsArray", AllocationAddressAry);
        AllocationAddressAry.forEach((item, index) => {
          console.log("this is item before split", item);
          var item = item.split(",");

          // console.log("items in array", item);
          // console.log("items in array", item[1]);
          addressAry.push(item[0]);
          var input = item[1]; // Note: this is a string, e.g. user input;
          PriceesAry.push(input);

          // checking formate is wroing or if there is space
          spaceToCheck.push(input);
          console.log("this is input", input);

          // totalAmmount += Number(ethers.utils.parseUnits(input, 18)); // total ammount should be approve
          totalAmmount += input; // total ammount should be approve
          console.log("ThisIsAmmountDunc", totalAmmount);
        });

        addressAry.reverse();
        PriceesAry.reverse();
        console.log("loop");

        // checking and filtering the matching indexes value
        function getAmmount(isTimeToDeleteItem, value) {
          if (isTimeToDeleteItem === true) {
            value.forEach((item, index) => {
              valueAry = [];
              sumAmount = new BigNumber("0.0");
              PriceesAry.splice(item, 1);
            });
          }

          PriceesAry.forEach((item, index) => {
            var inputBig = BigNumber(item);

            sumAmount = sumAmount.plus(inputBig); // total ammount should be approve

            const amount = ethers.utils
              .parseEther(item.replace("\r", "").toString())
              .toString();

            valueAry.push(amount);
          });
          totalAmmount = 0;
          totalAmmount = sumAmount.valueOf();
        }

        var isTimeToDeleteItem = false;
        var value = "";
        getAmmount(isTimeToDeleteItem, value);

        spaceToCheck.forEach((item, index) => {
          var array = item.split(" ");

          if (array.length > 1) {
            isSpaceError = true;
          }
        });

        // keep matching addresses;
        var isAddreseseMatch = containsDuplicates(addressAry);

        if (keepAddress == "true") {
          localStorage.setItem("keepAddress", "false");
          isAddreseseMatch = false;
        }

        // detlete the matching address with value
        if (deleteAddresses == "true") {
          localStorage.setItem("deleteAddress", "false");
          var { uniqueArray, indexOfDeletedAddreses } = getUnique(addressAry);

          isAddreseseMatch = false;
          addressAry = uniqueArray;

          var isTimeToDeleteItem = true;
          var value = indexOfDeletedAddreses;
          getAmmount(isTimeToDeleteItem, value);
        }
        return {
          isSpaceError,
          addressAry,
          valueAry,
          totalAmmount,
          isInvalidTokenAddress: false,
          isAddreseseMatch,
          isAllocations: true,
          outOfLimit: "",
        };
      }
    }
  } catch (err) {
    return {
      isSpaceError,
      addressAry,
      valueAry,
      totalAmmount,
      isAddreseseMatch,
      isAllocations: true,
      outOfLimit: "",
    };
  }
}


// checking if address are matching
function containsDuplicates(array) {
  if (array.length !== new Set(array).size) {
    return true;
  }

  return false;
}

// get unique value from address
function getUnique(array) {
  var uniqueArray = [];
  var indexOfDeletedAddreses = [];

  // Loop through array values
  for (var value of array) {
    if (uniqueArray.indexOf(value) === -1) {
      uniqueArray.push(value);
    } else {
      indexOfDeletedAddreses.push(array.indexOf(value));
    }
  }
  return { uniqueArray, indexOfDeletedAddreses };
}

export default AllocationsFields;
