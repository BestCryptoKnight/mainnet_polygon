import '@nomiclabs/hardhat-ethers'
import { ethers } from 'hardhat'
import * as dotenv from "dotenv";
import config  from "../config/config.json";

dotenv.config();

async function main() {
  let fxRoot, checkpointManager;
  const oracle = "0xc1c6f3b788FE7F4bB896a2Fad65F5a8c0Ad509C9"

  const network = await ethers.provider.getNetwork();

  if (network.chainId === 1) {
    // Ethereum Mainnet
    fxRoot = config.mainnet.fxRoot.address;
    checkpointManager = config.mainnet.checkpointManager.address;

  } else if (network.chainId === 5) {
    // Goerli Testnet
    fxRoot = config.testnet.fxRoot.address;
    checkpointManager = config.testnet.checkpointManager.address;

  } else {
    return

  }

  const ERC20 = await ethers.getContractFactory("FxStateRootTunnel");
  const erc20 = await ERC20.deploy(checkpointManager, fxRoot, oracle);
  await erc20.deployTransaction.wait();
  console.log("ERC20ChildTunnel deployed to:", erc20.address);
  console.log(
    "npx hardhat verify --network goerli",
    erc20.address,
    checkpointManager,
    fxRoot,
    oracle,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
