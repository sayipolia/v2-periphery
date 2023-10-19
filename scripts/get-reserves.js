require("dotenv").config();
const { verify, networkHasVerification } = require("./utils.js");
const { task } = require("hardhat/config");
const Factory = require('@uniswap/v2-core/build/UniswapV2Factory.json')
const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json')

task("get-reserves", "Get reserves")
.addParam("factory", "factory address")
.addParam("tokenA", "tokenA address")
.addParam("tokenB", "tokenA address")
.setAction(async (taskArgs, hre) => {
    let [,owner] = await hre.ethers.getSigners();
    console.log("The owner address: ", owner.address);

    console.log("Getting factoryV2...");
    const factoryV2 = new ethers.Contract(taskArgs.factory, Factory.abi, owner)
    console.log("factoryV2 ", factoryV2.target);   
    console.log("tokenA ", taskArgs.tokenA);
    console.log("tokenB ", taskArgs.tokenB);

    const pairAddress = await factoryV2.getPair(taskArgs.tokenA, taskArgs.tokenB)
    console.log("pairAddress ", pairAddress);

    const pair = new ethers.Contract(pairAddress, IUniswapV2Pair.abi, owner)
    const reservesPair = await pair.getReserves();
    console.log(`reserves(_reserve0 _reserve1 _blockTimestampLast): ${reservesPair}`);

    return reservesPair;
  });
