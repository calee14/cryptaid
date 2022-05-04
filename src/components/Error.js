import { AlertIcon, Alert, Box, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react"
import { useState } from "react";

export const ErrorBox = ({ title, message }) => {

    const [isOpen, setIsOpen] = useState(true);

    return isOpen && (
        <Alert status='error'>
            <AlertIcon />
            <Box>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={() => setIsOpen(false)}
            />
        </Alert>
    )
}