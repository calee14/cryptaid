import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { OrgCard } from "../components/OrgCard";
import {Moralis} from "moralis"
import { useEffect, useState } from "react";

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

    const [orgs, setOrgs] = useState([])
    
    useEffect(() => {
        const getTokensByChain = async () => {
            const orgQuery = new Moralis.Query("Organization");
            const tokens = await orgQuery.find({ useMasterKey: true });
            const resultArray = [];
            tokens.map((props)=>{
                resultArray.push({
                    title: props.attributes.title,
                    description: props.attributes.description,
                    location: props.attributes.location,
                    imgUrl: props.attributes.imgUrl,
                    donated: props.attributes.donated,
                    goal: props.attributes.goal
                })
            })
            setOrgs(resultArray)
        }
        getTokensByChain();
      }, [Moralis]);


    
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