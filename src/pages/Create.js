import { Box, Button, Heading, Spacer, Input, NumberInput, NumberInputField, Center, Flex, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { React, useState } from "react";
import Moralis from "moralis";
import { useRedirect } from "../hooks/useRedirect";

export const Create = () => {

    const { logout, isAuthenticated } = useMoralis();
    // const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [goal, setGoal] = useState(0.0);
    const [ethAddress, setEthAddress] = useState("");

    const redirect = useRedirect();

    let date = new Date()


    const defineNewObj = async () => {
        if(isAuthenticated){
            if(checkField()){
                const Org = Moralis.Object.extend("Organization")
                const org = new Org()
                
                date.setTime(0)
                
                org.set('title', title)
                org.set('description', description)
                org.set('location', location)
                org.set('imgUrl', imgUrl)
                org.set('goal', parseFloat(goal))
                org.set('user', Moralis.User.current().id)
                org.set('ethAddress', ethAddress)
                org.set('deadline', date)
                org.set("milestone", [])
                org.set("progress", [])
                await org.save()
                redirect("/")
            } else {
                alert("Make sure to properly fill out all required fields before submission!")
            }
        }
    }

    const checkField = () => {
        if(title.trim() === "") {
            return false;
        } else if (imgUrl.trim() === "") {
            return false;
        } else if (goal === 0.0) {
            return false;
        } else if (ethAddress.trim() === "") {
            return false;
        }
        return true;
    }

    return (
        <div>
            <Center>
                <Box width={"75%"}>
                    <Heading size="md">Create Organization</Heading>
                    <Spacer my={1}/>

                    <InputGroup>
                        <Input placeholder="Title" value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
                        <InputRightElement
                        children={"*"}
                        color="red"
                        />
                    </InputGroup>

                    <Spacer my={1}/>
                    <Input placeholder="Description" value={description} onChange={(event) => setDescription(event.currentTarget.value)} />
                    <Spacer my={1}/>
                    <Input placeholder="Location" value={location} onChange={(event) => setLocation(event.currentTarget.value)} />
                    <Spacer my={1}/>

                    <InputGroup>
                        <Input placeholder="Image URL" value={imgUrl} onChange={(event) => setImgUrl(event.currentTarget.value)} />
                        <InputRightElement
                        children={"*"}
                        color="red"
                        />
                    </InputGroup>

                    <Spacer my={1}/>

                    <InputGroup>
                        <Input placeholder="Eth Address" value={ethAddress} onChange={(event) => setEthAddress(event.currentTarget.value)} />
                        <InputRightElement
                        children={"*"}
                        color="red"
                        />
                    </InputGroup>

                    <Spacer my={1}/>

                    <label for="goal">Goal (ETH)</label>

                    <InputGroup>
                        <NumberInput id="goal" defaultValue={0.0} min={0.0} precision={4} onChange={(value) => setGoal(value)}>
                        <NumberInputField />
                        <InputRightElement
                        children={"*"}
                        color="red"
                        />
                        </NumberInput>
                    </InputGroup>
                    
                    {/* <label for="deadline">Deadline</label>

                    <Stack shouldWrapChildren direction='row' id ="deadline">
                        <Stack direction='column'>
                       <label for="month">Month</label>
                        <NumberInput id="month" maxW={20} defaultValue={deadline.getMonth()+1} min={1} max={12}>
                            <NumberInputField />
                        </NumberInput>
                        </Stack>

                        <Stack direction='column'>
                        <label for="day">Day</label>
                        <NumberInput id="day" maxW={20} defaultValue={deadline.getDate()} min={0} max={31}>
                            <NumberInputField />
                        </NumberInput>
                        </Stack>

                        <Stack direction='column'>
                        <label for="year">Year</label> 
                        <NumberInput id="year" maxW={32} defaultValue={deadline.getFullYear()} min={deadline.getFullYear()}>
                            <NumberInputField />
                        </NumberInput>
                        </Stack>

                    </Stack> */}

                    <Spacer my={1}/>
                    <Flex>
                    <Button onClick={() => defineNewObj()}>Submit</Button>
                    <Spacer/>
                    {isAuthenticated && 
                        <Button onClick={() => logout()}>Logout</Button>
                    }</Flex>
                </Box>
            </Center>
        </div>
    );
};