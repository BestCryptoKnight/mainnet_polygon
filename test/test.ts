/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "ethers";
import { expect } from "chai";
import RootABI from "../build/contracts/contracts/FxStateRootTunnel.sol/FxStateRootTunnel.json"
import ChildABI from "../build/contracts/contracts/FxStateChildTunnel.sol/FxStateChildTunnel.json"

dotenv.config();


const root = "0x557cd0cd1E5adD639f71030D76d413bf041254Ab";
const child = "0x8F97CF0408bf2711B028E3FDc840ab7ad2567aba"

describe("Multichain Test", function () {

    let account1: SignerWithAddress;
    const etherURL = `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`
    const mumbai = `https://matic-testnet-archive-rpc.bwarelabs.com`

    beforeEach(async function () {

    });

    it("Multichain testing", async function () {

        let provider = new ethers.providers.JsonRpcProvider(etherURL)
        const signer = new ethers.Wallet(
            process.env.PRIVATE_KEY as string,
            provider
        );
        const rootFactory = new ethers.Contract(
            root,
            RootABI.abi,
            signer
        );
        try {

                provider = new ethers.providers.JsonRpcProvider(mumbai)
                const signer = new ethers.Wallet(
                    process.env.PRIVATE_KEY as string,
                    provider
                );
                const childContract = new ethers.Contract(
                    "0xa0060Cc969d760c3FA85844676fB654Bba693C22",
                    ChildABI.abi,
                    signer
                );
                console.log("=======create childContract Instance======")
                let tx = await childContract.latestStateId()
                console.log("latestStateId", tx.toString())
                tx = await childContract.latestRootMessageSender();
                console.log("latestRootMessageSender", tx)
                tx = await childContract.latestData();
                console.log("latestData", tx)
                

        } catch(e) {
            console.log("err---------------", e)
        }
    });
});