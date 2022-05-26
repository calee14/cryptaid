import { Heading, Box, Button, NumberInput, NumberInputField, Spacer } from "@chakra-ui/react"
import "../smartcontracts/TokenSwap.sol"

export const ChangeToken = () => {
    return(
        <Box mx={"14%"}>
            <Heading>Come get free money</Heading>
            <NumberInput defaultValue={0.0}>
            <NumberInputField />
            </NumberInput>
            <NumberInput defaultValue={0.0}>
            <NumberInputField />
            </NumberInput>
            <Button>Token Swap</Button>
            <Spacer my={"50vh"}/>
        </Box>
    )
}