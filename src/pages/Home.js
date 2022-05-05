import { Box, Button } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { OrgCard } from "../components/OrgCard";

export const Home = () => {

    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();
    const imgUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F029%2F514%2FScreen_Shot_2019-04-30_at_2.58.37_PM.png&f=1&nofb=1";
    return (
        <Box>
            {isAuthenticated && 
                <Button onClick={() => logout()}>Logout</Button>
            }
            <OrgCard title={"Save the turties"} description={"this"} imgUrl={imgUrl} donatedEth={"this"}/>
        </Box>
    );
}