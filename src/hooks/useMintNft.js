import { Moralis } from "moralis";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export const useMintNft = () => {
    
    const { enableWeb3, isWeb3Enabled, web3, user, authenticate } = useMoralis();
    
    useEffect(() => {
        async function initalize() {
            await Moralis.initPlugins(); 
        }

        initalize();

        if (!isWeb3Enabled) {
            enableWeb3();
        }
        
    }, [web3, enableWeb3, isWeb3Enabled]);

    return async function(_owner, _name, _description, _imgData, _supply, _price) {
        await authenticate();

        const imgFile = new Moralis.File(_imgData.name, _imgData);
        await imgFile.saveIPFS();

        const imgHash = imgFile.hash();
        const imgLink = imgFile.ipfs();

        console.log(_owner);
        console.log(imgHash);
        console.log(imgFile.ipfs());
        console.log('/ipfs/'+imgHash);

        const metadata = {
            name: _name,
            description: _description,
            image: "/ipfs/" + imgHash,
        };
        
        const metaFile = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata))});
        await metaFile.saveIPFS();

        const metaDataHash = metaFile.hash();
        console.log(metaFile.ipfs());

        const res = await Moralis.Plugins.rarible.lazyMint({
            chain: 'rinkeby',
            userAddress: _owner, // make sure same account in browser
            tokenType: 'ERC721',
            tokenUri: '/ipfs/' + metaDataHash,
            supply: _supply,
            royaltiesAmount: 5, // 0.05% royalty. Optional,
            list: true,
            listTokenAmount: _supply,
            listTokenValue: Moralis.Units.ETH(_price),
            listAssetClass: 'ETH',
        }).catch((err) => {
            console.log(err);
            return err;
        })

        
        var link = `https://rinkeby.rarible.com/token/${res.triggers[2].params.makeTokenAddress.toLowerCase()}:${res.triggers[2].params.makeTokenId}`;

        // const link = 'https://rinkeby.rarible.com/token/' + res.triggers[2].params.makeTokenAddress + ':' + String(res.triggers[2].params.makeTokenId);

        return {
            link: link,
            imgLink: imgLink,
            nftPrice: _price
        };
    };
};