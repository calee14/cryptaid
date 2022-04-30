import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Button, Container, Heading, Alert, AlertIcon, AlertTitle, Box, AlertDescription, CloseButton, Input } from "@chakra-ui/react";

const SignUp = () => {
    const { signup } = useMoralis();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    return (
      <Box>
        <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
        <Button onClick={() => signup(email, password, email)}>Sign up</Button>
      </Box>
    );
}

export default SignUp;