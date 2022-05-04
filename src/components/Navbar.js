
export default Navbar = () => {
    return (
        <Flex my={6}>
            <Link to="/"><Heading>Home</Heading></Link>
            <Spacer/>
            {isAuthenticated && <Link to="/profile"><Avatar name={user.attributes.username}/></Link>}
        </Flex>
    );
};