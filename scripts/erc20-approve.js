require("dotenv").config();
const { task } = require("hardhat/config");

task("erc20-approve", "approve")
.addParam("token", "tokenA address")
.addParam("spender", "spender address")
.setAction(async (taskArgs, hre) => {
    let [,owner] = await hre.ethers.getSigners();
    console.log("The owner address: ", owner.address);

    const token =  (
        await hre.ethers.getContractFactory("ERC20")
      ).attach(taskArgs.token);
      
    console.log("token ", token.target);  
   const approveTX= await token
    .connect(owner)
    .approve(taskArgs.spender, ethers.MaxInt256);

    await approveTX.wait(1);
    console.log(
        `approveTX ${approveTX} ${taskArgs.token} ${taskArgs.spender}`
      );
    return approveTX;
  });
