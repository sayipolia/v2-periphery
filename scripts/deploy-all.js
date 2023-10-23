const { ethers } = require("hardhat");

const Factory = require('@uniswap/v2-core/build/UniswapV2Factory.json')
const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json')

async function main() {
    const accounts = await ethers.getSigners();
    const owner = accounts[1];

    console.log("The owner address: ", owner.address);

    const factoryV2 = new ethers.ContractFactory(
        new ethers.Interface(Factory.abi),
        Factory.bytecode,
        owner
    );
    const ERC20 = await hre.ethers.getContractFactory(
        "ERC20"
    );
    
    //deploy
    const tokenA = await ERC20.connect(owner).deploy(ethers.parseEther("6000"));
    await tokenA.waitForDeployment();

    const tokenB = await ERC20.connect(owner).deploy(ethers.parseEther("6000"));
    await tokenB.waitForDeployment();

    const WETHInstance = await hre.ethers.deployContract("WETH9", [])
    await WETHInstance.waitForDeployment();

    console.log("tokenA", tokenA.target);
    console.log("tokenB", tokenB.target);
    console.log("WETHInstance", WETHInstance.target);

    const factoryV2Instance = await factoryV2.deploy(
        owner.address,
    );
    await factoryV2Instance.waitForDeployment();
    console.log("factoryV2Instance", factoryV2Instance.target);

    const router02Instance = await hre.ethers.deployContract("UniswapV2Router02", [factoryV2Instance.target, WETHInstance.target]);
    console.log("router02Instance", router02Instance.target);

    // create pair
    const createTX=await factoryV2Instance.createPair(tokenA.target, tokenB.target)
    await createTX.wait(1);
    console.log("createTX ", createTX.hash);

    const pairAddress = await factoryV2Instance.getPair(tokenA.target, tokenB.target)
    console.log("pairAddress ", pairAddress);
    const pair = new ethers.Contract(pairAddress, IUniswapV2Pair.abi, owner)

   const approveTokATX = await tokenA
        .connect(owner)
        .approve(router02Instance.target, ethers.MaxInt256);
    await approveTokATX.wait(1);     

    const approveTokBTX= await tokenB
        .connect(owner)
        .approve(router02Instance.target, ethers.MaxInt256);
   await approveTokBTX.wait(1);     
    console.log("approves");

    //https://www.epochconverter.com/
    const timestamp = 1698201335;
    const amountMinA = ethers.parseUnits("1").toString();
    const amountMinB = ethers.parseUnits("1").toString();

    const liquidityTX = await router02Instance
        .connect(owner)
        .addLiquidity(tokenA.target, tokenB.target,
            amountMinA, amountMinB,
            0, 0, owner.address,
            timestamp, { gasLimit: 540000 });

    await liquidityTX.wait(1);


    const reservesPair = await pair.getReserves();
    console.log(`reservesPair ${reservesPair}`);

    const path = [tokenA.target, tokenB.target];

    const getAmountsIn = await router02Instance.connect(owner).getAmountsIn(ethers.parseUnits("0.2"), path);
    console.log(`getAmountsIn, ${getAmountsIn}`);

    const swapTX = await router02Instance
    .connect(owner)
    .swapExactTokensForTokens(getAmountsIn[0],getAmountsIn[1], path,
        owner.address, timestamp, { gasLimit: 540000 });
   
   await swapTX.wait(1);

  console.log(
    `SwapTokens: ${swapTX}`
  );


}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
