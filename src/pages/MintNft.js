import { Box, Container, Heading, Input, Text} from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router";
import { useOrgData } from "../hooks/useOrgData";

export const MintNft = () => {

    const { state } = useLocation();
    const { org_id } = state;
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const org_data = useOrgData(org_id);

    const selectHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    return (
        <Container>
            <Heading>Minting for {org_data.title}</Heading>
            <Input placeholder="Name"/>
            <Input placeholder="Description"/>
            <Text>{selectedFile?.name}</Text>
            <input type={'file'} name={'file'} onChange={selectHandler}/>
            
        </Container>
    );
};