import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Button, Flex, Container, Heading, Alert, AlertIcon, AlertTitle, Box, AlertDescription, CloseButton, Input, Spacer } from "@chakra-ui/react";

const SignUp = () => {
    const { signup } = useMoralis();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    return (
        <Box width={"45%"}>
          <Heading size="md">Sign Up</Heading>
          <Spacer my={1}/>
          <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
          <Spacer my={1}/>
          <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
          <Spacer my={1}/>
          <Button onClick={() => signup(email, password, email)}>Sign up</Button>
        </Box>      
    );
}

export default SignUp;