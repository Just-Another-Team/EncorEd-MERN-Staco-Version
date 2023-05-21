import '../App.css';
import logo from '../assets/logo.svg';

import { Container, Row, Col } from "react-bootstrap"
import { TopNav, SideNav } from '../components/NavBar';
import { AddSubjectForm } from '../components/Form'

const AddSubject = () => {
    return(
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <TopNav />

                <Row>
                    <SideNav />
                    <Col className='m-0 p-0' style={{height: "94.2vh"}}>

                        <AddSubjectForm />

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export { AddSubject }