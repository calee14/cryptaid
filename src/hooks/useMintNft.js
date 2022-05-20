import { MoralisContext, useWeb3Transfer } from "react-moralis";
import { Moralis } from "moralis";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export const useMintNft = () => {
    
    const { enableWeb3, isWeb3Enabled, web3 } = useMoralis();

    useEffect(() => {
        if (!isWeb3Enabled) {
            Moralis.initPlugins()
            enableWeb3();
        }
    }, [web3, enableWeb3, isWeb3Enabled]);

    return async function(_owner, _name, _description, _imgData, _supply) {
        const imgFile = new Moralis.File(_imgData.name, _imgData);
        await imgFile.saveIPFS();

        const imgHash = imgFile.hash();

        console.log(_owner);
        console.log(imgHash);
        console.log(imgFile.ipfs());
        console.log('/ipfs/'+imgHash);

        const metadata = {
            name: _name,
            description: _description,
            image: "/ipfs/" + imgHash
        };
        
        const metaFile = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata), 'base64')});
        await metaFile.saveIPFS();

        const metaDataHash = metaFile.hash();
        console.log(metaFile.ipfs());
        
        const res = await Moralis.Plugins.rarible.lazyMint({
            chain: 'rinkeby',
            userAddress: _owner,
            tokenType: 'ERC721',
            tokenUri: 'ipfs://' + metaDataHash,
            supply: 1,
            royaltiesAmount: 1,
            list: true, // if lazy listing
            listTokenAmount: 1,
            listTokenValue: 10**18, // 1 Eth
            listAssetClass: 'ETH',
        });

        console.log(res);
    };
};