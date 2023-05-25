import { Row, Col, Form, Card, Button } from "react-bootstrap"
import { useState } from "react"
import { useSubjectsContext } from "../hooks/useSubjectsContext";

const SubjectForm = () => {
    const { dispatch } = useSubjectsContext()
    //const [subjectImg, setSubjectImg] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [subjectEDP, setSubjectEDPCode] = useState('');
    const [subjectFloorLocation, setSubjectFloorLocation] = useState('');
    const [subjectRoomLocation, setSubjectAssignedRoom] = useState('');
    const [subjectStartTime, setSubjectStartTime] = useState('');
    const [subjectEndTime, setSubjectEndTime] = useState('');
    const [subjectAssignedWeek, setSubjectAssignedWeek] = useState([]);
    const [subjectAssignedUser, setSubjectAssignedUser] = useState([
        {name: 'username', placeholder: 'Name of user'}
    ]);

    const [error, setError] = useState(null)

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
        setSubjectAssignedUser([...subjectAssignedUser, newField]);
    }
    
    const removeFields = (index) => {
        let data = [...subjectAssignedUser];
        data.splice(index, 1);
        setSubjectAssignedUser(data);
    }
    
    const handleFormChange = (index, event) => {
        let data = [...subjectAssignedUser];
        data[index][event.target.name] = event.target.value;
        setSubjectAssignedUser(data);
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

    const submitForm = async (e) => {
        e.preventDefault()
    

        const subject = { subjectName, subjectEDP, subjectFloorLocation,
            subjectRoomLocation, subjectStartTime, subjectEndTime,
            subjectAssignedWeek, subjectAssignedUser }

        const response = await fetch('/api/subjects/addsubs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subject)
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            //Clear
            //setSubjectImg();
            setSubjectName();
            setSubjectEDPCode();
            setSubjectFloorLocation();
            setSubjectAssignedRoom();
            setSubjectStartTime();
            setSubjectEndTime();
            setSubjectAssignedWeek();
            setSubjectAssignedUser([{name: 'username', placeholder: 'Name of user'}]);
            setError(null)
            console.log("new subject added", json)
            dispatch({ type: 'ADD_SUBJECTs', payload: json})
        }

    }

    return (
       <Form className='m-4 p-3'>
            {/* <Form.Group className='mb-3'>
            <Form.Label>Subject Image</Form.Label>
                <Form.Control type='file' onChange={(e) => setSubjectImg(e.target.files[0])} accept='.png, .jpg, .jpeg' name='subjectImg' value={subjectImg} />
            </Form.Group> */}

            <Form.Group className='mb-3'>
                <Form.Label>Subject Name</Form.Label>
                <Form.Control onChange={(e) => setSubjectName(e.target.value)} type='text' placeholder='Subject Name' value={subjectName} required/>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Subject EDP Code</Form.Label>
                <Form.Control onChange={(e) => setSubjectEDPCode(e.target.value)} type='text' placeholder='Subject EDP Code' value={subjectEDP} required/>
            </Form.Group>

            <Row className='mb-3'>
                <Form.Group as={Col}>
                    <Form.Label>Assigned Floor</Form.Label>
                    <Form.Select onChange={(e) => setFloor(e)} aria-label='Subject Floor Location' value={subjectFloorLocation} required> {/* onChange={(e) => setSubjectFloorLocation(e.target.value)} */}
                        <option value='0'>Floor Number</option>
                        {floors.map(elements => <option value={elements}>{`Floor ${elements}`}</option>)}    
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Assigned Room</Form.Label>
                    <Form.Select onChange={(e) => setSubjectAssignedRoom(e.target.value)} aria-label='Subject Assigned Room' value={subjectRoomLocation} required> {/* onChange={(e) => setSubjectEndTime(e.target.value)} */}
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
                    {subjectAssignedUser.map((input, index) => {
                        return (
                            <Card key={index} className='mb-3'>
                                <Card.Body className='d-flex justify-content-between'>
                                    {index === subjectAssignedUser.length - 1 ? 
                                        <Form.Control onChange={(e) => handleFormChange(index, e)} name='username' type='text' style={{width: "28em"}} placeholder={input.placeholder} required /> :
                                        <Form.Text><h4>{input.username}</h4></Form.Text>}
                                                    
                                    {index === subjectAssignedUser.length - 1 ? 
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
            {error && <div className="error">{error}</div>}
    </Form>
    )
}

export default SubjectForm