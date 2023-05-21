import { Container, Row, Col, NavDropdown, Nav, Navbar, Stack } from "react-bootstrap"
import { NavButton } from "./Buttons";

const TopNav = () => {
    return (
        <Navbar bg="dark" variant='dark' expand="lg">
            <Container className='mx-4' fluid>
                <Navbar.Brand>EncorEd</Navbar.Brand>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>

                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>

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
                    <NavButton className="m-0 px-5 py-3 w-100"/>
                );
            })}
        </Col>
    );
}

export { TopNav, SideNav }