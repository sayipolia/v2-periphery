The owner address:  0x12E90Bc5eafB4082Acc3184955A0079ae6464bf1
tokenA 0x8C75F903be69fEb21612c2B20612CaD2276752cb
tokenB 0xA44A1ede886d7FEdD122A28B487f1b8172162C02
WETHInstance 0x6c2F329c7d0555832977a62D9e95599AA91E1B24
factoryV2Instance 0x6Fc5A4AA91A6DcF46F265D8d6176DD944f6d8faF
router02Instance 0xA0513F24187EC4e7A9Df6F2ee4B59a23d8142d84
pairAddress  0xab96CA8Cd50F0F4085B884dFCC60c3dA925d4Cf5
--------------------------

1. npx hardhat create-pair --factory 0xC73d9b1D228Fef02FE25E235Ff8c147dC04368A4 --t
oken1 0xDd7eE17DF4968e9d812183EB68859508eBEbc609 --token2 0xf099ebb4dac94c3f833fe01f3be1edad00c5bba7 --network lachain

- pair address : 0x1434d1f668376b59411dd3259265b7ae7f0bd406

2. approve router as spender of token1 and token2
check tokens
npx hardhat erc20-approve --token 0xa5b71E5172c374C596Cbe19144883B14f39F1d47 --spender 0x80d649f26d8bb47f25C9B633DEd8c2341a5B2C0f --network lachain


3. Add liquidity on router
- 
npx hardhat add-liquidity --router 0x80d649f26d8bb47f25C9B633DEd8c2341a5B2C0f --token1 0x76C9E1eBF5D2FbBA02f00FC02E7d9e212e756255 --token2 0xa5b71E5172c374C596Cbe19144883B14f39F1d47 --amount-desired1 0.5 --amount-desired2 0.5 --to 0x12E90Bc5eafB4082Acc3184955A0079ae6464bf1 --network lachain

4. check reserves
npx hardhat get-reserves --factory 0x6Fc5A4AA91A6DcF46F265D8d6176DD944f6d8faF --token-a 0x8C75F903be69fEb21612c2B20612CaD2276752cb --token-b 0xA44A1ede886d7FEdD122A28B487f1b8172162C02 --network lachain

5. get amounts
npx hardhat get-amounts --router 0xA0513F24187EC4e7A9Df6F2ee4B59a23d8142d84 --token-a 0x8C75F903be69fEb21612c2B20612CaD2276752cb --token-b 0xA44A1ede886d7FEdD122A28B487f1b8172162C02 --network lachain   

6. Swap exact tokens for tokens
npx hardhat swap-tokens-for-exact-tokens --router 0xA0513F24187EC4e7A9Df6F2ee4B59a23d8142d84 --amount-in 0.2 --amount-out 250752256770310933 --token-a 0x8C75F903be69fEb21612c2B20612CaD2276752cb  --token-b 0xA44A1ede886d7FEdD122A28B487f1b8172162C02 --to 0x12E90Bc5eafB4082Acc3184955A0079ae6464bf1 --network lachain
