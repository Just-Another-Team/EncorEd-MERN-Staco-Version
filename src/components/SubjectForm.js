import { Row, Col, Form, Card, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useSubjectsContext } from "../hooks/useSubjectsContext";

const SubjectForm = ({id}) => {
    
    const { subjects, dispatch } = useSubjectsContext()
    const [subjectImg, setSubjectImg] = useState('');
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
    
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const roomList = (floor, i) => {
        return Array.from({length: i}).map((element, index) => `${(floor * 100) + (++index)}`)
    }
    
    const addWeeks = (index, event) => {
        let data = [...subjectAssignedWeek];
        if (event.target.checked) data.push(event.target.value);
        setSubjectAssignedWeek(data);
    }
    
    const addFields = (index) => {
        if (subjectAssignedUser[index].username === undefined) {
            alert("Please enter a name of a user. Thank you");
            return;
        }

        let newField = {name: 'username', placeholder: 'Name of user'};
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

    const setFloor = (e) => {
        setSubjectFloorLocation(e.target.value);
    
        if (e.target.value === "0" || e.target.value === undefined)
            setRooms([])
        else
            setRooms(roomList(e.target.value, 22))
    }

    const setDate = (e) => {
        const timeArr = e.target.value.split(":");
        const timeDate = new Date();
        timeDate.setHours(timeArr[0], timeArr[1]);
        return timeDate;
    }

    const handleChecks = (weekday) => {
        if (subjectAssignedWeek.includes(weekday)) return true;
        
        return false;
    }

    const addSubject = async (e) => {
        e.preventDefault()

        const token = JSON.parse(localStorage.getItem('user')).token;

        const subject = { subjectName, subjectEDP, subjectFloorLocation,
            subjectRoomLocation, subjectStartTime, subjectEndTime,
            subjectAssignedWeek, subjectAssignedUser, token }

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

            alert("Subject added successfully!");

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

    const updateSubject = async (e) => {
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem('user')).token;

        const subject = { subjectName, subjectEDP, subjectFloorLocation,
            subjectRoomLocation, subjectStartTime, subjectEndTime,
            subjectAssignedWeek, subjectAssignedUser, token }

        axios.post(`/api/subjects/updateSub/${id}`, subject)
            .then(res => {
                alert("Subject updated successfully!");

                window.location.href = "/viewsubs";

                setSubjectName();
                setSubjectEDPCode();
                setSubjectFloorLocation();
                setSubjectAssignedRoom();
                setSubjectStartTime();
                setSubjectEndTime();
                setSubjectAssignedWeek();
                setSubjectAssignedUser([{name: 'username', placeholder: 'Name of user'}]);
                setError(null)
            })
            .catch(err => {
                setError(err.data)
            });

        // const response = await fetch(`/api/subjects/updateSub/${id}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(subject)
        // })

        // const json = await response.json()

        // if(!response.ok) {
        //     setError(json.error)
        // }

        // if(response.ok) {
        //     //Clear
        //     //setSubjectImg();

        //     alert("Subject updated successfully!");

        //     setSubjectName();
        //     setSubjectEDPCode();
        //     setSubjectFloorLocation();
        //     setSubjectAssignedRoom();
        //     setSubjectStartTime();
        //     setSubjectEndTime();
        //     setSubjectAssignedWeek();
        //     setSubjectAssignedUser([{name: 'username', placeholder: 'Name of user'}]);
        //     setError(null)
        //     console.log("Subject updated!", json)
        //     dispatch({ type: 'UPDATE_SUBJECT', payload: json})
        // }
    }

    useEffect(() => {
        if (id !== undefined) 
            axios.get(`/api/subjects/viewsubs/${id}`)
                .then((res) => {
                    console.log(res.data[0].subjectName);

                    setSubjectName(res.data[0].subjectName);
                    setSubjectEDPCode(res.data[0].subjectEDP);
                    setSubjectFloorLocation(res.data[0].subjectFloorLocation);
                    setSubjectAssignedRoom(res.data[0].subjectRoomLocation);

                    const startTime = new Date(res.data[0].subjectStartTime);
                    const endTime = new Date(res.data[0].subjectEndTime);

                    setSubjectStartTime(`${startTime.getHours()}:${startTime.getMinutes()}`);
                    setSubjectEndTime(`${endTime.getHours()}:${endTime.getMinutes()}`);

                    setSubjectAssignedWeek(res.data[0].subjectAssignedWeek);

                    setSubjectAssignedUser(res.data[0].subjectAssignedUser);
                })
                .catch((err) => {
                    console.log('Error from UpdateBookInfo');
                });

    }, [id])

    return (
       <Form className='m-4 p-3'>
            {id && (
                <>
                    <Form.Group className='mb-3'>
                    <Form.Label>Subject Image</Form.Label>
                        <Form.Control type='file' onChange={(e) => setSubjectImg(e.target.files[0])} accept='.png, .jpg, .jpeg' name='subjectImg' value={subjectImg} />
                    </Form.Group> 
                </>
            )}

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
                    <Form.Select onChange={(e) => setFloor(e)} aria-label='Subject Floor Location' value={subjectFloorLocation} required>
                        <option value='0'>Floor Number</option>
                        {floors.map(elements => <option value={elements}>{`Floor ${elements}`}</option>)}    
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Assigned Room</Form.Label>
                    <Form.Select onChange={(e) => setSubjectAssignedRoom(e.target.value)} aria-label='Subject Assigned Room' value={subjectRoomLocation} required>
                        <option>Room number</option>
                        {rooms.map((room => <option value={room}>{room}</option>))}
                    </Form.Select>
            </Form.Group>
            </Row>

            <Row className='mb-3'>
                <Form.Label>Subject Schedule</Form.Label>
                <Form.Group as={Col}>
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control onChange={(e) => setSubjectStartTime(setDate(e))} defaultValue={subjectStartTime} type="time" required/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>End Time</Form.Label>
                    <Form.Control onChange={(e) => setSubjectEndTime(setDate(e))} defaultValue={subjectEndTime} type="time" required/>
                </Form.Group>
            </Row>

            <Form.Group key={`week-checkbox`} className='mb-3'>
                <Form.Label>Assigned Day Per Week</Form.Label>
                <div className='d-flex justify-content-between'>
                    {weekdays.map((weekday, index) => (
                        <Form.Check onChange={(e) => addWeeks(index, e)} label={weekday} value={weekday} name={`week-${weekday}`} checked={handleChecks(weekday)} type="checkbox"/>
                    ))}
                </div>
            </Form.Group>

            <Row xs={1} md={1} className='mb-3'>
                <Col style={{maxHeight: "14em", overflow: "auto"}}>
                    {subjectAssignedUser.map((input, index) => {
                        return (
                            <Card key={index} className='mb-3'>
                                <Card.Body className='d-flex justify-content-between'>
                                    {index === subjectAssignedUser.length - 1 
                                        ?
                                        <>
                                            <Form.Control onChange={(e) => handleFormChange(index, e)} name={input.name} type='text' style={{width: "28em"}} placeholder={input.placeholder} required />
                                            <Button onClick={() => addFields(index)} variant='primary'>ADD</Button>
                                        </>
                                        :
                                        <>
                                            <Form.Text><h4>{input.username}</h4></Form.Text>
                                            <Button onClick={() => removeFields(index)} variant='danger'>DELETE</Button>
                                        </>}
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Col>
            </Row>

            <Button onClick={id ? updateSubject : addSubject} variant='primary' size='lg'>SUBMIT</Button>
            {error && <div className="error">{error}</div>}
    </Form>
    )
}

export default SubjectForm