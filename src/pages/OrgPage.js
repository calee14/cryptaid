import { CheckCircleIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Input, InputRightElement, InputGroup, Center, Divider, Heading, Image, Checkbox,  Stack, NumberInput, NumberInputField, Spacer, Text, Flex, Progress, List, ListItem, ListIcon, Grid, GridItem, Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useOrgData } from "../hooks/useOrgData";
import { NftCard } from "../components/NftCard";
import { EditIcon, CloseIcon } from '@chakra-ui/icons'
import { useState, useEffect } from "react";
import Moralis from "moralis";
import MilestoneInputs from "../components/MilestoneInputs";

export const OrgPage = () => {
    const params = useParams();
    const org_id = params.id;
    const navigate = useNavigate();
    const org_data = useOrgData(org_id)
    const checkIfOwner = (Moralis.User?.current()?.id === org_data.owner)
    const [editMode, setEditMode] = useState(false)
    const currentDate = new Date()

    const [milestone, setMilestone] = useState(org_data.milestone);
    const [numMilestone,setNumMilestone] = useState(org_data.milestone.length)
    const [milestoneProgress, setMilestoneProgress] = useState(org_data.progress)
    
    return (
        <Box mx={'10%'}>
            {!(org_data.owner === "")?
            <Flex width={"100%"}>
                <Box flex={2} paddingX={"3rem"}>
                    {/* organiztaion's title, img, progress, and donate button */}
                    
                    <Flex>
                    {editMode?<Input defaultValue={org_data.title}/>:<Heading>{org_data.title}</Heading>}
                    <Spacer/>
                    {checkIfOwner && !editMode?<Button leftIcon={<EditIcon />} colorScheme='teal' onClick={() => setEditMode(true)} variant='solid'>
                        Edit
                    </Button>: ""}
                    {editMode?<Button leftIcon={<CloseIcon />} colorScheme='red' onClick={() => setEditMode(false)} variant='solid'>
                        Cancel
                    </Button>: ""}
                    </Flex>


                    <Spacer my={3}/>
                    <Text fontSize={"lg"} fontWeight={"semibold"}>Raised {org_data.donated} ETH out of {org_data.goal} ETH</Text>
                    <Spacer my={3}/>
                    <Progress height={1} value={org_data.donated/org_data.goal*100} rounded="md" size={"sm"}></Progress>
                    <Spacer my={3}/>
                    
                    
                    {/* donate button will route to donate page passing the org id */}
                    {Moralis.User?.current()?.id? 
                        <Button width={"50%"} onClick={() => navigate("/organization/" + org_id + "/donate", { state: { org_id: org_id} })}>
                        Donate Now
                        </Button>: 
                        <Button width={"50%"}>Login to Donate</Button>
                    }

                    
                    <Spacer my={3}/>
                    {editMode? 
                    <Stack shouldWrapChildren direction='row'>
                        <Text fontSize={"2xl"} >Deadline: </Text>
                        <NumberInput maxW={20} defaultValue={org_data.deadline.getMonth()+1} min={1} max={12}>
                            <NumberInputField />
                        </NumberInput>

                        <NumberInput maxW={20} defaultValue={org_data.deadline.getDate()} min={1} max={31}>
                            <NumberInputField />
                        </NumberInput>

                        <NumberInput maxW={32} defaultValue={org_data.deadline.getFullYear()} min={currentDate.getFullYear()} >
                            <NumberInputField />
                        </NumberInput>
                    </Stack>: ""}
                    {(org_data.deadline?.getTime() === 0) || editMode? "":<Text fontWeight={"medium"} >Deadline: <b>{org_data.deadline?.getMonth()+1}/{org_data.deadline?.getDate()}/{org_data.deadline.getFullYear()}</b></Text>}
                    


                    <Spacer my={3}/>
                    <Image position={"relative"} width={"100%"} objectFit={"cover"} height={"26rem"} src={org_data.imgUrl} rounded={"xl"} alt='Org Image here'/>
                    {/* organization description */}
                    <Center height={5} >
                        <Divider orientation="horizontal"/>
                    </Center>

                    
                    {editMode? <Input defaultValue={org_data.description}/> : <Text fontWeight={"medium"}>{org_data.description}</Text>}
                    {/* organization milstones */}
                    <Center height={5} >
                        <Divider orientation="horizontal"/>
                    </Center>
                    {editMode && numMilestone===5?<Button isDisabled={true}>Add Milestone</Button>:""}
                    {editMode && numMilestone<5?<Button onClick={() => setNumMilestone(numMilestone+1)}>Add Milestone</Button>: ""}
                    {editMode && numMilestone>0?<Button onClick={() => setNumMilestone(numMilestone-1)}>Remove Milestone</Button>: ""}
                    {editMode? <MilestoneInputs num={numMilestone} milestone={milestone} setMilestone={setMilestone} milestoneProgress={milestoneProgress} setMilestoneProgress={setMilestoneProgress}/>:""}


                    {!editMode?<Heading fontSize="lg">Milestones:</Heading>:""}
                    <Spacer my={2}/>
                    {!editMode?<List spacing={3}>
                        {org_data.milestone.map((ms, i) => {
                            return (
                            <ListItem>
                                <ListIcon as={org_data.progress[i] ? CheckCircleIcon : SettingsIcon} color={org_data.progress[i]? "green.500" : "gray.600"}/>
                                {ms}
                            </ListItem>
                            );
                        })}
                        
                    </List>:""}


                    {/* another donate button */}
                    <Spacer my={3}/>
                    {/* button will route to donate page passing the org id */}
                    {Moralis.User?.current()?.id? <Button width={"50%"} onClick={() => navigate("/organization/" + org_id + "/donate", { state: { org_id: org_id} })}>
                        Donate Now
                    </Button>: 
                    <Button width={"50%"}>Login to Donate</Button>}
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
                    <Button width={"50%"} onClick={() => navigate("/organization/" + org_id + "/mint", { state: { org_id: org_id} })}>Mint NFTs</Button>
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