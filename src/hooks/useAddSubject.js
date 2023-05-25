import { useState } from 'react'
import { useSubjectsContext } from './useSubjectsContext'

export const useAddSubject = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useSubjectsContext()

    const addSubjects = async (subjectImg, subjectName, subjectEDP, subjectRoomLocation, 
                                subjectFloorLocation, subjectStartTime, subjectEndTime, subjectAssignedWeek, 
                                subjectAssignedUser, user_id) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/subjects/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({subjectImg, subjectName, subjectEDP, subjectRoomLocation, 
                                    subjectFloorLocation, subjectStartTime, subjectEndTime, subjectAssignedWeek, 
                                    subjectAssignedUser, user_id})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {

            // save user to local storage
            localStorage.setItem('subjects', JSON.stringify(json))

            // update Subject Context
            dispatch({type: 'ADD_SUBJECTS', payload: json})

            
            setIsLoading(false)
        }
    }

    return { addSubjects, isLoading, error }
}