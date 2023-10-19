const { task } = require("hardhat/config");

task("swap-tokens-for-exact-tokens", "swap tokens for exact tokens")
  .addParam("router", "router address")
  .addParam("amountIn", "token1 address")
  .addParam("amountOut", "token2 address")
  .addParam("to", "token2 amount desired")
  .setAction(async (taskArgs, hre) => {
    let [, user] = await hre.ethers.getSigners();

    const router = (
      await hre.ethers.getContractFactory("UniswapV2Router01")
    ).attach(taskArgs.router);
  
    const path= ['0xDd7eE17DF4968e9d812183EB68859508eBEbc609','0xf099ebb4dac94c3f833fe01f3be1edad00c5bba7']
    // utc timestamp + 60 seconds
    const timestamp = Math.floor(Date.now() / 1000) + 60;
    console.log("timestamp ", timestamp);
    console.log("Adding liquidity...");
    const swapTX = await router
      .connect(user)
      .swapExactTokensForTokens(taskArgs.amountIn, taskArgs.amountOut,path,taskArgs.to,timestamp,{ gasLimit: 540000});
    await swapTX.wait(1);
//{ gasLimit: 540000}
    console.log(
      `liquidityTX ${swapTX}`
    ); 
  });

module.exports = {};

//npx hardhat swap-tokens-for-exact-tokens --router 0xf1197563AE3e00EE9e30F1f0c7a62dFFdF108A03 --amount-in 10000000000000000 --amount-out 0 --to 0x12E90Bc5eafB4082Acc3184955A0079ae6464bf1 --network lachain