import { Button } from "react-bootstrap"
import { useAuthContext } from "../hooks/useAuthContext";

const SubjectDetails = ({ subject, handleDelete, handleUpdate }) => {

    const { user } = useAuthContext();

    return (
        <div>
            <div className="subject-details">
                <h4>{subject.subjectName}</h4>
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
            </div>
        </div>
    )
}

export default SubjectDetails