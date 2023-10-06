require("dotenv").config();
const { verify, networkHasVerification } = require("./utils.js");
const { task } = require("hardhat/config");

task("deploy-router", "Deploy UniswapV2Router contract")
.addParam("factory", "factory address")
.addParam("weth", "weth address")
.setAction(async (taskArgs, hre) => {
    let [admin,user] = await hre.ethers.getSigners();
    console.log("The admin address: ", admin.address);
    console.log("The a2 address: ", user.address);

    console.log("Deploying UniswapV2Router...");
    const V2RouterContract = await hre.ethers.getContractFactory(
      "UniswapV2Router02"
    );

    const router = await V2RouterContract.connect(user).deploy(
     taskArgs.factory,taskArgs.weth
    );
    await router.waitForDeployment();

    console.log(`UniswapV2Router deployed to ${await router.getAddress()}`);
    if (networkHasVerification(hre.network.config.chainId)) {
      console.log("Waiting for block confirmations...");
      await router.deploymentTransaction().wait(2);
      await verify(await router.getAddress(),[taskArgs.factory,taskArgs.weth]);
    }
    return router;
  });
