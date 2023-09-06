import  { useState } from 'react';
import { VStack, Center, Text, ScrollView, Image } from 'native-base';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from 'react-hook-form';


import Logo  from '@assets/logo.png';
import Marketspace from '@assets/marketspace.svg';
import { Button }  from '@components/Button/index';
import { Input } from '@components/Input/index';
import { InputPassword } from '@components/InputPassword/index';


const signInSchema = yup.object({
    email: yup.string().required('Please enter your E-mail').email('Enter a valid e-mail address'),
    password: yup.string().required('Please enter a 6 digits password').min(6, 'Password must be at least 6 characters')

})

type FormData = yup.InferType<typeof signInSchema>

export const SignIn =()=>{
   
    const [ isAccessing, setIsAccessing ] = useState(false);
    const [ isCreating, setIsCreating ] = useState(false);

    const { control, handleSubmit , formState: {errors} } = useForm<FormData>({
       resolver: yupResolver(signInSchema)
    }
    );
    
    const handleCreate = ()=>{
        setIsCreating(true)
    };
    
    
    const handleSignIn =(data: FormData)=>{
        console.log('tochegando')
        setIsAccessing(true);
        console.log(data, 'line21')
    }


    // console.log(errors.email)
    console.log(!!errors.password, 'linha43', !!errors.email)

      
    return ( 
        <ScrollView 
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{backgroundColor:'gray.50'}}
            >
            <Center>
                <VStack width='100%' py={12} bg='gray.200' borderBottomRadius={18} >
                        <Center>
                           
                            <Image source={Logo} height={16} width={24} alt='Logo'/>
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
                                    render={({ field: {onChange, value }})=>(
                                        <Input 
                                            placeholder='E-mail' 
                                            onChangeText={onChange}
                                            keyboardType='email-address'
                                            autoCapitalize='none'
                                            value={value}
                                            errorMessage={errors.email?.message} 
                                            isInvalid={!!errors.email}
                                            />
                                            )}
                                            />

                                        
                                <Controller
                                    control={control}
                                    name='password'
                                    render={({field: { onChange, value }})=>(
                                        <InputPassword 
                                            onChangeText={onChange}
                                            placeholder='Password'
                                            value={value}
                                            errorMessage={errors.password?.message}
                                            isInvalid={!!errors.password}
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
                                    isLoading={isAccessing}
                                    _loading={{
                                        bg:'blue.900'
                                    }}
                                    onPress={handleSubmit(handleSignIn)}
                                    />
                            </VStack>
                        </Center>
                
                </VStack>
                
                     
                    <VStack pt={20} pb={40} bg= 'gray.50'>
                       <Center>

                                <Text fontSize='sm' fontFamily='body' mb={4}>No access yet?</Text>
                                <Button 
                                    title='Create an account' 
                                    color='gray.800' 
                                    backColor={isCreating ? 'gray.500' : 'gray.300' } 
                                    size={69} 
                                    isLoading={isCreating}
                                    onPress={handleCreate}
                                    _pressed={{bg: 'gray.400'}}
                                    />

                        </Center>
                    </VStack>
                    
            </Center>
        </ScrollView>
    )
};