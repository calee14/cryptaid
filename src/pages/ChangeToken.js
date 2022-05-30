import { Heading, Box, Button, NumberInput, NumberInputField, Spacer, InputGroup, Text, InputRightElement, Input } from "@chakra-ui/react"
import "../smartcontracts/TokenSwap.sol"
import { useState } from "react";
import { useSwapContract } from '../hooks/useSwapContract.js';

export const ChangeToken = () => {
    const [amount, setAmount] = useState(0.0);
    const [tokenAddress, setTokenAddress] = useState('');

    const handleSwap = () => {

    }

    return(
        <Box mx={"14%"}>
            <Heading>Swap tokens! Secure your Defi!!</Heading>
            <Spacer my={5}/>
            <Text fontSize={'xl'}>Amount</Text>
            <InputGroup>
                <NumberInput defaultValue={amount}>
                    <InputRightElement
                        pointerEvents='none'
                        children={"Eth"}
                    />
                    <NumberInputField defaultValue={amount}/>
                </NumberInput>
            </InputGroup>
            <Text fontSize={'xl'}>Token</Text>
            <InputGroup width={'50%'}>
                <Input value={tokenAddress} onChange={(event) => setAmount(event.currentTarget.value)} placeholder="Your token address"/>
            </InputGroup>
            <Spacer my={5}/>
            <Button onClick={() => handleSwap()}>Token Swap</Button>
            
        </Box>
    )
}