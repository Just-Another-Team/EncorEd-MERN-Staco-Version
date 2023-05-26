import '../App.css';
//import logo from '../assets/logo.svg'

import { Container, Row, Col} from "react-bootstrap";
import { SideNav } from '../components/NavBar';
import { useEffect } from "react";

//components
import SubjectDetails from '../components/SubjectDetails'
import { useSubjectsContext } from '../hooks/useSubjectsContext';

const ViewSubjects = () => {
    const { subjects, dispatch } = useSubjectsContext()

    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await fetch('/api/subjects/viewsubs')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'VIEW_SUBJECTS', payload: json})  
            }
        }

        fetchSubjects()
    }, [])
    
    return (
        <>
            <Container fluid className='mx-0 px-0' style={{"overflow-x": "hidden"}}>
                <Row>
                    <SideNav />
                    <Col className='m-0 p-0' style={{height: "94.2vh"}}>
                        <div style={{"overflow-y": "scroll"}}>
                            {subjects && subjects.map((subject) => (
                                <SubjectDetails key={subject._id} subject={subject}/>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export { ViewSubjects }