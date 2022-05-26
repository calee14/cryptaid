import { useBreakpointValue, Container, Stack, Flex, Box, Heading, Text, Button, Image, Icon, IconButton, createIcon, IconProps, useColorModeValue, Link, Divider, HStack, Tag, Wrap, WrapItem, SpaceProps, VStack } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis';
export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
export const About = () => {
    const { logout, isAuthenticated, isAuthUndefined, authError } = useMoralis();
    return (
      <Container maxW={'7xl'}>
{/* {<Blur
        position={'absolute'}
        top={+200}
        left={+100}
        style={{ filter: 'blur(50px)' }}
      /> } */}
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '30%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'red.400',
                  zIndex: -1,
                }}>
                The Future is 
              </Text>
              <br />
              <Text as={'span'} color={'red.400'}>
                Web 3 Donations
              </Text>
            </Heading>
            <Text color={'gray.500'}>
            A decentralized platform for cause-driven supporters to utilize cryptocurrency to send aid, safely and anonymously.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: 'column', sm: 'row' }}>
    
              <Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}
                colorScheme={'red'}
                bg={'red.400'}
                _hover={{ bg: 'red.500' }}>
                <Link color='white.500' href='/organization'>Start funding</Link>
              </Button>
              {isAuthenticated?"":<Button
                rounded={'full'}
                size={'lg'}
                fontWeight={'normal'}
                px={6}>
                {<Link color='white.500' href='./auth'>Login</Link>}
              </Button>}
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}>
            <Blob
              w={'150%'}
              h={'150%'}
              position={'absolute'}
              top={'-20%'}
              left={0}
              zIndex={-1}
              color={useColorModeValue('red.50', 'red.400')}
            />
            <Box
              position={'relative'}
              height={'300px'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}>
              
              <Image
                alt={'Hero Image'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={
                  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270'
                }
              />
            </Box>
          </Flex>
        </Stack>
        <VStack align="flex-start">
    </VStack>
    <VStack w="full" h="full">
        <Box h={20} w="full" bg="white.500" />
    </VStack>
        <Heading as="h1">About Us</Heading>
        <Box
          marginTop={{ base: '1', sm: '5' }}
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent="space-between">
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center">
            <Box
              width={{ base: '100%', sm: '85%' }}
              zIndex="2"
              marginLeft={{ base: '0', sm: '5%' }}
              marginTop="5%">
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  borderRadius="lg"
                  src={
                    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340'
                  }
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Link>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  'radial(orange.600 1px, transparent 1px)',
                  'radial(orange.300 1px, transparent 1px)'
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: '3', sm: '0' }}>
            <Heading margin="2">
                Our Mission Statement
            </Heading>
            <Text
              marginLeft={"15px"}
              marginRight={"15px"}
              as="p"
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="lg">
              Cryptaid is a non-profit organization that employs the concept of decentralized applications to allow 
              anonymity for donating to organizations. For example, with the unfortunate Ukraine vs Russia situation, 
              Russian users may be afraid to donate to Ukrainian causes because of internal pressures from the Russian 
              government. Cryptaid solves this issue by allowing users to remain unidentified revealing nothing but their
              wallet address. 
              Users can donate to charities, individual users, and various causes, knowing their data and safety is 
              is our number one priority. We are the future of donating. 
            </Text>
          </Box>
        </Box>
        <Divider my={"50px"} />
        <Heading marginTop={{ base: '1', sm: '5' }} as="h2">
          Our Team
        </Heading>
        <Divider my={"10px"} />
        <Wrap spacing="30px" marginTop="5">
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/280908222_842671417123437_4135169116374229379_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=q6jZPHz5Qw8AX_N5IqE&_nc_ht=scontent-sjc3-1.xx&oh=03_AVJOuqu_DCxHMisn2rZKlJhSmJOOjAdUuG8eFIeAj6KjhA&oe=62B2A8A4'
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Krish Chaudhary
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                Krish Chaudhary is a Computer Engineering major at University of California, Santa Barbara.
                Topics of interest that he has studied include Machine Learning, Full-Stack Web Development, and Blokchcain.
                He will pursue a career in Software Engineering. 
              </Text>
            </Box>
          </WrapItem>
        </Wrap>
        <Wrap spacing="30px" >
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/283334258_407649421220102_1766841067310071830_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_ohc=181roR_ks50AX9K_3vy&tn=zWIbHeFXFty_ycxX&_nc_ht=scontent-sjc3-1.xx&oh=03_AVLOIjlBJjVLsUizHOFRRuv63ffC3qFE_jhK70QxdJoqbg&oe=62B4BD67"
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Capppillen Lee
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                A Computer Science student at University of California, Santa Barabara. He recently recovered from COVID. 
              </Text>
            </Box>
          </WrapItem>
        </Wrap>
        <Wrap spacing="30px" >
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/281683424_576430080708216_1210614008036510721_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=ae9488&_nc_ohc=FwfVP57O7ZwAX_dOvnw&_nc_ht=scontent-sjc3-1.xx&oh=03_AVLJwygJekNxwnLyHtjcKEFSVZ5HGyds2aipZtx0Vv_XuA&oe=62B55EAA"
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Gen Tamada
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                A Computer Science student at University of California, Santa Barbara. Carried the backend with Andy. This is his mugshot.
              </Text>
            </Box>
          </WrapItem>
        </Wrap>
        <Wrap spacing="30px" >
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/282296983_710951069956611_2929949998126239630_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=WDg3OouYN-8AX-18is4&tn=zWIbHeFXFty_ycxX&_nc_ht=scontent-sjc3-1.xx&oh=03_AVI8k0fTAgPxLK56IBYhfVnlhI5SyNlFEMwomvejt25lwg&oe=62B64938"
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Jacey Buchner
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                A Computer Science student at University of California, Santa Barbara. Also recently recovered from COVID.
              </Text>
            </Box>
          </WrapItem>
        </Wrap>
        <Wrap spacing="30px" >
          <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Image
                    transform="scale(1.0)"
                    src={
                      "https://scontent-sjc3-1.xx.fbcdn.net/v/t1.15752-9/282296983_710951069956611_2929949998126239630_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=WDg3OouYN-8AX-18is4&tn=zWIbHeFXFty_ycxX&_nc_ht=scontent-sjc3-1.xx&oh=03_AVI8k0fTAgPxLK56IBYhfVnlhI5SyNlFEMwomvejt25lwg&oe=62B64938"
                    }
                    alt="some text"
                    objectFit="contain"
                    width="100%"
                    transition="0.3s ease-in-out"
                    _hover={{
                      transform: 'scale(1.05)',
                    }}
                  />
                </Link>
              </Box>
              <Heading fontSize="xl" marginTop="2">
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Andy Ouyang
                </Link>
              </Heading>
              <Text as="p" fontSize="md" marginTop="2">
                A Computer Science student at University of California, Santa Barbara. Also recently recovered from COVID.
              </Text>
            </Box>
          </WrapItem>
        </Wrap>

        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading as="h2">Our Functionalities</Heading>
          <Text as="p" fontSize="lg">
          In order to use Cyrptaid, users must install the Metamask plugin, which accesses their wallet 
          information on the Ethereum blockchain. First-time users must authenticate their profile by 
          linking their Metamask account to our site. After they have done so, their account information 
          will be saved and they will be redirected to the registration page. The registration page will 
          allow users to submit their names, emails, and passwords as JSON data on Moralis servers. 
          Every consecutive time that a user logs out and logs back in, a user can input their email and password, 
          and our site will log them in with their Metamask account. The create page also allows users to add an 
          organization with images, title, description, location, 
          their Eth address, and an Eth goal they want to reach. The create page will only allow a user to 
          publish a charity if they are logged in, to help prevent users from positing malicious or inappropriate content.
          Next, the organization's page shows a list of all the organizations in card format. If a user clicks on the card, 
          a milestone bar will be displayed with the goal that the organization set. Three milestones will be displayed with 
          goals that the organization came up with. After every milestone, our website will mint an NFT and award the donator 
          with an NFT on the blockchain. The NFTs for every user will be displayed on the site if they log in.  
          </Text>
        </VStack>
      </Container>
      
    );
  }

  const PlayIcon = createIcon({
    displayName: 'PlayIcon',
    viewBox: '0 0 58 58',
    d:
      'M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z',
  });
  
  export const Blob = (props) => {
    return (
      <Icon
        width={'100%'}
        viewBox="0 0 578 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
          fill="currentColor"
        />
      </Icon>
    );
  };

  