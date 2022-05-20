import { Box, Container, Heading, Input, Text, Button} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router";
import { useOrgData } from "../hooks/useOrgData";
import { useMintNft } from "../hooks/useMintNft";
import { useMoralis } from "react-moralis";
import { Moralis } from 'moralis'

export const MintNft = () => {

    const { state } = useLocation();
    const { org_id } = state;
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const navigate = useNavigate();
    // const mint = useMintNft();
    
    const org_data = useOrgData(org_id);

    const { enableWeb3, isWeb3Enabled, web3 } = useMoralis();

    useEffect(() => {
        Moralis.initPlugins();

        if (!isWeb3Enabled) {
            enableWeb3();
        }
    }, [web3, enableWeb3, isWeb3Enabled]);

    const selectHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const handleMint = async (e) => {
        e.preventDefault();
        const imgFile = new Moralis.File(selectedFile.name, selectedFile);
        await imgFile.saveIPFS();

        const imgHash = imgFile.hash();

        console.log(org_data.ethAddress);
        console.log(imgHash);
        console.log(imgFile.ipfs());
        console.log('/ipfs/'+imgHash);

        const metadata = {
            name: 'name',
            description: 'description',
            image: "/ipfs/" + imgHash
        };
        
        const metaFile = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(metadata))});
        await metaFile.saveIPFS();

        const metaDataHash = metaFile.hash();
        console.log(metaFile.ipfs());
        
        let res = await Moralis.Plugins.rarible.lazyMint({
            chain: 'rinkeby',
            userAddress: '0x7f64041298CC2C045FE5eb0e897ab7b5D4BdB4F3',
            tokenType: 'ERC721',
            tokenUri: '/ipfs/' + metaDataHash,
        });

    }

    return (
        <Container>
            <Button onClick={() => navigate(-1)}><ArrowLeftIcon/>Organization Page</Button>
            <Heading>Minting for {org_data.title}</Heading>
            <Input placeholder="Name"/>
            <Input placeholder="Description"/>
            <Text>{selectedFile?.name}</Text>
            <input type={'file'} name={'file'} onChange={selectHandler}/>
            <Button onClick={handleMint}>Mint Nft</Button>
        </Container>
    );
};