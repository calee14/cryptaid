import { AlertIcon, Alert, Box, AlertTitle, AlertDescription, CloseButton, Flex, Spacer } from "@chakra-ui/react"
import { useState } from "react";

export const ErrorBox = ({ title, message }) => {

    const [isOpen, setIsOpen] = useState(true);

    return isOpen && (
        <Alert status='error'>
            <AlertIcon />
            <Flex width={"100%"}>
            <Box>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Box>
            <Spacer/>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={() => setIsOpen(false)}
            />
            </Flex>
        </Alert>
    )
}