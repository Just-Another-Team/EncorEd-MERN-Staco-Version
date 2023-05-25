const SubjectDetails = ({ subject }) => {

    return (
        <div>
            <div className="subject-details">
                <h4>{subject.subjectName}</h4>
                <p><strong>EDP code: </strong>{subject.subjectEDP}</p>
                <p><strong>Room: </strong>{subject.subjectRoomLocation}</p>
                <p><strong>Floor: </strong>{subject.subjectFloorLocation}</p>
            </div>
        </div>
    )
}

export default SubjectDetails