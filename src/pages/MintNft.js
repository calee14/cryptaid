import { Box, Container, Heading, Input, Text, Button, InputGroup, InputLeftElement, Spacer } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router";
import { useOrgData } from "../hooks/useOrgData";
import { useMintNft } from "../hooks/useMintNft";
import { useMoralis } from "react-moralis";
import { Moralis } from 'moralis'
import { useRedirect } from "../hooks/useRedirect";

export const MintNft = () => {

    const redirect = useRedirect()

    const { state } = useLocation();
    const { org_id } = state;

    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const mint = useMintNft();
    const [minting, setMinting] = useState(false);

    const navigate = useNavigate();
    
    const org_data = useOrgData(org_id);

    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); 
    const [price, setPrice] = useState();

    const selectHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const updateOrganization = async (nftData) => {
        const organization= Moralis.Object.extend("Organization");
        const query = new Moralis.Query(organization);
        query.equalTo("objectId", org_id);
        const org = await query.first()
        
        let newNftList = org_data.nft
        let newNft = {
            link: nftData.link,
            imgLink: nftData.imgLink,
            price: nftData.nftPrice
        }
        newNftList.push(newNft)
        org.set("nft", newNftList)
        org.save();
    }

    const handleMint = async (e) => {
        e.preventDefault();

        if(parseFloat(price) && isFilePicked) {
            setMinting(true);
            const nftData = await mint(org_data.ethAddress, name, description, selectedFile, 1, parseFloat(price));
            
            updateOrganization(nftData)
            redirect(-1);
        } else {
            alert("Please pick an image file and enter a price")
        }
    }

    return (
        <Container>
            <Button onClick={() => navigate(-1)}><ArrowLeftIcon/>Organization Page</Button>
            <Spacer my={5}/>
            <Heading>Minting for {org_data.title}</Heading>
            <Spacer my={5}/>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
            <Spacer my={3}/>
            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>
            <Spacer my={3}/>
            <Heading fontSize={'lg'} >Price of NFT</Heading>
            <Spacer my={2}/>
            <InputGroup>
     
                <InputLeftElement
                    pointerEvents='none'
                    children={"Eth"}
                />
                <Input placeholder="0.1" value={price} onChange={(e) => { setPrice(e.currentTarget.value); } }/>       </InputGroup>
            
            
            <Spacer my={3}/>
            <Box>
                <input type={'file'} name={'file'} onChange={selectHandler}/>
            </Box>
            <Spacer my={5}/>
            <Box width={'100%'} justifyContent={'center'}>
                <Button width={'50%'} onClick={handleMint} isLoading={minting}>Mint Nft</Button>
            </Box>
            
        </Container>
    );
};