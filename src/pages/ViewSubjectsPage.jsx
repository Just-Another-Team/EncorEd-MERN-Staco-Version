import '../App.css';
//import logo from '../assets/logo.svg'

import { Container, Row, Col} from "react-bootstrap";
import { SideNav } from '../components/NavBar';
import { useState, useEffect } from "react";
import axios from 'axios'
import { useAuthContext } from "../hooks/useAuthContext";

//components
import SubjectDetails from '../components/SubjectDetails'
import { useSubjectsContext } from '../hooks/useSubjectsContext';

const ViewSubjects = () => {
    const { subjects, dispatch } = useSubjectsContext()

    const [enrolledSubjects, setEnrolledSubjects] = useState([]); 

    const [error, setError] = useState(null);
    const [deleted, setDeleted] = useState(false);

    const { user } = useAuthContext()

    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await fetch('/api/subjects/viewsubs')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'VIEW_SUBJECTS', payload: json})  
            }
        }

        fetchSubjects();

        const token = JSON.parse(localStorage.getItem('user')).token;
        const user = { token }

        axios.put('/api/subjects/enrolledsubs', user)
            .then((res) => {
                setEnrolledSubjects(res.data);
            })
            .catch((err) => {
                console.log(`Error ${err.data}`);
            });

        //put
        //const token = JSON.parse(localStorage.getItem('user')).token;
        console.log(token)
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
            <Container className=''>
                
                {user && user.userRole === "Student" && (
                    <>
                        <h2>Subjects Enrolled</h2>
                        <Row className='my-4 g-4' style={{height: "14em", overflow: "auto"}}>
                            {enrolledSubjects.length !== 0 ? enrolledSubjects.map((subject) => (
                                <SubjectDetails style={{width: "24em"}} key={subject._id} subject={subject} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
                            )):
                            <p>You are not enrolled to any subjects</p>
                            }
                        </Row>
                    </>
                )}
                
                <h2>Subjects Added</h2>
                <Row xs={1} md={2} className='g-4'> 
                    {subjects && subjects.map((subject) => (
                        <SubjectDetails key={subject._id} subject={subject} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export { ViewSubjects }