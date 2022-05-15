import { Box, Button, Container, Grid, Text } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { OrgCard } from "../components/OrgCard";
import {Moralis} from "moralis"
import { useEffect, useState } from "react";

export const Home = () => {

    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();
    // const imgUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.kym-cdn.com%2Fentries%2Ficons%2Foriginal%2F000%2F029%2F514%2FScreen_Shot_2019-04-30_at_2.58.37_PM.png&f=1&nofb=1";

    // const props = {
    //     title: "Save the turties",
    //     description: "I was going for the title but got hit by the tidal wave.",
    //     location: "Santa Barabra, CA",
    //     imgUrl: imgUrl,
    //     donated: 10,
    //     goal: 100,
    // };

    // const orgs_temp = [
    //     {
    //         id: 1,
    //         title: "Save the turties",
    //         description: "I was going for the title but got hit by the tidal wave.",
    //         location: "Santa Barabra, CA",
    //         imgUrl: imgUrl,
    //         donated: 10,
    //         goal: 100,
    //     },
    //     {
    //         id: 2, 
    //         title: "Feed Ukraine",
    //         description: "Feed families and support democracy in Ukraine!!",
    //         location: "San Diego, CA",
    //         imgUrl: "https://static01.nyt.com/images/2022/03/06/world/06ukraine-poland01/merlin_203339697_279bbf5f-90d5-4c4d-8b8a-685250377a90-superJumbo.jpg",
    //         donated: 31,
    //         goal: 100,
    //     },
    //     {
    //         id: 3, 
    //         title: "Medical bills",
    //         description: "Support Ginny with her medical bills after her car accident",
    //         location: "Chino Hills, CA",
    //         imgUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.catesmahoney.com%2Fwp-content%2Fuploads%2F2021%2F06%2FCar-Accident-Injury.jpg&f=1&nofb=1",
    //         donated: 68,
    //         goal: 100,
    //     },
    //     {
    //         id: 4,
    //         title: "20 mil Trees",
    //         description: "Help Mr. Beast plant dem trees. Lorax will be happy",
    //         location: "Los Angeles, CA",
    //         imgUrl: "https://static.boredpanda.com/blog/wp-content/uploads/2019/04/5cbf0b6489646-png__700.jpg",
    //         donated: 90,
    //         goal: 100,
    //     }
    // ];
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
                    donated: props.attributes.donated,
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