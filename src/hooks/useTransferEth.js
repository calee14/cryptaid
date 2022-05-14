import { useWeb3Transfer } from "react-moralis";
import { Moralis } from "moralis";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export const useTransferEth = (_units, _receiver) => {
    
    const { enableWeb3, isWeb3Enabled, web3 } = useMoralis();

    useEffect(() => {
        if (!isWeb3Enabled) {
           enableWeb3();
        }
    }, [web3, enableWeb3, isWeb3Enabled]);
   
    const { fetch, error, isFetching } = useWeb3Transfer({
        type: "native",
        amount: Moralis.Units.ETH(_units),
        receiver: _receiver,
    });

    return { fetch, error, isFetching }
};