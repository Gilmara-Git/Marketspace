import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { SignIn } from '@src/screens/SignIn';
import { SignUp } from '@src/screens/SignUp';

type AuthRoutesType = {
    signIn: undefined,
    signUp: undefined,
}

export type AuthRoutesNavigationProps = NativeStackNavigationProp<AuthRoutesType>;
const { Navigator, Screen } = createNativeStackNavigator<AuthRoutesType>();

export const AuthRoutes =()=>{

    return (
   
                <Navigator screenOptions={{
                        headerShown: false, 
                        animation:'fade_from_bottom'
                        }}>
                    <Screen name='signIn' component={SignIn}/>
                    <Screen name='signUp' component={SignUp}/>
                </Navigator>
  
    )
};