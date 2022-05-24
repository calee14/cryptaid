import { Box, Button, Flex, Heading, Image, Spacer, Text } from "@chakra-ui/react";

export const NftCardDisplay = (props) => {
    return (
        <Box boxShadow={'md'} width={"13rem"} height={"17rem"} backgroundColor="white" rounded={13}>
            <Image width={'100%'} height={"85%"} objectFit={"cover"} position={"relative"} roundedTop={13} src={props.imgLink}/>
            <Flex padding={2.5}>
                <Heading fontSize={'md'}>{props.name}</Heading>
            </Flex>
            
        </Box>
    );
};
