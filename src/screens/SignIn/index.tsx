import  { useState } from 'react';
import { VStack, Center, Text, ScrollView } from 'native-base';

import { Input } from '@components/Input/index';
import { InputPassword } from '@components/InputPassword/index';


import Logo  from '@assets/logo.svg';
import Marketspace from '@assets/marketspace.svg';
import { Button }  from '@components/Button/index';


export const SignIn =()=>{
    const [ email, setEmail ] = useState();
    const getValue=((value: string)=> console.log(value));
      
   
  
    return ( 
        <ScrollView showsVerticalScrollIndicator={false}>
            <Center bg='gray.50' pb={32}>
                <VStack width='100%' py={12} bg='gray.200' borderBottomRadius={18} height='556'>
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

                                <Input placeholder='E-mail' onChangeText={()=>setEmail} value={email}/>
                                <InputPassword placeholder='Password'/>
                                
                                

                                <Button  
                                    title='Access' 
                                    color='gray.50' 
                                    backColor='blue.600' 
                                    size={69}
                                    mt={6}
                                    />
                            </VStack>
                        </Center>
                
                </VStack>
                
                    <VStack pt={20} pb={10}>
                        <Center>
                                <Text fontSize='sm' fontFamily='body' mb={4}>No access yet?</Text>
                                <Button 
                                    title='Create an account' 
                                    color='gray.800' 
                                    backColor='gray.300' 
                                    size={58} 
                                    />
                        </Center>
                    </VStack>
            </Center>
        </ScrollView>
    )
};