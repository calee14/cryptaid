import { useMoralisWeb3Api } from "react-moralis";

export const useGetNfts = () => {
    
    const Web3Api = useMoralisWeb3Api();

    return async function() {
        // get testnet NFTs metadata for user
        const testnetNFTs = await Web3Api.Web3API.account.getNFTs({
            chain: "rinkeby",
        });
        const result = testnetNFTs.result;
        return result;
    };
};
