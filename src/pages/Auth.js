import { Divider, useColorModeValue, Stack, Text, Link, useBreakpointValue, Icon, Button, Alert, AlertIcon, Box, AlertTitle, AlertDescription, CloseButton, Container, Flex, Spacer, Heading } from "@chakra-ui/react";
import Login from "../components/Login";
import { useMoralis } from "react-moralis";
import { ErrorBox } from "../components/Error";
import { useEffect } from "react";
import { useRedirect } from "../hooks/useRedirect";



export const Auth = () => {

    const { authenticate, isAuthenticating, authError, isAuthUndefined, isAuthenticated } = useMoralis();
    const redirect = useRedirect();

    // redirect if user is not authenticated
    useEffect(() => {
        if(isAuthenticated) {
            redirect("/");
        }
    }, [isAuthenticated]);

    return (
        
        <>
        {/* <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      /> */}


      <Stack marginBottom={"60px"} align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            and start donating with anonymity 😊

          </Text>
        </Stack>

        <Box 
        mx={"25%"} 
        bg={useColorModeValue('gray.30', 'gray.800')}
        boxShadow={'0px 10px 15px #F4AAB9'}
        
        borderRadius={"10px"}
        marginTop={"10px"}
        padding={"20px"} 
        paddingTop={"30px"}
        paddingBottom={"30px"}>
            
            {authError &&
                <ErrorBox title="Authentication has failed" message={authError.message}/>
            }
            <Login />
            <Divider my={"20px"} />

            <Spacer my={5}/>
            <Heading size="md">Authenticate with Metamask</Heading>
            <Spacer my={3}/>
            <Flex>
                <Button 
                bg={'pink.400'} color={'white'} _hover={{bg: 'pink.500',}}
                width='100%' 
                isLoading={isAuthenticating} 
                onClick={() => authenticate()}>
                    Authenticate
                </Button>
            </Flex>

        </Box>
        <Spacer mb={20}/>
        </>
    );
}