import '../App.css';
//import logo from '../assets/logo.svg'

import { Container, Row, Col} from "react-bootstrap";
import { SideNav } from '../components/NavBar';
import { useState, useEffect } from "react";

//components
import SubjectDetails from '../components/SubjectDetails'
import { useSubjectsContext } from '../hooks/useSubjectsContext';

const ViewSubjects = () => {
    const { subjects, dispatch, subject } = useSubjectsContext()
    const [error, setError] = useState(null);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await fetch('/api/subjects/viewsubs')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'VIEW_SUBJECTS', payload: json})  
            }
        }

        fetchSubjects()
    }, [deleted])

    const handleDelete = async (e) => {
        console.log(e.target.value);

        const response = await fetch(`/api/subjects/deleteSub/${e.target.value}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            console.log(error);
        }
        if(response.ok) {
            setDeleted(true)
            alert("Subject deleted successfully!");
            console.log("Subject deleted!", json)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        console.log(e.target.value);

        window.location.href = `/editsub/${e.target.value}`;
    }
    
    return (
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <Row>
                    <SideNav />
                    <Col className='m-0 p-0' style={{height: "94.2vh"}}>
                        <div>
                            {subjects && subjects.map((subject) => (
                                <SubjectDetails key={subject._id} subject={subject} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export { ViewSubjects }