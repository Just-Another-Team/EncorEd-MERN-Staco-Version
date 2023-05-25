import '../App.css';
//import logo from '../assets/logo.svg'

import { Container, Row, Col} from "react-bootstrap";
import { SideNav } from '../components/NavBar';
import { useEffect, useState } from "react";

//components
import SubjectDetails from '../components/SubjectDetails'

const ViewSubjects = () => {
    const [subjects, setSubjects] = useState(null)

    useEffect(() => {
        const fetchSubjects = async () => {
            const response = await fetch('/api/subjects/viewsubs')
            const json = await response.json()

            if (response.ok) {
                setSubjects(json)
            }
        }

        fetchSubjects()
    }, [])
    
    return (
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <Row>
                    <SideNav />
                    <Col className='m-0 p-0' style={{height: "94.2vh"}}>
                        <div>
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