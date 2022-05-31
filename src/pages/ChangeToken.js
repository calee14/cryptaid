import { Heading, Box, Button, NumberInput, NumberInputField, Spacer, InputGroup, Text, InputRightElement, Input } from "@chakra-ui/react"
import "../smartcontracts/TokenSwap.sol"
import { useState } from "react";
import { useSwapContract } from '../hooks/useSwapContract.js';

export const ChangeToken = () => {
    const [amount, setAmount] = useState(0.0);
    const [tokenAddress, setTokenAddress] = useState('');
    const swap = useSwapContract();
    const [swapping, setSwapping] = useState(false);
    const [transactionMessage, setMessage] = useState();

    const handleSwap = async () => {
        setSwapping(true);
        const res = await swap(amount, tokenAddress);
        console.log(res);
        setMessage('Swap complete! Block hash: ' + res.blockHash);
        setSwapping(false);
    }

    return(
        <Box mx={"14%"}>
            <Heading>Swap tokens! Control your Defi!!</Heading>
            <Spacer my={5}/>
            <Text fontSize={'xl'}>Amount</Text>
            <InputGroup>
                <NumberInput defaultValue={amount}>
                    <InputRightElement
                        pointerEvents='none'
                        children={"Eth"}
                    />
                    <NumberInputField  onChange={(e) => setAmount(e.currentTarget.value)}/>
                </NumberInput>
            </InputGroup>
            <Text fontSize={'xl'}>Token</Text>
            <InputGroup width={'50%'}>
                <Input value={tokenAddress} onChange={(event) => setTokenAddress(event.currentTarget.value)} placeholder="Your token address"/>
            </InputGroup>
            <Spacer my={5}/>
            {transactionMessage && 
                <>
                    <Text color={'green.400'} fontSize={'sm'}>{transactionMessage}</Text>
                    <Spacer my={2}/>
                </>
            }
            <Button isLoading={swapping} onClick={() => handleSwap()}>Token Swap</Button>
            
        </Box>
    )
}