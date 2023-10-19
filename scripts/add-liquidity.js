const { task } = require("hardhat/config");
const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json')
const Factory = require('@uniswap/v2-core/build/UniswapV2Factory.json')

task("add-liquidity", "add liquidity to the pair")
  .addParam("router", "router address")
  .addParam("token1", "token1 address")
  .addParam("token2", "token2 address")
  .addParam("amountDesired1", "token1 amount desired")
  .addParam("amountDesired2", "token2 amount desired")
  .addParam("to", "address to send liquidity")
  .addOptionalParam("sender", "sender account")
  .setAction(async (taskArgs, hre) => {
    let [, user] = await ethers.getSigners();
    console.log("The user address: ", user.address);
    const router = (
      await hre.ethers.getContractFactory("UniswapV2Router02")
    ).attach(taskArgs.router);
    
    //https://www.epochconverter.com/
    const timestamp = 1699722692;
    console.log("timestamp ", timestamp);
   
    const amountA =ethers.parseUnits("1").toString();
    const amountB =ethers.parseUnits("1").toString();
    console.log("amount ", amountA, "amountB", amountB);

    console.log("Adding liquidity...");
    const liquidityTX = await router
      .connect(user)
      .addLiquidity(taskArgs.token1, taskArgs.token2,
        amountA,amountB,    
        0,0,taskArgs.to,
        timestamp,{ gasLimit: 540000});  //{ gasLimit: 540000}

    await liquidityTX.wait(1);

    console.log(
      `liquidityTX ${liquidityTX} ${taskArgs.token1} ${taskArgs.token2}`
    ); 

  });

module.exports = {};

