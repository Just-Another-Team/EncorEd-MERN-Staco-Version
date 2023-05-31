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
            <Container className='' style={{overflow: "hidden"}}>
                <h2>Add Subject</h2>
                <Row>
                    {/* <SideNav /> not to be used and not fixed */}
                    <Col>
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
            <Container className='' style={{overflow: "hidden"}}>
                <h2>Update Subject</h2>
                <Row>
                    {/* <SideNav /> Not to be used */}
                    <Col>
                        <SubjectForm id={id}/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export { AddSubject, EditSubject }