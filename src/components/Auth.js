import { Button, Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton, Container, Flex, Spacer, Heading } from "@chakra-ui/react";
import SignUp from "./SignUp";
import Login from "./Login";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "./Error";

export const Auth = () => {

    const { authenticate, isAuthenticating, authError } = useMoralis();

    return (
        <>
        <Container>
            {authError &&
                <ErrorBox title="Authentication has failed" message={authError.message}/>
            }
            <Flex>
                <SignUp />
                <Spacer/>
                <Login />
            </Flex>
            <Spacer my={5}/>
            <Heading size="md">Authenticate with Metamask</Heading>
            <Spacer my={1}/>
            <Button isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate</Button>
        
        </Container>
        </>
    );
}