import { Box, Button, Flex, Image, Spacer, Text } from "@chakra-ui/react";

export const NftCard = (props) => {
    return (
        <Box boxShadow={'md'} width={"17rem"} height={"26rem"} backgroundColor="white" rounded={13}>
            <Image width={'100%'} height={"80%"} objectFit={"cover"} position={"relative"} roundedTop={13} src={props.imgLink}/>
            <Flex padding={5}>
                <a href={props.link.toLowerCase()} target="_blank">
                <Button>Buy Now</Button>
                </a>
                <Spacer/>
                <Box>
                    <Text color={'gray.400'} fontWeight={'semi-bold'}>Price</Text>
                    <Text fontWeight={"bold"}>ETH {props.price.toFixed(4)}</Text>
                </Box>
            </Flex>
            
        </Box>
    );
};
