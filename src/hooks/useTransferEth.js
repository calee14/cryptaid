import { useWeb3Transfer } from "react-moralis";
import { Moralis } from "moralis";

export const useTransferEth = (_units, _receiver) => {

    const { fetch, error, isFetching } = useWeb3Transfer({
        type: "native",
        amount: Moralis.Units.ETH(_units),
        receiver: _receiver,
    });

    return { fetch, error, isFetching }
};