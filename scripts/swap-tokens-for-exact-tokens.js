const { task } = require("hardhat/config");

task("swap-tokens-for-exact-tokens", "swap tokens for exact tokens")
  .addParam("router", "router address")
  .addParam("amountIn", "an input amount of an assets")
  .addParam("amountOut", "an output amount of an assets")
  .addParam("tokenA", "token A address")
  .addParam("tokenB", "token B address")
  .addParam("to", "destination address")
  .setAction(async (taskArgs, hre) => {
    let [, owner] = await hre.ethers.getSigners();

    console.log("Getting UniswapV2Router02...");
    const V2RouterContract = (await hre.ethers.getContractFactory(
      "UniswapV2Router02"
    )).attach(taskArgs.router);

    const path = [taskArgs.tokenA, taskArgs.tokenB];

    //https://www.epochconverter.com/
    const timestamp = 1698114000;
    console.log("timestamp ", timestamp);
    console.log("Swaping...");
  
    const getAmountsIn = await V2RouterContract.connect(owner).getAmountsIn(ethers.parseUnits("0.2"), path);
    console.log(`getAmountsIn, ${getAmountsIn}`);

    const swapTX = await V2RouterContract
      .connect(owner)
      .swapExactTokensForTokens(getAmountsIn[0],getAmountsIn[1], path,
        taskArgs.to, timestamp, { gasLimit: 540000 });
     
     await swapTX.wait(1);

    console.log(
      `SwapTokens: ${swapTX}`
    );
  });

module.exports = {};

