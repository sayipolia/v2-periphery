// async function verify(contractAddress, args) {
    const verify = async (contractAddress, args) => {
        console.log("Verifying contract...");
        try {
          await hre.run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
          });
        } catch (e) {
          if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
          } else {
            console.log(e);
          }
        }
      };
      
      const getProxyImplementationAddress = async (
        contractName,
        deployedContractAddress
      ) => {
        const implementationSlot =
          "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
        const provider = new ethers.providers.JsonRpcProvider(hre.network.config.url);
      
        // get the implementation  address
        const paddedImplementationAddress = await provider.getStorageAt(
          deployedContractAddress,
          implementationSlot
        );
        const implementationAddress = ethers.utils.hexDataSlice(
          paddedImplementationAddress,
          12,
          32
        );
        console.log(contractName, "Implementation Address: ", implementationAddress);
        return implementationAddress;
      };
      
      const getProxyLogicAddress = async (contractName, deployedContractAddress) => {
        const adminSlot =
          "0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103";
        const provider = new ethers.providers.JsonRpcProvider(hre.network.config.url);
      
        // get the proxy address
        const paddedProxyAddress = await provider.getStorageAt(
          deployedContractAddress,
          adminSlot
        );
        const proxyAddress = ethers.utils.hexDataSlice(paddedProxyAddress, 12, 32);
        console.log(contractName, "Proxy Logic  Address: ", proxyAddress);
      
        return proxyAddress;
      };
      
      const toHex = (covertThis, padding) => {
        return ethers.utils.hexZeroPad(ethers.utils.hexlify(covertThis), padding);
      };
      
      const createResourceID = (contractAddress, domainID) => {
        return toHex(contractAddress + toHex(domainID, 8).substr(2), 32);
      };
      
      const networkHasVerification = (chainId) => {
        return (
          (chainId === 5 && hre.config.etherscan.apiKey.goerli) ||
          (chainId === 80001 && hre.config.etherscan.apiKey.polygonMumbai) ||
          (chainId === 418 && hre.config.etherscan.apiKey.lachain)
        );
      };
      
      module.exports = {
        verify,
        getProxyLogicAddress,
        getProxyImplementationAddress,
        createResourceID,
        networkHasVerification,
      };
      