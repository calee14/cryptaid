import { Box, Button, Input, Stack, Text } from "@chakra-ui/react"
import { useMoralis } from "react-moralis"
import { useState } from "react";
import { ErrorBox } from "../components/Error";

export const Profile = () => {
    const { user, setUserData, userError, isUserUpdating } = useMoralis();

    const [username, setUsername] = useState(user.attributes.username);
    const [email, setEmail] = useState(user.attributes.email);
    const [password, setPassword] = useState('');

    const handleSave = () => {
        setUserData({username, email, password: password === "" ? undefined : password});
    };

    return (
        <Box>
            <Stack spacing={3}>
                {userError && 
                    <ErrorBox title="User update failed" message={userError.message} />
                }
                <Box>
                    <Text>Username</Text>
                    <Input value={username} onChange={(event) => setUsername(event.currentTarget.value)}/>
                </Box>
                <Box>
                    <Text>Email</Text>
                    <Input value={email} onChange={(event) => setEmail(event.currentTarget.value)}/>
                </Box>
                <Box>
                    <Text>Password</Text>
                    <Input value={password} onChange={(event) => setPassword(event.currentTarget.value)}/>
                </Box>
                <Button onClick={handleSave} isLoading={isUserUpdating}>Save changes</Button>
            </Stack>
        </Box>
    );
}