import { HStack, VStack, Heading , Text, Icon } from 'native-base';
import { UserPhoto } from '@components/UserPhoto';
import { Button } from '@components/Button';
import { AntDesign } from '@expo/vector-icons';
import { UserAuthHook } from '@src/hooks/UserAuthHook';

type HomeHeaderProps = {
    uponClicking: ()=> void;
}

export const HomeHeader = ({uponClicking}: HomeHeaderProps)=>{
    const { user } = UserAuthHook();
   
    return (
        <HStack>
            <HStack width={50}>
                <UserPhoto size={13} borderColor='blue.600'/>
                <VStack ml={3}>
                    <Text fontFamily='body' fontSize='md'>Welcome,</Text>
                    <Heading fontFamily='heading' fontSize='md'>{user.name}</Heading>
                </VStack>
            </HStack>
                <Button 
                    size={17} 
                    color='gray.50' 
                    backColor='gray.900' 
                    title='Create Add'
                    onPressColor='gray.800' 
                    leftIcon={<Icon as={AntDesign} name='plus' color='gray.200'/>}
                    onPress={()=>uponClicking()}
                    />
        </HStack>
    )
};