import { Button, Flex, IconButton, Spacer, Avatar, Box, Image, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import { useIsMobile } from "../hooks/useIsMobile";


export const Navbar = () => {
    const { isAuthenticated, user, logout } = useMoralis();
    const [display, changeDisplay] = useState('none')
    const [iconHover,setIconHover] = useState(false)
    const isMobile = useIsMobile();

    return (
        <Box position={"relative"}>
            <Flex paddingX={"1rem"} align="center">

                {/* Desktop */}
                
                <Flex width={"100%"} align="center">
                    <Link to="/">
                        <Image mr={'3'} src='https://scontent.xx.fbcdn.net/v/t1.15752-9/285254828_1725439954476285_519085055936382316_n.png?_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=xANAMkWeg7QAX9I4rw9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVI677iTgYn7-BffcexhUxQTPNp-MNGMBvPzO3qVUUjNXA&oe=62BF745A' alt='Home_logo' my={5} w="125px" 
                        onMouseOver={e => e.currentTarget.src = "https://scontent.xx.fbcdn.net/v/t1.15752-9/283706318_758392685191047_7697960001977730560_n.png?_nc_cat=108&ccb=1-7&_nc_sid=aee45a&_nc_ohc=fbEUn6hrm4oAX-Pzu0q&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVLSxe5-xfJuAj6uRpA9hoknOiTVrFBbXtVV0muxm0mAkA&oe=62BC74A6"}
                        onMouseLeave={e => e.currentTarget.src = "https://scontent.xx.fbcdn.net/v/t1.15752-9/285254828_1725439954476285_519085055936382316_n.png?_nc_cat=103&ccb=1-7&_nc_sid=aee45a&_nc_ohc=xANAMkWeg7QAX9I4rw9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVI677iTgYn7-BffcexhUxQTPNp-MNGMBvPzO3qVUUjNXA&oe=62BF745A"}/>
                    </Link>
                    {!isMobile?
                    <Stack direction="row"><Link to="/organization">
                        <Button as="a" variant="ghost" aria-label="Organization" my={5} w="100%">
                            Organization
                        </Button>
                    </Link>
                    <Link to="/tokenchange">
                        <Button as="a" variant="ghost" aria-label="changetoken" my={5} w="100%">
                            Token Swap
                        </Button>
                    </Link></Stack>:""}
                    
                    <Spacer />
                    {!isMobile && (
                    <Flex gap={3} align="center"> 
                        <Link to="/create">
                            <Button colorScheme={'red'} bg={'red.400'} _hover={{ bg: 'red.500' }}>Create<AddIcon ml={"0.5rem"} boxSize={"0.9rem"}/></Button>
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
                        <Button as="a" variant="ghost" aria-label="organization" my={4} w="100%" onClick={() => changeDisplay('none')}>
                            Organizations
                        </Button>
                    </Link>

                    <Link to="/create">
                        <Button as="a" variant="ghost" aria-label="Create" my={4} w="100%" onClick={() => changeDisplay('none')}>
                            Create
                        </Button>
                    </Link>

                    <Link to="/tokenchange">
                        <Button as="a" variant="ghost" aria-label="changetoken" my={4} w="100%" onClick={() => changeDisplay('none')}>
                            Token Swap
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

