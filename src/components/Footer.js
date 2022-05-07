import { Box, Heading, Text } from "@chakra-ui/react";

export const Footer = () => {
    return (
        <Box width={"100%"} paddingX={"10rem"} paddingY={"2rem"} backgroundColor="gray.100">
            <Box>
                <Heading fontSize={"sm"}>© 2022 Fiesta 3.0. All rights reserved</Heading>
            </Box>
        </Box>
    );
};