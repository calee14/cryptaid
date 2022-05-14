import { useWeb3Transfer } from "react-moralis";

export const useTransferEth = () => {
    return ( _units, _receiver, _sender) => {
        const { fetch, error, isFetching } = useWeb3Transfer({
            type: "native",
            amount: Moralis.Units.ETH(0.1),
            receiver: "0x0000000000000000000000000000000000000000",
        });

        return { fetch, error, isFetching };
    }
};