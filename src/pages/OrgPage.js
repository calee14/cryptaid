import { CheckCircleIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Divider, Heading, Image, Spacer, Text, Flex, Progress, List, ListItem, ListIcon, Grid, GridItem, Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useOrgData } from "../hooks/useOrgData";
import { NftCard } from "../components/NftCard";


export const OrgPage = () => {
    const params = useParams();
    const org_id = params.id;
    const navigate = useNavigate();
    const org_data = useOrgData(org_id)
    
    return (
        <Box mx={'10%'}>
            {!(org_data.owner === "")?
            <Flex width={"100%"}>
                <Box flex={2} paddingX={"3rem"}>
                    {/* organiztaion's title, img, progress, and donate button */}
                    <Heading>{org_data.title}</Heading>
                    <Spacer my={3}/>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>Raised {org_data.donated} ETH out of {org_data.goal} ETH</Text>
                    <Spacer my={3}/>
                    <Progress height={1} value={org_data.donated/org_data.goal*100} rounded="md" size={"sm"}></Progress>
                    <Spacer my={3}/>
                    {/* donate button will route to donate page passing the org id */}
                    <Button width={"50%"} onClick={() => navigate("/organization/" + org_id + "/donate", { state: { org_id: org_id} })}>Donate Now</Button>
                    <Spacer my={3}/>
                    <Text fontWeight={"medium"} >Deadline: <b>{org_data.deadline}</b></Text>
                    <Spacer my={3}/>
                    <Image position={"relative"} width={"100%"} objectFit={"cover"} height={"26rem"} src={org_data.imgUrl} rounded={"xl"} alt='Org Image here'/>
                    {/* organization description */}
                    <Center height={5} >
                        <Divider orientation="horizontal"/>
                    </Center>
                    <Text fontWeight={"medium"}>I was going for the title but got hit by the tidal wave.
                    I was going for the title but got hit by the tidal wave.
                    I was going for the title but got hit by the tidal wave.
                    I was going for the title but got hit by the tidal wave.
                    </Text>
                    {/* organization milstones */}
                    <Center height={5} >
                        <Divider orientation="horizontal"/>
                    </Center>
                    <Heading fontSize="lg">Milestones:</Heading>
                    <Spacer my={2}/>
                    <List spacing={3}>
                        {org_data.milestone.map((ms, i) => {
                            return (
                            <ListItem>
                                <ListIcon as={org_data.progress[i] === 100 ? CheckCircleIcon : SettingsIcon} color={org_data.progress[i] === 100 ? "green.500" : "gray.600"}/>
                                {ms}
                            </ListItem>
                            );
                        })}
                        
                    </List>
                    {/* another donate button */}
                    <Spacer my={3}/>
                    {/* button will route to donate page passing the org id */}
                    <Button width={"50%"} onClick={() => navigate("/organization/" + org_id + "/donate")}>Donate Now</Button>
                    {/* organization socials */}
                    <Center height={5} >
                        <Divider orientation="horizontal"/>
                    </Center>
                    <Heading fontSize="lg">Socials:</Heading>
                    <Spacer my={2}/>
                    <List spacing={2}>
                        {org_data.links.map((link) => {
                            return (
                                <ListItem>
                                    <a href={link}>{link}</a>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
                {/* put component to sell nfts here */}
                <Box rounded={5} backgroundColor={"gray.50"} flex={1} height={'65rem'} overflow={'scroll'}>
                    <Container>
                    <Heading>{org_data.title} Collectible NFTs</Heading>
                    </Container>
                    <Spacer my={5}/>
                    <Flex justifyContent="center">
                    
                    <Grid templateColumns={'repeat(1, 1fr)'} gap={6}>
                        <GridItem>
                            <NftCard/>
                            <Spacer my={5}/>
                            <NftCard/>
                            <Spacer my={5}/>
                            <NftCard/>
                            <Spacer my={5}/>
                            <NftCard/>
                            <Spacer my={5}/>
                        </GridItem>
                        
                    </Grid>
                    </Flex>
                </Box>
            </Flex>
            :"Webpage does not exist"}
        </Box>
    );
};