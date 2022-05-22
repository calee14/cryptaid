import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Button, Box, Input, Spacer, Heading } from "@chakra-ui/react";

const Login = () => {
    const { login } = useMoralis();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    return (
      <Box>
        <Heading size="md">Login</Heading>
        <Spacer my={1}/>
        <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
        <Spacer my={1}/>
        <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
        <Spacer my={1}/>
        <Button width='100%' onClick={() => login(email, password)}>Login</Button>
      </Box>
    );
}

export default Login;