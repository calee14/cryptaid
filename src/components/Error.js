import { AlertIcon, Alert, Box, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react"

export const ErrorBox = ({ title, message }) => {
    return (
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
            />
        </Alert>
    )
}