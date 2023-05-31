import { Button, Card, Col } from "react-bootstrap"
import { useAuthContext } from "../hooks/useAuthContext";

const SubjectDetails = ({ subject, handleDelete, handleUpdate, style }) => {

    const { user } = useAuthContext();

    return (
        <Col>
            <Card style={style} className="subject-details">
                <Card.Body>
                    <Card.Title><h4>{subject.subjectName}</h4></Card.Title>
                    <p><strong>EDP code: </strong>{subject.subjectEDP}</p>
                    <p><strong>Room: </strong>{subject.subjectRoomLocation}</p>
                    <p><strong>Floor: </strong>{subject.subjectFloorLocation}</p>
                    {user.userRole === "Registrar" && (
                        <>
                            <Button value={subject._id} variant="primary" onClick={(e) => handleUpdate(e)}>
                                Update
                            </Button>

                            <Button value={subject._id} variant="danger" onClick={(e) => handleDelete(e)}>
                                Delete
                            </Button>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default SubjectDetails