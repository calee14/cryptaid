import { Box, Button, Heading, Spacer, Input, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useMoralis } from "react-moralis"
import { React, useState } from "react";
import Moralis from "moralis";
import { useRedirect } from "../hooks/useRedirect";

export const BackendTesting = () => {

    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [goal, setGoal] = useState();
    const [ethAddress, setEthAddress] = useState();
    const [donated, setDonated] = useState(0.0);

    const redirect = useRedirect();

    const defineNewObj = async () => {
        if(isAuthenticated){
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
        }
    }


    return (
        <div>
            <Box>
                {isAuthenticated && 
                    <Button onClick={() => logout()}>Logout</Button>
                }
            </Box>
            <Box width={"75%"}>
                <Heading size="md">Create object</Heading>
                <Spacer my={1}/>
                <Input placeholder="Title" value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
                <Spacer my={1}/>
                <Input placeholder="Description" value={description} onChange={(event) => setDescription(event.currentTarget.value)} />
                <Spacer my={1}/>
                <Input placeholder="Location" value={location} onChange={(event) => setLocation(event.currentTarget.value)} />
                <Spacer my={1}/>
                <Input placeholder="Image URL" value={imgUrl} onChange={(event) => setImgUrl(event.currentTarget.value)} />
                <Spacer my={1}/>
                <Input placeholder="Eth Address" value={ethAddress} onChange={(event) => setEthAddress(event.currentTarget.value)} />
                <Spacer my={1}/>
                <label for="goal">Goal (ETH)</label>
                <NumberInput id="goal" defaultValue={0.0} min={0.0} precision={4} onChange={(value) => setGoal(value)}>
                <NumberInputField />
                </NumberInput>
                <Spacer my={1}/>
                <Button onClick={() => defineNewObj()}>Submit</Button>
            </Box>     
        </div>
    );
}