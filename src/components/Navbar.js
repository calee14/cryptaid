import { Button, Flex, IconButton, Spacer, Avatar, Box } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";


export const Navbar = () => {
    const { isAuthenticated, user, logout } = useMoralis();
    const [display, changeDisplay] = useState('none')
    const isMobile = useIsMobile();

    return (
        <Box position={"relative"}>
            <Flex paddingX={"1rem"} align="center">

                {/* Desktop */}
                
                <Flex width={"100%"} align="center">
                    <Link to="/">
                        <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                            Cryptaid
                        </Button>
                    </Link>
                    <Link to="/organization">
                        <Button as="a" variant="ghost" aria-label="Organization" my={5} w="100%">
                            Organization
                        </Button>
                    </Link>
                    
                    <Spacer />
                    {!isMobile && (
                    <Flex gap={3} align="center"> 
                        <Link to="/create">
                            <Button>Create<AddIcon ml={"0.5rem"} boxSize={"0.9rem"}/></Button>
                        </Link>
                        {isAuthenticated ? 
                        <Link to="/profile"><Avatar name={user.attributes.username} /></Link> 
                        : <Link to="/auth"><Button>Auth</Button></Link>}
                    </Flex>
                    )}
                </Flex>
                

                {/* Mobile */}
                {isMobile && (
                <IconButton
                    aria-label="Open Menu"
                    size="lg"
                    mr={2}
                    icon={<HamburgerIcon />}
                    onClick={() => changeDisplay('flex')}
                />
                )}
            </Flex>

            {/* Mobile Content */}
            
            <Flex
                w="100vw"
                display={display}
                bgColor="gray.50"
                zIndex={20}
                h="100vh"
                pos="fixed"
                top="0"
                left="0"
                overflowY="auto"
                flexDir="column"
            >
                <Flex justify="flex-end">
                    <IconButton
                        mt={4}
                        mr={6}
                        aria-label="Open Menu"
                        size="lg"
                        icon={<CloseIcon />}
                        onClick={() => changeDisplay('none')}
                    />
                </Flex>

                <Flex flexDir="column" align="center">

                    <Link to="/">
                        <Button as="a" variant="ghost" aria-label="Home" my={4} w="100%" onClick={() => changeDisplay('none')}>
                            Home
                        </Button>
                    </Link>

                    <Link to="/organization">
                        <Button as="a" variant="ghost" aria-label="About" my={4} w="100%" onClick={() => changeDisplay('none')}>
                            Organizations
                        </Button>
                    </Link>

                    <Link to="/create">
                        <Button as="a" variant="ghost" aria-label="Create" my={4} w="100%" onClick={() => changeDisplay('none')}>
                            Create
                        </Button>
                    </Link>

                    {isAuthenticated ? 
                        <Link to="/profile"><Avatar name={user.attributes.username} my={4} onClick={() => changeDisplay('none')}/></Link> 
                        : <Link to="/auth"><Button variant='outline' colorScheme="BlackAlpha" my={4} onClick={() => changeDisplay('none')}>auth</Button></Link>
                    }
                </Flex>
            </Flex>
            <Spacer my={5}/>
        </Box>
    );
};

