import  { useState } from 'react';
import { VStack, Center, Text, ScrollView ,FormControl} from 'native-base';

import { Input } from '@components/Input/index';
import { InputPassword } from '@components/InputPassword/index';
import { Controller, useForm } from 'react-hook-form';


import Logo  from '@assets/logo.svg';
import Marketspace from '@assets/marketspace.svg';
import { Button }  from '@components/Button/index';

type FormData = {
 email: string,
 password: string
}

export const SignIn =()=>{
   
    const [ isLoading, setIsLoading ] = useState(false);
    
    
    const signIn =(data : FormData)=>{
        console.log(data, 'line21')
    }

    const { control, handleSubmit , formState: {errors} } = useForm<FormData>({
        // defaultValues:{
        //     email: 'gilmarapq@hotmail.com'
        // }
    }
    );
    console.log(errors.password?.message, 'line33')
      
    return ( 
        <ScrollView 
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={{flex:1}}
            >
            <Center bg='gray.50' flex={1}>
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

                                <Controller
                                    control={control}
                                    name='email'
                                    rules={{
                                        required: 'Type a valid email address',
                                        pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid Email format",
                                      },}}
                                    render={({ field: {onChange, value }})=>(
                                        <Input 
                                            placeholder='E-mail' 
                                            onChangeText={onChange}
                                            keyboardType='email-address'
                                            autoCapitalize='none'
                                            value={value}
                                            errorMessage={errors.email?.message} 
                                            />
                                            )}
                                            />

                                        
                                <Controller
                                    control={control}
                                    name='password'
                                    rules={{required: 'Type a valid password'}}  
                                    render={({field: { onChange, value }})=>(
                                        <InputPassword 
                                            onChangeText={onChange}
                                            placeholder='Password'
                                            value={value}
                                            errorMessage={errors.password?.message}
                                           
                                            />

                                    )}  
                                
                                />        
                                
                                

                                <Button  
                                    title='Access' 
                                    color='gray.50' 
                                    backColor='blue.600' 
                                    size={69}
                                    mt={6}
                                    _pressed={{bg: 'blue.900'}}
                                    isLoading={isLoading}
                                    _loading={{
                                        bg:'blue.900'
                                    }}
                                    onPress={handleSubmit(signIn)}
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
                                    backColor={isLoading ? 'gray.500' : 'gray.300' } 
                                    size={69} 
                                    _pressed={{bg: 'gray.400'}}
                                    isLoading={isLoading}
                                    />

                        </Center>
                    </VStack>
                    
            </Center>
        </ScrollView>
    )
};