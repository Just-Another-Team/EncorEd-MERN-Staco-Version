import axios from 'axios';

import { useState } from 'react';
import { Row, Col, Form, Card, Button } from "react-bootstrap"

const AddSubjectForm = () => {
    const [subjectImg, setSubjectImg] = useState();
    const [subjectName, setSubjectname] = useState();
    const [subjectEDP, setSubjectEDPCode] = useState();
    const [subjectFloorLocation, setSubjectFloorLocation] = useState();
    const [subjectRoomLocation, setSubjectAssignedRoom] = useState();
    const [subjectStartTime, setSubjectStartTime] = useState();
    const [subjectEndTime, setSubjectEndTime] = useState();
    const [subjectAssignedWeek, setSubjectAssignedWeek] = useState([]);
    const [userFields, setUserFields] = useState([
        {name: 'username', placeholder: 'Name of user'}
    ]);
    
    const [rooms, setRooms] = useState([]);
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
    
        const formData = new FormData();

        formData.append('subjectImg', subjectImg);
        formData.append('subjectName', subjectName);
        formData.append('subjectEDP', subjectEDP);
        formData.append('subjectFloorLocation', subjectFloorLocation);
        formData.append('subjectRoomLocation', subjectRoomLocation);
        formData.append('subjectStartTime', subjectStartTime);
        formData.append('subjectEndTime', subjectEndTime);
        
        subjectAssignedWeek.map((element) => {
            console.log(`Week: ${element}`)
            formData.append('subjectAssignedWeek', element);
        });

        subjectAssignedUser.map((element) => {
            console.log(`User: ${element}`);
            formData.append('subjectAssignedUser', element);
        })

        //run nodemon server.js before running this
        axios.post('http://localhost:4000/add', formData)
            .then(res => console.log(res.data))

        alert("Subject added successfully!");

        //Clear
        setSubjectImg();
        setSubjectname();
        setSubjectEDPCode();
        setSubjectFloorLocation();
        setSubjectAssignedRoom();
        setSubjectStartTime();
        setSubjectEndTime();
        setSubjectAssignedWeek();
        setUserFields([{name: 'username', placeholder: 'Name of user'}]);
    }
    
    function setFloor(e) {
        setSubjectFloorLocation(e.target.value);
    
        if (e.target.value === "0" || e.target.value === undefined)
            setRooms([])
        else
            setRooms(roomList(e.target.value, 22))
    }
    
    function setDate(e) {
        const timeArr = e.target.value.split(":");
        const timeDate = new Date();
        timeDate.setHours(timeArr[0], timeArr[1]);
        return timeDate;
    }

    return (
        <Form className='m-4 p-3'>
            <Form.Group className='mb-3'>
                <Form.Label>Subject Image</Form.Label>
                    <Form.Control type='file' onChange={(e) => setSubjectImg(e.target.files[0])} accept='.png, .jpg, .jpeg' name='subjectImg' />
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
                        <Form.Select onChange={(e) => setSubjectAssignedRoom(e.target.value)} aria-label='Subject End Time' required> {/* onChange={(e) => setSubjectEndTime(e.target.value)} */}
                            <option>Room number</option>
                            {rooms.map((room => <option value={room}>{room}</option>))}
                        </Form.Select>
                   </Form.Group>
                </Row>

                <Row className='mb-3'>
                    <Form.Label>Subject Schedule</Form.Label>
                    <Form.Group as={Col}>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control onChange={(e) => setSubjectStartTime(setDate(e))} type="time" required/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>End Time</Form.Label>
                        <Form.Control onChange={(e) => setSubjectEndTime(setDate(e))} type="time" required/>
                    </Form.Group>
                </Row>

                <Form.Group key={`week-checkbox`} className='mb-3'>
                    <Form.Label>Assigned Day Per Week</Form.Label>
                    <div className='d-flex justify-content-between'>
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((weekday, index) => (
                            <Form.Check onChange={(e) => addWeeks(index, e)} label={weekday} value={weekday} name={`week-${weekday}`} type="checkbox"/>
                        ))}
                    </div>
                </Form.Group>

                <Row xs={1} md={1} className='mb-3'>
                    <Col style={{height: "14em", overflow: "auto"}}>
                        {userFields.map((input, index) => {
                            return (
                                <Card key={index} className='mb-3'>
                                    <Card.Body className='d-flex justify-content-between'>
                                        {index === userFields.length - 1 ? 
                                            <Form.Control onChange={(e) => handleFormChange(index, e)} name='username' type='text' style={{width: "28em"}} placeholder={input.placeholder} required /> :
                                            <Form.Text><h4>{input.username}</h4></Form.Text>}
                                                        
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
                {/* <Button variant='secondary' size='lg'>CLEAR</Button>
                <Button variant='danger' size='lg'>CANCEL</Button> */}
        </Form>
    );
}

export {AddSubjectForm}