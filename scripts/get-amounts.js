require("dotenv").config();
const { verify, networkHasVerification } = require("./utils.js");
const { task } = require("hardhat/config");
const Factory = require('@uniswap/v2-core/build/UniswapV2Factory.json')
const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json')

task("get-amounts", "Get amounts")
  .addParam("router", "router address")
  .addParam("tokenA", "tokenA address")
  .addParam("tokenB", "tokenB address")
  .setAction(async (taskArgs, hre) => {
    let [, owner] = await hre.ethers.getSigners();
    console.log("The owner address: ", owner.address);

    console.log("Getting UniswapV2Router02...");
    const V2RouterContract = (await hre.ethers.getContractFactory(
      "UniswapV2Router02"
    )).attach(taskArgs.router);

    const path = [taskArgs.tokenA, taskArgs.tokenB];
    console.log('amounsIn', ethers.parseUnits("0.2"));
    const getAmountsIn = await V2RouterContract.connect(owner).getAmountsIn(ethers.parseUnits("0.2"), path);
    console.log(`getAmountsIn, ${getAmountsIn}`);

    console.log('amounsOut', ethers.parseUnits("1"));
    const getAmountsOut = await V2RouterContract.connect(owner).getAmountsOut(ethers.parseUnits("1"), path);
    console.log(`getAmountsOut, ${getAmountsOut}`);
    return "";
  });
