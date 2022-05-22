import { Button, Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton, Container, Flex, Spacer, Heading } from "@chakra-ui/react";
import Login from "../components/Login";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "../components/Error";
import { useEffect } from "react";
import { useRedirect } from "../hooks/useRedirect";

export const Auth = () => {

    const { authenticate, isAuthenticating, authError, isAuthUndefined, isAuthenticated } = useMoralis();
    const redirect = useRedirect();

    // redirect if user is not authenticated
    useEffect(() => {
        if(isAuthenticated) {
            redirect("/");
        }
    }, [isAuthenticated]);

    return (
        <>
        <Box mx={"25%"} >
            {authError &&
                <ErrorBox title="Authentication has failed" message={authError.message}/>
            }
            <Login />
            <Spacer my={5}/>
            <Heading size="md">Authenticate with Metamask</Heading>
            <Spacer my={1}/>
            <Flex>
                <Button width='100%' isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate</Button>
            </Flex>
        </Box>
        </>
    );
}