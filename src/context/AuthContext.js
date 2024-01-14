
import {createContext, useReducer,useState} from 'react';

const initialState = {
    isAuthenticated: localStorage.getItem('olympics-auth') ? true : false,
    user: localStorage.getItem('olympics-auth') ? JSON.parse(localStorage.getItem('olympics-auth')).user : null
}


export const AuthContext = createContext(null);

const authReducer = (state, action) => {
    
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            const loggedInState = {isAuthenticated: true, user: action.payload}
            // update the local storage
            localStorage.setItem('olympics-auth', JSON.stringify(loggedInState));
            return loggedInState;

        case 'LOGOUT_SUCCESS':

            // remove current user from local storage
            localStorage.removeItem('olympics-auth');
            return {...state, isAuthenticated: false, user: null}; 

        default:
            return;
    }
}

const AuthContextProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, initialState);
    

    return (
        <AuthContext.Provider value={{auth: authState, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

