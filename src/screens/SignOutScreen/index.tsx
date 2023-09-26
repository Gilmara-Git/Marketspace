import { VStack , Text, Heading , HStack } from 'native-base';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { UserAuthHook } from '@hooks/UserAuthHook';


export const SignOutScreen =()=>{
    const navigation = useNavigation();
    const { signOut } = UserAuthHook();

    const returnToPreviousPage = ()=>{
        navigation.goBack();
    }

    const handleSignOut = async ()=>{
        await signOut()
;    };


    return (
        <VStack 
            flex={1} 
            bg='gray.50' 
            alignItems='center' 
            justifyContent='center'
            >
            
                <Heading 
                    color='gray.800'
                    fontFamily='heading'
                    fontSize='xl'
                    >
                        Do you want to sign out?
                </Heading>

            <HStack  px={6} pt={6} width='100%' justifyContent='space-around'>
                <Button 
                    title='No'
                    size={33}
                    backColor='red.400'
                    color='white'
                    onPressColor='red.500' 
                    onPress={returnToPreviousPage}
                    />
                <Button 
                    title='Yes'
                    size={33}
                    backColor='blue.600'
                    color='white'
                    onPressColor='blue.900' 
                    onPress={handleSignOut}
                    
                    />
            </HStack>
            
        </VStack>
    )
};