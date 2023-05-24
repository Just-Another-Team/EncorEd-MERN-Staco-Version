import '../App.css';
import logo from '../assets/logo.svg';
import landing from '../assets/Landing.jpg';

import { Container, Row, Col } from "react-bootstrap"
import { TopNav, SideNav } from '../components/NavBar';

const Landing = () => {
    return(
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <TopNav />
                <Row style = {{ backgroundImage:`url(${landing})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                width: '105vw',
                                height: '94.6vh'
                                }}>
                </Row>
            </Container>
        </>
    );
}

export { Landing }