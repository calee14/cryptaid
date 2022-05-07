import { Button, Flex, IconButton, Spacer, Avatar, Box } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/useIsMobile";


export const Navbar = () => {
    const { isAuthenticated, user } = useMoralis();
    const [display, changeDisplay] = useState('none')
    const isMobile = useIsMobile();

    return (
        // <Flex my={6}>
        //     <Link to="/"><Heading>Home</Heading></Link>
        //     <Spacer/>
        //     {isAuthenticated && <Link to="/profile"><Avatar name={user.attributes.username}/></Link>}
        // </Flex>
        <Flex position={"relative"} my={10}>
        <Flex position="fixed" top="0" left="2rem" right="2rem" align="center">

            {/* Desktop */}
            
            <Flex width={"100%"} align="center">
                <Link to="/">
                    <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                        Home
                    </Button>
                </Link>

                <Link to="/backend">
                    <Button as="a" variant="ghost" aria-label="Backend" my={5} w="100%">
                        Backend
                    </Button>
                </Link>
                
                <Spacer />
                {!isMobile && (
                <Flex gap={3} align="center"> 
                    <Link to="/create"><Button>Create<AddIcon ml={"0.5rem"} boxSize={"0.9rem"}/></Button></Link>
                    {isAuthenticated ? 
                    <Link to="/profile"><Avatar name={user.attributes.username} /></Link> 
                    : <Link to="/auth"><Button>auth</Button></Link>}
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
                    mt={2}
                    mr={2}
                    aria-label="Open Menu"
                    size="lg"
                    icon={<CloseIcon />}
                    onClick={() => changeDisplay('none')}
                />
            </Flex>

            <Flex flexDir="column" align="center">
                    {isAuthenticated ? 
                    <Link to="/profile"><Avatar name={user.attributes.username} /></Link> 
                    : <Link to="/auth"><Button onClick={() => changeDisplay('none')}>auth</Button></Link>}

                <Link to="/about">
                    <Button as="a" variant="ghost" aria-label="About" my={5} w="100%"
                            onClick={() => changeDisplay('none')}>
                        About
                    </Button>
                </Link>

                <Link to="/contact">
                    <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
                        Contact
                    </Button>
                </Link>
            </Flex>
        </Flex>
        </Flex>
    );
};