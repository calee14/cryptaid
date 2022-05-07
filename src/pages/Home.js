import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { OrgCard } from "../components/OrgCard";

export const Home = () => {

    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();
    const imgUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F029%2F514%2FScreen_Shot_2019-04-30_at_2.58.37_PM.png&f=1&nofb=1";

    const props = {
        title: "Save the turties",
        description: "I was going for the title but got hit by the tidal wave.",
        location: "Santa Barabra, CA",
        imgUrl: imgUrl,
        donated: 10,
        goal: 100,
    };

    const orgs = [
        {
            title: "Save the turties",
            description: "I was going for the title but got hit by the tidal wave.",
            location: "Santa Barabra, CA",
            imgUrl: imgUrl,
            donated: 10,
            goal: 100,
        },
        {
            title: "Feed Ukraine",
            description: "Feed families and support democracy in Ukraine!!",
            location: "Santa Barabra, CA",
            imgUrl: "https://static01.nyt.com/images/2022/03/06/world/06ukraine-poland01/merlin_203339697_279bbf5f-90d5-4c4d-8b8a-685250377a90-superJumbo.jpg",
            donated: 10,
            goal: 100,
        },
        {
            title: "Feed Ukraine",
            description: "Feed families and support democracy in Ukraine!!",
            location: "Santa Barabra, CA",
            imgUrl: "https://static01.nyt.com/images/2022/03/06/world/06ukraine-poland01/merlin_203339697_279bbf5f-90d5-4c4d-8b8a-685250377a90-superJumbo.jpg",
            donated: 10,
            goal: 100,
        },
        {
            title: "Feed Ukraine",
            description: "Feed families and support democracy in Ukraine!!",
            location: "Santa Barabra, CA",
            imgUrl: "https://static01.nyt.com/images/2022/03/06/world/06ukraine-poland01/merlin_203339697_279bbf5f-90d5-4c4d-8b8a-685250377a90-superJumbo.jpg",
            donated: 10,
            goal: 100,
        }
    ];
    
    return (
        <Box>
            {isAuthenticated && 
                <Button onClick={() => logout()}>Logout</Button>
            }
            
            <Grid templateColumns={"repeat(3, 1fr)"} gap={10}>
                
            {orgs.length > 0 ? orgs.map((props) => {
                return (<OrgCard {...props} />)
                
            }) : <Text>No organizations at the moment</Text>}
            </Grid>
        </Box>
    );
}