import { Container, Col, Nav, Navbar } from "react-bootstrap"
import { NavButton } from "./Buttons";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect } from 'react';

const TopNav = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container className='mx-4' fluid>
                <Navbar.Brand href ="/dashboard">EncorEd</Navbar.Brand>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    {user && user.userRole === 'Registrar' &&  (
                        <>
                            <Nav.Link href="/addsubs">Add Subjects</Nav.Link>
                        </>
                    )}
                    {user && (
                        <>
                            {/* <Nav.Link href="/viewsubs">View Subjects</Nav.Link> */}
                            <span className="loggedIn">Welcome! {user.userEmail}</span>
                            <button className="logout" onClick={handleClick}> Log out</button>
                        </>
                    )}
                    {!user && (
                        <>
                            <Nav.Link href="/login">Login</Nav.Link> 
                            <Nav.Link href="/register">Register</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export { TopNav }