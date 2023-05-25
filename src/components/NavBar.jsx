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
                            <Nav.Link href="/viewsubs">View Subjects</Nav.Link>
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

const SideNav = () => {
    return (
        <Col xs={2} className="p-0" style={{backgroundColor: "blue"}}>
            {["Home", "Subjects", "Events"].map((element) => {
                return(
                    // <h5 className="m-0 px-5 py-3" style={{backgroundColor: "red"}}>{element}</h5>
                    <NavButton text={element} className="m-0 px-5 py-3 w-100"/>
                );
            })}
        </Col>
    );
}

export { TopNav, SideNav }