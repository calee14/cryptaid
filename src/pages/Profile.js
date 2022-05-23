import { Box, Button, Heading, Input, Stack, Text, Spacer, Flex } from "@chakra-ui/react"
import { useMoralis } from "react-moralis"
import { useState, useEffect } from "react";
import { ErrorBox } from "../components/Error";
import { useRedirect } from "../hooks/useRedirect";

export const Profile = () => {
    const { user, setUserData, userError, isUserUpdating, isAuthenticated, logout} = useMoralis();

    const [username, setUsername] = useState(user?.attributes.username);
    const [email, setEmail] = useState(user?.attributes.email);
    const [password, setPassword] = useState('');
    const [conpassword, setConpassword] = useState('');
    const redirect = useRedirect();

    // redirect if user is not authenticated
    useEffect(() => {
        if(!isAuthenticated) {
            redirect("/");
        }
    }, [isAuthenticated,]);

    const handleSave = () => {
        if(password === conpassword){
            setUserData({username, email, password: password === "" ? undefined : password});
        } else {
            alert("Passwords do not match!")
        }
    };

    return (
        <Box mx={"25%"}>
            <Stack spacing={3}>
                {userError && 
                    <ErrorBox title="User update failed" message={userError.message} />
                }
                <Flex>
                    <Heading>
                        Hello there, {user ? user.attributes.username : ' authenticate please...'}
                    </Heading>
                    <Spacer/>
                    {isAuthenticated && 
                        <Button onClick={() => logout()}>Logout</Button>
                    }
                </Flex>
                <Box>
                    <Text>Username</Text>
                    <Input value={username} onChange={(event) => setUsername(event.currentTarget.value)}/>
                </Box>
                <Box>
                    <Text>Email</Text>
                    <Input value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
                </Box>
                <Box>
                    <Text>New password</Text>
                    <Input type="password" onChange={(event) => setPassword(event.currentTarget.value)}/>
                </Box>
                <Box>
                    <Text>Confirm new password</Text>
                    <Input type="password" onChange={(event) => setConpassword(event.currentTarget.value)}/>
                </Box>
                <Button onClick={handleSave} isLoading={isUserUpdating}>Save changes</Button>
            </Stack>
            <Heading>Your NFTs</Heading>
        </Box>
    );
}