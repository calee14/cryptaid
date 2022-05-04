import { Box, Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"

export const Home = () => {

    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();

    return (
        <Box>
            {isAuthenticated && 
                <Button onClick={() => logout()}>Logout</Button>
            }
        </Box>
    );
}