import '../App.css';

import logo from '../assets/logo.svg';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap"
import { TopNav, SideNav } from '../components/NavBar';

const AddSubject = () => {
    //Replace Room Location and Assigned User names
    const [subjectImage, setSubjectImage] = useState();
    const [subjectName, setSubjectname] = useState();
    const [subjectEDP, setSubjectEDPCode] = useState();
    const [subjectFloorLocation, setSubjectFloorLocation] = useState();
    const [subjectRoomLocation, setSubjectAssignedRoom] = useState();
    const [subjectStartTime, setSubjectStartTime] = useState();
    const [subjectEndTime, setSubjectEndTime] = useState();

    const [rooms, setRooms] = useState([]);
    const [subjectAssignedWeek, setSubjectAssignedWeek] = useState([]);
    const [userFields, setUserFields] = useState([
        {name: 'username', placeholder: 'Name of user'}
    ]);

    const floors = Array.from({ length: 9 }).map((element, index) => ++index)
        
    const roomList = (floor, i) => {
        return Array.from({length: i}).map((element, index) => `${(floor * 100) + (++index)}`)
    }

    const addWeeks = (index, event) => {
        let data = [...subjectAssignedWeek];
        if (event.target.checked) data.push(event.target.value);
        setSubjectAssignedWeek(data);
    }

    const addFields = () => {
        let newField = {name: '', placeholder: 'Name of user'};
        setUserFields([...userFields, newField]);
    }

    const removeFields = (index) => {
        let data = [...userFields];
        data.splice(index, 1);
        setUserFields(data);
    }

    const handleFormChange = (index, event) => {
        let data = [...userFields];
        data[index][event.target.name] = event.target.value;
        setUserFields(data);
    }

    const submitForm = (e) => {
        e.preventDefault()

        const subjectAssignedUser = [];
        userFields.map((e, i) => { if (i != userFields.length - 1) subjectAssignedUser.push(e.username); });

        //const subject = {subjectName, subjectEDP, subjectRoomLocation, subjectStartTime, subjectEndTime, subjectAssignedWeek, subjectAssignedUser};

        //Store the following:
        // Image
        // Start Time
        // End Time

        const subject = {subjectName, subjectEDP, subjectRoomLocation, subjectAssignedWeek, subjectAssignedUser}
        console.log(subject)

        //run nodemon server.js before running this
        axios.post('http://localhost:4000/add', subject)
            .then(res => console.log(res.data))
    }

    function setFloor(e) {
        console.log(e.target.value);
        setSubjectFloorLocation(e.target.value);

        if (e.target.value === "0" || e.target.value === undefined)
            setRooms([])
        else
            setRooms(roomList(e.target.value, 22))
    }

    return(
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <TopNav />

                <Row>
                    <SideNav />
                    <Col className='m-0 p-0' style={{height: "94.2vh"}}>

                        <Form className='m-4 p-3'>
                            <Form.Group className='mb-3'>
                                <Form.Label>Subject Image</Form.Label>
                                <Form.Control type='file' />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Subject Name</Form.Label>
                                <Form.Control onChange={(e) => setSubjectname(e.target.value)} type='text' placeholder='Subject Name' required/>
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Label>Subject EDP Code</Form.Label>
                                <Form.Control onChange={(e) => setSubjectEDPCode(e.target.value)} type='text' placeholder='Subject EDP Code' required/>
                            </Form.Group>

                            <Row className='mb-3'>
                                <Form.Group as={Col}>
                                    <Form.Label>Assigned Floor</Form.Label>
                                    <Form.Select onChange={(e) => setFloor(e)} aria-label='Subject Start Time' required> {/* onChange={(e) => setSubjectFloorLocation(e.target.value)} */}
                                        <option value='0'>Floor Number</option>
                                        {floors.map(elements => <option value={elements}>{`Floor ${elements}`}</option>)}    
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Assigned Room</Form.Label>
                                    <Form.Select  aria-label='Subject End Time' required> {/* onChange={(e) => setSubjectEndTime(e.target.value)} */}
                                        <option>Room number</option>
                                        {rooms.map((room => <option value={room}>{room}</option>))}
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            {/* Change to date time picker */}
                            {/* <Row className='mb-3'>
                                <Form.Label>Subject Schedule</Form.Label>
                                <Form.Group as={Col}>
                                    <Form.Select onChange={(e) => setSubjectStartTime(e.target.value)} aria-label='Subject Start Time' required>
                                        <option>Start Time of Subject</option>
                                        {timeSchedule().map((elements => {
                                            return (
                                                <option>{elements}</option>
                                            );
                                        }))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Select onChange={(e) => setSubjectEndTime(e.target.value)} aria-label='Subject End Time' required>
                                        <option>Ending Time of Subject</option>
                                        {timeSchedule().map((elements => {
                                            return (
                                                <option>{elements}</option>
                                            );
                                        }))}
                                    </Form.Select>
                                </Form.Group>
                            </Row> */}

                            <Form.Group key={`week-checkbox`} className='mb-3'>
                                <Form.Label>Assigned Day Per Week</Form.Label>
                                <div className='d-flex justify-content-between'>
                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((weekday, index) => (
                                        <Form.Check onChange={(e) => addWeeks(index, e)} label={weekday} value={weekday} name={`week-${weekday}`} type="checkbox"/>
                                    ))}
                                </div>
                            </Form.Group>

                            <Row xs={1} md={1} className='mb-3'>
                                <Col style={{height: "18em", overflow: "auto"}}>
                                    {userFields.map((input, index) => {
                                        return (
                                            <Card key={index} className='mb-3'>
                                                <Card.Body className='d-flex justify-content-between'>
                                                    {index === userFields.length - 1 ? 
                                                        <Form.Control onChange={(e) => handleFormChange(index, e)} name='username' type='text' style={{width: "28em"}} placeholder={input.placeholder} required /> :
                                                        <Form.Text><h4>{input.username}</h4></Form.Text>
                                                        }
                                                        
                                                    {index === userFields.length - 1 ? 
                                                        <Button onClick={addFields} variant='primary'>ADD</Button> :
                                                        <Button onClick={() => removeFields(index)} variant='danger'>DELETE</Button>}
                                                </Card.Body>
                                            </Card>
                                        );
                                    })}
                                </Col>
                            </Row>

                            <Button onClick={submitForm} variant='primary' size='lg'>SUBMIT</Button>
                            <Button variant='secondary' size='lg'>CLEAR</Button>
                            <Button variant='danger' size='lg'>CANCEL</Button>
                        </Form>

                    </Col>
                </Row>
            </Container>
        </>
    );
}

export { AddSubject }