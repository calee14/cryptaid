import { Box, Container, Heading, Input, Text, Button} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useOrgData } from "../hooks/useOrgData";

export const MintNft = () => {

    const { state } = useLocation();
    const { org_id } = state;
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const navigate = useNavigate();
    
    const org_data = useOrgData(org_id);

    const selectHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    return (
        <Container>
            <Button onClick={() => navigate(-1)}><ArrowLeftIcon/>Organization Page</Button>
            <Heading>Minting for {org_data.title}</Heading>
            <Input placeholder="Name"/>
            <Input placeholder="Description"/>
            <Text>{selectedFile?.name}</Text>
            <input type={'file'} name={'file'} onChange={selectHandler}/>
            
        </Container>
    );
};