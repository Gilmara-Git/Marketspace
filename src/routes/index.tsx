import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes}  from './app.routes';
import { AuthContext } from '@src/contexts/AuthContext';
import {useContext } from 'react';


export const Routes =()=>{
    const { user } = useContext(AuthContext);
    console.log(user, 'user linha10')
    return (
        <NavigationContainer>
            { user.id ? <AppRoutes/> : <AuthRoutes/>}
        </NavigationContainer>
    )
};