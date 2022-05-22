import { CheckCircleIcon, SettingsIcon, CheckIcon, EditIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Button, Input, InputGroup, InputRightElement, Center, Divider, Heading, Image, Stack, NumberInput, NumberInputField, Spacer, Text, Flex, Progress, List, ListItem, ListIcon, Grid, GridItem, Container } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useOrgData } from "../hooks/useOrgData";
import { NftCard } from "../components/NftCard";
import { useState, useEffect } from "react";
import Moralis from "moralis";
import {useRedirect} from "../hooks/useRedirect";

export const OrgPage = () => {
    const params = useParams();
    const org_id = params.id;
    const navigate = useNavigate();
    const org_data = useOrgData(org_id)
    const checkIfOwner = (Moralis.User?.current()?.id === org_data.owner)
    const [editMode, setEditMode] = useState(false)
    const currentDate = new Date()

    const [completed1,setCompleted1] = useState()
    const [completed2,setCompleted2] = useState()
    const [completed3,setCompleted3] = useState()
    const [completed4,setCompleted4] = useState()
    const [completed5,setCompleted5] = useState()
    
    const [input1,setInput1] = useState()
    const [input2,setInput2] = useState()
    const [input3,setInput3] = useState()
    const [input4,setInput4] = useState()
    const [input5,setInput5] = useState()
    
    const [milestone, setMilestone] = useState();
    const [numMilestone,setNumMilestone] = useState()
    const [milestoneProgress, setMilestoneProgress] = useState()

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [month, setMonth] = useState()
    const [date, setDate] = useState()
    const [year, setYear] = useState()
    
    const redirect = useRedirect()
    

    useEffect(() => {
        const updateMilestone = () => {
            let result = [input1, input2, input3, input4, input5]
            setMilestone(result)
        }
        updateMilestone();
    }, [input1, input2, input3, input4, input5]);


    useEffect(() => {
        const updateCheckbox = () => {
            let result = [completed1, completed2, completed3, completed4, completed5]
            setMilestoneProgress(result)
        }
        updateCheckbox();
    }, [completed1, completed2, completed3, completed4, completed5]);

    useEffect(() => {
        setMilestone(org_data.milestone)
        setNumMilestone(org_data.milestone.length)
        setMilestoneProgress(org_data.progress)
        setTitle(org_data.title)
        setDescription(org_data.description)

        setMonth(org_data.deadline?.getMonth()+1)
        setDate(org_data.deadline?.getDate())
        setYear(org_data.deadline?.getFullYear())

        setCompleted1(org_data.progress[0])
        setCompleted2(org_data.progress[1])
        setCompleted3(org_data.progress[2])
        setCompleted4(org_data.progress[3])
        setCompleted5(org_data.progress[4])
    }, [editMode]);

    const updateOrganization = async () => {
        const organization= Moralis.Object.extend("Organization");
        const query = new Moralis.Query(organization);
        query.equalTo("objectId", org_id);
        const org = await query.first()
        
        let newMilestone = []
        let newProgress = []
        org.set("title", title)
        org.set("description", description)
        const newDate = new Date();
        newDate.setMonth(month-1)
        newDate.setDate(date)
        newDate.setYear(year)
        org.set("deadline", newDate)
        for(let i = 0; i < numMilestone; i++) {
            newMilestone.push(milestone[i])
            newProgress.push(milestoneProgress[i])
        }
        org.set("milestone", newMilestone)
        org.set("progress", newProgress)
        console.log(title)
        console.log(org)
        org.save();
    }

    const removeOrganization = async () => {
        const organization= Moralis.Object.extend("Organization");
        const query = new Moralis.Query(organization);
        query.equalTo("objectId", org_id);
        const org = await query.first()
        org.destroy();
    }

    const saveOrgData = () => {
        updateOrganization();
        redirect("/")
    }

    const deleteOrgData = () => {
        removeOrganization()
        redirect("/")
    }
    
    return (
        <Box mx={'10%'}>
            {!(org_data.owner === "")?
            <Flex width={"100%"}>
                <Box flex={2} paddingX={"3rem"}>
                    {/* organiztaion's title, img, progress, and donate button */}
                    
                    <Flex>
                    {editMode?<Input defaultValue={org_data.title} onChange={(event)=>setTitle(event.target.value)}/>:<Heading>{org_data.title}</Heading>}
                    <Spacer/>
                    {checkIfOwner && !editMode?<Button leftIcon={<EditIcon />} colorScheme='teal' onClick={() => setEditMode(true)} variant='solid'>
                        Edit
                    </Button>: ""}
                    {editMode?<Button leftIcon={<CloseIcon />} colorScheme='blackAlpha' onClick={() => setEditMode(false)} variant='solid'>
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
                        <NumberInput maxW={20} defaultValue={org_data.deadline.getMonth()+1} onChange={(event)=>setMonth(event)} min={1} max={12}>
                            <NumberInputField />
                        </NumberInput>

                        <NumberInput maxW={20} defaultValue={org_data.deadline.getDate()} onChange={(event)=>setDate(event)} min={1} max={31}>
                            <NumberInputField />
                        </NumberInput>

                        <NumberInput maxW={32} defaultValue={org_data.deadline.getFullYear()} onChange={(event)=>setYear(event)} min={currentDate.getFullYear()} >
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

                    
                    {editMode? <Input defaultValue={org_data.description} onChange={(event) => setDescription(event.target.value)}/> : <Text fontWeight={"medium"}>{org_data.description}</Text>}
                    {/* organization milstones */}
                    <Center height={5} >
                        <Divider orientation="horizontal"/>
                    </Center>
                    {editMode && numMilestone===5?<Button isDisabled={true}>Add Milestone</Button>:""}
                    {editMode && numMilestone<5?<Button onClick={() => setNumMilestone(numMilestone+1)}>Add Milestone</Button>: ""}
                    {editMode && numMilestone>0?<Button onClick={() => setNumMilestone(numMilestone-1)}>Remove Milestone</Button>: ""}
                    {editMode&&numMilestone>=1?<InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            defaultValue={org_data.milestone[0]}
                            placeholder="Add milestone here"
                            onChange={(event)=>setInput1(event.target.value)}
                        />                        
                        <InputRightElement width='6rem'>
                            <Button h='1.75rem' size='sm' onClick={()=>setCompleted1(!completed1)} colorScheme={completed1? "green" : "gray"}>
                            {completed1 ? 'Completed' : 'Incompleted'}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                    :""}

                    
                    {editMode&&numMilestone>=2?<InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            defaultValue={org_data.milestone[1]}
                            placeholder="Add milestone here"
                            onChange={(event)=>setInput2(event.target.value)}
                        />                        
                        <InputRightElement width='6rem'>
                            <Button h='1.75rem' size='sm' onClick={()=>setCompleted2(!completed2)} colorScheme={completed2? "green" : "gray"}>
                            {completed2 ? 'Completed' : 'Incompleted'}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                    :""}

                    
                    {editMode&&numMilestone>=3?<InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            defaultValue={org_data.milestone[2]}
                            placeholder="Add milestone here"
                            onChange={(event)=>setInput3(event.target.value)}
                        />                        
                        <InputRightElement width='6rem'>
                            <Button h='1.75rem' size='sm' onClick={()=>setCompleted3(!completed3)} colorScheme={completed3? "green" : "gray"}>
                            {completed3 ? 'Completed' : 'Incompleted'}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                    :""}

                    
                    {editMode&&numMilestone>=4?<InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            defaultValue={org_data.milestone[3]}
                            placeholder="Add milestone here"
                            onChange={(event)=>setInput4(event.target.value)}
                        />                        
                        <InputRightElement width='6rem'>
                            <Button h='1.75rem' size='sm' onClick={()=>setCompleted4(!completed4)} colorScheme={completed4? "green" : "gray"}>
                            {completed4 ? 'Completed' : 'Incompleted'}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                    :""}

                    
                    {editMode&&numMilestone>=5?<InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            defaultValue={org_data.milestone[4]}
                            placeholder="Add milestone here"
                            onChange={(event)=>setInput5(event.target.value)}
                        />                        
                        <InputRightElement width='6rem'>
                            <Button h='1.75rem' size='sm' onClick={()=>setCompleted5(!completed5)} colorScheme={completed5? "green" : "gray"}>
                            {completed5 ? 'Completed' : 'Incompleted'}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                    :""}


                    {!editMode?<Heading fontSize="lg">Milestones:</Heading>:""}
                    <Spacer my={2}/>
                    {!editMode?<List spacing={3}>
                        {org_data.milestone?.map((ms, i) => {
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
                    <Spacer my={5}/>
                    <Button width={"50%"} onClick={() => navigate("/organization/" + org_id + "/mint", { state: { org_id: org_id} })}>Mint NFTs</Button>
                    <Spacer my={5}/>
                    <Flex>
                    {editMode?<Button leftIcon={<DeleteIcon />} onClick={() => deleteOrgData()}colorScheme='red' variant='solid'>
                        Delete
                    </Button>: ""}
                    <Spacer/>
                    {editMode?<Button leftIcon={<CheckIcon />} onClick={() => saveOrgData()} colorScheme='blue' variant='solid'>
                        Submit
                    </Button>: ""}
                    </Flex>
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