import '../App.css';
//import logo from '../assets/logo.svg';

import { Container, Row} from "react-bootstrap"
import {  SideNav } from '../components/NavBar';
import React, { useState } from "react"

const Dashboard = () => {
    return(
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <Row style = {{ backgroundColor:'#45A1FD', height: "94.2vh"}}>
                    
                    <SideNav />
                </Row>
            </Container>
        </>
    );
}

export { Dashboard }