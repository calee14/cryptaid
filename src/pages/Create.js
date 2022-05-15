import { Box, Button, Heading, Spacer, Input, NumberInput, NumberInputField, Center, Flex, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { React, useState } from "react";
import Moralis from "moralis";
import { useRedirect } from "../hooks/useRedirect";

export const Create = () => {

    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [goal, setGoal] = useState(0.0);
    const [ethAddress, setEthAddress] = useState("");
    const donated = 0.0;

    const redirect = useRedirect();

    const defineNewObj = async () => {
        if(isAuthenticated){
            if(checkField()){
                const Org = Moralis.Object.extend("Organization")
                const org = new Org()
                org.set('title', title)
                org.set('description', description)
                org.set('location', location)
                org.set('imgUrl', imgUrl)
                org.set('goal', parseFloat(goal))
                org.set('donated', donated)
                org.set('user', Moralis.User.current().id)
                org.set('ethAddress', ethAddress)

                await org.save()
                redirect("/")
            } else {
                alert("Make sure to properly fill out all required fields before submission!")
            }
        }
    }

    const checkField = () => {
        if(title.trim() == "") {
            return false;
        } else if (imgUrl.trim() == "") {
            return false;
        } else if (goal == 0.0) {
            return false;
        } else if (ethAddress.trim() == "") {
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

                    <label for="goal" id="name">Goal (ETH)</label>

                    <InputGroup>
                        <NumberInput id="goal" defaultValue={0.0} min={0.0} precision={4} onChange={(value) => setGoal(value)}>
                        <NumberInputField />
                        <InputRightElement
                        children={"*"}
                        color="red"
                        />
                        </NumberInput>
                    </InputGroup>

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