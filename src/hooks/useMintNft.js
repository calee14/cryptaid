import { Moralis } from "moralis";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Rarepress from 'rarepress.js';
import Rareterm from 'rareterm';

export const useMintNft = () => {
    
    const { enableWeb3, isWeb3Enabled, web3 } = useMoralis();
    

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


        // const imgFile = new Moralis.File(_imgData.name, _imgData);
        // await imgFile.saveIPFS();

        // const imgHash = imgFile.hash();

        // console.log(_owner);
        // console.log(imgHash);
        // console.log(imgFile.ipfs());
        // console.log('/ipfs/'+imgHash);

        // const metadata = {
        //     name: _name,
        //     description: _description,
        //     image: "/ipfs/" + imgHash,
        // };
        
        // const metaFile = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata))});
        // await metaFile.saveIPFS();

        // const metaDataHash = metaFile.hash();
        // console.log(metaFile.ipfs());
        const rarepress = new Rareterm();

        await rarepress.init({ host: "https://rinkeby.rarenet.app/v1"}).then(async (address) => {
            console.log(address);
            let token = await rarepress.token.create({
                type: "ERC721",
                metadata: {
                    name: "Title goes here",
                    description: "Description goes here",
                    image: "/ipfs/" + 'hello',
                }
            });
            
            console.log(token);
            // // publish the token itself to Rarible marketplace
            let receipt = await rarepress.token.send(token);
            console.log(receipt);
            console.log('finished');
        });
    };
};