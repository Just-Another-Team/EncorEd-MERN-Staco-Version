import { createContext, useReducer,useState,useEffect } from 'react'

export const SubjectsContext = createContext()

export const subjectsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SUBJECTS': 
      return {
        subjects: action.payload
      }
    default:
      return state
  }
}

export const SubjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subjectsReducer, {
    subjects: null,
    loading: true
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        dispatch ({ type: 'ADD_SUBJECTS', payload: user})
    }

    setLoading(false)
}, [])

  console.log('SubjectsContext state: ', state)

    if(loading) {
        return<div>Loading...</div>
    }

  return (
    <SubjectsContext.Provider value={{...state, dispatch}}>
      { children }
    </SubjectsContext.Provider>
  )
}