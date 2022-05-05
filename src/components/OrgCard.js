import { Box, Heading, Image } from "@chakra-ui/react";

export const OrgCard = (props) => {
    const {title, description, imgUrl, donatedEth} = props;
    return (
      <Box boxShadow={'md'} border="1px" borderColor={"gray.200"} rounded={10} padding={5} width={"20rem"} >
          <Heading fontSize="2xl">title</Heading>
          <Image src='imgUrl' alt='Org Image here'/>
      </Box>
    );
}