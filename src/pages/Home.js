import { Box, Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { OrgCard } from "../components/OrgCard";

export const Home = () => {

    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();

    return (
        <Box>
            {isAuthenticated && 
                <Button onClick={() => logout()}>Logout</Button>
            }
            <OrgCard title={"Hello"} description={"this"} imgUrl={"this"} donatedEth={"this"}/>
        </Box>
    );
}