require("dotenv").config();
const { verify, networkHasVerification } = require("./utils.js");
const { task } = require("hardhat/config");

task("deploy-router", "Deploy UniswapV2Factory contract")
.setAction(async (taskArgs, hre) => {
    let [admin,user] = await hre.ethers.getSigners();
    console.log("The admin address: ", admin.address);
    console.log("The user address: ", user.address);
    
    console.log("Deploying UniswapV2Factory...");
    const V2FactoryContract = await hre.ethers.getContractFactory(
      "UniswapV2Factory"
    );

    const factory = await V2FactoryContract.connect(user).deploy(
      user.address
    );
    await factory.waitForDeployment();

    console.log(`UniswapV2Factory deployed to ${factory.target}`);
    if (networkHasVerification(hre.network.config.chainId)) {
      console.log("Waiting for block confirmations...");
      await verify(factory.target,[user.address]);
    }
    return factory.target;
  });
