import  { useState } from 'react';
import { VStack, Center, Text, ScrollView, Image, Heading } from 'native-base';

import { Input } from '@components/Input/index';
import { InputPassword } from '@components/InputPassword/index';
import { Controller, useForm } from 'react-hook-form';

import Logos from '@assets/logo.png';
import { AvatarHolder } from '@components/AvatarHolder'

import { Button }  from '@components/Button/index';

type FormData = {
 name: string,
 email: string,
 phone: string,
 password: string;
 confirm_password: string
}

export const SignUp =()=>{
    const [ isCreating, setIsCreating ] = useState(false);
    const [ isLogin, setIsLogin ] = useState(false);
    const handleCreateUser = ()=>{
        setIsCreating(true);
    };

    const handleLogin =()=>{
        setIsLogin(true)
    };
    
    const signIn =(data : FormData)=>{
        console.log(data, 'line21')
    }

    const { control, handleSubmit , formState: {errors} } = useForm<FormData>({
        // defaultValues:{
        //     email: 'gilmarapq@hotmail.com'
        // }
    }
    );
   
      
    return ( 
        <ScrollView 
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ backgroundColor:'gray.200'}}
            
            >
            <VStack flex={1} pt={12} width='100%' pb={40}>
              
                        <Center mt={4} px={12}>
                                <Image source={Logos} height={10} width={15}alt='Logo'/>
                                <Heading my={3} letterSpacing={2} fontSize='xl' fontFamily='heading'>Welcome!</Heading>
                                <Text 
                                    textAlign='center'
                                    numberOfLines={2}
                                    fontSize='sm' 
                                    fontFamily='body' 
                                    letterSpacing={0.2}>Create your account and use this space to buy various items and sell your products.</Text>
                           
                        </Center>

                        <Center py={8} px={12}>
                            <AvatarHolder />

                            <VStack my={3}>
                                <Input placeholder='Name'/>
                                <Input placeholder='E-mail'/>
                                <Input placeholder='Phone'/>
                                <InputPassword placeholder='Password'/>
                                <InputPassword placeholder='Confirm Password'/>
                                <Button 
                                    title='Create' 
                                    backColor='gray.900' 
                                    color='gray.50' 
                                    size={69} 
                                    mt={3}
                                    isLoading={isCreating}
                                    onPress={handleCreateUser}
                                    _pressed={{bg: 'gray.800'}}

                                />

                            </VStack>

                            <VStack mt={8}>
                                <Center>
                                    <Text 
                                        fontFamily='body' 
                                        fontSize='sm'>Already have an account?
                                    </Text>
                                    <Button 
                                        mt={5} 
                                        title='Go to login' 
                                        backColor='gray.300' 
                                        color='gray.800' 
                                        size={69}
                                        isLoading={isLogin}
                                        _loading={{bg: 'gray.400'}}
                                        _spinner={{color: 'gray.900'}}
                                        _pressed={{bg: 'gray.500'}}
                                        onPress={handleLogin}
                                    />
                                </Center>
                            </VStack>
                        </Center>
                        

                
                           
            </VStack>
        </ScrollView>
    )
};