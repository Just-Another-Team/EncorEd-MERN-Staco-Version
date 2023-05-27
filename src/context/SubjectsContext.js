import { createContext, useReducer } from 'react'

export const SubjectsContext = createContext()

export const subjectsReducer = (state, action) => {
  switch (action.type) {
    case 'VIEW_SUBJECTS':
      return {
        subjects: action.payload
      }
    case 'VIEW_SUBJECT':
      return {
        subject: action.payload
      }
    case 'ADD_SUBJECTS': 
      return {
        subjects: [action.payload, ...state.subjects]
      }
    case 'UPDATE_SUBJECT': 
      return {
        subjects: [action.payload, ...state.subjects]
      }
    case 'DELETE_SUBJECT':
      return {
        subjects: [action.payload, ...state.subjects]
      }
    default:
      return state
  }
}

export const SubjectsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subjectsReducer, {
    subjects: null,
  })
  console.log('SubjectsContext state: ', state)

  return (
    <SubjectsContext.Provider value={{...state, dispatch}}>
      { children }
    </SubjectsContext.Provider>
  )
}