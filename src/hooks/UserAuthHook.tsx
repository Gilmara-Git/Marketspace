import { useContext } from 'react';
import { AuthContext } from '@src/contexts/AuthContext';

export const UserAuthHook = ()=>{
    const context = useContext(AuthContext);
    return context;
}