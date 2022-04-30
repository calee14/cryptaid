import { Button, Container, Heading, Alert, AlertIcon, AlertTitle, Box, AlertDescription, CloseButton, Input, Flex, Spacer, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route, Navigate, useNavigate, Link } from "react-router-dom";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Auth } from "./components/Auth";

function App() {

  const { authenticate, isAuthenticated, isAuthUndefined, authError, logout, user } = useMoralis();
  const navigate = useNavigate();

  // redirect if user is not authenticated
  useEffect(() => {
    if(isAuthUndefined) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <Container>
      <Flex my={6}>
          <Link to="/"><Heading>Home</Heading></Link>
          <Spacer/>
          {isAuthenticated && <Link to="/profile"><Avatar name={user.attributes.username}/></Link>}
      </Flex>
      <Heading>
        Welcome to Cryptaid, {user ? user.attributes.username : ' autenticate please...'}
      </Heading>
      {isAuthenticated ? 
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/profile" element={<Profile/>} exact/>
      </Routes> : 
      <>
        <Auth/>
      </>
      }
      
    </Container>
  );
}

export default App;