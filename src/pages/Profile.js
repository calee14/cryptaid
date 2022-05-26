import { Box, Button, Heading, Input, Stack, Text, Spacer, Flex, Grid, Container, Center, SimpleGrid } from "@chakra-ui/react"
import { useMoralis } from "react-moralis"
import { useState, useEffect } from "react";
import { ErrorBox } from "../components/Error";
import { useRedirect } from "../hooks/useRedirect";
import { useGetNfts } from "../hooks/useGetNfts";
import { NftCardDisplay } from "../components/NftCardDisplay";

export const Profile = () => {
    const { user, setUserData, userError, isUserUpdating, isAuthenticated, logout} = useMoralis();

    const [username, setUsername] = useState(user?.attributes.username);
    const [email, setEmail] = useState(user?.attributes.email);
    const [password, setPassword] = useState('');
    const [conpassword, setConpassword] = useState('');
    const [userNfts, setNfts] = useState([]);
    const redirect = useRedirect();
    const getNfts = useGetNfts();
    
    // redirect if user is not authenticated
    useEffect(() => {
        if(!isAuthenticated) {
            redirect("/");
        }
    }, [isAuthenticated, redirect]);

    async function fetchNfts() {
        const nftsMeta = await getNfts();
        setNfts(nftsMeta);
    }

    useEffect(() => {
        fetchNfts();
    }, []);

    const handleSave = () => {
        if(password === conpassword){
            setUserData({username, email, password: password === "" ? undefined : password});
        } else {
            alert("Passwords do not match!")
        }
    };

    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }

    return (
        <>
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
                <Button onClick={handleSave} bg={'pink.400'} color={'white'} _hover={{bg: 'pink.500',}} isLoading={isUserUpdating}>Save changes</Button>
            </Stack>
            <Spacer my={5}/>
            <Heading>Your NFTs</Heading>
            <Spacer my={5}/>
            <Flex justifyContent={'center'}>
                <Grid templateColumns={'repeat(3, 1fr)'} rowGap={5} columnGap={2.5} minChildWidth="15rem" spacing="1rem">
                    {userNfts.length > 0 ? userNfts.map((nft) => {
                        console.log(JSON.parse(nft.metadata));
                        const parsedNft = JSON.parse(nft.metadata);
                        console.log(parsedNft.image)
                        console.log(parsedNft.image.substr(getPosition(parsedNft.image, '/', 2)+1));
                        const imgHash = parsedNft.image.substr(getPosition(parsedNft.image, '/', 2)+1)
                        const props = {
                            imgLink: 'https://ipfs.moralis.io:2053/ipfs/' + imgHash,
                            name: parsedNft.name,
                        }
                        return (<NftCardDisplay {...props} />)
                        
                    }) : <></>}
                </Grid>
                {userNfts.length === 0 && <Text>You don't own any NFTs at the moment...</Text>}
            </Flex>
        </Box>
        </>
    );
}