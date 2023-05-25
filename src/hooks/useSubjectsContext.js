import { SubjectsContext } from '../context/SubjectsContext'
import { useContext } from 'react'

export const useSubjectsContext = () => {
  const context = useContext(SubjectsContext)

  if (!context) {
    throw Error('useSubjectsContext must be used inside an SubjectsContextProvider')
  }

  return context
}