import { VStack, Center, Text } from 'native-base';
import { Input } from '@components/Input/index';

import Logo  from '@assets/logo.svg';
import Marketspace from '@assets/marketspace.svg';
import { Button }  from '@components/Button/index';
import Eye from '@assets/eye.svg';

export const SignIn =()=>{
    return ( 
        <Center bg='gray.50'>
            <VStack width='100%' py={12} bg='gray.200' borderBottomRadius={18} height='450'>
                    <Center>
                        <Logo/>
                        <Center mt={4}>
                            <Marketspace/>
                            <Text 
                                fontSize='sm' 
                                fontFamily='light' 
                                letterSpacing={0.5}>Your space to buy and sell</Text>
                        </Center>
                    </Center>
                    
                    <Center>
                        <VStack alignContent='center' width={58} mt={20}>
                            <Text 
                                fontSize='sm' 
                                fontFamily='body' 
                                textAlign='center'>Access your account
                            </Text>

                            <Input name='E-mail'/>
                            <Input icon={Eye} name='Password'/>
                            <Eye/>

                            <Button  
                                title='Access' 
                                color='gray.50' 
                                backColor='blue.600' 
                                size={58}
                                />
                        </VStack>
                    </Center>
            
            </VStack>
            
                <VStack m={20}>
                    <Center>
                            <Text fontFamily='body' mb={4}>No access yet?</Text>
                            <Button 
                                title='Create an account' 
                                color='gray.800' 
                                backColor='gray.300' 
                                size={58} 
                                />
                    </Center>
                </VStack>
        </Center>
    )
};