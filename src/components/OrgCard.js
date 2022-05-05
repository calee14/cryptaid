import { Box, Heading, Image, Spacer, Text } from "@chakra-ui/react";

export const OrgCard = (props) => {
    const { title, description, imgUrl, donatedEth } = props;
    return (
        <Box boxShadow={'md'} border="1px" borderColor={"gray.200"} rounded={10} padding={5} width={"17rem"} height={"26rem"}>
            <Heading fontSize="2xl">{title}</Heading>
            <Spacer my={2} />
            <Image position={"relative"} width={"100%"} objectFit={"cover"} height={"50%"} src={imgUrl} rounded={"md"} alt='Org Image here' />
            <Spacer my={2} />
            <Text fontSize={"md"}>{description}</Text>
      </Box>
    );
}