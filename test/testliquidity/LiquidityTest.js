const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const Factory = require('@uniswap/v2-core/build/UniswapV2Factory.json')
const IUniswapV2Pair = require('@uniswap/v2-core/build/IUniswapV2Pair.json')


describe("AddLiquidity - [Router]", function () {
  let ERC20Contract, tokenA, tokenB, WETH, WETHInstance,
    factoryV2, factoryV2Instance, router02, router02Instance, pair;

  before(async () => {
    const accounts = await ethers.getSigners();
    owner = accounts[0];
    depositer = accounts[1];
    recipient = accounts[2];

    factoryV2 = new ethers.ContractFactory(
      new ethers.Interface(Factory.abi),
      Factory.bytecode,
      owner
    );

    ERC20Contract = await ethers.getContractFactory("ERC20");
    /*new ethers.ContractFactory(
      new ethers.Interface(ERC20.abi),
      ERC20.bytecode,
      owner
    );
    */

    router02 = await ethers.getContractFactory("UniswapV2Router02");
    WETH = await ethers.getContractFactory("WETH9");
  });

    
  beforeEach(async () => {
    await Promise.all([
      ERC20Contract.deploy(1000).then((instance) => (tokenA = instance)),
      ERC20Contract.deploy(1000).then((instance) => (tokenB = instance)),
      WETH.deploy().then((instance) => (WETHInstance = instance))
    ]);
    
    factoryV2Instance = await factoryV2.deploy(
      owner.address,
    );
    //deploy router02

    router02Instance = await router02.deploy(factoryV2Instance.address, WETHInstance.address);
    console.log("llegue aqui ");
    await factoryV2Instance.createPair(tokenA.address, tokenB.address)
    const pairAddress = await factoryV2Instance.getPair(tokenA.address, tokenB.address)
  
    pair = new ethers.Contract(pairAddress, IUniswapV2Pair.abi, owner)
    console.log("pairAddress ", pairAddress);
    console.log("pair ", pair);

    await tokenA
      .connect(owner)
      .approve(router02Instance.address, ethers.MaxInt256);
    await tokenB
      .connect(owner)
      .approve(router02Instance.address, ethers.MaxInt256);

  });

  it("[sanity] router has the max allowance of amount from tokens", async () => {
    const routerAllowanceTokenA = await tokenA.allowance(
      owner.address,
      router02Instance.address
    );
    expect(ethers.MaxInt256).to.equal(routerAllowanceTokenA);

    const routerAllowanceTokenB = await tokenB.allowance(
      owner.address,
      router02Instance.address
    );
    expect(ethers.MaxInt256).to.equal(routerAllowanceTokenB);

  });
});
