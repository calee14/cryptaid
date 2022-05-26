import { Heading, Box, Button } from "@chakra-ui/react"
import "../smartcontracts/TokenSwap.sol"

export const ChangeToken = () => {
    return(
        <Box mx={"14%"}>
            <Heading>Come get free money</Heading>
            <Button>Token Swap</Button>
        </Box>
    )
}