import { Box, Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"

export const BackendTesting = () => {

    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();

    return (
        <Box>
            {isAuthenticated && 
                <Button onClick={() => logout()}>Logout</Button>
            }
        </Box>
    );
}