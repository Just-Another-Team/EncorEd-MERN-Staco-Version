import '../App.css';
//import logo from '../assets/logo.svg';

import { Container, Row, Col} from "react-bootstrap"
import { SideNav } from '../components/NavBar';
import { useParams, useLocation, useMatch } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import SubjectForm from '../components/SubjectForm'

const AddSubject = () => {
    return (
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <Row>
                    <SideNav />
                    <Col className='m-0 p-0' style={{height: "94.2vh"}}>
                        <SubjectForm />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

const EditSubject = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <Row>
                    <SideNav />
                    <Col className='m-0 p-0' style={{height: "94.2vh"}}>
                        <SubjectForm id={id}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export { AddSubject, EditSubject }