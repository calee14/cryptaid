import { Button, Container, Heading, Alert, AlertIcon, AlertTitle, Box, AlertDescription, CloseButton, Input, Flex, Spacer, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Routes, Route, Link, Navigate} from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { BackendTesting } from "./pages/BackendTesting";
import { Auth } from "./pages/Auth";
import { Navbar } from "./components/Navbar";
import { useRedirect } from "./hooks/useRedirect";
import { Create } from "./pages/Create";
import { Footer } from "./components/Footer";
import { OrgPage } from "./pages/OrgPage";
import { Donate } from "./pages/Donate";

function App() {

  const { authenticate, isAuthenticated, isAuthUndefined, authError, logout, user } = useMoralis();
  const redirect = useRedirect();

  return (
    <>
    <Box>
      <Navbar/>
      {isAuthenticated ? 
      // routes for when the user is logged in
      <Routes>
        <Route path="/backend" element={<BackendTesting/>} exact/>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/profile" element={<Profile/>} exact/>
        <Route path="/auth" element={<Auth/>} exact/>
        <Route path="/create" element={<Create/>} exact/>
        <Route path="/organization/:id" element={<OrgPage/>} exact/>
        <Route path="/organization/:id/donate" element={<Donate/>} exact />
      </Routes> : 
        // routes for when the user is not logged in
        <Routes>
          <Route path="/" element={<Home/>} exact/>
          <Route path="/auth" element={<Auth/>} exact/>
          <Route path="/organization/:id" element={<OrgPage/>} exact/>
          <Route path="/profile" element={<Profile/>} exact/>
        </Routes>
      }
    </Box>
    <Spacer my={10}/>
    <Footer/>
    </>
  );
}

export default App;