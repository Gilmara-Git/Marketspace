import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes}  from './app.routes';

export const Routes =()=>{
    return (
        <NavigationContainer>
            <AppRoutes/>
        </NavigationContainer>
    )
};