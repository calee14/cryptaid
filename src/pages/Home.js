import { Box, Button, Container, Grid, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { OrgCard } from "../components/OrgCard";
import {Moralis} from "moralis"
import { useEffect, useState } from "react";

export const Home = () => {

    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();

    const [orgs, setOrgs] = useState([]);
    
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
                    goal: props.attributes.goal,
                    id: props.id,
                    owner: props.attributes.user,
                    ethAddress: props.attributes.ethAddress
                })
            })
            setOrgs(resultArray)
        }
        getTokensByChain();
      }, [Moralis]);


    
    return (
        <Container mx={"15rem"}>
            {isAuthenticated && 
                <Button onClick={() => logout()}>Logout</Button>
            }
            <Grid templateColumns={"repeat(3, 1fr)"} columnGap={10} rowGap={5}>

            {orgs.length > 0 ? orgs.map((props) => {
                return (<OrgCard {...props} />)
                
            }) : <Text>No organizations at the moment</Text>}
            </Grid>
        </Container>
    );
}