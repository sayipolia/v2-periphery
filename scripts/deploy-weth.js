require("dotenv").config();
const { verify, networkHasVerification } = require("./utils.js");
const { task } = require("hardhat/config");

task("deploy-weth", "Deploy WETH9 contract")
  .setAction(async (taskArgs, hre) => {
    let [admin] = await hre.ethers.getSigners();
    console.log("The admin address: ", admin.address);

    console.log("Deploying WETH9...");
    const WETH9Contract = await hre.ethers.getContractFactory(
      "WETH9"
    );
    const WETH9Instance = await WETH9Contract.connect(admin).deploy();
    await WETH9Instance.waitForDeployment();
    console.log(`WETH9 deployed to ${await WETH9Instance.getAddress()}`);

    if (networkHasVerification(hre.network.config.chainId)) {
      console.log("Waiting for block confirmations...");
      //await WETH9Instance.deployTransaction.wait(6);
      await verify(await WETH9Instance.getAddress());
    }
    return WETH9Instance;
  });