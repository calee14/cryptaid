import { Box, VStack, Button, Heading, Spacer, Stack, Input, NumberInput, NumberInputField, Center, Flex, InputGroup, InputRightElement } from "@chakra-ui/react";
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
    const [imgUrl, setImgUrl] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png");
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
                org.set("nft", [])
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

    const onChange = (e) => {       //copied code from https://codesandbox.io/s/wonderful-pine-i7fs3?file=/src/Demo.tsx:439-784
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImgUrl(reader.result);
        };
        reader.readAsDataURL(files[0]);
        console.log(files[0])
    };

    return (
        <Box mx="15%">
            <Heading size="md">Create Organization</Heading>
            <Spacer my={3}/>
            <Stack direction='row' spacing='24px'>
                <img alt="error" style={{maxWidth:"45%", maxHeight:350, objectFit:"contain"}} src={imgUrl}/>
                <Box width={"75%"}>
                    <Spacer my={1}/>

                    <InputGroup>
                        <Input placeholder="Title" onChange={(event) => setTitle(event.currentTarget.value)} />
                        <InputRightElement
                        children={"*"}
                        color="red"
                        />
                    </InputGroup>

                    <Spacer my={1}/>
                    <Input placeholder="Description" onChange={(event) => setDescription(event.currentTarget.value)} />
                    <Spacer my={1}/>
                    <Input placeholder="Location" onChange={(event) => setLocation(event.currentTarget.value)} />
                    <Spacer my={1}/>

                    <InputGroup>
                    <Input width="100%" type="file" onChange={onChange}/>
                        <InputRightElement
                        children={"*"}
                        color="red"
                        />
                    </InputGroup>

                    

                    <Spacer my={1}/>

                    <InputGroup>
                        <Input placeholder="Eth Address" onChange={(event) => setEthAddress(event.currentTarget.value)} />
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

                    <Spacer my={1}/>
                    <Flex>
                    <Button onClick={() => defineNewObj()}>Submit</Button>
                    <Spacer/>
                    {isAuthenticated && 
                        <Button onClick={() => logout()}>Logout</Button>
                    }</Flex>
                </Box>
            </Stack>
        </Box>
    );
};