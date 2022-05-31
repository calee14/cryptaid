import { useWeb3Transfer } from "react-moralis";
import { Moralis } from "moralis";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Web3 from "web3/dist/web3.min.js";
import { contractABI, contractAddress } from "../smartcontracts/swapContract";

export const useSwapContract = (_units, _receiver) => {
    
    const { enableWeb3, isWeb3Enabled, web3, user } = useMoralis();
    
    return async function(amountEthIn, tokenAddress) {
        await enableWeb3();
        
        const amountIn = Moralis.Units.ETH(amountEthIn);
        const web3 = new Web3(Moralis.provider);
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const estimateConversion = contract.methods.getEstimatedETHforToken(amountIn, tokenAddress);

        const response = await estimateConversion.call();

        const newTokenAmount = response[0];

        const swapTransaction = contract.methods.convertEthToToken(newTokenAmount, tokenAddress);
        const swapResponse = await swapTransaction.send({from: user.get('ethAddress'), value: amountIn})
        // https://web3js.readthedocs.io/en/v1.2.11/web3-eth.html#eth-sendtransaction how to send transaction with value

        return swapResponse;
    }
};