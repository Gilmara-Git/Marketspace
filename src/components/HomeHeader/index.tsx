import { HStack, VStack, Heading , Text, Icon } from 'native-base';
import { UserPhoto } from '@components/UserPhoto';
import { Button } from '@components/Button';
import { AntDesign } from '@expo/vector-icons';


export const HomeHeader = ()=>{
   
    return (
        <HStack>
            <HStack width={50}>
                <UserPhoto width={13} height={13} borderColor='blue.600'/>
                <VStack ml={3}>
                    <Text fontFamily='body' fontSize='md'>Welcome,</Text>
                    <Heading fontFamily='heading' fontSize='md'>Gilmara !</Heading>
                </VStack>
            </HStack>
                <Button 
                    size={17} 
                    color='gray.50' 
                    backColor='gray.900' 
                    title='Create Add'
                    onPressColor='gray.800' 
                    leftIcon={<Icon as={AntDesign} name='plus' color='gray.200'/>}
                    />
        </HStack>
    )
};