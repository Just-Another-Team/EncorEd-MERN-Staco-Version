import { createContext, useReducer, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }

        case 'LOGOUT':
            return { user: null }

        case 'ADD_SUBJECTS':
            return { user: action.payload }

        default: 
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        loading: true,
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch ({ type: 'LOGIN', payload: user})
        }
        else {
            dispatch({ type: 'LOGOUT'})
        }

        setLoading(false)
    }, [])

    console.log('AuthContext state: ', state)

    if(loading) {
        return<div>Loading...</div>
    }

    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}