import { Moralis } from "moralis";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export const useMintNft = () => {
    
    const { enableWeb3, isWeb3Enabled, web3, user } = useMoralis();
    
    useEffect(() => {
        async function initalize() {
            await Moralis.initPlugins(); 
        }

        initalize();

        if (!isWeb3Enabled) {
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
            image: "/ipfs/" + imgHash,
        };
        
        const metaFile = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata))});
        await metaFile.saveIPFS();

        const metaDataHash = metaFile.hash();
        console.log(metaFile.ipfs());
        console.log(user.get('ethAddress'))
        const res = await Moralis.Plugins.rarible.lazyMint({
            chain: 'rinkeby',
            userAddress: _owner, // make sure same account in browser
            tokenType: 'ERC721',
            tokenUri: '/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp',
            supply: 2,
            royaltiesAmount: 5, // 0.05% royalty. Optional
        });
        return res;
    };
};