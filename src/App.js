import { Button, Container, Heading, Alert, AlertIcon, AlertTitle, Box, AlertDescription, CloseButton, Input, Flex, Spacer, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Auth } from "./pages/Auth";
import { Navbar } from "./components/Navbar";
import { useRedirect } from "./hooks/useRedirect";

function App() {

  const { authenticate, isAuthenticated, isAuthUndefined, authError, logout, user } = useMoralis();
  const redirect = useRedirect();

  // redirect if user is not authenticated
  useEffect(() => {
    if(isAuthUndefined) {
      redirect("/");
    }
  }, [isAuthenticated]);

  return (
    <Container>
      <Navbar/>
      <Heading>
        Welcome to Cryptaid, {user ? user.attributes.username : ' authenticate please...'}
      </Heading>
      {isAuthenticated ? 
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/profile" element={<Profile/>} exact/>
        {/* <Route path="/auth" element={<Auth/>} exact/> */}
      </Routes> : 
      <>
        <Routes>
          <Route path="/auth" element={<Auth/>} exact/>
        </Routes>
        {/* <Auth/> */}
      </>
      }
      
    </Container>
  );
}

export default App;