const tokenAbi = require("./tokenAbi.json");
const { USDTAddress, USDCAddress, DAIAddress } = require("./environment");
const { ethers, Contract, BigNumber } = require("ethers");
const { MaxUint256 } = require("@ethersproject/constants");
let walletAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72";

const provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
);
const voidAccount = new ethers.VoidSigner(walletAddress, provider);
function contract(address, ABI, signer) {
  if (signer) {
    return new Contract(address, ABI, signer);
  } else {
    return new Contract(address, ABI, voidAccount);
  }
}

function useUSDTContract(signer) {
  return contract(USDTAddress, tokenAbi, signer);
}

function useUSDCContract(signer) {
  return contract(USDCAddress, tokenAbi, signer);
}

function useDAIContract(signer) {
  return contract(DAIAddress, tokenAbi, signer);
}

function calculateGasMargin(value) {
  return +(
    (value * BigNumber.from(10000).add(BigNumber.from(1000))) /
    BigNumber.from(10000)
  ).toFixed(0);
}
const gasEstimationPayable = async (account, fn, data, amount) => {
  if (account) {
    const estimateGas = await fn(...data, MaxUint256).catch(() => {
      return fn(...data, { value: amount.toString() });
    });
    return calculateGasMargin(estimateGas);
  }
};
const gasEstimationForAll = async (account, fn, data) => {
  if (account) {
    const estimateGas = await fn(...data, ethers.constants.MaxUint256).catch(
      () => {
        return fn(...data);
      }
    );
    return calculateGasMargin(estimateGas);
  }
};

module.exports.gasEstimationForAll = gasEstimationForAll;
module.exports.gasEstimationPayable = gasEstimationPayable;
module.exports.useUSDTContract = useUSDTContract;
module.exports.useUSDCContract = useUSDCContract;
module.exports.useDAIContract = useDAIContract;
