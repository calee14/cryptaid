import {useColorModeValue, Stack, Heading, Box, Button, NumberInput, NumberInputField, Spacer, InputGroup, Text, InputRightElement, Input, Flex } from "@chakra-ui/react"
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

    const tokens = [
        {
            tokenName: "DAI",
            address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa"
        },
        {
            tokenName: "Custom",
            address: ""
        }

    ];

    return(
        <>
        <Spacer marginTop={70}/>
        <Box mx={"25%"} 
        bg={useColorModeValue('gray.30', 'gray.800')}
        boxShadow={'0px 10px 15px #F4AAB9'}
        
        borderRadius={"10px"}
        marginTop={"10px"}
        padding={"20px"} 
        paddingTop={"30px"}
        paddingBottom={"30px"}>
           
        <Stack marginBottom={"20px"} align={'center'}>
            <Heading 
            fontSize={'4xl'} > Swap tokens! 
            </Heading>
            <Stack direction="row">
            <img src="https://cdn3.emoji.gg/emojis/7675-ethereum.png" width="64px" height="64px" alt="Ethereum"/> 
            <img src="https://cdn3.emoji.gg/emojis/8788-bitcoin.png" width="64px" height="64px" alt="BitCoin" />
            <img src="https://cdn3.emoji.gg/emojis/4126-matic.png" width="64px" height="64px" alt="MATIC" />
            </Stack>
        </Stack>

        

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
            <Spacer my={5}/>
            <Text fontSize={'xl'}>Token</Text>
            <Flex gap="0.5rem">
                {tokens.map((t) => {
                    return <Button bg={'pink.400'} color={'white'}  onClick={() => setTokenAddress(t.address)}>{t.tokenName}</Button>
                })}
            </Flex>
            <Spacer my={2}/>
            <InputGroup width={'50%'}>
                <Input value={tokenAddress} onChange={(event) => setTokenAddress(event.currentTarget.value)} placeholder="Your token address"/>
            </InputGroup>
            <Spacer my={2}/>
            {transactionMessage && 
                <>
                    <Text color={'green.400'} fontSize={'sm'}>{transactionMessage}</Text>
                    <Spacer my={2}/>
                </>
            }
            <Button bg={'pink.400'} color={'white'} isLoading={swapping} onClick={() => handleSwap()}>Token Swap</Button>
            
        </Box>
        <Spacer mb={100}/>
        </>
    )
}