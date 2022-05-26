import { Heading, Box, Button, NumberInput, NumberInputField } from "@chakra-ui/react"
import "../smartcontracts/TokenSwap.sol"

export const ChangeToken = () => {
    return(
        <Box mx={"14%"}>
            <Heading>Come get free money</Heading>
            <Button>Token Swap</Button>
            <NumberInput maxW={50} defaultValue={0.0}>
            <NumberInputField />
            </NumberInput>
            <NumberInput maxW={50} defaultValue={0.0}>
            <NumberInputField />
            </NumberInput>
        </Box>
    )
}