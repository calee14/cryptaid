import { useWeb3Transfer } from "react-moralis";
import { Moralis } from "moralis";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Web3 from "web3/dist/web3.min.js";
import { contractABI, contractAddress } from "../smartcontracts/swapContract";

export const useSwapContract = (_units, _receiver) => {
    
    const { enableWeb3, isWeb3Enabled, web3, user } = useMoralis();
    
    return async function(tokenAddress) {
        await enableWeb3();
        const web3 = new Web3(Moralis.provider);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const swapTransaction = contract.methods.buyToken(tokenAddress);

        const response = await swapTransaction.send({ from: user.get('ethAddress')});

        return response;
    }
};