import { useState } from "react";
import { useMoralis } from "react-moralis";
import {useColorModeValue,  Button, Box, Input, Spacer, Heading } from "@chakra-ui/react";

const Login = () => {
    const { login } = useMoralis();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    return (
      <Box>
        <Heading size="md">Login</Heading>
        <Spacer my={5}/>
        <Input bg={"white"}placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
        <Spacer my={2}/>
        <Input bg={"white"}placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
        <Spacer my={2}/>
        <Button bg={'red.400'} color={'white'} _hover={{bg: 'red.500',}} width='100%' onClick={() => login(email, password)}>Login</Button>
      </Box>
    );
}

export default Login;