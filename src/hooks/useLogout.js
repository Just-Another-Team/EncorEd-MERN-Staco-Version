import { useAuthContext } from "./useAuthContext"
import { useSubjectsContext } from "./useSubjectsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: subjectsDispatch } = useSubjectsContext()

    const logout = () => {

        //remove user from local storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type:'LOGOUT'})
        subjectsDispatch({ type: 'VIEW_SUBJECTS', payload: null})
    }

    return { logout }
}