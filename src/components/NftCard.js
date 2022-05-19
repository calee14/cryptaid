import { Box, Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";

export const NftCard = () => {
    return (
        <Box boxShadow={'md'} width={"17rem"} height={"26rem"} backgroundColor="white" rounded={13}>
            <Image width={'100%'} height={"80%"} objectFit={"cover"} position={"relative"} roundedTop={13} src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.YS5cx3_QVapWgLrP9n-44gHaHa%26pid%3DApi&f=1'}/>
            <Flex padding={5}>
                <Button color={'blue.600'}>Buy now</Button>
                <Spacer/>
                <Box>
                    <Text color={'gray.400'} fontWeight={'semi-bold'}>Price</Text>
                    <Text fontWeight={"bold"}>ETH 0.002</Text>
                </Box>
            </Flex>
            
        </Box>
    );
};
