import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Button, Box, Input } from "@chakra-ui/react";

const Login = () => {
    const { login } = useMoralis();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  
    return (
      <Box>
        <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
        <Button onClick={() => login(email, password)}>Login</Button>
      </Box>
    );
}

export default Login;