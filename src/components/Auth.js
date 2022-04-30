import { Button, Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton, Container } from "@chakra-ui/react";
import SignUp from "./SignUp";
import Login from "./Login";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "./Error";

export const Auth = () => {

    const { authenticate, isAuthenticating, authError } = useMoralis();

    return (
        <>
        <Container>
            Cryptaid
            {authError &&
                <ErrorBox title="Authentication has failed" message={authError.message}/>
            }
            <SignUp />
            <Login />
            <Button isLoading={isAuthenticating} onClick={() => authenticate()}>Authenticate</Button>
        </Container>
        </>
    );
}