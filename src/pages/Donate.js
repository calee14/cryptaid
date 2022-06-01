import { useLocation, useNavigate } from "react-router";
import { useTransferEth } from "../hooks/useTransferEth";
import { ErrorBox } from "../components/Error";
import { Button, Container, Spacer, Input, InputGroup, InputLeftElement, Text, Box, useColorModeValue} from "@chakra-ui/react";
import { useState } from "react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useOrgData } from "../hooks/useOrgData";

export const Donate = () => {
    const { state } = useLocation();
    const { org_id } = state;
    const [amount, setAmount] = useState();
    const navigate = useNavigate();

    const org_data = useOrgData(org_id);

    const { fetch, error, isFetching } = useTransferEth(!Number.isNaN(parseFloat(amount)) ? amount : 0.0, org_data.ethAddress);

    const handlePayment = () => {
        if(parseFloat(amount)) {
            fetch();
        }
    }

    return (
        <>

        <Box 
        mx={"25%"} 
        bg={useColorModeValue('gray.30', 'gray.800')}
        boxShadow={'0px 10px 15px #F4AAB9'}
        
        borderRadius={"10px"}
        marginTop={"10px"}
        padding={"20px"} 
        paddingTop={"30px"}
        paddingBottom={"30px"}>
            <Container>
                {/* need to be logged in to donate */}
                {error && <ErrorBox title={"Error transferring Eth"}  message={error.message}/>}

                <Button onClick={() => navigate(-1)}><ArrowLeftIcon/>Organization Page</Button>
                <Spacer my={5}/>
                <Text fontSize={'xl'}>Donating to <b>{org_data.title}</b></Text>
                <Spacer my={5}/>
                <Text fontWeight={'medium'}>Enter your donation amount:</Text>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={"Eth"}
                    />
                    <Input value={amount} onChange={(event) => setAmount(event.currentTarget.value)} placeholder="0.0"/>
                </InputGroup>
                <Spacer my={5}/>
                
                <Button colorScheme={'pink'} width={"50%"} onClick={handlePayment} disabled={isFetching}>
                    Donate
                </Button>
            </Container>
        </Box>
        <Spacer mb={'17rem'}/>

        </>
    );
};