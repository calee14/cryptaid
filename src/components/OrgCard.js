import { Box, Heading, Image, Spacer, Text, Progress } from "@chakra-ui/react";

export const OrgCard = (props) => {
    const { title, description, imgUrl, location, donated, goal } = props;
    return (
        <Box boxShadow={'md'} border="1px" borderColor={"gray.200"} rounded={10} padding={5} width={"17rem"} height={"26rem"}>
            <Heading fontSize="2xl">{title}</Heading>
            <Heading fontSize="sm">{location}</Heading>
            <Spacer my={2} />
            <Image position={"relative"} width={"100%"} objectFit={"cover"} height={"50%"} src={imgUrl} rounded={"md"} alt='Org Image here' />
            <Spacer my={2} />
            <Text fontSize={"md"}>{description}</Text>
            <Spacer my={2} />
            <Progress value={80} rounded="md" size={"sm"}></Progress>
            <Text fontSize={"smaller"}>Raised {donated} ETH out of {goal} ETH</Text>
            <Spacer my={2}/>
            <Text fontSize={"md"}>Latest NFT sold for 0.5 ETH</Text>
      </Box>
    );
}