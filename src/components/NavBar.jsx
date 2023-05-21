import { Container, Row, Col, NavDropdown, Nav, Navbar, Stack } from "react-bootstrap"
import { NavButton } from "./Buttons";

const TopNav = () => {
    return (
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container className='mx-4' fluid>
                <Navbar.Brand>EncorEd</Navbar.Brand>
                <Nav className="justify-content-end flex-grow-1 pe-3">

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