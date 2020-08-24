import {createContecxt} from 'react';
import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false, 
    login: () => {}, 
    logout: () => {} 
})